import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UsersCollection } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, THIRTY_DAYS, SMTP_ENV_VARS, FRONTEND_DOMAIN, JWT_SECRET } from '../constants/index.js';
import { SessionsCollection } from '../db/models/session.js';
import { env } from '../utils/env.js';
import jwt from 'jsonwebtoken';
import { sendLetter } from '../utils/sendLetter.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';
import { TEMPLATES_PATH } from '../constants/index.js';
import { getFullNameFromGoogleTokenPayload, validateCode } from '../utils/googleOAuth2.js';


const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');
  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
};


export const registerUser = async (payload) => {
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  return UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};


export const loginUser = async ({ email, password }) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) throw createHttpError(404, 'User not found');

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteMany({ userId: user._id });

   const newSession = createSession();
  return SessionsCollection.create({
    userId: user._id,
    ...newSession,
  });
};


export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  if (new Date() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();
  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};


export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};


export const requestResetToken = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );
  const resetPasswordTemplatePath = path.join(
    TEMPLATES_PATH,
    'reset-password-email.html',
  );
  const templateSource = (
    await fs.readFile(resetPasswordTemplatePath)
  ).toString();
  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env(FRONTEND_DOMAIN)}/reset-password?token=${resetToken}`,
  });
  try {
    await sendLetter({
      from: env(SMTP_ENV_VARS.SMTP_FROM),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch {
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};


export const resetPassword = async (payload) => {
  let entries;
  try {
    entries = jwt.verify(payload.token, env(JWT_SECRET));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }
  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const encryptedPassword = await bcrypt.hash(payload.password, 10);
  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};


export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();
  if (!payload) throw createHttpError(401);
  let user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await UsersCollection.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
  }
  await SessionsCollection.deleteMany({ userId: user._id });
  const newSession = createSession();
  return {
    session: await SessionsCollection.create({
      userId: user._id,
      ...newSession,
    }),
    user,
  };
};

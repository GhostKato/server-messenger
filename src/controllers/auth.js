import createHttpError from 'http-errors';
import { registerUser, refreshUsersSession, logoutUser, requestResetToken, resetPassword, loginOrSignupWithGoogle } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { THIRTY_DAYS } from '../constants/index.js';
import { generateAuthUrl } from '../utils/googleOAuth2.js';
import { UsersCollection } from '../db/models/user.js';
import { BASE_URL_USER_PHOTO } from '../constants/index.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + THIRTY_DAYS),
    sameSite: 'None',
  });
};


export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;

  const photoUrl = BASE_URL_USER_PHOTO;

  if (!name || !email || !password) {
    throw createHttpError(
      400,
      'Missing required fields: name, email or password',
    );
  }

  await registerUser({ name, email, photo: photoUrl, password });

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
  });
};


export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw createHttpError(400, 'Missing required fields: email or password');
  }

  const session = await loginUser({ email, password });
  const user = await UsersCollection.findOne(session.userId);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
           },
    },
  });
};


export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  const user = await UsersCollection.findOne({ _id: session.userId });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
      },
    },
  });
};


export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};


export const resetEmailController = async (req, res) => {
  await requestResetToken(req.body.email);

  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};


export const resetPasswordController = async (req, res) => {
  await resetPassword(req.body);

  res.json({
    message: 'Password was successfully reset!',
    status: 200,
    data: {},
  });
};


export const getGoogleOAuthUrlController = async (req, res) => {
  const url = generateAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};


export const loginWithGoogleController = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      console.error('Missing "code" in the request body');
      return res.status(400).json({ message: 'Missing "code" parameter' });
    }
    const { session, user } = await loginOrSignupWithGoogle(code);
    setupSession(res, session);
    res.json({
      status: 200,
      message: 'Successfully logged in via Google OAuth!',
      data: {
        accessToken: session.accessToken,
        user: {
          name: user.name,
          email: user.email,
          photo: user.photo || BASE_URL_USER_PHOTO,
          _id: user._id,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
      stack: error.stack,
    });
  }
};

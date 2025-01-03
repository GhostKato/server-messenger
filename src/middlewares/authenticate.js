import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

export const authenticate = async (req, res, next) => {

  const authHeader = req.get('Authorization');
  const tokenFromHeader = authHeader ? authHeader.split(' ')[1] : null;

  const tokenFromCookie = req.cookies.sessionId;

  const token = tokenFromHeader || tokenFromCookie;

  if (!token) {
    return next(createHttpError(401, 'No token provided')); }

  const session = await SessionsCollection.findOne({ accessToken: token });
  if (!session) {
    return next(createHttpError(401, 'Session not found'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token expired'));
  }

  const user = await UsersCollection.findById(session.userId);
  if (!user) {
    return next(createHttpError(401, 'User not found'));
  }

  req.user = user;
  next();
};

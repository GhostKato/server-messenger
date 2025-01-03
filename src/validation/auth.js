import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(11).max(35).required(),
  password: Joi.string().min(5).max(20).required(),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().min(11).max(35).required(),
  password: Joi.string().min(5).max(20).required(),
});

export const resetEmailSchema = Joi.object({
  email: Joi.string().email().min(11).max(35).required(),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(5).max(20).required(),
  token: Joi.string().required(),
});

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required(),
});

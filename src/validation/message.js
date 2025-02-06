import Joi from 'joi';

export const createMessageSchema = Joi.object({
  message: Joi.string().min(3).max(300).required(),
});

export const updateMessageSchema = Joi.object({
  message: Joi.string().min(3).max(300).required(),
});

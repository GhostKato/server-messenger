import Joi from 'joi';

export const createMessageSchema = Joi.object({
  message: Joi.string().min(3).max(50).required(),
  to: Joi.string().length(24).hex().required(),
});

export const updateMessageSchema = Joi.object({
  message: Joi.string().min(3).max(50).required(),
});

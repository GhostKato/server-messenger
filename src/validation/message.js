import Joi from 'joi';

export const messageSchema = Joi.object({
  message: Joi.string().min(3).max(50).required(),
  to: Joi.string().length(24).hex().required(),
});

import Joi from 'joi';

export const messageSchema = Joi.object({
  message: Joi.string().min(3).max(50),
});

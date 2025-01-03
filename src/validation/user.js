import Joi from 'joi';

export const updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(11),
  password: Joi.string().min(5).max(20),
});

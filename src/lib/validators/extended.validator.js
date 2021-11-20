import { Joi } from 'celebrate';

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

export const JoiEmail = Joi.string().email();
export const JoiPassword = Joi.string()
  .pattern(passwordPattern)
  .message('Password is not valid. Use Upper case, numeric letter, and alphabets a-z');

export const JoiObjectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'Id');

export const JoiBase = Joi.object({
  updatedById: JoiObjectId.optional(),
  createdById: JoiObjectId.optional(),
});

export const JoiPhone = Joi.string().regex(/^\d+$/).message('invalid phone number').min(8).max(15);

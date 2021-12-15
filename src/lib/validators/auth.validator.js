import { Joi } from 'celebrate';
import { JoiObjectId } from './extended.validator';

const validator = ({ error, _ }, next) => (error ? next(error) : next());

const signInValidator = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });
  validator(schema.validate(req.body), next);
};

const tokenValidator = async (req, res, next) => {
  const schema = Joi.object({
    sessionToken: Joi.string().required(),
  });
  validator(schema.validate(req.body), next);
};

export default { signInValidator, tokenValidator };

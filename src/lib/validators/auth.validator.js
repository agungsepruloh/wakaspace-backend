import { Joi } from 'celebrate';
import { JoiObjectId } from './extended.validator';

const validator = ({ error, _ }, next) => (error ? next(error) : next());

const signInValidator = async (req, res, next) => {
  const schema = Joi.object({
    userId: JoiObjectId.optional(),
    ethAddress: Joi.string().required(),
  });
  validator(schema.validate(req.body), next);
};

export default { signInValidator };

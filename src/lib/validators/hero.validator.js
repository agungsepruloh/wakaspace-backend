import { Joi } from 'celebrate';
import { JoiObjectId } from './extended.validator';

const validator = ({ error, _ }, next) => (error ? next(error) : next());

const paging = async (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().default(1).optional(),
    limit: Joi.number().default(10).optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    onDate: Joi.string().optional(),
    search: Joi.string().allow('').empty(),
    typeId: Joi.any().optional(),
    rarityId: Joi.any().optional(),
  });
  validator(schema.validate(req.query), next);
};

const readHeroValidator = async (req, res, next) => {
  const schema = Joi.object({
    heroId: JoiObjectId.required(),
  });
  validator(schema.validate(req.params), next);
};

export default { paging, readHeroValidator };

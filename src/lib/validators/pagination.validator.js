import { Joi } from 'celebrate';

const validator = ({ error, _ }, next) => (error ? next(error) : next());

const paging = async (req, res, next) => {
  const schema = Joi.object({
    page: Joi.number().default(1).optional(),
    limit: Joi.number().default(10).optional(),
    fromDate: Joi.string().optional(),
    toDate: Joi.string().optional(),
    onDate: Joi.string().optional(),
    search: Joi.string().allow('').empty(),
  });
  validator(schema.validate(req.query), next);
};

export default { paging };

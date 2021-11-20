import { PaginationMiddlewares } from '@wakaspace/middlewares';
import { HeroService } from '@wakaspace/services';
import { HeroValidator, PaginationValidator } from '@wakaspace/validators';
import { Router, Express } from 'express';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/heroes', route);

  route.get('/', HeroValidator.paging, PaginationMiddlewares.parse(['name']), async (req, res, next) => {
    try {
      const { typeId, rarityId } = req.query;

      if (typeId || rarityId) {
        Reflect.set(req.filter, '$and', []);
        if (typeId) req.filter['$and'].push({ typeId });
        if (typeId) req.filter['$and'].push({ rarityId });
      }

      const data = await HeroService.Paginate(req.query, { ...req.filter });
      return res.success({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};

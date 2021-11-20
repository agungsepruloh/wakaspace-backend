import { ErrorMessage } from '@wakaspace/constants';
import WakaspaceError from '@wakaspace/exception';
import { PaginationMiddlewares } from '@wakaspace/middlewares';
import { HeroService } from '@wakaspace/services';
import { HeroValidator } from '@wakaspace/validators';
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

  // To verify existence of id (Below all endpoints). It will save code where we need heroId.
  route.use('/:heroId', HeroValidator.readHeroValidator, async (req, res, next) => {
    const { heroId } = req.params;
    const exist = await HeroService.findById(heroId);
    if (!exist) next(WakaspaceError.notFound(ErrorMessage.documentNotFound));
    next();
  });

  route.get('/:heroId', HeroValidator.readHeroValidator, async (req, res, next) => {
    try {
      const { heroId } = req.params;
      const data = await HeroService.FindById(heroId);
      return res.success({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};

import { MarketplaceService } from '@wakaspace/services';
import { Router, Express } from 'express';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/marketplace', route);

  route.get('/', async (req, res, next) => {
    try {
      const data = await MarketplaceService.GetAllOptions();
      return res.success({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};

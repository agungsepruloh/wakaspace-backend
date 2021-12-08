import { AuthService } from '@wakaspace/services';
import { AuthValidator } from '@wakaspace/validators';
import { Router, Express } from 'express';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/auth', route);

  route.get('/signin', AuthValidator.signInValidator, async (req, res, next) => {
    try {
      const data = await AuthService.SignIn(req.body);
      return res.success({ data }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};

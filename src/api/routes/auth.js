import { AuthValidator } from '@wakaspace/validators';
import { Router, Express } from 'express';
import Moralis from 'moralis/node';

const route = Router();

/**
 * @param {Express} app Express Application
 */
export default (app) => {
  app.use('/auth', route);

  route.get('/signin', AuthValidator.signInValidator, async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await Moralis.User.logIn(username, password);
      return res.success({ data: user.toJSON() }).status(200);
    } catch (e) {
      return next(e);
    }
  });

  route.get('/token', AuthValidator.tokenValidator, async (req, res, next) => {
    try {
      const { sessionToken } = req.body;
      Moralis.User.enableUnsafeCurrentUser();
      const user = await Moralis.User.become(sessionToken);
      return res.success({ data: user.toJSON() }).status(200);
    } catch (e) {
      return next(e);
    }
  });
};

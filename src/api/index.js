import { Router } from 'express';
import auth from './routes/auth';
import hero from './routes/public/hero';
import marketplace from './routes/public/marketplace';

export default () => {
  const app = Router();

  auth(app);
  hero(app);
  marketplace(app);

  return app;
};

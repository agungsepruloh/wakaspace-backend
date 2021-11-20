import { Router } from 'express';
import hero from './routes/public/hero';
import marketplace from './routes/public/marketplace';

export default () => {
  const app = Router();

  hero(app);
  marketplace(app);

  return app;
};

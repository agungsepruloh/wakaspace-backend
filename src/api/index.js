import { Router } from 'express';
import hero from './routes/public/hero';

export default () => {
  const app = Router();

  hero(app);

  return app;
};

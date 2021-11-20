import { Router } from 'express';
import race from './routes/public/race';

export default () => {
  const app = Router();

  race(app);

  return app;
};

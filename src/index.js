import express from 'express';

const startServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 4000;

  /* eslint-disable global-require */
  await require('./loaders').default(app);

  app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
};

startServer();

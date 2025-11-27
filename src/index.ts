import express from 'express';
import { setupApp } from './setup-app';
import { runDB } from './db/mongo.db';
import { SETTINGS } from './core/settings/settings';

const bootstrap = async () => {
  const app = express();
  setupApp(app);
  const PORT = process.env.PORT || 5001;

  if (!SETTINGS.MONGO_URL) {
    throw new Error('MongoDB URL does not exist');
  }

  await runDB(SETTINGS.MONGO_URL);

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
};

bootstrap();

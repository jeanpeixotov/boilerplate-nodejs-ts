import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';

import { allowCors } from './middlewares/allowCors';
import * as errors from './middlewares/errors';
import { router as modulesRouter } from './routes';
import { env, port } from './settings';

const app = express();

export const setupApp = async () => {
  app.use(allowCors);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', modulesRouter);
  app.use(morgan('common'));

  app.use(errors.notFound);
  app.use(errors.parser);

  return app;
};

setupApp();

const server = app.listen(port, () => env !== 'test' && console.log(`server started: PORT: ${port} | ENV: ${env}`));

export const closeApp = async () => {
  server.close();
};

process.on('unhandledRejection', () => { /* ignore */ });
process.on('SIGINT', () => process.exit());
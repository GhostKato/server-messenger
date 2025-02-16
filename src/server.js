import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { PORT_ENV_VAR, APP_DOMAIN } from './constants/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import { UPLOAD_PATH } from './constants/index.js';
import http from 'http';
import { setupSocket } from './utils/socket.js';

export const setupServer = () => {
  const app = express();

  const server = http.createServer(app);

  setupSocket(server);

  app.use(express.json());
  app.use(cors({ origin: env(APP_DOMAIN), credentials: true }));
  app.use(cookieParser());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(router);
  app.use('/uploads', express.static(UPLOAD_PATH));
  app.use(express.static('public'));
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env(PORT_ENV_VAR, '3000'));
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

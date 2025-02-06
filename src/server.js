import express from 'express';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { PORT_ENV_VAR } from './constants/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import router from './routers/index.js';
import { UPLOAD_PATH } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors({
      //  origin: 'https://app-messenger-seven.vercel.app',
    origin: 'http://localhost:3001',
  credentials: true,
}));
  app.use(cookieParser());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use(router);
  app.use('/uploads', express.static(UPLOAD_PATH));
  app.use(express.static('public'));
  app.use('*', notFoundHandler);
  app.use(errorHandler);

  const PORT = Number(env(PORT_ENV_VAR, '3000'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

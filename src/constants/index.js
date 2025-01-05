import path from 'node:path';

export const PORT_ENV_VAR = 'PORT';

export const MONGO_DB_ENV_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const SMTP_ENV_VARS = {
SMTP_HOST: 'SMTP_HOST',
SMTP_PORT: 'SMTP_PORT',
SMTP_USER: 'SMTP_USER',
SMTP_PASSWORD: 'SMTP_PASSWORD',
SMTP_FROM: 'SMTP_FROM',
};

export const CLOUDINARY_ENV_VARS = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const ENABLE_CLOUDINARY = 'ENABLE_CLOUDINARY';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const APP_DOMAIN = 'APP_DOMAIN';
export const SERVER_DOMAIN = 'SERVER_DOMAIN';

export const JWT_SECRET = 'JWT_SECRET';

export const TEMPLATES_PATH = path.join(process.cwd(), 'src', 'templates');
export const TEMP_UPLOAD_PATH = path.join(process.cwd(), 'temp');
export const UPLOAD_PATH = path.join(process.cwd(), 'uploads');

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const BASE_URL_USER_PHOTO = 'https://res.cloudinary.com/dgujs920w/image/upload/v1733567233/kl1ou88vgebwnsblfgwf.jpg';

import path from 'node:path';

export const PORT_ENV_VAR = 'PORT';

export const MONGO_DB_ENV_VARS = {
  MONGODB_USER: 'MONGODB_USER',
  MONGODB_PASSWORD: 'MONGODB_PASSWORD',
  MONGODB_URL: 'MONGODB_URL',
  MONGODB_DB: 'MONGODB_DB',
};

export const CLOUDINARY_ENV_VARS = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const ENABLE_CLOUDINARY = 'ENABLE_CLOUDINARY';

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

export const FRONTEND_DOMAIN = 'FRONTEND_DOMAIN';
export const BACKEND_DOMAIN = 'BACKEND_DOMAIN';

export const TEMP_UPLOAD_PATH = path.join(process.cwd(), 'temp');
export const UPLOAD_PATH = path.join(process.cwd(), 'uploads');

export const BASE_URL_USER_PHOTO = 'https://res.cloudinary.com/dgujs920w/image/upload/v1733567233/kl1ou88vgebwnsblfgwf.jpg';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

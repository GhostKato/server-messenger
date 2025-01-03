import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY_ENV_VARS } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY_ENV_VARS.CLOUD_NAME),
  api_key: env(CLOUDINARY_ENV_VARS.API_KEY),
  api_secret: env(CLOUDINARY_ENV_VARS.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};

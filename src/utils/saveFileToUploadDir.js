import path from 'node:path';
import fs from 'node:fs/promises';
import { BECKEND_DOMAIN, TEMP_UPLOAD_PATH, UPLOAD_PATH } from '../constants/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_PATH, file.filename),
    path.join(UPLOAD_PATH, file.filename),
  );

  return `${env(BECKEND_DOMAIN)}/uploads/${file.filename}`;
};

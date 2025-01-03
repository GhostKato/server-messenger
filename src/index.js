import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';
import { TEMP_UPLOAD_PATH, UPLOAD_PATH } from './constants/index.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

(async () => {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_PATH);
  await createDirIfNotExists(UPLOAD_PATH);
  setupServer();
})();

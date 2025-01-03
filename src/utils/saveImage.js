import { env } from '../utils/env.js';
import { ENABLE_CLOUDINARY } from '../constants/index.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const saveImage = async (photo) => {
    if (env(ENABLE_CLOUDINARY) === 'true') {
        return await saveFileToCloudinary(photo);
    } else {
        return await saveFileToUploadDir(photo);
    }
};

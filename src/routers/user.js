import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateUserSchema} from '../validation/user.js';
import { updateUserController } from '../controllers/user.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);
router.patch('/:userId', upload.single('photo'), validateBody(updateUserSchema),  ctrlWrapper(updateUserController));

export default router;

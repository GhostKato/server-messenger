import { messageSchema } from "../validation/message.js";
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createMessageController } from "../controllers/message.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.use(authenticate);
router.post('/', validateBody(messageSchema), ctrlWrapper(createMessageController));

export default router;

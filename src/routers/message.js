import { createMessageSchema, updateMessageSchema } from "../validation/message.js";
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createMessageController, deleteMessageController, getMessageController, updateMessageController } from "../controllers/message.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getMessageController));
router.post('/', validateBody(createMessageSchema), ctrlWrapper(createMessageController));
router.patch('/:messageId',  validateBody(updateMessageSchema),  ctrlWrapper(updateMessageController));
router.delete('/:messageId', ctrlWrapper(deleteMessageController));

export default router;

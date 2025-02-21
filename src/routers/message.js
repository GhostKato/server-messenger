import { messageSchema } from "../validation/message.js";
import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { createMessageController, deleteMessageController, deleteNotificationsController, getMessagesByIdController, getNotificationsController, updateMessageController } from "../controllers/message.js";
import { validateBody } from "../middlewares/validateBody.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();
router.use(authenticate);
router.get('/notifications', ctrlWrapper(getNotificationsController));
router.delete('/notifications', ctrlWrapper(deleteNotificationsController));
router.get('/:toId', ctrlWrapper(getMessagesByIdController));
router.post('/:toId', validateBody(messageSchema), ctrlWrapper(createMessageController));
router.patch('/:messageId',  validateBody(messageSchema),  ctrlWrapper(updateMessageController));
router.delete('/:messageId', ctrlWrapper(deleteMessageController));

export default router;

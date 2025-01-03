import { Router } from 'express';
import authRouter from './auth.js';
import userRouter from './user.js';
import messageRouter from './message.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/message', messageRouter);

export default router;

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
    registerUserSchema,
    loginUserSchema,
    resetEmailSchema,
    resetPasswordSchema,
    loginWithGoogleOAuthSchema
} from '../validation/auth.js';
import {
    registerUserController,
    loginUserController,
    refreshUserSessionController,
    logoutUserController,
    resetEmailController,
    resetPasswordController,
    getGoogleOAuthUrlController,
    loginWithGoogleController
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';


const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/send-reset-email', validateBody(resetEmailSchema), ctrlWrapper(resetEmailController));

router.post('/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

router.post('/confirm-oauth', validateBody(loginWithGoogleOAuthSchema), ctrlWrapper(loginWithGoogleController),
);

export default router;

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  registerUserSchema,
  requestResetEmailSchema,
  resetPwdSchema,
} from '../validation/auth.js';
import {
  logoutUserController,
  refreshUsersSessionController,
  registerUserController,
  requestResetTokenController,
  resetPwdController,
} from '../controllers/auth.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUsersSessionController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetTokenController),
);

router.post(
  '/reset-pwd',
  validateBody(resetPwdSchema),
  ctrlWrapper(resetPwdController),
);

export default router;

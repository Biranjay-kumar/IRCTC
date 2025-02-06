import express from 'express';
import UserController from '../../../controllers/user/user.controller.js';
import authMiddleware from '../../../middlewares/verifyToken.middleware.js';
import isAdminApiKey from '../../../middlewares/apiKey.middleware.js';

const userRouter = express.Router();

// Public Routes
userRouter.post('/', UserController.register);
userRouter.post('/login', UserController.login);

userRouter.get('/', authMiddleware, UserController.getProfile);

// =============================Admin making==================
userRouter.post('/admin', authMiddleware, isAdminApiKey,UserController.adminRegister);

export default userRouter;

import express from 'express';
import { requiresAuth } from 'express-openid-connect';
import UserController from '../../controllers/user';

const router = express.Router();
const userController = UserController.getInstance();

// GET
router.get('/profile', requiresAuth(), userController.getProfile);
router.get('/login', userController.login);


export default router;
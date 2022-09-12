import express from 'express';
import tasksRoutes from './task';
import userRoutes from './user';

const router = express.Router();

router.use('/task', tasksRoutes);
router.use('/user', userRoutes);

export default router;
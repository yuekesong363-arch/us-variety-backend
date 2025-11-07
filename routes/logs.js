// routes/logs.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import { getOperationLogs } from '../controllers/operationController.js';

const router = express.Router();

// 获取最近 50 条日志
router.get('/list', authMiddleware, getOperationLogs);

export default router;
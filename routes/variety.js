// routes/variety.js
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
  createVariety,
  getVarietyList,
  updateVariety,
  deleteVariety
} from '../controllers/varietyController.js';

const router = express.Router();

// 新增综艺
router.post('/create', authMiddleware, createVariety);

// 查询综艺列表
router.get('/list', authMiddleware, getVarietyList);

// 更新综艺
router.put('/update/:id', authMiddleware, updateVariety);

// 删除综艺
router.delete('/delete/:id', authMiddleware, deleteVariety);

export default router;
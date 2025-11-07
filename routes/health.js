// routes/health.js
import { Router } from 'express';
import pool from '../config/db.js';

const router = Router();

// 健康检查接口：验证数据库是否正常连接
router.get('/ping', async (_req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT note, created_at FROM health_check ORDER BY id DESC LIMIT 1;'
    );
    res.json({
      ok: true,
      api: 'pong',
      db_note: rows[0]?.note || null,
      db_time: rows[0]?.created_at || null,
    });
  } catch (err) {
    console.error('❌ health ping error:', err.message);
    res.status(500).json({ ok: false, error: 'DB_ERROR', message: err.message });
  }
});

export default router;
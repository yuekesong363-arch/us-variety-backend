// controllers/operationController.js
import pool from '../config/db.js';

// 🟢 获取操作日志列表
export const getOperationLogs = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        l.id,
        u.username AS user,
        l.action,
        l.target_table,
        l.target_id,
        l.description,
        l.created_at
      FROM operation_logs l
      LEFT JOIN users u ON l.user_id = u.id
      ORDER BY l.id DESC
      LIMIT 50
    `);
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error('GET_OPERATION_LOGS_ERROR:', err);
    return res.status(500).json({ ok: false, message: '服务器错误' });
  }
};
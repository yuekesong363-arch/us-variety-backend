// middlewares/logMiddleware.js
import pool from '../config/db.js';

/**
 * 记录操作日志到 operation_logs 表
 * @param {object} user        当前用户对象（由 authMiddleware 解出）
 * @param {string} action      动作描述，例如：'create'
 * @param {string} targetTable 目标表名，例如：'variety_shows'
 * @param {number|null} targetId 目标记录ID
 * @param {string} description 说明
 */
export async function recordLog(user, action, targetTable, targetId, description = '') {
  try {
    if (!user || !user.id) return;
    await pool.query(
      `INSERT INTO operation_logs (user_id, action, target_table, target_id, description)
       VALUES (?, ?, ?, ?, ?)`,
      [user.id, action, targetTable, targetId ?? null, description]
    );
  } catch (err) {
    console.error('⚠️ 操作日志记录失败：', err.message);
  }
}
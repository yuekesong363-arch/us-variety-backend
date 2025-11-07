// controllers/varietyController.js
import pool from '../config/db.js';
import { recordLog } from '../middlewares/logMiddleware.js';

// 🟢 新增综艺
export const createVariety = async (req, res) => {
  const user = req.user;
  const {
    chinese_name,
    english_name,
    show_type,
    season_episode,
    premiere_date,
    is_active,
    description,
  } = req.body;

  try {
    const [result] = await pool.query(
      `INSERT INTO variety_shows 
      (chinese_name, english_name, show_type, season_episode, premiere_date, is_active, description)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [chinese_name, english_name, show_type, season_episode, premiere_date, is_active, description]
    );

    await recordLog(user, 'create', 'variety_shows', result.insertId, `创建综艺: ${chinese_name}/${english_name}`);
    return res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error('CREATE_VARIETY_ERROR:', err);
    return res.status(500).json({ ok: false, message: '服务器错误' });
  }
};

// 🟢 查询综艺列表
export const getVarietyList = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT id, chinese_name, english_name, show_type, season_episode, premiere_date, is_active, description
      FROM variety_shows
      ORDER BY id DESC
      LIMIT 50
    `);
    return res.json({ ok: true, data: rows });
  } catch (err) {
    console.error('LIST_VARIETY_ERROR:', err);
    return res.status(500).json({ ok: false, message: '服务器错误' });
  }
};

// 🟢 更新综艺
export const updateVariety = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const {
    chinese_name,
    english_name,
    show_type,
    season_episode,
    premiere_date,
    is_active,
    description,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE variety_shows 
       SET chinese_name=?, english_name=?, show_type=?, season_episode=?, premiere_date=?, is_active=?, description=? 
       WHERE id=?`,
      [chinese_name, english_name, show_type, season_episode, premiere_date, is_active, description, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, message: '未找到该综艺' });
    }

    await recordLog(user, 'update', 'variety_shows', id, `更新综艺: ${chinese_name}/${english_name}`);
    return res.json({ ok: true });
  } catch (err) {
    console.error('UPDATE_VARIETY_ERROR:', err);
    return res.status(500).json({ ok: false, message: '服务器错误' });
  }
};

// 🟢 删除综艺
export const deleteVariety = async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  try {
    const [result] = await pool.query(`DELETE FROM variety_shows WHERE id=?`, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, message: '未找到该综艺' });
    }

    await recordLog(user, 'delete', 'variety_shows', id, `删除综艺 ID=${id}`);
    return res.json({ ok: true });
  } catch (err) {
    console.error('DELETE_VARIETY_ERROR:', err);
    return res.status(500).json({ ok: false, message: '服务器错误' });
  }
};
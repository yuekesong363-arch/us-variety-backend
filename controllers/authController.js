import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ 用户注册
export async function register(req, res) {
  try {
    const { username, password, full_name, role = '录入员', department_id = null } = req.body;

    if (!username || !password) {
      return res.status(400).json({ ok: false, message: '用户名和密码不能为空' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(400).json({ ok: false, message: '用户名已存在' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password, full_name, role, department_id) VALUES (?, ?, ?, ?, ?)',
      [username, hashed, full_name, role, department_id]
    );

    res.json({ ok: true, message: '注册成功' });
  } catch (err) {
    console.error('注册失败:', err);
    res.status(500).json({ ok: false, message: '服务器错误' });
  }
}

// ✅ 用户登录
export async function login(req, res) {
  try {
    const { username, password } = req.body;
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

    if (rows.length === 0) {
      return res.status(400).json({ ok: false, message: '用户不存在' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ ok: false, message: '密码错误' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '7d' }
    );

    res.json({ ok: true, token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    console.error('登录失败:', err);
    res.status(500).json({ ok: false, message: '服务器错误' });
  }
}
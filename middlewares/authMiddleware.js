// middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

// 默认导出：供 `import authMiddleware from ...` 使用
export default function authMiddleware(req, res, next) {
  const auth = req.headers.authorization || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Token缺失' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'dev_secret';
    const payload = jwt.verify(token, secret);
    req.user = payload; // 下游可用 req.user
    next();
  } catch (err) {
    return res.status(403).json({ ok: false, message: 'Token无效或已过期' });
  }
}
// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import pool from './config/db.js';
import authRouter from './routes/auth.js';
import healthRouter from './routes/health.js';
import varietyRouter from './routes/variety.js';
import logsRouter from './routes/logs.js'; // ✅ 日志接口
import requestLogger from './middlewares/requestLogger.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(requestLogger);

// ✅ 数据库连接检测
pool.getConnection()
  .then(() => console.log('✅ MySQL 数据库连接成功'))
  .catch(err => console.error('❌ 数据库连接失败:', err));

// ✅ 路由注册
app.use('/api/auth', authRouter);
app.use('/api/health', healthRouter);
app.use('/api/variety', varietyRouter);
app.use('/api/logs', logsRouter); // ✅ 新增日志接口

// ✅ 错误兜底（防止未捕获异常导致崩溃）
app.use((err, req, res, next) => {
  console.error('UNHANDLED_ERROR:', err);
  res.status(500).json({ ok: false, message: '服务器异常' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
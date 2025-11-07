// config/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

// ✅ 连接 Render 的 PostgreSQL 数据库
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false // ⚠️ 必须开启，否则 Render 会拒绝连接
  }
});

// ✅ 测试连接
pool.connect()
  .then(client => {
    console.log('✅ PostgreSQL 数据库连接成功');
    client.release();
  })
  .catch(err => console.error('❌ 数据库连接失败:', err));

export default pool;
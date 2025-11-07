// config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 一定要最早加载 .env
dotenv.config();

const {
  DB_HOST,
  DB_PORT = 3306,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
} = process.env;

// 基本校验，避免出现空用户名还不知道
const missing = [];
if (!DB_HOST) missing.push('DB_HOST');
if (!DB_USER) missing.push('DB_USER');
if (!DB_NAME) missing.push('DB_NAME');
if (missing.length) {
  throw new Error(
    `缺少数据库环境变量：${missing.join(', ')}。请检查 .env 文件是否存在且变量名拼写正确。`
  );
}

console.log(
  `🔌 MySQL 即将连接：${DB_USER}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD ?? '',
  database: DB_NAME,
  connectionLimit: 10,
  dateStrings: true,   // 避免时间被转成 JS Date
  timezone: 'Z',       // 统一为 UTC（可按需改）
});

export default pool;
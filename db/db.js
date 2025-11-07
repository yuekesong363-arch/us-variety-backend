// db/db.js
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    require: true,              // ✅ Render 要求启用 SSL
    rejectUnauthorized: false,  // ✅ 必须为 false，否则握手失败
  },
});

export default pool;
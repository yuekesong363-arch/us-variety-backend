// db/migrate.js
import pool from './db.js';

const createTables = `
CREATE TABLE IF NOT EXISTS shows (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

async function migrate() {
  console.log('🚀 正在连接 Render PostgreSQL 数据库...');
  try {
    const client = await pool.connect();
    console.log('📦 已成功连接数据库，正在创建数据表...');
    await client.query(createTables);
    console.log('✅ 数据表创建完成！');
    client.release();
  } catch (err) {
    console.error('❌ 创建失败:', err.message);
  } finally {
    await pool.end();
    console.log('🔚 已关闭数据库连接');
  }
}

migrate();
import pool from './db.js'; // 如果路径报错，就改成 ../db/db.js

async function checkTables() {
  try {
    console.log("🔍 正在检查数据库中的表...");
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log("✅ 当前存在的表：", result.rows);
  } catch (err) {
    console.error("❌ 查询失败：", err.message);
  } finally {
    await pool.end();
  }
}

checkTables();
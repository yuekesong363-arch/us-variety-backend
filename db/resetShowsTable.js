import pool from "./db.js";

async function resetShowsTable() {
  try {
    console.log("🧱 正在重建 shows 表...");

    // 删除旧表并重新创建
    await pool.query(`
      DROP TABLE IF EXISTS shows;
      CREATE TABLE shows (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        season TEXT,
        status TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ shows 表已重建！");
  } catch (err) {
    console.error("❌ 重建失败:", err.message);
  } finally {
    await pool.end();
  }
}

resetShowsTable();
// routes/dbCheck.js
import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// ✅ 数据库连通性检测
router.get("/", async (req, res) => {
  try {
    const start = Date.now();
    const result = await pool.query("SELECT NOW()");
    const duration = Date.now() - start;

    res.json({
      ok: true,
      message: "✅ PostgreSQL 连接成功",
      serverTime: result.rows[0].now,
      queryDurationMs: duration,
    });
  } catch (error) {
    console.error("❌ 数据库连接失败:", error.message);
    res.status(500).json({
      ok: false,
      message: "❌ 数据库连接失败",
      error: error.message,
    });
  }
});

export default router;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./db/db.js"; // ✅ PostgreSQL 连接池
import varietyRoutes from "./routes/varietyRoutes.js"; // ✅ 节目路由

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ 全局中间件
app.use(cors());
app.use(express.json());

// ✅ 根路由（方便测试服务是否运行）
app.get("/", (req, res) => {
  res.send("🎬 US Variety Backend 服务运行中 ✅");
});

// ✅ 测试数据库连接接口
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    res.json({
      success: true,
      message: "数据库连接成功 ✅",
      tables: result.rows,
    });
  } catch (err) {
    console.error("❌ 数据库连接失败:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ 注册综艺节目相关路由
app.use("/shows", varietyRoutes);

// ✅ 404 兜底
app.use((req, res) => {
  res.status(404).json({ error: "接口不存在，请检查路径" });
});

// ✅ 全局错误捕获
app.use((err, req, res, next) => {
  console.error("💥 服务器内部错误：", err);
  res.status(500).json({ error: "服务器内部错误" });
});

// ✅ 启动服务
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动：http://localhost:${PORT}`);
});
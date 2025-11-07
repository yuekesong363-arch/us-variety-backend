// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

import pool from "./config/db.js";
import authRouter from "./routes/auth.js";
import healthRouter from "./routes/health.js";
import varietyRouter from "./routes/variety.js";
import logsRouter from "./routes/logs.js";
import dbCheckRouter from "./routes/dbCheck.js"; // ✅ 新增导入
import requestLogger from "./middlewares/requestLogger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestLogger);

// ✅ 数据库连接检测
pool
  .connect()
  .then(() => console.log("✅ PostgreSQL 数据库连接成功"))
  .catch((err) => console.error("❌ 数据库连接失败:", err));

// ✅ 根目录欢迎页
app.get("/", (req, res) => {
  res.send(`
    <div style="font-family:Arial;text-align:center;padding-top:50px;">
      <h1>🎉 Backend Server is Running Successfully!</h1>
      <p>✅ 当前环境: Render Cloud</p>
      <p>🔗 Health Check: <a href="/api/health">/api/health</a></p>
      <p>🧩 DB Check: <a href="/api/db-check">/api/db-check</a></p>
      <p>🗃️ Variety Data API: <a href="/api/variety">/api/variety</a></p>
      <p>🧾 Logs API: <a href="/api/logs">/api/logs</a></p>
      <hr/>
      <p style="color:gray;">Powered by Express & PostgreSQL</p>
    </div>
  `);
});

// ✅ 路由注册
app.use("/api/auth", authRouter);
app.use("/api/health", healthRouter);
app.use("/api/variety", varietyRouter);
app.use("/api/logs", logsRouter);
app.use("/api/db-check", dbCheckRouter); // ✅ 新增注册

// ✅ 错误兜底
app.use((err, req, res, next) => {
  console.error("UNHANDLED_ERROR:", err);
  res.status(500).json({ ok: false, message: "服务器异常" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
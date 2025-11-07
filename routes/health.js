// routes/health.js
import express from "express";
const router = express.Router();

// ✅ 健康检测接口，用于确认后端是否正常运行
router.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Server running successfully 🚀",
    timestamp: new Date().toISOString(),
  });
});

export default router;
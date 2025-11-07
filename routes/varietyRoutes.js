import express from "express";
import {
  getAllShows,
  getShowById,
  addShow,
  updateShow,
  deleteShow,
} from "../controllers/varietyController.js";

const router = express.Router();

// 获取全部节目
router.get("/", getAllShows);

// 获取单个节目
router.get("/:id", getShowById);

// 新增节目
router.post("/", addShow);

// 更新节目
router.put("/:id", updateShow);

// 删除节目
router.delete("/:id", deleteShow);

export default router;
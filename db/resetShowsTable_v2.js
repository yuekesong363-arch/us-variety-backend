import pool from "./db.js";

async function resetShowsTableV2() {
  try {
    console.log("🧱 正在重建 shows 表为正式版...");

    await pool.query(`
      DROP TABLE IF EXISTS shows;

      CREATE TABLE shows (
        id SERIAL PRIMARY KEY,

        -- 基础信息
        name TEXT NOT NULL,                -- 中文名
        english_name TEXT,                 -- 英文名
        alias TEXT,                        -- 别名（可多值 JSON）
        season TEXT,                       -- 季数，例如 S1 / S2
        episode TEXT,                      -- 集数或总集数
        premiere_date DATE,                -- 首播时间
        genre TEXT,                        -- 类型（恋综 / 真人秀 / 竞演等）
        description TEXT,                  -- 简介

        -- 测试信息
        test_status TEXT DEFAULT '待确认',   -- 状态：待确认 / 已录入未测试 / 测试中 / 已测试 / 禁用 / 待复测
        risk_blood TEXT DEFAULT '否',       -- 是否血腥：否 / 轻微 / 严重
        risk_porn BOOLEAN DEFAULT false,    -- 是否涉黄
        copyright_status TEXT DEFAULT '需核验', -- 版权状态：可用 / 需核验 / 受限

        -- 人员与管理信息
        input_by TEXT,                      -- 录入人
        audit_by TEXT,                      -- 审核人
        last_modified_by TEXT,              -- 最后修改人

        -- 系统信息
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("✅ shows 表已成功重建（正式版结构）！");
  } catch (err) {
    console.error("❌ 重建失败:", err.message);
  } finally {
    await pool.end();
  }
}

resetShowsTableV2();
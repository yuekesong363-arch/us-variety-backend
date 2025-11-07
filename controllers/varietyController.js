import pool from "../db/db.js";

// ✅ 1. 获取所有节目
export async function getAllShows(req, res) {
  try {
    const result = await pool.query("SELECT * FROM shows ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("❌ 获取节目列表失败:", err);
    res.status(500).json({ error: "服务器错误" });
  }
}

// ✅ 2. 获取单个节目详情
export async function getShowById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM shows WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "未找到对应节目" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ 获取节目详情失败:", err);
    res.status(500).json({ error: "服务器错误" });
  }
}

// ✅ 3. 新增节目
export async function addShow(req, res) {
  const { name, english_name, season, genre, test_status, input_by } = req.body;

  if (!name || !season || !test_status) {
    return res.status(400).json({ error: "缺少必要字段 name/season/test_status" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO shows (name, english_name, season, genre, test_status, input_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, english_name, season, genre, test_status, input_by]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("❌ 新增节目失败:", err);
    res.status(500).json({ error: "服务器错误" });
  }
}

// ✅ 4. 更新节目信息（部分字段）
export async function updateShow(req, res) {
  const { id } = req.params;
  const { name, english_name, season, genre, test_status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE shows 
       SET name = COALESCE($1, name),
           english_name = COALESCE($2, english_name),
           season = COALESCE($3, season),
           genre = COALESCE($4, genre),
           test_status = COALESCE($5, test_status),
           updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [name, english_name, season, genre, test_status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "未找到该节目" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ 更新节目失败:", err);
    res.status(500).json({ error: "服务器错误" });
  }
}

// ✅ 5. 删除节目
export async function deleteShow(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM shows WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "未找到该节目" });
    }
    res.json({ message: "节目已删除", deleted: result.rows[0] });
  } catch (err) {
    console.error("❌ 删除节目失败:", err);
    res.status(500).json({ error: "服务器错误" });
  }
}
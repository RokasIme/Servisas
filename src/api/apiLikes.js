import { connection } from "../db.js";

export async function apiLikesPost(req, res) {
  const id = +req.params.id;

  const { likes, masterId } = req.body;

  try {
    const sql = "INSERT INTO likes (like_count, master_id) VALUES (?, ?);";
    const [result] = await connection.query(sql, [likes, masterId]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, paveikta eilutė ne viena pabandykite veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurta nauja like eilutė",
  });
}

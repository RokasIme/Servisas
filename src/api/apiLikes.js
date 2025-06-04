import { connection } from "../db.js";

export async function apiLikesPost(req, res) {
  const id = +req.params.id;

  const { likes, masterId } = req.body;
  const userId = req.user.id;

  try {
    const sql = `
    SELECT *, 
      SUM(like_count) AS sum 
    FROM likes
    WHERE user_id = ?
    GROUP BY master_id
    HAVING master_id = ?;`;
    const [result] = await connection.query(sql, [userId, masterId]);

    const sum = +result[0]?.sum ?? 0;

    // if (sum === 1) {
    //   likes = -1;
    //   res.json({
    //     status: "error",
    //     msg: "Šis vartotjas meistrui like jau uždėjo, nuimama",
    //   });
    // }

    if (sum > 0) {
      return res.json({
        status: "error",
        msg: "Šis vartotjas meistrui negali uždėti daugiau nei vieną like",
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }

  try {
    const sql =
      "INSERT INTO likes (like_count, master_id, user_id) VALUES (?, ?, ?);";
    const [result] = await connection.query(sql, [
      likes,
      masterId,
      req.user.id,
    ]);

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

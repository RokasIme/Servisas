import { connection } from "../db.js";
import { IsValid } from "../lib/IsValid.js";

export async function apiLikesPost(req, res) {
  const masterId = +req.params.id;
  const userId = req.user.id;

  const [errId, msgId] = IsValid.id(masterId);

  if (errId) {
    return res.json({
      status: "error",
      msg: msgId,
    });
  }

  const [errUserId, msgUserId] = IsValid.id(userId);

  if (errUserId) {
    return res.json({
      status: "error",
      msg: msgUserId,
    });
  }

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
    const [result] = await connection.query(sql, [1, masterId, userId]);

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

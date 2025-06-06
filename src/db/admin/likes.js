import { connection } from "../../db.js";

export async function getAllLikes(id) {
  try {
    const sql = `
            SELECT SUM(like_count) AS sum
            FROM likes
            WHERE master_id = ?;`;
    const [result] = await connection.query(sql, [id]);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getHeartColor(user_id, master_id) {
  try {
    const sql = `
SELECT *, 
SUM(like_count) AS sum 
FROM likes
WHERE user_id = ?
GROUP BY master_id
HAVING master_id = ?;`;
    const [result] = await connection.query(sql, [user_id, master_id]);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

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

import { connection } from "../../db.js";

export async function getAllworkshops() {
  try {
    const sql = `
            SELECT *
            FROM workshops
            ORDER BY workshop;`;
    const [result] = await connection.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllworkshopById(id) {
  try {
    const sql = `SELECT * FROM workshops WHERE id = ?;`;
    const [result] = await connection.query(sql, [id]);
    return result.length ? result[0] : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

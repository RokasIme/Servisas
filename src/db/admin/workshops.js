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

import { connection } from "../../db.js";

export async function getAllCategories() {
  try {
    const sql = `
              SELECT *
              FROM categories
              WHERE is_published = 1;`;
    const [result] = await connection.query(sql);
    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
}

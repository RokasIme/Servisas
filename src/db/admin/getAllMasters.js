import { connection } from "../../db.js";

export async function getAllMasters() {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id `;

    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

import { connection } from "../../db.js";

export async function getAllMasters() {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        WHERE masters.is_published = 1 AND categories.is_published = 1 `;
    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMastersByCategory(category) {
  try {
    const sql = `
         SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        WHERE masters.is_published = 1 AND 
            categories.is_published = 1 AND
            url_slug = ? `;
    const [results] = await connection.query(sql, [category]);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMastersByWorkshop(workshop) {
  try {
    const sql = `
             SELECT masters.*, categories.category, categories.url_slug, workshops.workshop, city, adress
            FROM masters
            INNER JOIN categories
            ON masters.category_id = categories.id
            INNER JOIN workshops
            ON masters.workshop_id = workshops.id
            WHERE masters.is_published = 1 AND 
                categories.is_published = 1 AND
                workshop = ? `;
    const [results] = await connection.query(sql, [workshop]);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getWorkShops() {
  try {
    const sql = `
             SELECT *
            FROM workshops
            `;
    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

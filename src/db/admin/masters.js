import { connection } from "../../db.js";

export async function getAllMasters() {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.description, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id 
        ORDER BY id`;

    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllMastersDaft() {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.description, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id 
        WHERE masters.is_published = 0
        ORDER BY id`;

    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getAllMastersPublished() {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.description, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id 
        WHERE masters.is_published = 1
        ORDER BY id`;

    const [results] = await connection.query(sql);

    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMasterById(id) {
  try {
    const sql = `
        SELECT masters.*, categories.category, categories.description, categories.url_slug, workshops.workshop, city
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id 
        WHERE masters.id = ${id}`;

    const [results] = await connection.query(sql);

    return results.length ? results[0] : null;
  } catch (error) {
    console.log(error);
    return [];
  }
}

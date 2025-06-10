import { connection } from "../../db.js";
import { getAllworkshops } from "../../db/admin/workshops.js";
import { getAllCategories } from "../../db/public/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiPublicMastersGet(req, res) {
  const availableCategoryIds = (await getAllCategories()).map((c) => "" + c.id);
  const availableWorkshopsIds = (await getAllworkshops()).map((w) => "" + w.id);

  const [err, msg] = IsValid.requiredFields(
    req.query,
    [],
    [
      { field: "text", validation: IsValid.nonEmptyString },
      {
        field: "category",
        validation: IsValid.includesInList,
        options: availableCategoryIds,
      },
      {
        field: "master",
        validation: IsValid.nonEmptyString,
      },
      {
        field: "workshop",
        validation: IsValid.includesInList,
        options: availableWorkshopsIds,
      },
      {
        field: "img",
        validation: IsValid.includesInList,
        options: ["true", "false"],
      },
    ]
  );

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const text = req.query.text;
  const category = +req.query.category;
  const master = +req.query.master;
  const workshop = +req.query.workshop;
  const img = req.query.img === "true" ? true : false;
  const sqlParts = [];
  const sqlData = [req.user.id];

  if (text) {
    sqlParts.push(
      `(masters.name LIKE CONCAT("%", ?, "%") OR masters.lastName LIKE CONCAT("%", ?, "%") OR workshops.workshop LIKE CONCAT("%", ?, "%") OR workshops.city LIKE CONCAT("%", ?, "%") OR workshops.adress LIKE CONCAT("%", ?, "%"))`
    );
    sqlData.push(text, text, text, text, text);
  }

  if (category) {
    sqlParts.push("masters.category_id = ?");
    sqlData.push(category);
  }

  if (master) {
    sqlParts.push("masters.id = ?");
    sqlData.push(master);
  }

  if (workshop) {
    sqlParts.push("masters.workshop_id = ?");
    sqlData.push(workshop);
  }

  if (img) {
    sqlParts.push('masters.img != ""');
  }

  try {
    const sql = `
       SELECT masters.*, categories.category, categories.description, categories.url_slug, workshops.workshop, city,
(SELECT sum(like_count) from likes WHERE likes.master_id = masters.id ) AS totalLikes,
(SELECT sum(like_count) from likes WHERE likes.master_id = masters.id AND likes.user_id = ? ) AS userLikes
        FROM masters
        INNER JOIN categories
        ON masters.category_id = categories.id
        INNER JOIN workshops
        ON masters.workshop_id = workshops.id
        LEFT join likes
        ON likes.master_id = masters.id
       
        ${
          sqlParts.length ? "WHERE " + sqlParts.join(" AND ") : ""
        } GROUP BY masters.id
        HAVING masters.is_published = 1 ;`;
    const [result] = await connection.execute(sql, sqlData);

    return res.json({
      status: "success",
      content: result,
    });
  } catch (error) {
    console.log(error);

    return res.json({
      status: "error",
      msg: "Serverio klaida, nepavyko gauti meistrų duomenų",
    });
  }
}

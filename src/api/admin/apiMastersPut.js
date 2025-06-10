import { connection } from "../../db.js";
import { getAllCategories } from "../../db/admin/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiMastersPut(req, res) {
  const availableCategoryIds = (await getAllCategories()).map(
    (item) => item.id
  );

  const [err, msg] = IsValid.requiredFields(
    req.body,
    [
      { field: "name", validation: IsValid.nonEmptyString },
      { field: "lastName", validation: IsValid.nonEmptyString },
      {
        field: "status",
        validation: IsValid.includesInList,
        options: ["draft", "publish"],
      },
    ],
    [
      {
        field: "category",
        validation: IsValid.includesInList,
        options: availableCategoryIds,
      },
      { field: "experience", validation: IsValid.nonEmptyString },
      { field: "workshop", validation: IsValid.positiveInteger },

      { field: "image", validation: IsValid.nonEmptyString },
    ]
  );

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const id = +req.params.id;
  const [errId, msgId] = IsValid.id(id);

  if (errId) {
    return res.json({
      status: "error",
      msg: msgId,
    });
  }

  const { name, lastName, category, status, experience, workshop, image } =
    req.body;

  const statusIndex = status === "publish" ? 1 : 0;
  const imageFileName = image ? image.slice(5) : "";

  // Tikriname, ar egzistuoja irasas, kuri keltiname redaguoti
  try {
    const sql = "SELECT * FROM masters WHERE id = ?;";
    const [result] = await connection.execute(sql, [id]);

    if (result.length !== 1) {
      return res.json({
        status: "error",
        msg: "Tokio meistro nera.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistro duomenis atnaujinti veliau",
    });
  }

  // Norimo iraso redagavimas
  try {
    const sql = `
            UPDATE masters
            SET name = ?, lastName = ?, img = ?, category_id = ?, experience = ?, workshop_id = ?, is_published = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [
      name,
      lastName,
      imageFileName,
      category,
      experience,
      workshop,
      statusIndex,
      id,
    ]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite meistro duomenis atnaujinti vėliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistro duomenis vėliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Meistro duomenys atnaujinti",
  });
}

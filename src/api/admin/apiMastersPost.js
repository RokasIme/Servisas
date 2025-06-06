import { connection } from "../../db.js";
import { getAllCategories } from "../../db/admin/categories.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiMastersPost(req, res) {
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

  const { name, lastName, category, status, experience, workshop, image } =
    req.body;

  const statusIndex = status === "publish" ? 1 : 0;
  const imageFileName = image ? image.slice(5) : "";

  try {
    const sql = "SELECT * FROM masters WHERE name = ? OR lastName = ?;";
    const [result] = await connection.execute(sql, [name, lastName]);

    if (result.length > 0) {
      return res.json({
        status: "error",
        msg: "Toks meistras jau egzistuoja.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistrą sukurti vėliau",
    });
  }

  try {
    const sql = `
            INSERT INTO masters 
                (name, lastName, img, category_id, experience, workshop_id , is_published)
            VALUES (?, ?, ?, ?, ?, ?, ?);`;
    const [result] = await connection.execute(sql, [
      name,
      lastName,
      imageFileName,
      category,
      experience,
      workshop,
      statusIndex,
    ]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite meistrą sukurti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite meistrą sukurti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurtas naujas meistras",
  });
}

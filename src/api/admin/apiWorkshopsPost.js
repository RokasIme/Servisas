import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiWorkshopsPost(req, res) {
  const [err, msg] = IsValid.requiredFields(req.body, [
    { field: "name", validation: IsValid.nonEmptyString },
    { field: "city", validation: IsValid.nonEmptyString },
    { field: "adress", validation: IsValid.nonEmptyString },
  ]);

  if (err) {
    return res.json({
      status: "error",
      msg: msg,
    });
  }

  const { name, city, adress } = req.body;

  try {
    const sql = "SELECT * FROM workshops WHERE workshop = ?;";
    const [result] = await connection.query(sql, [name]);

    if (result.length > 0) {
      return res.json({
        status: "error",
        msg: "Dirbtuvės tokiu pavadinimu jau egzistuoja.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite kategorija sukurti veliau",
    });
  }

  try {
    const sql =
      "INSERT INTO workshops (workshop, city, adress) VALUES (?, ?, ?);";
    const [result] = await connection.query(sql, [name, city, adress]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite kategorija sukurti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite kategorija sukurti veliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Sukurta nauja serviso dirbtuvių eilutė",
  });
}

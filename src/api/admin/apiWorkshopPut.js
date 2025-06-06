import { connection } from "../../db.js";
import { IsValid } from "../../lib/IsValid.js";

export async function apiWorkshopPut(req, res) {
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

  const id = +req.params.id;
  const [errId, msgId] = IsValid.id(id);

  if (errId) {
    return res.json({
      status: "error",
      msg: msgId,
    });
  }

  const { name, city, adress } = req.body;

  // Tikriname, ar egzistuoja irasas, kuri keltiname redaguoti
  try {
    const sql = "SELECT * FROM workshops WHERE id = ?;";
    const [result] = await connection.execute(sql, [id]);

    if (result.length !== 1) {
      return res.json({
        status: "error",
        msg: "Tokio serviso nėra.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite servisą atnaujinti veliau",
    });
  }

  // Tikriname, ar egzistuoja kitas jau esantis irasas, kurio pavadinimas sutampa su norimu redaguoti naujuoju pavadinimu
  try {
    const sql = "SELECT * FROM workshops WHERE workshop = ? AND id != ?;";
    const [result] = await connection.execute(sql, [name, id]);

    if (result.length !== 0) {
      return res.json({
        status: "error",
        msg: "Jau egzistuoja servisas su tokiu pačiu pavadinimu.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite servisą atnaujinti veliau",
    });
  }

  // Norimo iraso redagavimas
  try {
    const sql = `
            UPDATE workshops SET workshop = ?, city = ?, adress = ?
            WHERE id = ?;`;
    const [result] = await connection.execute(sql, [name, city, adress, id]);

    if (result.affectedRows !== 1) {
      return res.json({
        status: "error",
        msg: "Serverio klaida, pabandykite servisą redaguoti veliau",
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error",
      msg: "Serverio klaida, pabandykite servisą redaguoti vėliau",
    });
  }

  return res.json({
    status: "success",
    msg: "Atnaujinti serviso duomenys",
  });
}

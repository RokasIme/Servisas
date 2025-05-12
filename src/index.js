import express from "express";
import { PageTemplate } from "./templates/PageTemplate.js";

const app = express();

app.use(express.static("public"));
app.use("/", (req, res) => {
  res.send(new PageTemplate().render());
});

app.listen(5430, () => {
  console.log(`Serveris: http://localhost:5430`);
});

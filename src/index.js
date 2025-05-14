import express from "express";
import { pageRouter } from "./router/pageRouter.js";
import { apiRouter } from "./router/apiRouter.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use("/", apiRouter);
app.use("/", pageRouter);

app.listen(5430, () => {
  console.log(`Serveris: http://localhost:5430`);
});

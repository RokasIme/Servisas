import express from "express";
import { pageRouter } from "./router/pageRouter.js";
import { apiRouter } from "./router/apiRouter.js";
import { PORT } from "./env.js";
import { getUserData } from "./middleware/getUserData.js";
import { cookieParser } from "./middleware/cookieParser.js";

const app = express();

// Middleware (tarpinės funkcijos)
app.use(cookieParser);
app.use(getUserData);

app.use(express.json());
app.use(express.static("public"));
app.use("/", apiRouter);
app.use("/", pageRouter);

app.listen(PORT, () => {
  console.log(`Serveris: http://localhost:${PORT}`);
});

// kai pakeiti foto kad išsitrintų senoji.

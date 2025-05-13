import express from "express";
import { PageHome } from "../pages/PageHome.js";
import { PageLogin } from "../pages/PageLogin.js";
import { PageRegister } from "../pages/PageRegister.js";

export const pageRouter = express.Router();

pageRouter.get("/", (req, res) => res.send(new PageHome().render()));
pageRouter.get("/login", (req, res) => res.send(new PageLogin().render()));
pageRouter.get("/register", (req, res) =>
  res.send(new PageRegister().render())
);

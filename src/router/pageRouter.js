import express from "express";
import { PageHome } from "../pages/PageHome.js";
import { PageLogin } from "../pages/PageLogin.js";
import { PageRegister } from "../pages/PageRegister.js";
import { Page404 } from "../pages/Page404.js";
import { PageMasters } from "../pages/PageMasters.js";
import { PageLogout } from "../pages/PageLogout.js";

export const pageRouter = express.Router();

pageRouter.get("/", (req, res) => res.send(new PageHome(req).render()));
pageRouter.get("/login", (req, res) => res.send(new PageLogin(req).render()));
pageRouter.get("/register", (req, res) =>
  res.send(new PageRegister(req).render())
);
pageRouter.get("/masters", (req, res) =>
  res.send(new PageMasters(req).render())
);
pageRouter.get("/masters/:category", (req, res) =>
  res.send(new PageMasters(req).render())
);
pageRouter.get("/logout", (req, res) => res.send(new PageLogout(req).render()));

pageRouter.get("*error", (req, res) => res.send(new Page404(req).render()));

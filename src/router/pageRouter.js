import express from "express";
import { PageHome } from "../pages/public/PageHome.js";
import { PageLogin } from "../pages/public/PageLogin.js";
import { PageRegister } from "../pages/public/PageRegister.js";
import { Page404 } from "../pages/public/Page404.js";
import { PageMasters } from "../pages/public/PageMasters.js";
import { PageLogout } from "../pages/public/PageLogout.js";
import { PageWorshops } from "../pages/public/PageWorkshops.js";

export const pageRouter = express.Router();

pageRouter.get("/", async (req, res) =>
  res.send(await new PageHome(req).render())
);
pageRouter.get("/login", async (req, res) =>
  res.send(await new PageLogin(req).render())
);
pageRouter.get("/register", async (req, res) =>
  res.send(await new PageRegister(req).render())
);
pageRouter.get("/masters", async (req, res) =>
  res.send(await new PageMasters(req).render())
);
pageRouter.get("/masters/:category", async (req, res) =>
  res.send(await new PageMasters(req).render())
);
pageRouter.get("/workshops", async (req, res) =>
  res.send(await new PageWorshops(req).render())
);
pageRouter.get("/logout", async (req, res) =>
  res.send(await new PageLogout(req).render())
);

pageRouter.get("*error", async (req, res) =>
  res.send(await new Page404(req).render())
);

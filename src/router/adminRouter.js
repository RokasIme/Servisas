import express from "express";
import { PageDashboard } from "../pages/admin/pageDashboard.js";
import { PageAdminMasters } from "../pages/admin/pageMastersAll.js";
import { PageAdminMastersPublished } from "../pages/admin/pageMastersPublished.js";
import { PageAdminMastersDraft } from "../pages/admin/pageMastersDraft.js";

export const adminRouter = express.Router();

adminRouter.get("/", async (req, res) =>
  res.send(await new PageDashboard(req).render())
);

adminRouter.get("/masters", async (req, res) =>
  res.send(await new PageAdminMasters(req).render())
);

adminRouter.get("/masters/published", async (req, res) =>
  res.send(await new PageAdminMastersPublished(req).render())
);
adminRouter.get("/masters/draft", async (req, res) =>
  res.send(await new PageAdminMastersDraft(req).render())
);

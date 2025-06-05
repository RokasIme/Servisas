import express from "express";
import { PageDashboard } from "../pages/admin/pageDashboard.js";
import { PageAdminMasters } from "../pages/admin/pageMastersAll.js";
import { PageAdminMastersPublished } from "../pages/admin/pageMastersPublished.js";
import { PageAdminMastersDraft } from "../pages/admin/pageMastersDraft.js";
import { PageAdminCategories } from "../pages/admin/PageCategoriesAll.js";
import { PageAdminCategoriesPublished } from "../pages/admin/PageCategoriesPublished.js";
import { PageAdminCategoriesDraft } from "../pages/admin/PageCategoriesDraft.js";
import { PageAdminWorkshops } from "../pages/admin/PageWorkshopsAll.js";
import { PageAdminCategoryNew } from "../pages/admin/PageCategoryNew.js";
import { PageAdminWorkshopNew } from "../pages/admin/PageWorkshopNew.js";
import { PageAdminMastersNew } from "../pages/admin/PageMastersNew.js";
import { PageAdminCategoryEdit } from "../pages/admin/PageCategoryEdit.js";

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
adminRouter.get("/masters/new", async (req, res) =>
  res.send(await new PageAdminMastersNew(req).render())
);

adminRouter.get("/categories", async (req, res) =>
  res.send(await new PageAdminCategories(req).render())
);
adminRouter.get("/categories/published", async (req, res) =>
  res.send(await new PageAdminCategoriesPublished(req).render())
);
adminRouter.get("/categories/draft", async (req, res) =>
  res.send(await new PageAdminCategoriesDraft(req).render())
);
adminRouter.get("/categories/new", async (req, res) =>
  res.send(await new PageAdminCategoryNew(req).render())
);
adminRouter.get("/categories/:urlSlug/edit", async (req, res) =>
  res.send(await new PageAdminCategoryEdit(req).render())
);

adminRouter.get("/workshops", async (req, res) =>
  res.send(await new PageAdminWorkshops(req).render())
);
adminRouter.get("/workshop/new", async (req, res) =>
  res.send(await new PageAdminWorkshopNew(req).render())
);

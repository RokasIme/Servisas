import express from "express";
import { PageDashboard } from "../pages/admin/pageDashboard.js";

export const adminRouter = express.Router();

adminRouter.get("/", async (req, res) =>
  res.send(await new PageDashboard(req).render())
);

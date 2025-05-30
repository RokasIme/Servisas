import express from "express";
import { apiRegister } from "../api/apiRegister.js";
import { apiLogin } from "../api/apiLogin.js";
import { apiLogout } from "../api/apiLogout.js";
import { isAdminAPI } from "../middleware/isAdminApi.js";
import { apiCategoriesPost } from "../api/admin/apiCategoriesPost.js";

export const apiRouter = express.Router();

apiRouter.post("/api/register", apiRegister);
apiRouter.post("/api/login", apiLogin);
apiRouter.post("/api/", apiLogin);
apiRouter.get("/api/logout", apiLogout);

apiRouter.post("/api/admin/categories", isAdminAPI, apiCategoriesPost);

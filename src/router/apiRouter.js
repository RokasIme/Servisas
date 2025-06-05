import express from "express";
import { apiRegister } from "../api/public/apiRegister.js";
import { apiLogin } from "../api/public/apiLogin.js";
import { apiLogout } from "../api/public/apiLogout.js";
import { isAdminAPI } from "../middleware/isAdminApi.js";
import { apiCategoriesPost } from "../api/admin/apiCategoriesPost.js";
import { apiWorkshopsPost } from "../api/admin/apiWorkshopsPost.js";
import { apiLikesPost } from "../api/apiLikes.js";
import { apiCategoriesDelete } from "../api/admin/apiCategoriesDelete.js";
import { apiWorkshopDelete } from "../api/admin/apiWorkshopDelete.js";
import { apiMasterDelete } from "../api/admin/apiMasterDelete.js";
import { apiUnLikePost } from "../api/apiUnLike.js";
import { apiCategoriesPut } from "../api/admin/apiCategoriesPut.js";

export const apiRouter = express.Router();

apiRouter.post("/api/register", apiRegister);
apiRouter.post("/api/login", apiLogin);
apiRouter.post("/api/", apiLogin);
apiRouter.get("/api/logout", apiLogout);

apiRouter.post("/api/admin/categories", isAdminAPI, apiCategoriesPost);
apiRouter.put("/api/admin/categories/:id", isAdminAPI, apiCategoriesPut);
apiRouter.delete("/api/admin/categories/:id", isAdminAPI, apiCategoriesDelete);

apiRouter.delete("/api/admin/master/:id", isAdminAPI, apiMasterDelete);

apiRouter.post("/api/admin/workshops", isAdminAPI, apiWorkshopsPost);
apiRouter.delete("/api/admin/workshop/:id", isAdminAPI, apiWorkshopDelete);

apiRouter.post("/api/like/:id", isAdminAPI, apiLikesPost);
apiRouter.post("/api/unlike/:id", isAdminAPI, apiUnLikePost);

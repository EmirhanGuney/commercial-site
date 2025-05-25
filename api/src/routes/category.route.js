import express from "express";
import * as categoryController from "../controllers/category.controller.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import ROLES from "../config/constants/role.config.js";

const router = express.Router();

//get
router.get(
  "/get-categories",
  categoryController.getCategoriesHandler
);

//post 
router.post(
  "/add-category",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  categoryController.addCategoryHandler
);


router.post(
  "/add-sub-category",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  categoryController.addSubCategoryHandler
);

//put
router.put(
  "/update-category",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  categoryController.updateCategoryHandler
)

router.put(
  "/update-subCategory",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  categoryController.updateSubCategoryHandler
)


export default router;
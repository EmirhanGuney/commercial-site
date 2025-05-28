import express from "express";
import * as productController from "../controllers/product.controller.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import { fileUploadMiddleware } from "../middlewares/fileUpload.middleware.js";
import ROLES from "../config/constants/role.config.js";
import { excelUploadMiddleware } from "../middlewares/excelUpload.middleware.js";

const router = express.Router();

//Get
router.get("/get-products", productController.getAllProductHandler);
router.get("/get-product-by-id", productController.getOneProductByIdHandler);
router.get(
  "/get-favorite-products",
  authorizeMiddleware(ROLES.CUSTOMER, ROLES.COMPANY),
  productController.getFavoriteProductsHandler
);
router.get(
  "/get-products-for-admin",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  productController.getAllProductForAdminHandler
);

router.get("/get-product-for-admin/:productId",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  productController.getOneProductForAdminHandler
);

//Post
router.post(
  "/add-product",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  productController.createProductHandler
);

router.post(
  "/add-product-photo",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  fileUploadMiddleware,
  productController.addProductPhotoHandler
);

//PUT
router.put(
  "/update-product",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  productController.updateProductHandler
);


//Delete
router.delete(
  "/delete-product-photo",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  productController.deleteProductPhotoHandler
);


router.post(
  "/bulk-upload-from-excel",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  excelUploadMiddleware,
  productController.bulkUploadFromExcelHandler
);


export default router;

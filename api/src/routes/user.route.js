import express from "express";
import * as userController from "../controllers/user.controller.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import ROLES from "../config/constants/role.config.js";

const router = express.Router();
//get
router.get("/ping", (req, res) => {
  res.json({ msg: "Pong" });
});

router.get(
  "/get-my-information",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.getUserInformationHandler
);

router.get(
  "/get-all-users",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  userController.getAllUsersHandler
);

router.get(
  "/get-user-addresses",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.getUserAddressesHandler
);

//post
router.post(
  "/add-address",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.addUserAddressHandler
);
router.post(
  "/add-favorite-product",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.addUserFavoriteProductHandler
);

//put
router.put(
  "/update-address",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.updateUserAddressHandler
);
router.put(
  "/verify-company",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  userController.verifyCompanyHandler
);

//delete
router.delete(
  "/delete-address",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.deleteUserAddressHandler
);

router.delete(
  "/delete-favorite-product",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.deleteUserFavoriteProductHandler
);

router.delete(
  "/delete-favorite-product",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  userController.deleteUserFavoriteProductHandler
);

export default router;

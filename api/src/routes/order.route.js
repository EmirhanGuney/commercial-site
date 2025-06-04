import express from "express";
import * as orderController from "../controllers/order.controller.js";
import { authorizeMiddleware } from "../middlewares/authorize.middleware.js";
import ROLES from "../config/constants/role.config.js";

const router = express.Router();

//get
router.get(
  "/get-orders",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  orderController.getAllOrdersHandler
);

router.get(
  "/get-order/:orderId",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  orderController.getOrderByIdHandler
);

router.get(
  "/get-user-orders",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  orderController.getUserOrdersHandler
);

router.get(
  "/get-user-order/:orderId",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  orderController.getUserOrderByIdHandler
);

//post
router.post(
  "/add-order",
  authorizeMiddleware(ROLES.COMPANY, ROLES.CUSTOMER),
  orderController.addOrderHandler
);

//put
router.put(
  "/update-order-status",
  authorizeMiddleware(ROLES.SUPER_ADMIN),
  orderController.updateOrderStatusHandler
);

export default router;
import express from 'express';
import * as lookUpController from "../controllers/lookUp.controller.js";

const router = express.Router();

router.get('/order-status', lookUpController.getOrderStatusHandler);

export default router;
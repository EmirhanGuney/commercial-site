import express from 'express';
import userRoutes from "./user.route.js";
import productRoutes from "./product.route.js";
import authRoutes from "./auth.route.js";
import lookUpRoutes from "./lookUp.route.js";
import fileRoutes from "./file.route.js";
import orderRoutes from "./order.route.js";
import categoryRoutes from "./category.route.js";

const router = express.Router();

router.use('/users',userRoutes);
router.use('/products',productRoutes);
router.use('/auth',authRoutes);
router.use('/lookUp',lookUpRoutes);
router.use('/file',fileRoutes);
router.use('/orders',orderRoutes);
router.use('/categories',categoryRoutes);

export default router;
import express from 'express';
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/register-company', authController.registerCompanyHandler);
router.post('/register-customer', authController.registerCustomerHandler);
router.post('/login', authController.loginHandler);
router.post('/admin-login', authController.adminLoginHandler);
router.post('/refresh', authController.refreshHandler);
router.post('/forgot-password', authController.forgotPasswordHandler);
router.post('/reset-password', authController.resetPasswordHandler);

router.get('/ping', (req,res)=> {
    res.json({message: 'pong'});
})

export default router;
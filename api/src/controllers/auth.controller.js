import e from "express";
import CONFIGS from "../config/config.js";
import { login, registerCustomer, registerCompany, adminLogin, refresh, resetPassword, forgotPassword } from "../services/auth.service.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";

export const adminLoginHandler = withErrorHandling(async (req, res) => {
  const { username, password } = req.body;
  if(!username || !password){
    return Response.badRequest("Kullanıcı adı veya şifre hatalı.").send(res);
  }
  const result = await adminLogin(username, password);
  return Response.success(result, "Giriş başarılı").send(res);
})

export const loginHandler = withErrorHandling(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Response.badRequest("Lütfen tüm alanları doldurunuz.").send(res);
  }
  const result = await login(email, password);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: CONFIGS.NODE_ENV === "production",
    sameSite: "Lax",
    path: "/api/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return Response.success(
    { accessToken: result.accessToken },
    "Giriş başarılı"
  ).send(res);
});

export const registerCompanyHandler = withErrorHandling(async (req, res) => {
  const { email, password, companyName, companyType, taxNumber, phoneNumber } =
    req.body;
  if (
    !email ||
    !password ||
    !companyName ||
    !companyType ||
    !taxNumber ||
    !phoneNumber
  ) {
    return Response.badRequest("Lütfen tüm alanları doldurunuz.").send(res);
  }
  await registerCompany(
    email,
    password,
    companyName,
    companyType,
    taxNumber,
    phoneNumber
  );
  return Response.noContent().send(res);
});

export const registerCustomerHandler = withErrorHandling(async (req,res) => {
  const { email, password, phoneNumber, fullName } = req.body;
  if(!email || !password || !phoneNumber || !fullName){
      return Response.badRequest("Lütfen tüm alanları doldurunuz.").send(res);
  }
  await registerCustomer(email, password, phoneNumber, fullName);
  return Response.noContent().send(res);
})

export const refreshHandler = withErrorHandling(async (req, res) => {
  const { email } = req.body;
  const refreshToken = req.cookies.refreshToken;
  if(!email || !refreshToken){
    return Response.unauthorized("Yetkisiz erişim").send(res);
  }
  const result = await refresh(email, refreshToken);
  return Response.success(
    { accessToken: result.accessToken },
    "Token yenilendi"
  ).send(res);
})

export const forgotPasswordHandler = withErrorHandling(async (req, res) => {
  const { email } = req.body;
  if(!email){
    return Response.badRequest("Email alanı boş bırakılamaz").send(res);
  }
  await forgotPassword(email);
  return Response.noContent().send(res);
})

export const resetPasswordHandler = withErrorHandling(async (req, res) => {
  const { email, password, loginKey } = req.body;
  if(!email ||!password || !loginKey){
    return Response.badRequest("Lütfen tüm alanları doldurunuz.").send(res);
  }
  await resetPassword(email, password, loginKey);
  return Response.noContent().send(res);
})


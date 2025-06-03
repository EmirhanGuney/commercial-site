import CONFIGS from "../config/config.js";
import ROLES from "../config/constants/role.config.js";
import { sendLoginKeyUrlToEmail } from "../helpers/email.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../helpers/token.helper.js";
import {
  createUserInDB,
  getUserFromDB,
  updateUser,
} from "../repositories/user.repository.js";
import ApiError from "../utils/apiError.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const adminLogin = withErrorHandling(async (username, password) => {
  if (
    username !== "superadmin" ||
    password !== "123456"
  ) {
    throw ApiError.badRequest("Kullanıcı adı veya şifre hatalı.");
  }
  const payload = { username, role: ROLES.SUPER_ADMIN };
  const accessToken = generateAccessToken(payload, "1h");
  return { accessToken };
});

export const login = withErrorHandling(async (email, password) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.badRequest(`Kullanıcı adı veya şifre hatalı.`);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw ApiError.badRequest(`Kullanıcı adı veya şifre hatalı.`);
  }

  if (user.role === ROLES.COMPANY && !user.isVerified) {
    throw ApiError.unauthorized(`Hesabınızın Doğrulanması gerekmektedir.`);
  }

  const payload = { email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();
  const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
  const refreshTokenExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await updateUser(user._id, {
    refreshToken: hashedRefreshToken,
    refreshTokenExpiry,
  });
  return { accessToken, refreshToken };
});

export const registerCompany = withErrorHandling(
  async (email, password, companyName, companyType, taxNumber, phoneNumber) => {
    const user = await getUserFromDB(email);
    if (user) {
      throw ApiError.badRequest(
        `Bu e-posta adresi ile kayıtlı bir kullanıcı zaten var.`
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      _id: uuidv4(),
      email,
      password: hashedPassword,
      role: "company",
      companyDetails: {
        taxNumber,
        companyName,
        companyType,
        phoneNumber,
      },
      addresses: [],
      favoriteProducts: [],
      isVerified: false,
    };
    await createUserInDB(newUser);
  }
);

export const registerCustomer = withErrorHandling(
  async (email, password, phoneNumber, fullName) => {
    const user = await getUserFromDB(email);
    if (user) {
      throw ApiError.badRequest(
        `Bu email adresi ile kayıtlı bir kullanıcı zaten var.`
      );
    }
    const newUser = {
      _id: uuidv4(),
      email,
      password: await bcrypt.hash(password, 10),
      role: "customer",
      customerDetails: {
        phoneNumber,
        fullName,
      },
      addresses: [],
      favoriteProducts: [],
    };
    await createUserInDB(newUser);
  }
);

export const refresh = withErrorHandling(async (email, refreshToken) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound(`Kullanıcı bulunamadı.`);
  }

  const isRefreshTokenValid =
    (await bcrypt.compare(refreshToken, user.refreshToken)) &&
    new Date(user.refreshTokenExpiry).getTime() > Date.now();

  if (!isRefreshTokenValid) {
    throw ApiError.unauthorized(`Geçersiz yenileme tokenı.`);
  }

  const payload = { email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  return { accessToken };
});

export const forgotPassword = withErrorHandling(async (email) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound(`Kullanıcı bulunamadı.`);
  }
  const loginKey = uuidv4();
  const hashedLoginKey = await bcrypt.hash(loginKey, 10);

  await Promise.all([
    updateUser(user._id, { loginKey: hashedLoginKey }),
    sendLoginKeyUrlToEmail(email, loginKey),
  ]);
})

export const resetPassword = withErrorHandling(async (email, password, loginKey) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound(`Kullanıcı bulunamadı.`);
  }

  const isLoginKeyValid = await bcrypt.compare(loginKey, user.loginKey);
  if (!isLoginKeyValid) {
    throw ApiError.unauthorized(`Geçersiz giriş anahtarı.`);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await updateUser(user._id, { password: hashedPassword });
});

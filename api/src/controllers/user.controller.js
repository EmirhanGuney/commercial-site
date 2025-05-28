import {
  addUserAddress,
  addUserFavoriteProduct,
  deleteUserAddress,
  deleteUserFavoriteProduct,
  getUserAddresses,
  updateUserAddress,
  getUserInformation,
  getAllUsers,
  verifyCompany,
} from "../services/user.service.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";

export const getUserAddressesHandler = withErrorHandling(async (req, res) => {
  const { email } = req.user;
  const result = await getUserAddresses(email);
  return Response.success(result).send(res);
});

export const addUserAddressHandler = withErrorHandling(async (req, res) => {
  const { email } = req.user;
  const {
    title,
    fullName,
    phoneNumber,
    country,
    city,
    district,
    addressDetail,
    postalCode,
    identityNumber,
    billType,
  } = req.body;
  if (
    !title ||
    !fullName ||
    !phoneNumber ||
    !country ||
    !city ||
    !district ||
    !addressDetail ||
    !postalCode ||
    !identityNumber ||
    !billType
  ) {
    return Response.badRequest("Missing or invalid fields").send(res);
  }
  await addUserAddress(
    email,
    title,
    fullName,
    phoneNumber,
    country,
    city,
    district,
    addressDetail,
    postalCode,
    identityNumber,
    billType
  );
  return Response.noContent().send(res);
});

export const updateUserAddressHandler = withErrorHandling(async (req, res) => {
  const { email } = req.user;
  const {
    addressId,
    title,
    fullName,
    phoneNumber,
    country,
    city,
    district,
    addressDetail,
    postalCode,
    identityNumber,
    billType,
  } = req.body;
  if (!addressId) {
    return Response.badRequest("addressId girilmesi zorunludur.").send(res);
  }
  await updateUserAddress(
    email,
    addressId,
    title,
    fullName,
    phoneNumber,
    country,
    city,
    district,
    addressDetail,
    postalCode,
    identityNumber,
    billType
  );
  return Response.noContent().send(res);
});

export const deleteUserAddressHandler = withErrorHandling(async (req, res) => {
  const { email } = req.user;
  const { addressId } = req.body;
  if (!addressId) {
    return Response.badRequest("addressId girilmesi zorunludur.").send(res);
  }
  await deleteUserAddress(email, addressId);
  return Response.noContent().send(res);
});

export const addUserFavoriteProductHandler = withErrorHandling(
  async (req, res) => {
    const { email } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return Response.badRequest("productId girilmesi zorunludur.").send(res);
    }
    await addUserFavoriteProduct(email, productId);
    return Response.noContent().send(res);
  }
);

export const deleteUserFavoriteProductHandler = withErrorHandling(
  async (req, res) => {
    const { email } = req.user;
    const { productId } = req.body;
    if (!productId) {
      return Response.badRequest("productId girilmesi zorunludur.").send(res);
    }
    await deleteUserFavoriteProduct(email, productId);
    return Response.noContent().send(res);
  }
);

export const getUserInformationHandler = withErrorHandling(async (req, res) => {
  const { email } = req.user;
  const user = await getUserInformation(email);
  return Response.success(user).send(res);
});

export const getAllUsersHandler = withErrorHandling(async (req, res) => {
  const { role, isVerified, page, limit } = req.query;
  const result = await getAllUsers(role, isVerified, parseInt(page), parseInt(limit));
  return Response.success(result).send(res);
});

export const verifyCompanyHandler = withErrorHandling(async (req, res) => {
  const { email } = req.body;
  const user = await verifyCompany(email);
  return Response.success(user).send(res);
});

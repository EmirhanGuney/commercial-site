import {
  getUserFromDB,
  updateUser,
  getAllUsersFromDB,
} from "../repositories/user.repository.js";
import ApiError from "../utils/apiError.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { v4 as uuidv4 } from "uuid";

export const addUserAddress = withErrorHandling(
  async (
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
  ) => {
    const user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.notFound("Kullanıcı bulumadı.");
    }
    const address = {
      id: uuidv4(),
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
    };
    if (!user.addresses) {
      user.addresses = [];
    }
    user.addresses.push(address);
    await updateUser(user._id, {
      addresses: user.addresses,
    });
  }
);

export const updateUserAddress = withErrorHandling(
  async (
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
  ) => {
    const user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.notFound("Kullanıcı bulunamadı.");
    }

    const addressIndex = user.addresses.findIndex(
      (addr) => addr.id === addressId
    );
    if (addressIndex === -1) {
      throw ApiError.notFound("Adres bulunamadı.");
    }

    const updatedFields = {
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
    };

    Object.entries(updatedFields).forEach(([key, value]) => {
      if (value !== undefined) {
        user.addresses[addressIndex][key] = value;
      }
    });

    await updateUser(user._id, {
      addresses: user.addresses,
    });
  }
);

export const deleteUserAddress = withErrorHandling(async (email, addressId) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound("Kullanıcı bulunamadı.");
  }

  const addressExists = user.addresses.some((addr) => addr.id === addressId);
  if (!addressExists) {
    throw ApiError.notFound("Silinecek adres bulunamadı.");
  }

  const updatedAddresses = user.addresses.filter(
    (addr) => addr.id !== addressId
  );

  await updateUser(user._id, {
    addresses: updatedAddresses,
  });
});

export const getUserAddresses = withErrorHandling(async (email) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound("Kullanıcı bulunamadı.");
  }

  return user.addresses || [];
});

export const addUserFavoriteProduct = withErrorHandling(
  async (email, productId) => {
    const user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.notFound("Kullanıcı bulunamadı.");
    }

    if (!user.favoriteProducts) {
      user.favoriteProducts = [];
    }

    const alreadyFavorited = user.favoriteProducts?.includes(productId);
    if (alreadyFavorited) {
      throw ApiError.badRequest("Ürün zaten favorilere eklenmiş.");
    }
    user.favoriteProducts = [...(user.favoriteProducts || []), productId];

    await updateUser(user._id, {
      favoriteProducts: user.favoriteProducts,
    });
  }
);

export const deleteUserFavoriteProduct = withErrorHandling(
  async (email, productId) => {
    const user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.notFound("Kullanıcı bulunamadı.");
    }

    if (!user.favoriteProducts || user.favoriteProducts.length === 0) {
      throw ApiError.badRequest("Favori listesi zaten boş.");
    }

    const updatedFavorites = user.favoriteProducts.filter(
      (id) => id !== productId
    );

    if (updatedFavorites.length === user.favoriteProducts.length) {
      throw ApiError.badRequest("Bu ürün favori listenizde yoktu.");
    }

    await updateUser(user._id, {
      favoriteProducts: updatedFavorites,
    });
  }
);

export const getUserInformation = withErrorHandling(async (email) => {
  const user = await getUserFromDB(email);
  if (!user) {
    throw ApiError.notFound("Kullanıcı bulunamadı.");
  }
  if (user.role === "company") {
    return {
      email: user.email,
      role: user.role,
      companyDetails: user.companyDetails,
    };
  } else {
    return {
      email: user.email,
      role: user.role,
      customerDetails: user.customerDetails,
    };
  }
});

export const getAllUsers = withErrorHandling(async (role, isVerified, page, limit) => {
  const filter = {};
  if (role) {
    filter.role = role;
  }
  if (isVerified) {
    filter.isVerified = isVerified;
  }
  const result = await getAllUsersFromDB({
    filter,
    projection: {
      _id: 1,
      email: 1,
      role: 1,
      isVerified: 1,
      companyDetails: 1,
      customerDetails: 1,
      addresses: 1,
    },
    page,
    limit
  });
  return result;
});

export const verifyCompany = withErrorHandling(async (email) => {
  const user = await getUserFromDB(email, {
    _id: 1,
    email: 1,
    role: 1,
    isVerified: 1,
  });
  if (!user) {
    throw ApiError.notFound("Kullanıcı bulunamadı.");
  }
  if (user.role !== "company") {
    throw ApiError.badRequest("Bu işlem sadece şirketler için geçerlidir.");
  }
  if (user.isVerified) {
    throw ApiError.badRequest("Bu şirket zaten doğrulanmış.");
  }

  await updateUser(user._id, {
    isVerified: true,
  });
});

import ROLES from "../config/constants/role.config.js";
import { deleteFile } from "../helpers/file.helper.js";
import { generateSecureUrlToken } from "../helpers/token.helper.js";
import { getCategoryByIdFromDB } from "../repositories/category.repository.js";
import {
  createProductInDB,
  getProductById,
  getProductsFromDB,
  updateProduct,
} from "../repositories/product.repository.js";

import { getUserFromDB } from "../repositories/user.repository.js";
import ApiError from "../utils/apiError.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { v4 as uuidv4 } from "uuid";

export const getProductsForAdmin = withErrorHandling(
  async (page, limit, categoryId, subCategoryId, searchTerm, inStock, sort) => {

    const filter = {};
    if (categoryId) {
      filter["category.id"] = categoryId;
      if (subCategoryId) {
        filter["category.subCategory.id"] = subCategoryId;
      }
    }

    if (searchTerm) {
      const isNumeric = !isNaN(searchTerm);

      if (isNumeric) {
        const num = parseFloat(searchTerm);
        filter.$or = [
          { "prices.customer": num },
          { "prices.company": num }
        ];
      } else {
        const searchRegex = { $regex: searchTerm, $options: "i" };
        filter.$or = [
          { title: searchRegex },
          { description: searchRegex },
          { code: searchRegex },
          { "prices.customer": searchRegex },
          { "prices.company": searchRegex }
        ];
      }
    }

    if (inStock) {
      filter.inStock = inStock === "true";
    }

    const result = await getProductsFromDB(
      filter,
      {
        _id: 1,
        title: 1,
        prices: 1,
        productPhotos: 1,
        inStock: 1,
        orderQuantity: 1
      },
      page,
      limit,
      sort
    );

    const products = result.data.map((product) => {
      const productPhotos = product.productPhotos?.map((photo) => ({
        id: photo.id,
        url: generateSecureUrlToken(photo.url),
      }));
      return {
        id: product._id,
        title: product.title,
        prices: product.prices,
        productPhotos,
        orderQuantity: product.orderQuantity,
        inStock: product.inStock
      };
    });
    return { products, pagination: result.pagination };
  }
);

export const getProductForAdmin = withErrorHandling(async (productId) => {
  const product = await getProductById(productId, {
    _id: 1,
    title: 1,
    prices: 1,
    productPhotos: 1,
    inStock: 1,
    orderQuantity: 1,
    description: 1,
    category: 1,
    code: 1
  })
  const productPhotos = product.productPhotos?.map((photo) => ({
    id: photo.id,
    url: generateSecureUrlToken(photo.url),
  }));

  return {
    id: product._id,
    title: product.title,
    prices: product.prices,
    photos: productPhotos,
    inStock: product.inStock,
    orderQuantity: product.orderQuantity,
    description: product.description,
    category: product.category,
    code: product.code
  }
})

export const getProducts = withErrorHandling(
  async (email, page, limit, categoryId, subCategoryId, searchTerm, inStock) => {
    let user = null;
    if (email) {
      user = await getUserFromDB(email);
      if (!user) {
        throw ApiError.unauthorized("Kullanıcı bulunamadı.");
      }
    }

    const filter = {};
    if (categoryId) {
      filter["category.id"] = categoryId;
      if (subCategoryId) {
        filter["category.subCategory.id"] = subCategoryId;
      }
    }

    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: "i" };
    }

    if (inStock) {
      filter.inStock = inStock === "true";
    }

    const result = await getProductsFromDB(
      filter,
      {
        _id: 1,
        title: 1,
        prices: 1,
        productPhotos: 1,
        inStock: 1
      },
      page,
      limit
    );

    const products = result.data.map((product) => {
      const productPhotos = product.productPhotos?.map((photo) => ({
        id: photo.id,
        url: generateSecureUrlToken(photo.url),
      }));
      const isFavorite =
        user?.favoriteProducts?.includes(product._id.toString()) || false;
      return {
        id: product._id,
        title: product.title,
        prices:
          user?.role === ROLES.COMPANY
            ? product.prices.company
            : product.prices.customer,
        productPhotos,
        isFavorite,
        inStock: product.inStock
      };
    });
    return { products, pagination: result.pagination };
  }
);

export const getFavoriteProducts = withErrorHandling(
  async (email, page, limit) => {
    const user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.unauthorized("Kullanıcı bulunamadı");
    }
    const filter = {
      _id: {
        $in: user.favoriteProducts || [],
      },
    };

    const result = await getProductsFromDB(
      filter,
      {
        _id: 1,
        title: 1,
        prices: 1,
        productPhotos: 1,
      },
      page,
      limit
    );

    const products = result.data.map((product) => {
      const productPhotos = product.productPhotos
        ? product.productPhotos.map((photo) => ({
          id: photo.id,
          url: generateSecureUrlToken(photo.url),
        }))
        : [];

      const isFavorite = user.favoriteProducts.includes(product._id.toString());

      return {
        id: product._id,
        title: product.title,
        prices: product.prices
          ? user?.role === ROLES.COMPANY
            ? product.prices.company
            : product.prices.customer
          : null,
        productPhotos,
        isFavorite,
      };
    });

    return { products, pagination: result.pagination };
  }
);

export const getOneProductById = withErrorHandling(async (email, productId) => {
  let user = null;
  if (email) {
    user = await getUserFromDB(email);
    if (!user) {
      throw ApiError.unauthorized("Kullanıcı bulunamadı.");
    }
  }

  const product = await getProductById(productId, {
    _id: 1,
    title: 1,
    prices: 1,
    description: 1,
    category: 1,
    productPhotos: 1,
    inStock: 1,
    code: 1
  });

  if (!product) {
    throw ApiError.notFound("Ürün bulunamadı.");
  }

  const productPhotos = product.productPhotos?.map((photo) => ({
    id: photo.id,
    url: generateSecureUrlToken(photo.url),
  }));

  const isFavorite =
    user?.favoriteProducts?.includes(productId.toString()) || false;

  return {
    id: product._id,
    title: product.title,
    prices:
      user?.role === ROLES.COMPANY
        ? product.prices.company
        : product.prices.customer,
    description: product.description,
    category: product.category,
    productPhotos,
    isFavorite,
    inStock: product.inStock,
    code: product.code
  };
});

export const createProduct = withErrorHandling(
  async (title, prices, description, categoryId, subCategoryId, code) => {
    const category = await getCategoryByIdFromDB(categoryId);
    if (!category) {
      throw ApiError.notFound("Kategori bulunamadı.");
    }
    const subCategory = category.subCategories.find(
      (subCat) => subCat.id === subCategoryId
    );
    const product = {
      _id: uuidv4(),
      title,
      prices,
      description,
      category: {
        id: category._id,
        name: category.name,
        subCategory,
      },
      orderQuantity: 0,
      createdDate: new Date(),
      productPhotos: [],
      inStock: true,
      code
    };
    await createProductInDB(product);
  }
);

export const addProductPhoto = withErrorHandling(
  async (productId, fileUrl) => {
    const product = await getProductById(productId);
    if (!product) {
      throw ApiError.notFound("Ürün bulunamadı.");
    }
    const productPhoto = {
      id: uuidv4(),
      url: fileUrl,
    };

    if (!product.productPhotos) {
      product.productPhotos = [];
    }
    product.productPhotos.push(productPhoto);

    await updateProduct(productId, {
      productPhotos: product.productPhotos,
    });
  }
);

export const deleteProductPhoto = withErrorHandling(
  async (productId, photoId) => {
    const product = await getProductById(productId);
    if (!product) {
      throw ApiError.notFound("Ürün bulunamadı.");
    }
    const productPhotos = product.productPhotos.filter(
      (photo) => photo.id !== photoId
    );
    deleteFile(product.productPhotos.find((photo) => photo.id === photoId).url);
    await updateProduct(productId, {
      productPhotos,
    });
  }
);

export const updateOneProduct = withErrorHandling(
  async (productId, title, prices, description, categoryId, subCategoryId, inStock, code) => {
    const product = await getProductById(productId);
    if (!product) {
      throw ApiError.notFound("Ürün bulunamadı.");
    }
    const category = await getCategoryByIdFromDB(categoryId);
    if (!category) {
      throw ApiError.notFound("Kategori bulunamadı.");
    }
    const subCategory = category.subCategories.find(
      (subCat) => subCat.id === subCategoryId
    );
    const rawData = {
      title,
      prices,
      description,
      category: {
        id: categoryId,
        name: category?.name,
        subCategory: {
          id: subCategoryId,
          name: subCategory?.name,
        },
      },
      inStock,
      code
    };
    const updateData = {};

    Object.entries(rawData).forEach(([key, value]) => {
      if (value !== undefined) {
        updateData[key] = value;
      }
    });

    await updateProduct(productId, updateData);
  }
);

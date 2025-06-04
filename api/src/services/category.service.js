import {
  createCategoryToDB,
  getCategoriesFromDB,
  getCategoryByFilterFromDB,
  getCategoryByIdFromDB,
  updateCategoryInDB,
} from "../repositories/category.repository.js";
import {
  getAllProductsFromDB,
  updateProduct,
} from "../repositories/product.repository.js";

import ApiError from "../utils/apiError.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { v4 as uuidv4 } from "uuid";

export const getCategories = withErrorHandling(async () => {
  const result = await getCategoriesFromDB({
    sort: { createdAt: 1 },
  });
  const categories = result.data.map((category) => ({
    id: category._id,
    name: category.name,
    subCategories: category.subCategories.map((subCategory) => ({
      id: subCategory.id,
      name: subCategory.name,
    })),
  }));

  return { categories, pagination: result.pagination };
});

export const addCategory = withErrorHandling(async (name) => {
  const category = await getCategoryByFilterFromDB({ name });
  if (category) {
    throw ApiError.badRequest("Bu kategori zaten mevcut.");
  }

  const newCategory = {
    _id: uuidv4(),
    name,
    subCategories: [],
    createdAt: new Date().toISOString(),
  };

  return await createCategoryToDB(newCategory);
});

export const addSubCategory = withErrorHandling(async (categoryId, name) => {
  const category = await getCategoryByIdFromDB(categoryId);
  if (!category) {
    throw ApiError.notFound("Kategori bulunamadı.");
  }

  const subCategory = category.subCategories.find(
    (subCat) => subCat.name === name
  );
  if (subCategory) {
    throw ApiError.badRequest("Bu alt kategori zaten mevcut.");
  }

  const newSubCategory = {
    id: uuidv4(),
    name,
    createdAt: new Date().toISOString(),
  };

  category.subCategories.push(newSubCategory);
  await updateCategoryInDB(category._id, category);
});

export const updateCategory = withErrorHandling(
  async (categoryId, categoryName) => {
    const category = await getCategoryByIdFromDB(categoryId);
    if (!category) {
      throw new ApiError.notFound(`${categoryId} id'li kategori bulunamadi`);
    }

    const products = await getAllProductsFromDB({
      filter: {
        "category.id": categoryId,
      },
      projection: {
        _id: 1,
        category: 1,
      },
    });

    await Promise.all([
      ...products.map((product) =>
        updateProduct(product._id, { "category.name": categoryName })
      ),

      updateCategoryInDB(categoryId, {
        name: categoryName,
      }),
    ]);
  }
);

export const updateSubCategory = withErrorHandling(
  async (categoryId, subCategoryId, subCategoryName) => {
    const category = await getCategoryByIdFromDB(categoryId);
    if (!category) {
      throw new ApiError.notFound(`${categoryId} id'li kategori bulunamadı`);
    }

    if (!Array.isArray(category.subCategories)) {
      throw new ApiError.badRequest(`Kategori alt kategorileri içermiyor`);
    }

    const index = category.subCategories?.findIndex(
      (sub) => sub.id === subCategoryId
    );

    if (index === -1 || index === undefined) {
      throw new ApiError.notFound(
        `${subCategoryId} id'li alt kategori, ${categoryId} id'li kategoride bulunamadı`
      );
    }

    category.subCategories[index].name = subCategoryName;

    const products = await getAllProductsFromDB({
      filter: {
        "category.subCategory.id": subCategoryId,
      },
      projection: {
        _id: 1,
        category: 1,
      },
    });

    await Promise.all([
      ...products.map((product) =>
        updateProduct(product._id, {
          "category.subCategory.name": subCategoryName,
        })
      ),

      updateCategoryInDB(categoryId, {
        subCategories: category.subCategories,
      }),
    ]);
  }
);

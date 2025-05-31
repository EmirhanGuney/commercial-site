import { getDb } from "../config/database.config.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { BaseRepository } from "./base.repository.js";

const COLLECTION_NAME = "products";
const base = BaseRepository(COLLECTION_NAME);

export const getAllProductsFromDB = withErrorHandling(base.findAll);

export const getProductsFromDB = withErrorHandling(
  async (
    filter = {},
    projection = null,
    page = 1,
    limit = 10,
    sort = { createdDate: 1 }
  ) => {
    return await base.findMany({
      filter,
      projection,
      page,
      limit,
      sort,
    });
  }
);

export const getProductById = withErrorHandling(base.findById);

export const createProductInDB = withErrorHandling(async (product) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne(product);
  return result;
});

export const updateProduct = withErrorHandling(
  async (productId, updateData) => {
    const db = await getDb();
    return await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: productId }, { $set: updateData });
  }
);

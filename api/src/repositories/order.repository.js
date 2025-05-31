import { getDb } from "../config/database.config.js"
import { withErrorHandling } from "../utils/errorHandler.js";
import { BaseRepository } from "./base.repository.js";

const COLLECTION_NAME = "orders";
const base = BaseRepository(COLLECTION_NAME);

export const getOrdersFromDB = withErrorHandling(
  async (
    filter = {},
    projection = null,
    page = 1,
    limit = 10,
    sort = { _id: -1 }
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

export const getOrderByIdFromDB = withErrorHandling(base.findById)

export const createOrderInDB = withErrorHandling(async (order) => {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne(order);
    return result;
})

export const updateOrder = withErrorHandling(base.updateById)
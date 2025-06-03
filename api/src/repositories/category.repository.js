import { getDb } from "../config/database.config.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { BaseRepository } from "./base.repository.js";

const COLLECTION_NAME = "categories";
const base = BaseRepository(COLLECTION_NAME);

export const getCategoriesFromDB = withErrorHandling(base.findMany);

export const getCategoryByIdFromDB = withErrorHandling(base.findById);

export const getCategoryByFilterFromDB = withErrorHandling(base.findOne);

export const createCategoryToDB = withErrorHandling(base.insertOne);

export const updateCategoryInDB = withErrorHandling(base.updateById);
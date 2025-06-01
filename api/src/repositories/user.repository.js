import { getDb } from "../config/database.config.js";
import { refresh } from "../services/auth.service.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { BaseRepository } from "./base.repository.js";

const COLLECTION_NAME = "users";
const base = BaseRepository(COLLECTION_NAME);

export const createUserInDB = withErrorHandling(base.insertOne);

export const getUserFromDB = withErrorHandling(async (email) => {
  return base.findOne({ email });
});

export const updateUser = withErrorHandling(base.updateById);

export const getAllUsersFromDB = withErrorHandling(base.findMany);

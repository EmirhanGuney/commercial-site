import ORDER_STATUS from "../config/constants/orderStatus.config.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";

export const getOrderStatusHandler = withErrorHandling(async (req,res) => {
    return Response.success(Object.values(ORDER_STATUS)).send(res);
})
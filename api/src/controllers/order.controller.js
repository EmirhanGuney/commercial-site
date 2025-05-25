import e from "express";
import { withErrorHandling } from "../utils/errorHandler.js";
import Response from "../utils/response.js";
import { addOrder, getAllOrders, getOrderById, getUserOrderById, getUserOrders, updateOrderStatus } from "../services/order.service.js";

export const getAllOrdersHandler = withErrorHandling(async(req, res) => {
    const { orderStatus, userId, addressId, page, limit } = req.query;
    const result = await getAllOrders(orderStatus, userId, addressId, parseInt(page) , parseInt(limit));
    return Response.success(result).send(res);
})

export const getOrderByIdHandler = withErrorHandling(async(req, res) => {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    return Response.success(order).send(res);
})

export const updateOrderStatusHandler = withErrorHandling(async(req, res) => {
    const { orderId, status, rejectionReason } = req.body;
    await updateOrderStatus(orderId, status, rejectionReason);
    return Response.noContent().send(res);
})

export const addOrderHandler = withErrorHandling(async(req, res) => {
    const { email } = req.user;
    const { products, addressId, totalAmount, taxAmount, shippingCost, isStorePickUp, notes } = req.body;
    if(!products){
        return Response.badRequest("products girilmesi zorunludur.").send(res);
    }
    await addOrder(email, products, addressId, totalAmount, taxAmount, shippingCost, isStorePickUp, notes);
    return Response.noContent().send(res);
})

export const getUserOrdersHandler = withErrorHandling(async(req, res) => {
    const { email } = req.user;
    const { orderStatus, page, limit } = req.query;
    const result = await getUserOrders(email, orderStatus, parseInt(page), parseInt(limit));
    return Response.success(result).send(res);
})

export const getUserOrderByIdHandler = withErrorHandling(async(req, res) => {
    const { email } = req.user;
    const { orderId } = req.params;
    const order = await getUserOrderById(email, orderId);
    return Response.success(order).send(res);
})
import ORDER_STATUS from "../config/constants/orderStatus.config.js";
import ROLES from "../config/constants/role.config.js";
import { generateSecureUrlToken } from "../helpers/token.helper.js";
import { createOrderInDB, getOrderByIdFromDB, getOrdersFromDB, updateOrder } from "../repositories/order.repository.js";
import { getProductById, updateProduct } from "../repositories/product.repository.js";
import { getUserFromDB } from "../repositories/user.repository.js";
import ApiError from "../utils/apiError.js";
import { withErrorHandling } from "../utils/errorHandler.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllOrders = withErrorHandling(async (orderStatus, userId, addressId, page, limit) => {
    const filter = {}
    if (orderStatus) {
        if(!Object.values(ORDER_STATUS).includes(orderStatus)){
            throw ApiError.badRequest("Geçersiz orderStatus");
        }
        filter["status"] = orderStatus;
    }
    if(userId){
        filter["userId"] = userId;
    }
    if(addressId){
        filter["address.id"] = addressId;
    }
    const result = await getOrdersFromDB(filter, null, page, limit);

    const orders = await Promise.all(result.data.map(async (order) => {
        const productsWithPhotos = await Promise.all(order.products.map(async (product) => {
            const productData = await getProductById(product.productId, { productPhotos: 1 });
            const productPhoto = productData?.productPhotos?.[0]?.url
                ? generateSecureUrlToken(productData.productPhotos[0].url)
                : null;
    
            return {
                productId: product.productId,
                quantity: product.quantity,
                price: product.price,
                productTitle: product.productTitle,
                productPhoto
            };
        }));
    
        return {
            id: order._id,
            userId: order.userId,
            products: productsWithPhotos,
            address: order.address,
            totalAmount: order.totalAmount,
            taxAmount: order.taxAmount,
            shippingCost: order.shippingCost,
            status: order.status,
            notes: order.notes,
            rejectionReason: order.rejectionReason,
            orderDate: order.orderDate,
        };
    }));

    return {data: orders, pagination: result.pagination};
})

export const getOrderById = withErrorHandling(async (orderId) => {
    const order = await getOrderByIdFromDB(orderId);
    if (!order) {
        throw ApiError.notFound("Sipariş bulunamadı.");
    }
    return order;
})

export const addOrder = withErrorHandling(async (email, products, addressId, totalAmount, taxAmount, shippingCost, isStorePickUp, notes) => {
    const user = await getUserFromDB(email);
    if (!user) {
        throw ApiError.notFound("Kullanıcı bulunamadı.");
    }

    const addressIndex = user.addresses.findIndex(addr => addr.id === addressId);
    // if (addressIndex === -1) {
    //     throw ApiError.notFound("Adres bulunamadı.");
    // }

    const status = isStorePickUp ? ORDER_STATUS.STORE_PICKUP : ORDER_STATUS.PENDING_APPROVAL;
    for (const product of products) {
        const productFromDB = await getProductById(product.productId);
        if (!productFromDB) {
            throw ApiError.notFound("Ürün bulunamadı.");
        }
        product.price = user.role === ROLES.COMPANY ? productFromDB.prices.company : productFromDB.prices.customer;
        product.productTitle = productFromDB.title;
        productFromDB.orderQuantity += product.quantity;
        await updateProduct(productFromDB._id, {
            orderQuantity: productFromDB.orderQuantity
        })
    }
    const order = {
        _id: uuidv4(),
        userId: user._id,
        products,
        address: user.addresses[addressIndex],
        totalAmount,
        taxAmount,
        shippingCost,
        status,
        notes,
        orderDate: new Date()
    }
    await createOrderInDB(order);
})

export const updateOrderStatus = withErrorHandling(async (orderId, status, rejectionReason) => {
    if(!Object.values(ORDER_STATUS).includes(status)){
        throw ApiError.badRequest("Geçersiz orderStatus");
    }
    const order = await getOrderByIdFromDB(orderId);
    if (!order) {
        throw ApiError.notFound("Sipariş bulunamadı.");
    }
    if (status === ORDER_STATUS.REJECTED && !rejectionReason) {
        throw ApiError.badRequest("Reddedilme sebebi girilmelidir.");
    }
    const updateFields = { status };

    if (status === ORDER_STATUS.REJECTED && rejectionReason) {
        updateFields.rejectionReason = rejectionReason;
    }

    await updateOrder(orderId, updateFields);
})

export const getUserOrders = withErrorHandling(async (email, orderStatus, page, limit) => {
    const user = await getUserFromDB(email);
    if(!user){
        throw ApiError.notFound("Kullanıcı bulunamadı.");
    }
    const filter = {}
    if (orderStatus) {
        if(!Object.values(ORDER_STATUS).includes(orderStatus)){
            throw ApiError.badRequest("Geçersiz orderStatus");
        }
        filter["status"] = orderStatus;
    }
    filter["userId"] = user._id;

    const result = await getOrdersFromDB(filter, {
        _id: 1,
        products: 1,
        totalAmount: 1,
        status: 1,
        orderDate: 1
    }, page, limit);

    const ordersWithPhotos = await Promise.all(result.data.map(async (order) => {
        let orderPhoto = null;
        if (order.products && order.products.length > 0) {
            const product = await getProductById(order.products[0].productId, { productPhotos: 1 });
            if (product?.productPhotos?.length > 0) {
                orderPhoto = generateSecureUrlToken(product.productPhotos[0].url);
            }
        }
        return {
            ...order,
            orderPhoto
        };
    }));

    return {orders: ordersWithPhotos, pagination: result.pagination};
})

export const getUserOrderById = withErrorHandling(async (email, orderId) => {
    const user = await getUserFromDB(email);
    if(!user){
        throw ApiError.notFound("Kullanıcı bulunamadı.");
    }
    const order = await getOrderByIdFromDB(orderId, {
        userId: 1,
        products: 1,
        address: 1,
        totalAmount: 1,
        taxAmount: 1,
        shippingCost: 1,
        status: 1,
        notes: 1,
        rejectionReason: 1,
        orderDate: 1
    });
    if (!order) {
        throw ApiError.notFound("Sipariş bulunamadı.");
    }
    if (order.userId !== user._id) {
        throw ApiError.forbidden("Bu işlemi yapmaya yetkiniz yok.");
    }

    for (let product of order.products) {
        const productData = await getProductById(product.productId, { productPhotos: 1 });
        if (productData?.productPhotos?.length > 0) {
          product.productPhoto = generateSecureUrlToken(productData.productPhotos[0].url);
        } else {
          product.photo = null;
        }
    }

    return order;
})
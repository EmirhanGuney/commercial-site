import publicInstance from "../publicInstance.js";
import instance from "../axiosInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";
import { toast } from "react-toastify";

export const getOrders = async (filter = {}) => {
    try {
        const response = await instance.get(API_URL.ORDERS.GET_ORDERS ,{
            params: filter
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Siparişler listelenirken hata oluştu")
    }
};

export const getOrder = async (orderId) => {
    try {
        const response = await instance.get(API_URL.ORDERS.GET_ORDER, {
            params: { orderId }
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Sipariş getirilirken hata oluştu");
    }
}

export const updateOrderStatus = async (orderId, status, rejectionReason = null) => {
    try {
        const response = await instance.put(API_URL.ORDERS.UPDATE_ORDER_STATUS, {
            orderId,
            status,
            rejectionReason
        });

        if (response.status === 204) {
            toast.success("Sipariş başarıyla güncellendi");
        }
    } catch (error) {
        return handleApiError(error, "Sipariş güncellenirken hata oluştu");
    }
}

export const addOrder = async (order) => {
    try {
        const response = await instance.post(API_URL.ORDERS.ADD_ORDER, order);

        if (response.status === 204) {
            toast.success("Sipariş başarıyla oluşturuldu");
        }
    } catch (error) {
        handleApiError(error, "Sipariş oluşturulurken hata oluştu");
    }
}

export const getUserOrders = async (filter = {}) => {
    try {
        const response = await instance.get(API_URL.ORDERS.GET_USER_ORDERS ,{
            params: filter
        });
        return response.data?.data;
    } catch (error) {
        return handleApiError(error, "Siparişler listelenirken hata oluştu");
    }
}

export const getUserOrder = async (orderId) => {
    try {
        const response = await instance.get(`${API_URL.ORDERS.GET_USER_ORDER}/${orderId}`);
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Sipariş getirilirken hata oluştu");
    }
}
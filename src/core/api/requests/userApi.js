import publicInstance from "../publicInstance.js";
import instance from "../axiosInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";
import { toast } from "react-toastify";

export const getAllUsers = async (filter = {}) => {
    try {
        const response = await instance.get(API_URL.USER.GET_ALL_USERS, {
            params: filter,
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Kullanıcılar Getirilemedi");
    }
};

export const getUserInformation = async () => {
    try {
        const response = await instance.get(API_URL.USER.GET_USER_INFORMATİON);
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Kullanıcı Bilgileri Getirilemedi");
    }
};

export const getUserAddresses = async () => {
    try {
        const response = await instance.get(API_URL.USER.GET_USER_ADDRESSES);

        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Kullanıcı Adresleri Getirilemedi");
    }
};

export const addUserAddress = async (address) => {
    try {
        const response = await instance.post(API_URL.USER.ADD_USER_ADDRESS, { address });
        if (response.status === 204) {
            toast.success("Adres Eklendi");
        }
    } catch (error) {
        handleApiError(error, "Adres Eklenemedi");
    }
};

export const updateUserAddress = async (updatingAddress) => {
    try {
        const response = await instance.put(API_URL.USER.UPDATE_USER_ADDRESS, { updatingAddress });
        if (response.status === 204) {
            toast.success("Adres Güncellendi");
        }
    } catch (error) {
        handleApiError(error, "Adres Güncellenemedi");
    }
};

export const deleteUserAddress = async (addressId) => {
    try {
        const response = await instance.delete(API_URL.USER.DELETE_USER_ADDRESS, {
            data: { addressId },
        });
        if (response.status === 204) {
            toast.success("Adres Silindi");
        }
    } catch (error) {
        handleApiError(error, "Adres Silinemedi");
    }
};

export const addFavorite = async (productId) => {
    try {
        const response = await instance.post(API_URL.USER.ADD_FAVORITE, { productId });
        if (response.status === 204) {
            toast.success("Favorilere Eklendi");
            return true;
        }
        return false;
    } catch (error) {
        if (error.response?.status === 401) {
            toast.warning("Önce Giriş Yapmalısınız");
        } else {
            handleApiError(error, "Favorilere Eklenemedi");
        }
        return false;
    }
};

export const removeFavorite = async (productId) => {
    try {
        const response = await instance.delete(API_URL.USER.DELETE_FAVORITE, {
            data: { productId },
        });
        if (response.status === 204) {
            toast.success("Ürün Favorilerden Kaldırıldı");
            return true;
        }
        return false;
    } catch (error) {
        if (error.response?.status === 401) {
            toast.warning("Önce Giriş Yapmalısınız");
        } else {
            handleApiError(error, "Favori kaldırma işlemi başarısız oldu");
        }
        return false;
    }
};

export const verifyCompany = async (email) => {
    try {
        const response = await instance.put(API_URL.USER.VERİFY_COMPANY, { email });
        if (response.status === 204) {
            toast.success("Şirket Onaylandı");
        }
    } catch (error) {
        handleApiError(error, "Şirket Onaylanamadı");
    }
};

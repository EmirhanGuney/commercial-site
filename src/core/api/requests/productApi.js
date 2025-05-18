import publicInstance from "../publicInstance.js";
import instance from "../axiosInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";
import { toast } from "react-toastify";

export const getProductsForAdmin = async (filter = {}) => {
    try {
        const response = await instance.get(API_URL.PRODUCT.GET_PRODUCTS_FOR_ADMIN, {
            params: filter
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Ürünler getirilirken hata oluştu");
    }
};

export const getProducts = async (filter = {}) => {
    try {
        const response = await publicInstance.get(API_URL.PRODUCT.GET_PRODUCTS, {
            params: filter
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Ürünler getirilirken hata oluştu");
    }
};

export const getProduct = async (productId) => {
    try {
        const response = await publicInstance.get(API_URL.PRODUCT.GET_PRODUCT, {
            params: { productId }
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Ürün getirilirken hata oluştu");
    }
};

export const getProductForAdmin = async (productId) => {
    try {
        const response = await publicInstance.get(API_URL.PRODUCT.GET_PRODUCT_FOR_ADMIN + `/${productId}`);
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Ürün getirilirken hata oluştu");
    }
};

export const getFavoriteProducts = async (filter = {}) => {
    try {
        const response = await instance.get(API_URL.PRODUCT.GET_FAVORITE_PRODUCTS, {
            params: filter
        });
        return response.data.data;
    } catch (error) {
        return handleApiError(error, "Favori ürünler getirilirken hata oluştu");
    }
};

export const addProduct = async (product) => {
    try {
        const response = await instance.post(API_URL.PRODUCT.ADD_PRODUCT, product);
        if (response.status === 201) {
            toast.success("Ürün başarıyla oluşturuldu");
            return response.data.data;
        }
    } catch (error) {
        return handleApiError(error, "Ürün eklenirken hata oluştu");
    }
};

export const addProductPhoto = async (productId, photo) => {
    try {
        const formData = new FormData();
        formData.append("file", photo);
        formData.append("productId", productId);

        const response = await instance.post(API_URL.PRODUCT.ADD_PRODUCT_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (response.status === 200) {
            toast.success("Fotoğraf başarıyla yüklendi");
            return response.data.data;
        }
    } catch (error) {
        return handleApiError(error, "Fotoğraf yüklenirken hata oluştu");
    }
};

export const deleteProductPhoto = async (productId, photoId) => {

    try {
        const response = await instance.delete(API_URL.PRODUCT.DELETE_PRODUCT_IMAGE, {
            data: {
                productId,
                photoId,
            },
        });
        if (response.status === 204) {
            toast.success("Fotoğraf başarıyla silindi");
            return response.data.data;
        }
    } catch (error) {
        return handleApiError(error, "Fotoğraf silinirken hata oluştu");
    }
}

export const updateProduct = async (product) => {
    try {
        const response = await instance.put(API_URL.PRODUCT.UPDATE_PRODUCT, product);
        if (response.status === 200) {
            toast.success("Ürün başarıyla güncellendi");
            return response.data.data;
        }
    } catch (error) {
        return handleApiError(error, "Ürün güncellenirken hata oluştu");
    }
};

export const addBulkProduct = async (formData) => {
    try {
        const response = await instance.post(API_URL.PRODUCT.ADD_BULK_PRODUCT, formData);
        if (response.status === 200) {
            toast.success("Ürünler başarıyla eklendi");
            return response.data.data;
        }
    } catch (error) {
        return handleApiError(error, "Ürün eklenirken hata oluştu");
    }
}
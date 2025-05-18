import publicInstance from "../publicInstance.js";
import instance from "../axiosInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";
import { toast } from "react-toastify";

export const getCategories = async () => {
    try {
        const response = await publicInstance.get(API_URL.CATEGORIES.GET_CATEGORIES);
        const result = response.data.data.categories;
        return result;
    } catch (error) {
        return handleApiError(error, "Kategoriler getirilirken bir sorun oluştu.");
    }
};

export const getSubCategories = async () => {
    try {
        const response = await publicInstance.get(API_URL.CATEGORY.GET_SUB_CATEGORIES);
        const result = response.data.data;
        return result;
    } catch (error) {
        return handleApiError(error, "Alt Kategoriler Getirilemedi");
    }
};

export const addCategory = async (categoryName) => {
    try {
        const response = await instance.post(API_URL.CATEGORIES.ADD_CATEGORY, {name: categoryName});
        toast.success("Kategori başarıyla eklendi.");
        return response.data;
    } catch (error) {
        return handleApiError(error, "Kategori eklenirken bir sorun oluştu.");
    }
};

export const addSubCategory = async (categoryId, name) => {
    try {
        const response = await instance.post(API_URL.CATEGORIES.ADD_SUB_CATEGORY, {
            categoryId,
            name
        });
        toast.success("Alt kategori başarıyla eklendi.");
        return response.data;
    } catch (error) {
        return handleApiError(error, "Alt kategori eklenirken bir sorun oluştu.");
    }
};

export const updateCategoryName = async (categoryId, categoryName) => {
    try {
        const response = await instance.put(API_URL.CATEGORIES.UPDATE_CATEGORY, {
            categoryId,
            categoryName
        });
        toast.success("Kategori adı başarıyla güncellendi.");
        return response.data;
    } catch (error) {
        return handleApiError(error, "Kategori adı güncellenirken bir sorun oluştu.");
    }
}
export const updateSubCategoryName = async (categoryId, subCategoryId, categoryName) => {
    try {
        const response = await instance.put(API_URL.CATEGORIES.UPDATE_SUB_CATEGORY, {
            categoryId,
            subCategoryId,
            subCategoryName: categoryName
        });
        toast.success("Alt kategori adı başarıyla güncellendi.");
        return response.data;
    } catch (error) {
        return handleApiError(error, "Alt kategori adı güncellenirken bir sorun oluştu.");
    }
}
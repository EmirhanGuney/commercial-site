import publicInstance from "../publicInstance.js";
import { API_URL } from "../../../config/apiUrls.js";
import { handleApiError } from "../apiResponseHandler.js";


export const getOrderStatus = async () => {
    try {
        const response = await publicInstance.get(API_URL.LOOKUP.GET_ORDER_STATUS);
        const result = response.data.data;
        return result;
    } catch (error) {
        return handleApiError(error, "Sipariş durumları getirilirken bir sorun oluştu.");
    }
};

export const addSliderPhoto = async (formData) => {
    try {
        const response = await publicInstance.post(API_URL.LOOKUP.ADD_SLIDER_PHOTO, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        return handleApiError(error, "Slider fotoğrafı eklenirken bir sorun oluştu.");
    }
}
export const getSliderPhotos = async () => {
    try {
        const response = await publicInstance.get(API_URL.LOOKUP.GET_SLIDER_PHOTOS);
        const result = response.data.data;
        return result;
    } catch (error) {
        return handleApiError(error, "Slider fotoğrafları getirilirken bir sorun oluştu.");
    }
}
export const deleteSliderPhoto = async (id) => {
    try {
        const response = await publicInstance.delete(API_URL.LOOKUP.DELETE_SLIDER_PHOTO + id);
        return response.data;
    } catch (error) {
        return handleApiError(error, "Slider fotoğrafı silinirken bir sorun oluştu.");
    }
}
export const BASE_URL = "https://nanocamkesmemakinesi.com/api";

const pre_namespace_auth = "auth";
const pre_namespace_user = "users";
const pre_namespace_product = "products";
const pre_namespace_order = "orders";
const pre_namespace_lookup = "lookUp";
const pre_namespace_category = "categories";

export const API_URL = {
  AUTH: {
    LOGIN: `${pre_namespace_auth}/login`,
    ADMIN_LOGIN: `${pre_namespace_auth}/admin-login`,
    REGİSTER_CUSTOMER: `${pre_namespace_auth}/register-customer`,
    REGİSTER_COMPANY: `${pre_namespace_auth}/register-company`,
    REFRESH_TOKEN: `${pre_namespace_auth}/refresh`,
    FORGOT_PASSWORD: `${pre_namespace_auth}/forgot-password`,
    RESET_PASSWORD: `${pre_namespace_auth}/reset-password`,
  },
  USER: {
    GET_ALL_USERS: `${pre_namespace_user}/get-all-users`,
    GET_USER_INFORMATİON: `${pre_namespace_user}/get-my-information`,
    GET_USER_ADDRESSES: `${pre_namespace_user}/get-user-addresses`,
    ADD_USER_ADDRESS: `${pre_namespace_user}/add-address`,
    DELETE_USER_ADDRESS: `${pre_namespace_user}/delete-address`,
    UPDATE_USER_ADDRESS: `${pre_namespace_user}/update-address`,
    ADD_FAVORITE: `${pre_namespace_user}/add-favorite-product`,
    DELETE_FAVORITE: `${pre_namespace_user}/delete-favorite-product`,
    VERİFY_COMPANY: `${pre_namespace_user}/verify-company`,
  },
  PRODUCT: {
    ADD_PRODUCT: `${pre_namespace_product}/add-product`,
    ADD_PRODUCT_IMAGE: `${pre_namespace_product}/add-product-photo`,
    GET_PRODUCTS: `${pre_namespace_product}/get-products`,
    GET_PRODUCTS_FOR_ADMIN: `${pre_namespace_product}/get-products-for-admin`,
    GET_PRODUCT_FOR_ADMIN: `${pre_namespace_product}/get-product-for-admin`,
    GET_PRODUCT: `${pre_namespace_product}/get-product-by-id`,
    GET_FAVORITE_PRODUCTS: `${pre_namespace_product}/get-favorite-products`,
    UPDATE_PRODUCT: `${pre_namespace_product}/update-product`,
    DELETE_PRODUCT_IMAGE: `${pre_namespace_product}/delete-product-photo`,
    ADD_BULK_PRODUCT: `${pre_namespace_product}/bulk-upload-from-excel`,
  },
  LOOKUP: {
    GET_ORDER_STATUS: `${pre_namespace_lookup}/order-status`,
    ADD_SLIDER_PHOTO: `${pre_namespace_lookup}/add-slider-photo`,
    GET_SLIDER_PHOTOS: `${pre_namespace_lookup}/get-slider-photos`,
    DELETE_SLIDER_PHOTO: `${pre_namespace_lookup}/delete-slider-photo`,
  },
  ORDERS: {
    GET_ORDERS: `${pre_namespace_order}/get-orders`,
    GET_ORDER: `${pre_namespace_order}/get-order`,
    ADD_ORDER: `${pre_namespace_order}/add-order`,
    UPDATE_ORDER_STATUS: `${pre_namespace_order}/update-order-status`,
    GET_USER_ORDERS: `${pre_namespace_order}/get-user-orders`,
    GET_USER_ORDER: `${pre_namespace_order}/get-user-order`
  },
  CATEGORIES: {
    GET_CATEGORIES: `${pre_namespace_category}/get-categories`,
    ADD_CATEGORY: `${pre_namespace_category}/add-category`,
    ADD_SUB_CATEGORY: `${pre_namespace_category}/add-sub-category`,
    UPDATE_CATEGORY: `${pre_namespace_category}/update-category`,
    UPDATE_SUB_CATEGORY: `${pre_namespace_category}/update-subCategory`,
  },
};

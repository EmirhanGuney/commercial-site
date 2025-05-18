import { addToLocalStorage, getFromLocalStorage } from "./localStorageHelper";

export const addProductToCart = (productId, quantity) => {
    let cart = getFromLocalStorage("sepet") || [];

    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }

    addToLocalStorage("sepet", cart);
};

export const increaseProductQuantity = (productId, quantity) => {
    let cart = getFromLocalStorage("sepet") || [];

    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex !== -1) {
        cart[existingIndex].quantity += quantity;
        addToLocalStorage("sepet", cart);
    }
};

export const decreaseProductQuantity = (productId, quantity = 1) => {
    let cart = getFromLocalStorage("sepet") || [];

    const existingIndex = cart.findIndex((item) => item.productId === productId);

    if (existingIndex !== -1) {
        if (cart[existingIndex].quantity > quantity) {
            cart[existingIndex].quantity -= quantity;
        } else {
            cart.splice(existingIndex, 1);
        }
        addToLocalStorage("sepet", cart);
    }
};

export const removeProductFromCart = (productId) => {
    let cart = getFromLocalStorage("sepet") || [];

    cart = cart.filter((item) => item.productId !== productId);

    addToLocalStorage("sepet", cart);
};
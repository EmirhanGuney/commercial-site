import React, { use, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import urun from "../../assets/placeholder.png";
import "./Cart.css";
import { toast } from "react-toastify";
import { getProduct } from "../../core/api/requests/productApi.js";
import { getFromLocalStorage } from "../../utils/localStorageHelper.js";
import {
  decreaseProductQuantity,
  increaseProductQuantity,
  removeProductFromCart,
} from "../../utils/productCartHelper.js";
import { getUserAddresses } from "../../core/api/requests/userApi.js";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isStorePickup, setIsStorePickup] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const validateProduct = async () => {
    let validProducts = [];
    let isStockAvailable = true;
    const cartItems = getFromLocalStorage("sepet") || [];
    for (let i = 0; i < cartItems.length; i++) {
      const product = await getProduct(cartItems[i].productId);
      if (product) {
        const productWithQuantity = {
          ...product,
          quantity: cartItems[i].quantity || 1,
        };
        validProducts.push(productWithQuantity);
      } else {
        isStockAvailable = false;
      }
    }
    if (!isStockAvailable) {
      toast.error("Sepetinizdeki ürünlerden bazıları bulunmamaktadır.");
    }
    setCartProducts(validProducts);
  };

  const getUserAddressesHandler = async () => {
    const response = await getUserAddresses();
    setUserAddresses(response);
  };

  const toggleIsStorePickUp = () => {
    setIsStorePickup((prev) => !prev);
    if (isStorePickup) {
      setSelectedAddress(null);
    }
  };

  const increaseProductQuantityHandler = async (productId) => {
    increaseProductQuantity(productId, 1);
    validateProduct();
    toast.success("Sepetiniz Güncellendi");
  };

  const decreaseProductQuantityHandler = async (productId) => {
    decreaseProductQuantity(productId, 1);
    validateProduct();
    toast.success("Sepetiniz Güncellendi");
  };

  const removeProductFromCartHandler = async (productId) => {
    removeProductFromCart(productId);
    validateProduct();
    toast.success("Sepetiniz Güncellendi");
  };

  useEffect(() => {
    validateProduct();
    getUserAddressesHandler();
  }, []);

  const calculateVAT = (products) => {
    return (
      products.reduce((acc, item) => acc + item.prices * item.quantity, 0) * 0.2
    ).toFixed(2);
  };

  const calculateTotalPrice = (products) => {
    return products
      .reduce((acc, item) => acc + item.prices * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalQuantity = (products) => {
    return products.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <div className="main-cart">
      <Header />
      <div className="cart-content">
        <span className="shoppingcart-header">Ev {">"} Sepetim </span>
        <div className="cart-details">
          <div className="cart-items">
            {cartProducts.map((item) => (
              <div key={item.id} className="cart-item">
                <img
                  src={
                    item?.productPhotos[0]?.url
                      ? `https://nanocamkesmemakinesi.com/api/file/${item.productPhotos[0].url}`
                      : urun
                  }
                  alt={item.title}
                  className="product-image"
                />
                <div className="product-details">
                  <p className="product-category">{item.category.name}</p>
                  <p className="product-name">{item.title}</p>
                </div>
                <div className="quantity-control">
                  <button
                    onClick={() => {
                      decreaseProductQuantityHandler(item.id);
                    }}
                  >
                    -
                  </button>
                  <input type="text" value={item.quantity} readOnly />
                  <button
                    onClick={() => {
                      increaseProductQuantityHandler(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
                <p className="product-price">₺ {item.prices * item.quantity}</p>
                <button
                  className="remove-item"
                  onClick={() => {
                    removeProductFromCartHandler(item.id);
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Özet</h3>
            <div className="summary-details">
              <p>
                Ürün Sayısı: {calculateTotalQuantity(cartProducts)}
                <span>{calculateTotalPrice(cartProducts)} ₺</span>
              </p>
              <div className="checkbox-wrapper-35">
                <input
                  value="private"
                  name="switch"
                  id="switch"
                  type="checkbox"
                  className="switch"
                  checked={isStorePickup}
                  onChange={() => toggleIsStorePickUp()}
                />
                <label htmlFor="switch">
                  <span className="switch-x-text">Teslimat türü </span>
                  <span className="switch-x-toggletext">
                    <span className="switch-x-unchecked">
                      <span className="switch-x-hiddenlabel"> </span>Kargo
                    </span>
                    <span className="switch-x-checked">
                      <span className="switch-x-hiddenlabel"></span>Mağazadan
                      teslim
                    </span>
                  </span>
                </label>
              </div>
              {!isStorePickup ? (
                <p>
                  Teslimat Adresi:
                  <select
                    value={selectedAddress || ""}
                    onChange={(e) => setSelectedAddress(e.target.value)}
                  >
                    <option value="" disabled>
                      Adres seçin
                    </option>
                    {userAddresses.map((address) => (
                      <option key={address.id} value={address.id}>
                        {address.title}
                      </option>
                    ))}
                  </select>
                </p>
              ) : (
                ""
              )}

              <p>
                KDV TUTARI: <span>₺ {calculateVAT(cartProducts)}</span>
              </p>
              <p className="total-price">
                TOPLAM FİYAT
                <span>₺ {calculateTotalPrice(cartProducts)}</span>
              </p>
            </div>
            <button className="checkout-button">Ödemeye Geç</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

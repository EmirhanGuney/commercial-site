import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./CartDrop.css";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { toast } from "react-toastify";
import { getProduct } from "../../../core/api/requests/productApi.js";
import { getFromLocalStorage } from "../../../utils/localStorageHelper.js";
import urun from "../../../assets/placeholder.png";
import { cutTheString } from "../../../utils/textHelper.js";
import {
  increaseProductQuantity,
  decreaseProductQuantity,
  removeProductFromCart,
} from "../../../utils/productCartHelper.js";

const CartDrop = ({ isOpen }) => {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

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
    console.log(validProducts);
  };

  useEffect(() => {
    validateProduct();
  }, []);
  const increaseProductQuantityHandler = async (productId) => {
    increaseProductQuantity(productId, 1);
    validateProduct(); // Güncellenmiş sepeti tekrar çek
    toast.success("Sepetiniz Güncellendi");
  };

  const decreaseProductQuantityHandler = async (productId) => {
    decreaseProductQuantity(productId, 1);
    validateProduct(); // Güncellenmiş sepeti tekrar çek
    toast.success("Sepetiniz Güncellendi");
  };

  const removeProductFromCartHandler = async (productId) => {
    removeProductFromCart(productId);
    validateProduct(); // Güncellenmiş sepeti tekrar çek
    toast.success("Sepetiniz Güncellendi");
  };

  return (
    <motion.div
      className={`drop-cart-dropdown ${isOpen ? "open" : ""}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -10 }}
      transition={{ duration: 0.3 }}
    >
      <button className="go-to-cart" onClick={() => navigate("/sepetim")}>
        Sepetime Git
      </button>
      <div className="drop-cart-items">
        {cartProducts.length > 0 ? (
          cartProducts.map((item, id) => (
            <div key={id} className="drop-cart-item">
              <img
                src={
                  item?.productPhotos[0]?.url
                    ? `https://nanocamkesmemakinesi.com/api/file/${item.productPhotos[0].url}`
                    : urun
                }
                alt={item.title}
                className="drop-item-image"
              />
              <div className="drop-item-info">
                <span className="drop-item-name">
                  {cutTheString(item.title, 15, "...")}
                </span>
                <span className="drop-item-price">{item.prices} ₺</span>

                <div className="drop-item-quantity-control">
                  <button
                    onClick={() => {
                      decreaseProductQuantityHandler(item.id);
                    }}
                  >
                    <FaMinus />
                  </button>
                  <span className="drop-item-quantity">{item.quantity}</span>
                  <button
                    onClick={() => {
                      increaseProductQuantityHandler(item.id);
                    }}
                  >
                    <FaPlus />
                  </button>
                </div>
                <button
                  className="drop-item-remove"
                  onClick={() => {
                    removeProductFromCartHandler(item.id);
                    setCartProducts((prev) =>
                      prev.filter((product) => product.id !== item.id)
                    );
                  }}
                >
                  <IoTrashBin />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="drop-empty-cart">Sepetiniz boş</p>
        )}
      </div>
    </motion.div>
  );
};

export default CartDrop;

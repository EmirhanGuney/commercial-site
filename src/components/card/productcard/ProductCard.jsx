import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import urun from "../../../assets/placeholder.png";
import Loader from "../../loaders/Loader";
import { addProductToCart } from "../../../utils/productCartHelper.js";
import { AuthGuard } from "../../../core/auth/AuthGuard.js";
import {
  addFavorite,
  removeFavorite,
} from "../../../core/api/requests/userApi.js";

function ProductCard({ product, refreshProducts }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);

  const navigateTo = (navigationRoute) => {
    navigate(navigationRoute);
  };

  const handleAddToFavorite = async (productId) => {
    const isAuthenticate = AuthGuard.isAuthenticated();
    if (!isAuthenticate) {
      toast.warning("Lütfen giriş yapınız");
      return;
    }

    const result = await addFavorite(productId);
    if (result) {
      refreshProducts();
    }
  };

  const handleRemoveFromFavorite = async (productId) => {
    const isAuthenticate = AuthGuard.isAuthenticated();
    if (!isAuthenticate) {
      toast.warning("Lütfen giriş yapınız");
      return;
    }

    const result = await removeFavorite(productId);
    if (result) {
      refreshProducts();
    }
  };

  const handleAddToCart = (productId, quantity) => {
    if (!product.inStock) {
      toast.error("Bu ürün şu anda stokta yok.");
      return;
    }
    addProductToCart(productId, quantity);
    toast.success("Ürün sepete eklendi.");
  };

  useEffect(() => {
    if (product?.productPhotos?.length > 0) {
      setLoading(false);
    }
  }, [product]);
  return (
    <div className="product-card-main">
      <div className="product-card-content">
        {loading && (
          <div
            className="image-placeholder"
            style={{
              width: "100%",
              height: "73.6%",
              alignContent: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Loader />
          </div>
        )}
        <div
          className="image-wrapper"
          onClick={() => navigateTo(`/productinformation/${product.id}`)}
        >
          <img
            src={
              product?.productPhotos[0]?.url
                ? `https://nanocamkesmemakinesi.com/api/file/${product.productPhotos[0].url}`
                : urun
            }
            alt="Ürün görseli"
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            style={{ display: loading ? "none" : "block" }}
          />
          {!product.inStock && (
            <div className="gray-overlay">
              <span className="out-of-stock">Tükendi</span>
            </div>
          )}
        </div>

        <label
          onClick={(e) => {
            e.stopPropagation();
            if (!product.isFavorite) {
              handleAddToFavorite(product.id);
            } else {
              handleRemoveFromFavorite(product.id);
            }
          }}
          className="container-like"
        >
          <input
            type="checkbox"
            defaultChecked={product.isFavorite}
            onClick={(e) => {
              e.stopPropagation();
              if (!AuthGuard.isAuthenticated()) {
                e.preventDefault();
              }
            }}
            disabled={!AuthGuard.isAuthenticated()}
          />

          <svg
            id="Layer_1"
            version="1.0"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <path d="M16.4,4C14.6,4,13,4.9,12,6.3C11,4.9,9.4,4,7.6,4C4.5,4,2,6.5,2,9.6C2,14,12,22,12,22s10-8,10-12.4C22,6.5,19.5,4,16.4,4z"></path>
          </svg>
        </label>
        <div className="product-card-text">
          <div className="product-card-text-row">
            <span className="product-card-title">{product.title}</span>
          </div>
          <div className="product-card-text-row">
            <span className="product-card-price">{product.prices} ₺</span>
            <div className="increment-decrement">
              <button
                className="decrement-btn"
                onClick={() => {
                  if (productQuantity > 1) {
                    setProductQuantity(productQuantity - 1);
                  }
                }}
                disabled={!product.inStock}
              >
                <FaMinus />
              </button>
              {productQuantity}
              <button
                className="increment-btn"
                onClick={() => {
                  setProductQuantity(productQuantity + 1);
                }}
                disabled={!product.inStock}
              >
                <FaPlus />
              </button>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => handleAddToCart(product.id, productQuantity)}
            >
              <BsCart2 />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

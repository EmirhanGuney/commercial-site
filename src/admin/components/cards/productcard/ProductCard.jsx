import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { BsCart2 } from "react-icons/bs";
import "./ProductCard.css";
import urun from "../../../../assets/placeholder.png";
import Loader from "../../../../components/loaders/Loader";
import { useNavigate } from "react-router-dom";
function ProductCard({ product }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="admin-product-card-main">
      <div className="admin-product-card-content">
        {loading && (
          <div
            className="admin-image-placeholder"
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
        <div className="admin-product-card-text">
          <div className="admin-product-card-text-row">
            <span className="admin-product-card-title">{product.title}</span>
          </div>
          <div className="admin-product-card-text-row">
            <div className="admin-price-area">
              <span className="admin-product-card-price">
                B: {product.prices.company} ₺
              </span>
              <span className="admin-product-card-price">
                M: {product.prices.customer} ₺
              </span>
            </div>

            <button
              onClick={() => {
                navigate(`/admin/update-product/${product.id}`);
              }}
              className="admin-detail-btn"
            >
              Düzenle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

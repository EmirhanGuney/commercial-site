import React, { useState, useEffect } from "react";
import "./ProductInformation.css";
import Header from "../../components/header/Header";
import urun from "../../assets/placeholder.png";

import { FaArrowLeft } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loaders/Loader";
import { toast } from "react-toastify";
import { addProductToCart } from "../../utils/productCartHelper.js";
import { getProduct } from "../../core/api/requests/productApi.js";

function ProductInformation() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photoLoading, setPhotoLoading] = useState(true);
  const [productQuantity, setProductQuantity] = useState(1);
  const [showingPhoto, setShowingPhoto] = useState(0);

  const navigate = useNavigate();

  const { productId } = useParams();
  useEffect(() => {
    const getProductInformation = async () => {
      const product = await getProduct(productId);

      setProduct(product);
      setLoading(false);
    };
    getProductInformation();
  }, []);

  const handleAddToCart = (productId, quantity) => {
    addProductToCart(productId, quantity);
    toast.success("Ürün sepete eklendi.");
  };
  return (
    <div className="product-information-main">
      <Header />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70vh",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="product-information-content">
          <div className="product-information-card">
            <div className="product-information-card__title">
              <div className="product-information-icon">
                <a href="/">
                  <FaArrowLeft />
                </a>
              </div>
              <h3>{product.category.name} </h3>
            </div>
            <div className="product-information-card__body">
              <div className="product-information-half">
                <div className="product-information-featured-text">
                  <h1> {product.title} </h1>
                  <p className="product-information-sub">
                    {" "}
                    {product?.category?.subCategory?.name}{" "}
                  </p>
                  <p className="product-information-price">
                    {" "}
                    {product.prices} ₺{" "}
                  </p>
                </div>
                <div className="product-information-image">
                  <div className="little-photos">
                    {product.productPhotos.map((photo, index) => (
                      <img
                        onClick={() => {
                          setShowingPhoto(index);
                        }}
                        key={photo.id}
                        src={`https://nanocamkesmemakinesi.com/api/file/${photo.url}`}
                        alt="Ürün Görseli"
                        onLoad={() => setPhotoLoading(false)}
                        onError={() => setPhotoLoading(false)}
                      />
                    ))}
                  </div>
                  {photoLoading && (
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
                  <img
                    src={
                      product?.productPhotos[showingPhoto]?.url
                        ? `https://nanocamkesmemakinesi.com/api/file/${product.productPhotos[showingPhoto].url}`
                        : urun
                    }
                    alt="Ürün görseli"
                    onLoad={() => setPhotoLoading(false)}
                    onError={() => setPhotoLoading(false)}
                    style={{ display: loading ? "none" : "block" }}
                  />
                </div>
              </div>
              <div className="product-information-half">
                <div className="product-information-description">
                  <p>{product.description}</p>
                  <br />
                  <span>
                    <span style={{ color: "#2e3a4d", fontWeight: "800" }}>
                      Stok Durumu:{" "}
                    </span>
                    {product.inStock ? (
                      <p style={{ color: "#4caf50" }}>Stokta Var</p>
                    ) : (
                      <p style={{ color: "#f44336" }}>Tükendi</p>
                    )}
                    <br />
                    <span style={{ color: "#2e3a4d", fontWeight: "800" }}>
                      Fiyat:{" "}
                    </span>
                    <p> {product.prices} ₺ </p>
                    <br />
                    <span style={{ color: "#2e3a4d", fontWeight: "800" }}>
                      Ürün Kodu:{" "}
                    </span>
                    <p> {product.code ? product.code : "Belirtilmedi"} </p>
                    <br />
                    <span style={{ color: "#2e3a4d", fontWeight: "800" }}>
                      Adet:{" "}
                    </span>
                    <br />
                    <div className="product-information-quantity">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                          minWidth: "90px",
                        }}
                      >
                        <button
                          className="info-decrement-btn"
                          onClick={() => {
                            if (productQuantity > 1) {
                              setProductQuantity(productQuantity - 1);
                            }
                          }}
                        >
                          <FaMinus />
                        </button>
                        {productQuantity}
                        <button
                          className="info-increment-btn"
                          onClick={() => {
                            setProductQuantity(productQuantity + 1);
                          }}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <div className="product-information-action">
                        <button
                          onClick={() =>
                            product.inStock &&
                            handleAddToCart(product.id, productQuantity)
                          }
                          type="button"
                        >
                          Sepete Ekle
                        </button>
                        <button type="button">Satın Al</button>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div className="product-information-card__footer">
              <div className="product-information-recommend"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductInformation;

import {
  getProductForAdmin,
  updateProduct,
  deleteProductPhoto,
  addProductPhoto,
} from "../../../core/api/requests/productApi";
import "./UpdateProduct.css";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../components/loaders/Loader";
const UpdateProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const getProductHandler = async () => {
    const response = await getProductForAdmin(productId);
    setProduct(response);
    setFormData({
      title: response.title,
      description: response.description,
      prices: response.prices,
      inStock: response.inStock,
      categoryId: response.category?.id,
      subCategoryId: response.category?.subCategory?.id,
      productPhotos: response.photos,
      code : response.code,
    });
  };

  useEffect(() => {
    getProductHandler();
  }, [productId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Yüklenecek dosya:", selectedFile);
      await addProductPhoto(productId, selectedFile);
    }
    setSelectedFile(null);
    getProductHandler();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "customerPrice" || name === "companyPrice") {
      setFormData((prev) => ({
        ...prev,
        prices: {
          ...prev.prices,
          [name === "customerPrice" ? "customer" : "company"]: parseFloat(val),
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: val }));
    }
  };

  const handleUpdate = async () => {
    const sendData = {
      productId: productId,
      title: formData.title,
      description: formData.description,
      inStock: formData.inStock,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      prices: {
        customer: formData.prices.customer,
        company: formData.prices.company,
      },
      code: formData.code,
    };
    await updateProduct(sendData);
  };
  const handleDeletePhoto = async (productId, photoId) => {
    await deleteProductPhoto(productId, photoId);
    getProductHandler();
  };

  if (!formData)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Loader />
      </div>
    );

  return (
    <div className="update-product-container">
      <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {formData.productPhotos.map((photo) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "100px",
            }}
          >
            <img
              key={photo.id}
              src={`https://nanocamkesmemakinesi.com/api/file/${photo.url}`}
              alt="Ürün Görseli"
              style={{ width: "100px", height: "100px", margin: "10px" }}
            />
            <button
              className="delete-photo-btn"
              onClick={() => {
                handleDeletePhoto(productId, photo.id);
              }}
            >
              Sil
            </button>
          </div>
        ))}
      </div>
      <h2>Ürün Güncelle</h2>

      <div className="form-section">
        <h3>Fotoğraf Ekle</h3>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Fotoğraf Yükle</button>
      </div>

      <div className="form-section">
        <h3>Ürün Bilgisi</h3>

        <label>Başlık</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Ürün Kodu</label>
        <input
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />

        <label>Açıklama</label>
        <textarea
          className="update-textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Müşteri Fiyatı</label>
        <input
          className="update-input"
          type="number"
          name="customerPrice"
          value={formData.prices.customer}
          onChange={handleChange}
        />

        <label>Bayi Fiyatı</label>
        <input
          className="update-input"
          type="number"
          name="companyPrice"
          value={formData.prices.company}
          onChange={handleChange}
        />

        <label>Stokta Var Mı?</label>
        <input
          className="update-input"
          type="checkbox"
          name="inStock"
          checked={formData.inStock}
          onChange={handleChange}
        />
        <br />

        <button className="update-product-btn" onClick={handleUpdate}>
          Ürünü Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateProduct;

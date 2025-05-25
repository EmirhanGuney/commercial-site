import { getCategories } from "../../../core/api/requests/categoryApi";
import { addProduct } from "../../../core/api/requests/productApi";
import "./AddProduct.css";
import React, { useEffect, useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    customerPrice: "",
    companyPrice: "",
    description: "",
    categoryId: "",
    subCategoryId: "",
    code : "",
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getCategoriesHandler = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "categoryId") {
      const selectedCategory = categories.find((c) => c.id === value);
      setSelectedCategory(selectedCategory);
      setFormData((prev) => ({ ...prev, subCategoryId: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      title: formData.title,
      prices: {
        customer: formData.customerPrice,
        company: formData.companyPrice,
      },
      description: formData.description,
      categoryId: formData.categoryId,
      subCategoryId: formData.subCategoryId,
      code: formData.code,
    };
    await addProduct(product);
  };

  return (
    <div className="add-product-container">
      <h2 className="form-title">Yeni Ürün Ekle</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Başlık</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ürün başlığı girin"
            required
          />
        </div>

        <div className="form-group">
          <label>Müşteri Fiyatı</label>
          <input
            type="number"
            name="customerPrice"
            value={formData.customerPrice}
            onChange={handleChange}
            placeholder="₺"
            required
          />
        </div>

        <div className="form-group">
          <label>Firma Fiyatı</label>
          <input
            type="number"
            name="companyPrice"
            value={formData.companyPrice}
            onChange={handleChange}
            placeholder="₺"
            required
          />
        </div>

        <div className="form-group">
          <label>Açıklama</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ürün açıklaması girin"
            required
          />
        </div>

        <div className="form-group">
          <label>Ürün Kodu</label>
          <textarea
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="Ürün kodu girin"
            required
          />
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Kategori seçin</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Alt Kategori</label>
          <select
            name="subCategoryId"
            value={formData.subCategoryId}
            onChange={handleChange}
            disabled={!formData.categoryId}
          >
            <option value="">Alt kategori seçin</option>
            {selectedCategory?.subCategories
              .filter((sub) => sub.name !== null)
              .map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Ürünü Ekle
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

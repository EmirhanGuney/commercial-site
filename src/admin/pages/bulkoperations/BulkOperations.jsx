import React, { useState, useEffect } from "react";
import "./BulkOperations.css";
import Accordion from "react-bootstrap/Accordion";

import { getCategories } from "../../../core/api/requests/categoryApi.js";
import { addBulkProduct } from "../../../core/api/requests/productApi.js";

function Category() {
  const [activeKey, setActiveKey] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const getCategoriesHandler = async () => {
    const result = await getCategories();
    setCategories(result);
  };

  useEffect(() => {
    getCategoriesHandler();
  }, []);

  const handleToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const handleSubCategoryClick = (categoryId, subCategoryId) => {
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(subCategoryId);
    console.log(
      "Selected Category ID:",
      categoryId,
      "Selected SubCategory ID:",
      subCategoryId
    );
  };

  const handleSubmit = async () => {
    if (!selectedCategoryId || !selectedSubCategoryId || !selectedFile) {
      alert("Lütfen tüm alanları doldurun ve bir dosya seçin.");
      return;
    }

    const formData = new FormData();
    formData.append("excel", selectedFile);
    formData.append("categoryId", selectedCategoryId);
    formData.append("subCategoryId", selectedSubCategoryId);
    await addBulkProduct(formData);
  };

  return (
    <div className="category-main">
      <span className="categories-header">
        Ürünleri Ekleyeceğiniz Kategoriyi Seçin
      </span>

      <div className="content-category">
        <Accordion activeKey={activeKey} className="accordion-category">
          {categories?.map((category, index) => (
            <Accordion.Item eventKey={index.toString()} key={category.id}>
              <Accordion.Header onClick={() => handleToggle(index.toString())}>
                {category.name}
              </Accordion.Header>
              <Accordion.Body className="category-accordion-body">
                {category?.subCategories?.length > 0 ? (
                  <div className="sub-categories">
                    {category?.subCategories?.map((sub) => (
                      <button
                        className={`sub-category-button ${
                          selectedSubCategoryId === sub.id ? "selected" : ""
                        }`}
                        onClick={() =>
                          handleSubCategoryClick(category.id, sub.id)
                        }
                        key={sub.id}
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>Alt kategori bulunmamaktadır.</p>
                )}
                <div className="bulk-operation-actions">
                  <input
                    type="file"
                    accept=".csv, .xlsx, .xls"
                    name="excel"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                  <button className="bulk-operation-btn" onClick={handleSubmit}>
                    İşlemi Başlat
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default Category;

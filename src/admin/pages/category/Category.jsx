import React, { useState, useEffect } from "react";
import "./Category.css";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  getCategories,
  addCategory,
  addSubCategory,
  updateCategoryName,
  updateSubCategoryName,
} from "../../../core/api/requests/categoryApi.js";
import { RiFunctionAddLine } from "react-icons/ri";
import { TbCategoryPlus } from "react-icons/tb";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { FaPen } from "react-icons/fa";

function Category() {
  const [activeKey, setActiveKey] = useState(null);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [inputName, setInputName] = useState("");
  const [modalType, setModalType] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);

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

  const handleShowModal = (modalType, categoryId = null, subCategoryId = null) => {
    setModalType(modalType);
    setSelectedCategoryId(categoryId);
    setSelectedSubCategoryId(subCategoryId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInputName("");
  };

  const handleAddCategory = async () => {
    await addCategory(inputName);
  }

  const handleAddSubCategory = async () => {
    if(!selectedCategoryId){
      return;
    }
    await addSubCategory(selectedCategoryId, inputName);
  }

  const handleUpdateCategory = async () => {
    if(!selectedCategoryId){
      return;
    }
    await updateCategoryName(selectedCategoryId, inputName);
  }

  const handleUpdateSubCategory = async () => {
    if(!selectedCategoryId || !selectedSubCategoryId){
      return;
    }
    await updateSubCategoryName(selectedCategoryId, selectedSubCategoryId, inputName);
  }

  const handleAdd = async () => {
    if (!inputName.trim()) return;

    switch (modalType) {
      case "addCategory":
        await handleAddCategory();
        break;
      case "addSubCategory":
        await handleAddSubCategory();
        break;
      case "updateCategory":
        await handleUpdateCategory();
        break;
      case "updateSubCategory":
        await handleUpdateSubCategory();
        break;
      
      default:
        break;
    }

    handleCloseModal();
    getCategoriesHandler();
  };

  const showModalTitle = () => {
    switch (modalType) {
      case "addCategory":
        return "Kategori Ekle"
      case "updateCategory": 
        return "Kategori Güncelle"
      case "addSubCategory":
        return "Alt Kategori Ekle"
      case "updateSubCategory":
        return "Alt Kategori Güncelle"
    
      default:
        return ""
    }
  }

  const showModalLabel = () => {
    switch (modalType) {
      case "addCategory":
        return "Kategori Adı"
      case "updateCategory": 
        return "Yeni Kategori Adı"
      case "addSubCategory":
        return "Alt Kategori Adı"
      case "updateSubCategory":
        return "Yeni Alt Kategori Adı"
    
      default:
        return ""
    }
  }

  const showModalPlaceholder = () => {
    switch (modalType) {
      case "addCategory":
        return "Kategori adı giriniz"
      case "updateCategory": 
        return "Yeni kategori adı giriniz"
      case "addSubCategory":
        return "Alt kategori adı giriniz"
      case "updateSubCategory":
        return "Yeni alt kategori adı giriniz"
    
      default:
        return ""
    }
  }

  return (
    <div className="category-main">
      <span className="categories-header">Kategori Bilgileri</span>
      <button className="add-category-button" onClick={() => handleShowModal("addCategory")}>
        <RiFunctionAddLine className="add-category-icon" />
      </button>
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
                      <div style={{display:"flex", flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                      <span key={sub.id}>{sub.name}</span>
                      <button onClick={() => {
                        handleShowModal("updateSubCategory", category.id, sub.id);
                      }} className="update-sub-button">
                        <FaPen/>
                      </button>
                      </div>
                      
                    ))}
                  </div>
                ) : (
                  <p>Alt kategori bulunmamaktadır.</p>
                )}
                <div className="category-buttons">
                  <button
                    className="rename-category-button"
                    onClick={() => handleShowModal("updateCategory", category.id)}
                  >
                    <MdDriveFileRenameOutline className="add-subcategory-icon" />
                  </button>
                  <button
                    className="add-category"
                    onClick={() => handleShowModal("addSubCategory", category.id)}
                  >
                    <TbCategoryPlus className="add-subcategory-icon" />
                  </button>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {showModalTitle()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>
                {showModalLabel()}
              </Form.Label>
              <Form.Control
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder={
                  showModalPlaceholder()
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Kapat
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Ekle
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Category;

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import "./ProductList.css";
import Header from "../../components/header/Header";
import ProductArea from "../../components/productarea/ProductArea";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loaders/Loader";
import "./ProductList.css";
import { useNavigate } from "react-router-dom";
import {
  getFavoriteProducts,
  getProducts,
} from "../../core/api/requests/productApi";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 20;

  const [searchParams] = useSearchParams();
  const prevSearchParamsRef = useRef(searchParams);
  const navigate = useNavigate();

  const categoryId = searchParams.get("categoryId");
  const subCategoryId = searchParams.get("subCategoryId");
  const searchTerm = searchParams.get("searchTerm");
  const inStockParam = searchParams.get("inStock");
  const inStock = inStockParam === null ? null : inStockParam === "true";
  const isFavoriteParam = searchParams.get("isFavorite");
  const isFavorite =
    isFavoriteParam === null ? null : isFavoriteParam === "true";

  const getProductsByFilter = async () => {
    const filters = {
      categoryId: categoryId ? categoryId : undefined,
      subCategoryId: subCategoryId ? subCategoryId : undefined,
      searchTerm,
      inStock,
      page: selectedPage,
      limit,
    };
    const result = await getProducts(filters);
    setProducts(result.products);
    setMaxPage(result.pagination.totalPage);
    setLoading(false);
  };

  const getFavoriteProductsHandler = async () => {
    const result = await getFavoriteProducts();
    setProducts(result.products);
    setLoading(false);
  };

  useEffect(() => {
    const prevSearchParams = prevSearchParamsRef.current;

    const isSearchParamsChanged = prevSearchParams !== searchParams;

    if (isSearchParamsChanged) {
      setSelectedPage(1);
    }

    prevSearchParamsRef.current = searchParams;

    setLoading(true);
    if (!isFavorite) {
      getProductsByFilter();
    } else {
      getFavoriteProductsHandler();
    }
  }, [searchParams, selectedPage]);

  const handlePrevious = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const handleNext = () => {
    setSelectedPage(selectedPage + 1);
  };

  return (
    <div className="productlist-main">
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
        <div className="productlist-content">
          <span className="category-show-area">
            {" "}
            Ürünler {" > "}
            {categoryId === "1"
              ? "Nano Cam Kesme Makinesi"
              : categoryId === "2"
              ? "Akıllı Saat"
              : categoryId === "3"
              ? "Arka Kaplama"
              : categoryId === "4"
              ? "Aksesuar"
              : categoryId === "5"
              ? "Rova Nano"
              : categoryId === "6"
              ? "Batarya"
              : ""}
          </span>
          <ProductArea
            products={products}
            refreshProducts={
              isFavorite ? getFavoriteProductsHandler : getProductsByFilter
            }
          />
          <div className="productlist-navigate-buttons">
            <button onClick={handlePrevious} disabled={selectedPage === 1}>
              Geri
            </button>
            {selectedPage} / {maxPage}
            <button onClick={handleNext}>İleri</button>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default ProductList;

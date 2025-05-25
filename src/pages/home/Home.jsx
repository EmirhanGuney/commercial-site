import React, { useEffect, useState } from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import SliderComponent from "../../components/slider/SliderComponent";
import ProductArea from "../../components/productarea/ProductArea";
import Footer from "../../components/footer/Footer";
import Loader from "../../components/loaders/Loader.jsx";
import { getProducts } from "../../core/api/requests/productApi.js";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const limit = 20;

  const getSelectedProducts = async () => {
    setLoading(true);
    const result = await getProducts({
      page: selectedPage,
      limit
    });
    setProducts(result.products);
    setMaxPage(result.pagination.totalPage)
    setLoading(false);
  };

  useEffect(() => {
    getSelectedProducts();
  }, [selectedPage]);

  
  const handlePrevious = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const handleNext = () => {
    setSelectedPage(selectedPage + 1);
  };

  return (
    <div className="home-main">
      <Header />

      <div className="home-content">
        <div className="slider-area">
          <SliderComponent />
        </div>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70vh",
            }}
          >
            {" "}
            <Loader />{" "}
          </div>
        ) : (
          <ProductArea products={products} refreshProducts={getSelectedProducts} />
        )}
        <div className="home-navigate-buttons">
        <button onClick={handlePrevious} disabled={selectedPage === 1}>
        Geri
      </button>

      <span>{selectedPage} / {maxPage}</span>

      <button onClick={handleNext}>İleri</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;

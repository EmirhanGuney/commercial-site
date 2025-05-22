import React, { useEffect, useRef, useState } from "react";
import "./Products.css";
import ProductCard from "../../components/cards/productcard/ProductCard";
import Navbar from "../../components/navbar/Navbar";
import { getProductsForAdmin } from "../../../core/api/requests/productApi";

function Products() {

  const [products, setProducts] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 18;
  const prevSearchParamsRef = useRef(searchTerm);

  const getProductsHandler = async () => {
    const result = await getProductsForAdmin({
      page: selectedPage,
      limit,
      searchTerm,
    });
    setProducts(result.products);
    setMaxPage(result.pagination.totalPage);
  };

  useEffect(() => {
    const prevSearchParams = prevSearchParamsRef.current;

    const isSearchParamsChanged = prevSearchParams !== searchTerm;

    if (isSearchParamsChanged) {
      setSelectedPage(1);
    }
    prevSearchParamsRef.current = searchTerm;
    getProductsHandler();
  }, [selectedPage, searchTerm]);

  const handlePrevious = () => {
    if (selectedPage > 1) {
      setSelectedPage(selectedPage - 1);
    }
  };

  const handleNext = () => {
    if (selectedPage >= maxPage) return;
    setSelectedPage(selectedPage + 1);
  };

  return (
    <div className="products-main">
      <Navbar searchTermSetter={setSearchTerm} />
      <div className="content-products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </div>
      <div className="admin-navigate-area">
        {selectedPage > 1 && (
          <button onClick={handlePrevious} disabled={selectedPage === 1}>
            Geri
          </button>
        )}

        <span>
          {selectedPage} / {maxPage}
        </span>
        {selectedPage < maxPage && <button onClick={handleNext}>İleri</button>}
      </div>
    </div>
  );
}

export default Products;

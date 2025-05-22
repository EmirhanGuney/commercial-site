import React from "react";

import ProductCard from "../card/productcard/ProductCard";
import "./ProductArea.css";
function ProductArea({ products, refreshProducts }) {
  return (
    <div className="product-area">
      {Array.from(products).map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          refreshProducts={refreshProducts}
        />
      ))}
    </div>
  );
}

export default ProductArea;

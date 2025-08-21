import React from "react";
import { productData } from '../productsdata/productsdata';
import { Link } from "react-router-dom";
import "./fashionpage.css";

const ElectronicsPage = ({searchQuery}) => {
 const electronicsProducts = productData.electronics.filter(
    (item) => item.category === "mobile" || item.category === "laptops" || item.category === "smartwatchs" || item.category === "smartTvs" || item.category === ""
  );

   // Then filter based on search query if provided
  const filteredProducts = searchQuery
    ? electronicsProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : electronicsProducts;

 return (
    <div className="fashion-container">
      <h2>Electronics Collection</h2>
      <div className="fashion-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found for "{searchQuery}"</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="fashion-card">
              <img src={product.image} alt={product.name} />
              <h3>
                {product.name.length > 30
                  ? product.name.slice(0, 30) + "..."
                  : product.name}
              </h3>
              <p>{product.price}</p>
              <Link
                to={`/products/${product.id}`}
                className="view-details-button"
              >
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ElectronicsPage;

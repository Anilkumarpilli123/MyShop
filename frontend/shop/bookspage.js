import React from "react";
import { productData } from '../productsdata/productsdata';
import { Link } from "react-router-dom";
import "./fashionpage.css";

const BooksPage = ({searchQuery}) => {
 const booksProducts = productData.books.filter(
    (item) => item.category === "fictionbooks" || item.category === "personaldevelopmentbooks" || item.category === "educationalbooks" || item.category === "" || item.category === ""
  );

   // Then filter based on search query if provided
  const filteredProducts = searchQuery
    ? booksProducts.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : booksProducts;

 return (
    <div className="fashion-container">
      <h2>Books Collection</h2>
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

export default BooksPage;

import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react"; 
import  { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import wishlistIcon from '../assets/wishlist.png'; 
import { useWishlist } from "../context/wishlistcontext";
import { BuyNowContext } from "../context/buynowcontext";
import { productData } from '../productsdata/productsdata';
import "./product.css";        


const ProductDetails = () => {
  const { id } = useParams();
  const { addToBuyNow } = useContext(BuyNowContext);
  const navigate = useNavigate();
  const { addToWishlist, isInWishlist } = useWishlist();

  const allProducts = Object.values(productData).flat();
  const product = allProducts.find((product) => product.id === parseInt(id));

  
  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [colourError, setColourError] = useState(false);
  const [selectedQty, setSelectedQty] = useState("");
  const [quantityError, setQuantityError] = useState(false);
  const [pincode, setPincode] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  if (!product) return <div>Product not found</div>;

  
  const isShirt = ["shirt", "tee", "polo", "jacket", "hoodie"].some(type =>
    product.name.toLowerCase().includes(type)
  );
  const istoysandbooks = ["actiontoys", "remotecontroltoys", "softteddytoys", "fictionbooks", "personaldevelopmentbooks", "educationalbooks"].includes(product.category?.toLowerCase());
  const isElectronics = ["mobile", "laptops", "smartTvs", "smartwatchs", "handbag"].includes(product.category);

  const shoeSizes = ["6", "7", "8", "9", "10", "11"];
  const shirtSizes = ["S", "M", "L", "XL", "XXL"];
  const sizes = isShirt ? shirtSizes : shoeSizes;

  const toysandbooksquantity = ["1", "2", "3", "4", "5"];
  const quantities = toysandbooksquantity;

  const electronicsColors = {
    handbag: ["Black", "White", "Grey", "Sliver", "Green"],
    mobile: ["Black", "White", "Blue", "Silver"],
    laptops: ["Gray", "Silver", "Black", "White"],
    smartTvs: ["Black", "Gray"],
    smartwatchs: ["Black", "White", "Grey", "Pink"],
  };
  const colors = isElectronics ? electronicsColors[product.category] || [] : [];

  const handleAddToWishlist = () => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
    } else {
      alert("This product is already in your wishlist.");
    }
  };

  const handleBuyNow = () => {
    if (["shoes", "shirts", "jacket", "hoodies"].includes(product.category) && !selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1000);
      return;
    }
     if (["mobile", "laptops", "handbag", "smartwatchs", "smartTvs"].includes(product.category) && !selectedColor) {
      setColourError(true);
      setTimeout(() => setColourError(false), 1000);
      return;
    }
     if (["actiontoys", "remotecontroltoys", "softteddytoys", "fictionbooks", "personaldevelopmentbooks", "educationalbooks"].includes(product.category) && !selectedQty) {
      setQuantityError(true);
      setTimeout(() => setQuantityError(false), 1000);
      return;
    }

    addToBuyNow({
      ...product,
      size: selectedSize,
      selectedSize: ["shoes", "shirts", "jacket", "hoodies"].includes(product.category) ? selectedSize : null,
      color: selectedColor,
      selectedColor: ["mobile", "laptops", "handbag", "smartwatchs", "smartTvs"].includes(product.category) ? selectedColor : null,
      qty: parseInt(selectedQty) || 1,
      selectedQty: ["actiontoys", "remotecontroltoys", "softteddytoys", "fictionbooks", "personaldevelopmentbooks", "educationalbooks"].includes(product.category) ? selectedQty : 1
    });

    navigate("/buynow");
  };

  const handlePincodeCheck = () => {
    const trimmed = pincode.trim();
    if (/^\d{6}$/.test(trimmed)) {
      setMessage(`Checking delivery availability for ${trimmed}`);
      setIsError(false);
    } else {
      setMessage("Please enter a valid 6-digit pincode.");
      setIsError(true);
    }
    setPincode("");
  };


  return (
    <div> 
      <section className="hero1">
        <div className="overlay1">
        <h2 style={{marginBottom: "10px", marginLeft: "34px"}} className="hero-title">Product Details</h2>
        </div>
      </section>
    <div
  style={{
    display: "flex",
    alignItems: "flex-start",
    gap: "30px",
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    flexWrap: "wrap"
  }}
>
  {/* Left: Product Image */}
  <img
    className="productimage"
    src={product.image}
    alt={product.name}
    style={{
      width: "100%",
      maxWidth: "400px",
      height: "auto",
      objectFit: "cover",
      borderRadius: "8px"
    }}
  />

  {/* Right: Product Info */}
  <div style={{ flex: 1 }} className="product-info">
    <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>{product.name}</h2>
    <p style={{ fontSize: "20px", color: "#b12704", marginBottom: "15px" }}>{product.price}</p>
    {!isElectronics && !istoysandbooks &&(
    <div className={`size-filter ${sizeError ? "shake" : ""}`}>
  <strong>Select Size:</strong>
  <div className="size-options">
    {sizes.map((size) => (
      <button
        key={size}
        onClick={() => setSelectedSize(size)}
        className={`size-button ${selectedSize === size ? "selected" : ""}`}
      >
        {size}
      </button>
    ))}
  </div>
  {selectedSize && (
    <p className="selected-size">
      Selected Size: {selectedSize}
    </p>
  )} 
  {sizeError && <p className="size-warning">Please select a size before proceeding.</p>}
</div>
)}
{colors.length > 0 && (
  <div className={`color-filter ${colourError ? "shake" : ""}`} style={{ marginTop: "20px" }}>
    <strong>Select Color:</strong>
    <div className="color-options" style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
      {colors.map(color => (
       <button
  key={color}
  title={color}
  onClick={() => setSelectedColor(color)}
  className={`color-button ${selectedColor === color ? "selected" : ""}`}
  style={{
    backgroundColor: color.toLowerCase(),
    color: color.toLowerCase() === "white" ? "black" : "white",
    border: selectedColor === color ? "2px solid #000" : "1px solid #ccc",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    textIndent: "-9999px",
    cursor: "pointer"
  }}
>
  {color}
</button>

      ))}
    </div>
    {selectedColor && (
      <p className="selected-color" style={{ marginTop: "10px", color: "green" }}>
        Selected Color: {selectedColor}
      </p>
    )} 
    {colourError && <p className="size-warning">Please select a color before proceeding.</p>}
  </div>
)}
{istoysandbooks && (
    <div className={`quantity-filter ${quantityError ? "shake" : ""}`}>
  <strong>Select Qty:</strong>
  <div className="quantity-options">
    {quantities.map((qty) => (
      <button
        key={qty}
        onClick={() => setSelectedQty(qty)}
        className={`quantity-button ${selectedQty === qty ? "selected" : ""}`}
      >
        {qty}
      </button>
    ))}
  </div>
  {selectedQty && (
    <p className="selected-quantity">
      Selected quantity: {selectedQty}
    </p>
  )} 
  {quantityError && <p className="quantity-warning">Please select a quantity before proceeding.</p>}
</div>
)}
<div className="button-group">
  <button
  className="Wishlist"
  onClick={handleAddToWishlist}
  disabled={isInWishlist(product.id)}
>
  <img src={wishlistIcon} alt="Wishlist Icon" />
  {isInWishlist(product.id) ? "Added" : "Wishlist"}
</button>
    <button className="BuyNow" onClick={handleBuyNow}>
        Buy Now     
    </button>
</div>
    
    <p style={{ marginBottom: "15px" }}>
      <strong>Delivery Options</strong>   
    </p>
    <div>
      <input type="number" id="pincode" name="pincode" placeholder="Enter Pincode" maxLength="6" value={pincode} onChange={(e) => setPincode(e.target.value)} inputMode="numeric"/> 
      <button onClick={handlePincodeCheck} className="check-pincode">Check</button>
      {message && (
        <p style={{ color: isError ? 'red' : 'green', marginTop: '0.5rem', fontSize: '15px' }}>
          {message}
        </p>
      )}
      <h6>Please enter PIN code to check delivery time & Pay on Delivery Availability</h6>
      <ul className="delivery-options" style={{ listStyleType: "none", paddingLeft: "0",}}>
        <li style={{marginBottom: "10px"}}>Free delivery on orders over $50</li>
        <li style={{marginBottom: "10px"}}>Cash on Delivery available</li>
        <li style={{marginBottom: "10px"}}>Estimated delivery in 3-5 business days</li>
        <li style={{marginBottom: "10px"}}>Easy returns within 30 days</li>
      </ul>
      <hr style={{ marginTop: "10px", border: "none", borderTop: "1px solid #ccc" }} />
    </div>
    
    <p style={{ marginBottom: "25px" }}>
      <strong>Description:</strong> {product.description}
    </p>
    <div>
      <strong>Features:</strong>
      <ul>
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul> 
      
    </div>
    <div className="use-case" style={{marginBottom: "25px"}}>
      <strong>Use Case:</strong> {product.useCase}
      </div>
  </div>
</div>

    </div>
  );
};

export default ProductDetails;

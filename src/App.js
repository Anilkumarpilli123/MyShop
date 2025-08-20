// App.js
import React, { useState } from 'react'; 
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './frontend/context/CartContext'; 
import { WishlistProvider } from './frontend/context/wishlistcontext'; 
import { BuyNowProvider } from './frontend/context/buynowcontext';
import { AuthProvider } from "./frontend/context/AuthContext";
import HomePage from './frontend/homepage/homepage';
import Navbar from './frontend/navbar/navbar'; 
import Footer from './frontend/footer/footer';
import ProductDetails from './frontend/productdetails/product';
import ProfilePage from './frontend/profile/profile'; 
import CartPage from './frontend/cart/CartPage';
import CategoryPage from './frontend/Category/CategoryPage';
import WishlistPage from './frontend/wishlist/wishlistpage'; 
import FashionPage from './frontend/shop/fashionpage';
import BuyNowPage from './frontend/buynow/buynowpage';
import AddressPage from './frontend/address/addresspage';
import PaymentPage from './frontend/payment/paymentpage'; 
import BookingConfirmed from './frontend/bookings/BookingConfirmed';
import OrdersPage from './frontend/OrdersPage/orderspage';
import OrderTrackingPage from './frontend/OrderTracking/ordertrackingpage';
import ElectronicsPage from './frontend/shop/electronicspage';
import ToysPage from './frontend/shop/toyspage';
import BooksPage from './frontend/shop/bookspage';
import CheckoutFooter from './frontend/footer/checkoutfooter';
import ScrollToTop from './ScrollToTop';

// Create a wrapper component that will contain the logic for showing different navbars
const AppContent = ({ onContactClick, onSearch }) => {
  const location = useLocation();
  const shouldHideNavbar  = ['/buynow', '/address', '/paymentpage', '/booking-confirmed'].includes(location.pathname);
 const [searchQuery, setSearchQuery] = useState("");
 const [user, setUser] = useState(null);
  return (
    <>
      {!shouldHideNavbar && (
  <Navbar 
    user={user} 
    setUser={setUser} 
    onContactClick={onContactClick} 
    onSearch={setSearchQuery} 
  />
)}

      {/* Your routes and other content */}
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/fashion" element={<FashionPage searchQuery={searchQuery}/>} />
            <Route path="/electronics" element={<ElectronicsPage searchQuery={searchQuery}/>} />
            <Route path="/toys" element={<ToysPage searchQuery={searchQuery}/>} />
            <Route path="/books" element={<BooksPage searchQuery={searchQuery}/>} />
            <Route path="/buynow" element={<BuyNowPage />} />
            <Route path='/address' element={<AddressPage />} />
            <Route path='/paymentpage' element={<PaymentPage />} />
            <Route path='/booking-confirmed' element={<BookingConfirmed />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/order-tracking' element={<OrderTrackingPage />} />
      </Routes>
      {shouldHideNavbar  ? <CheckoutFooter /> : <Footer />}
    </>
  );
};

function App() {
  const [showContact, setShowContact] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [, setToastMsg] = React.useState(false);
  const [contactSuccess, setContactSuccess] = React.useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleContactClick = () => {
    setShowContact(true);
  };

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  const handleContactChange = (e) => {
    const {name, value} = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting contact form:", formData);

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setContactSuccess(true);
        setShowContact(false);
      } else {
        setToastMsg(data.message || "Submission failed");
      }

      setFormData({
        name: "",
        email: "",
        number: "",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setToastMsg("There was a problem submitting the form.");
    }
  };

  return (
    <AuthProvider>
      <BuyNowProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="app-container">
              <Router>
                <ScrollToTop />
                <AppContent 
                  onContactClick={handleContactClick} 
                  // onSearch={handleSearch} 
                />

                {showContact && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <span className="close-icon" onClick={() => setShowContact(false)}>X</span>
                      <h2>Contact Us</h2>
                      <form className="contact-form" onSubmit={handleContactSubmit}>
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleContactChange} required />
                        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleContactChange} required />
                        <input type="tel" name="number" placeholder="Phone Number" value={formData.number} onChange={handleContactChange} required />
                        <textarea name='message' placeholder="Your Message" rows="4" value={formData.message} onChange={handleContactChange} required></textarea>
                        <div className="button-wrapper">
                          <button type="submit">Send</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {contactSuccess && (
                  <div className="modal-overlay">
                    <div className="modal">
                      <span className="close-icon" onClick={() => setContactSuccess(false)}>X</span>
                      <h2>Message Sent ✅</h2>
                      <p>Thanks for reaching out! We'll get back to you shortly.</p>
                      <div className="button-wrapper">
                        <button onClick={() => setContactSuccess(false)}>Close</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* <Footer /> */}
              </Router>
            </div>
          </WishlistProvider>
        </CartProvider>
      </BuyNowProvider>
    </AuthProvider>
  );
}

export default App;
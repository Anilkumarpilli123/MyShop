// App.js
import React, { useState } from 'react'; 
import './App.css'; 
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './CartContext'; 
import { WishlistProvider } from './wishlistcontext'; 
import { BuyNowProvider } from './buynowcontext';
import { AuthProvider } from "./AuthContext";
import HomePage from './homepage/homepage';
import Navbar from './navbar/navbar'; 
import Footer from './footer/footer';
import ProductDetails from './productdetails/product';
import ProfilePage from './profile/profile'; 
import CartPage from './cart/CartPage';
import CategoryPage from './Category/CategoryPage';
import WishlistPage from './wishlist/wishlistpage'; 
import FashionPage from './shop/fashionpage';
import BuyNowPage from './buynow/buynowpage';
import AddressPage from './address/addresspage';
import PaymentPage from './payment/paymentpage'; 
import BookingConfirmed from './bookings/BookingConfirmed';
import OrdersPage from './OrdersPage/orderspage';
import OrderTrackingPage from './OrderTracking/ordertrackingpage';
import ElectronicsPage from './shop/electronicspage';
import ToysPage from './shop/toyspage';
import BooksPage from './shop/bookspage';
import CheckoutFooter from './footer/checkoutfooter';
import ScrollToTop from './ScrollToTop';

// Create a wrapper component that will contain the logic for showing different navbars
const AppContent = ({ onContactClick, onSearch }) => {
  const location = useLocation();
  const shouldHideNavbar  = ['/buynow', '/address', '/paymentpage', '/booking-confirmed'].includes(location.pathname);
 const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      {!shouldHideNavbar  && (
        <Navbar onContactClick={onContactClick} onSearch={setSearchQuery} />
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
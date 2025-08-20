import React, { useState } from 'react'; 
import './footer.css';

function Footer() {
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(email.trim()) {
            setShowModal(true);
            setEmail('');
        }
    };

    const closeModal = () => {
        setShowModal(false);
    }
  return (
    <div style={{ marginTop: 'auto' }}>
    <footer className="footer">
        <div className='footer-top'>
            <div className='footer-newsletter'>
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get the latest updates on new products and upcoming sales</p>
                <form className='newsletter-form' onSubmit={handleSubscribe}>
                    <input type="email" id='subEmail' placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <button type="submit" id='subbtn'>Subscribe</button> 
                </form> 
            </div>

            <div className='footer-links'>
                <h4>Quick Links</h4>
                <div className='links-columns'>
                    <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/about">About Us</a></li> 
                </ul> 
                <ul>
                    <li><a href="/contact">Contact Us</a></li>  
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>  
                </ul> 
                </div> 
            </div>

            <div className='footer-contact'>
                <h4>Contact Us</h4>
                <p>Email: support@myshop.com</p>
                <p>Phone: +1 (800) 123-4567</p>
                <div className='social-icons'>
                    <a href="#"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-linkedin-in"></i></a> 
                </div> 
            </div>
        </div>
        <div className='footer-bottom'>
            <p>&copy; 2025 MyShop. All rights reserved.</p> 
        </div>

        {/* modal */}
        {showModal && (
            <div className='modal-overlay'>
                <div className='modal-box'>
                    <h3>Thank You!</h3>
                    <p>You have successfully subscribed to our newsletter.</p>
                    <button onClick={closeModal}>OK</button>
                </div>
            </div>
        )}
    </footer>
    </div>
  );
}

export default Footer;

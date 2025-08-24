 import React from "react";
 import API_BASE_URL from "../../config";
 import { Link } from "react-router-dom";
 import { useState } from "react";
 import { useNavigate } from "react-router-dom";
 import "./navbar.css";  
 import { jwtDecode } from "jwt-decode"; 
 import { useAuth } from "../context/AuthContext";


 const Navbar = ({ onContactClick, onSearch }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  }; 
  // const [loginSuccess, setLoginSuccess] = useState("");
  // const [signupSuccess, setSignupSuccess] = useState("");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loginErrors, setLoginErrors] = useState({}); 
  const { user, setUser } = useAuth();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotError, setForgotError] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState("");

  const [showResetPassword, setShowResetPassword] = useState(false);
const [resetData, setResetData] = useState({ 
  email: '', 
  otp: '', 
  newPassword: '', 
  confirmPassword: '' 
});
const [resetErrors, setResetErrors] = useState({});

const [isMobileLoginListOpen, setIsMobileLoginListOpen] = useState(false);
const [isMobileUserListOpen, setIsMobileUserListOpen] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({...loginData, [e.target.name]: e.target.value})
  }

  const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000); 
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="toast-notification">
    {message}
    </div>
  );
};

const [toastMsg, setToastMsg] = useState("");


  const validateLogin = () => {
      const errors = {};
      if (!loginData.email){
        errors.email = "Email is required";
      }else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
        errors.email = "Email is invalid";
      }

      if (!loginData.password) {
        errors.password = "Password is required";
      }else if (loginData.password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

    return errors;
  };

  const [signupData, setSignupData] = useState({ firstName: "", lastName: "", phone: "", gender: "", email: "", password: "" });
  const [signupErrors, setSignupErrors] = useState({});

const handleSignupChange = (e) => {
  setSignupData({ ...signupData, [e.target.name]: e.target.value });
};

// const [loginHint, setLoginHint] = useState("");

React.useEffect(() => {
  const token = localStorage.getItem("jwtToken");
  
  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
    
      if (decoded.exp < currentTime) {
        // Token expired
        localStorage.removeItem("jwtToken");
        setShowLogin(true); // Automatically open Login modal
      }
    } catch (err) {
      // Token is invalid or corrupted
      localStorage.removeItem("jwtToken");
      setShowLogin(true); // Show login on corrupt token
    }
  } else {
    // No token found, open Signup modal
    setShowLogin(true);
  }
}, []);

 
const validateSignup = () => {
  const errors = {};
  if (!signupData.firstName.trim()) {
    errors.firstName = "First name is required";
  }

  if (!signupData.lastName.trim()) {
    errors.lastName = "Last name is required";
  }

  if (!signupData.phone.trim()) {
  errors.phone = "Mobile Number is required";
} else if (!/^\d{10}$/.test(signupData.phone.trim())) {
  errors.phone = "Mobile Number must be exactly 10 digits";
}

  if (!signupData.gender) {
    errors.gender = "Select Gender";
  }

  if (!signupData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
    errors.email = "Invalid email format";
  }

  if (!signupData.password) {
    errors.password = "Password is required";
  } else if (signupData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  return errors;
};

const resetLoginForm = () => {
  setLoginData({ email: "", password: ""});
  setLoginErrors({});
  setShowLogin(false);
}

const resetSignupForm = () => {
  setSignupData({ firstName: "", lastName: "", phone: "", gender: "", email: "", password: "" });
  setSignupErrors({});
  setShowSignup(false);
}

const handleSignupSubmit = async (e) => {
  e.preventDefault();
  const errors = validateSignup();
  if (Object.keys(errors).length === 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setToastMsg("Signup successful! Please login.");
        resetSignupForm();
        setShowSignup(false);
        setShowLogin(true);  
      } else {
        setToastMsg(data.message || "Signup failed");
      }
    } catch (error) {
      setToastMsg("Signup failed");
    }
  } else {
    setSignupErrors(errors);
  }
}; 



  const handleLoginSubmit = async (e) => {
  e.preventDefault();
  const errors = validateLogin();
  // const token = localStorage.getItem("token");
  // localStorage.setItem("token", data.token)
  if (Object.keys(errors).length === 0) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { 
          // 'Authorization': `Bearer ${token}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

    const data = await response.json();
    console.log(data);

  if (response.ok && data.token) {
  const decoded = jwtDecode(data.token);
  setUser(decoded.user || decoded);
  onLoginSuccess(data.token);
}

if (data.token) {
  // Save token for later use, e.g. localStorage
  localStorage.setItem("jwtToken", data.token);
} else {
  console.log("Login failed or token missing");
}

      if (response.ok) {
        setToastMsg("Login successful!");
        resetLoginForm();
        setShowLogin(false);
        // Save user info or token to localStorage/session or context if you want
        // For example:
        // localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        setToastMsg(data.message || "Login failed");
      }
    } catch (error) {
      setToastMsg("Login failed");
    }
  } else {
    setLoginErrors(errors);
  }
};
 

  const [showContact, setshowContact] = React.useState(false);
    
  // const [searchQuery, setSearchQuery] = React.useState("");

  const [showLogin, setShowLogin] = React.useState(false);
  const [showSignup, setShowSignup] = React.useState(false);

  const handleSearchChange = (e) => {
  const query = e.target.value.trim().toLowerCase();
  // setSearchQuery(query);
  if (onSearch) onSearch(query);
  };
   
  const handleLogout = () => {
  localStorage.removeItem("jwtToken");
  setUser(null); // Clear the auth context
  setToastMsg("Logged out successfully");
  // window.location.href = "/"; 
};

const { handleLoginOrSignup } = useAuth();

const onLoginSuccess = (token) => {
  handleLoginOrSignup(token);
  setShowLogin(false);       
  setToastMsg("Login successful!");
};
 

  return (
    <header className="header">
      <div className="logo-search-wrapper">
      <h1 className="logo" onClick={handleHomeClick} style={{cursor: "pointer"}}>MyShop</h1>
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search products..."
            onChange={handleSearchChange} 
          />
        </form> 
      <div className="user-container">
      {user ? (
        <div className="login-container">
          <span
  className="user-name"
  onClick={() => {
    if (window.innerWidth <= 768) {
      setIsMobileUserListOpen((prev) => !prev);
    }
  }}
  style={{ cursor: "pointer" }}
>
  Hi,&nbsp;&nbsp;{user.name || user.firstName || "User"}
</span>
          {(window.innerWidth > 768 || isMobileUserListOpen) && (
  <ul className="user-dropdown">
    <li><a href="/profile" className="profile-link">My Profile</a></li>
    <li><a href="/orders" className="orders-link">Orders</a></li>
    <li><a href="/wishlist" className="wishlist-link">Wishlist</a></li>
    <li><a href="/buynow" className="bag-link">Bag</a></li>
    <li><a href="/order-tracking" className="tracking-link">Order Tracking</a></li>
    <li>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </li>
  </ul>
)}

        </div>
      ) : (
        <div className="login-container">
          <button
  className="login-button"
  onClick={() => {
    if (window.innerWidth > 768) {
      setShowLogin(true); // Open modal only on desktop
    } else {
      setIsMobileLoginListOpen((prev) => !prev);
    }
  }}
>
  Login
</button>

          {(window.innerWidth > 768 || isMobileLoginListOpen) && (
  <ul className="login-dropdown">
    <li style={{ cursor: "default" }}>
      New Customer?&nbsp;
      <span className="signup-link" onClick={() => setShowSignup(true)}>SignUp</span>
    </li>
    <li>
      <span className="profile-link" onClick={() => setShowLogin(true)}>Login</span>
    </li>
    <li><a href="/orders" className="orders-link">Orders</a></li>
    <li><a href="/wishlist" className="wishlist-link">Wishlist</a></li>
    <li><a href="/order-tracking" className="tracking-link">Order Tracking</a></li>
  </ul>
)}

        </div>
      )}
    </div>
    </div>   
      <nav>
        <ul className="nav-links">
          {/* <li onClick={handleHomeClick}>Home</li> */}
          <li className="dropdown">
            Shop
            <ul className="dropdown-menu">
                 <li><Link to="/Electronics">Electronics</Link></li>
                 <li><Link to="/Toys">Toys</Link></li>
                 <li><Link to="/fashion">Fashion</Link></li>
                 <li><Link to="/Books">Books</Link></li>
            </ul>
            </li>
        <li onClick={onContactClick}>Contact</li>
        <li><Link to="/wishlist" className="wishlist-link">Wishlist</Link></li>
        <li>
          <Link to="/cart" className="cart-link">
          <span>Cart</span> 🛒
          </Link>
       </li>
        </ul>


        {/* Contact Section */}
      {showContact && (
          <div className="modal-overlay">
            <div className="modal">
              <span className="close-icon" onClick={() => setshowContact(false)}>X</span> 
            <h2>Contact Us</h2>   
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <input type="tel" placeholder="Phone Number" required />
              <textarea placeholder="Your Message" rows='4' required></textarea>
              <div className="button-wrapper">
                <button type="submit">Send</button>
              </div> 
            </form> 
          </div>
          </div>
      )}

      {toastMsg && <Toast message={toastMsg} onClose={() => setToastMsg("")} />}


      {/* Login Section */}
      {showLogin && (
  <div className="login-modal-overlay">
    <div className="login-modal advanced">
      <span className="login-close-icon" onClick={resetLoginForm}>X</span>
      <h2 className="modal-title">Welcome Back 👋</h2>
      <p className="modal-subtitle">Login to continue shopping</p>
      {/* {loginSuccess && <p className="success-msg">{loginSuccess}</p>} */}
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="form-group">
          <input type="Email" id="email" name="email" placeholder="Email address" value={loginData.email} onChange={handleLoginChange} />
          {loginErrors.email && <span className="error">{loginErrors.email}</span>}
        </div>
        <div className="form-group password-wrapper">
          <input type="Password" id="password" name="password" placeholder="Password" value={loginData.password} onChange={handleLoginChange} /> 
          {loginErrors.password && <span className="error">{loginErrors.password}</span>}
        </div>
        <button type="submit" className="loginsubmit">Login</button>
        <p className="forgot-password" onClick={() => {setShowLogin(false); setShowForgotPassword(true);}}>Forgot Password?</p>
      </form>
    </div>
  </div>
)}


      {/* Signup Section */}    
      {showSignup && (
  <div className="login-modal-overlay">
    <div className="login-modal advanced">
      <span className="login-close-icon" onClick={resetSignupForm}>X</span>
      <h2 className="modal-title">Sign Up</h2>
      <p className="modal-subtitle">Create your account</p>
      {/* {signupSuccess && <p className="success-msg">{signupSuccess}</p>} */}
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <div className="name-fields">
        <div className="form-group">
          <input type="text" id="FirstName" name="firstName" placeholder="First Name" value={signupData.firstName} onChange={handleSignupChange} />
          {signupErrors.firstName && <span className="error">{signupErrors.firstName}</span>}
        </div>
        <div className="form-group">
          <input type="text" id="LastName" name="lastName" placeholder="Last Name" value={signupData.lastName} onChange={handleSignupChange} />
          {signupErrors.lastName && <span className="error">{signupErrors.lastName}</span>}
        </div>
        </div>
        <div className="form-group">
          <input type="tel" id="Phone" name="phone" placeholder="Mobile Number" maxLength="10" pattern="[0-9]{10}" value={signupData.phone} onChange={handleSignupChange} required/>
          {signupErrors.phone && <span className="error">{signupErrors.phone}</span>}
        </div> 
        <div className="form-group">
          <select id="gender" value={signupData.gender} onChange={(e) => setSignupData({ ...signupData, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
           {signupErrors.gender && <span className="error">{signupErrors.gender}</span>}
        </div>
        <div className="form-group">
          <input type="email" id="email" name="email" placeholder="Email" value={signupData.email} onChange={handleSignupChange} />
          {signupErrors.email && <span className="error">{signupErrors.email}</span>}
        </div>
        <div className="form-group password-wrapper">
          <input type="password" id="password" name="password" placeholder="Password" value={signupData.password} onChange={handleSignupChange} /> 
          {signupErrors.password && <span className="error">{signupErrors.password}</span>}
        </div>
        <button type="submit" className="loginsubmit">Sign Up</button>
      </form>
    </div>
  </div>
)}

{showForgotPassword && (
  <div className="login-modal-overlay">
    <div className="login-modal advanced">
      <span className="login-close-icon" onClick={() => {setShowForgotPassword(false); setForgotEmail(""); setForgotSuccess(""); setForgotError("");}}>X</span>
      <h2 className="modal-title">Reset Password</h2>
      <p className="modal-subtitle">Enter your registered email</p>
      {forgotSuccess && <p className="success-msg">{forgotSuccess}</p>}
      {forgotError && <p className="error-msg">{forgotError}</p>}
      <form onSubmit={async (e) => {
        e.preventDefault();
        if (!forgotEmail || !/\S+@\S+\.\S+/.test(forgotEmail)) {
          setForgotError("Please enter a valid email");
          return;
        }
        try {
          const response = await fetch("http://localhost:5001/api/auth/forgot-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: forgotEmail }),
          });
          const data = await response.json();
        if (response.ok) {
          setForgotSuccess(data.message); 
          setForgotError("");
          setTimeout(() => {
          setShowForgotPassword(false);
          setShowResetPassword(true);

          // Store email inside resetData
         setResetData(prev => ({
          ...prev,
          email: forgotEmail,
          otp: "",
         newPassword: "",
         confirmPassword: "",
         }));

         // Clear the success message
          setForgotSuccess("");
       }, 2000); 
      } else {
        setForgotError(data.message || "Something went wrong");
      setForgotSuccess("");
      }
        } catch (err) {
          setForgotError("Server error");
          setForgotSuccess("");
        }
      }}>
        <input
          type="email"
          placeholder="Your Email"
          id="forgetEmail"
          value={forgotEmail}
          onChange={(e) => setForgotEmail(e.target.value)}
          required
        />
        <button type="submit" className="ResetLink">Send OTP</button>
      </form>
    </div>
  </div>
)}

 {showResetPassword && (
  <div className="login-modal-overlay">
    <div className="login-modal advanced">
      <span className="login-close-icon" onClick={() => {setShowResetPassword(false); setResetData({ email: '', otp: '', newPassword: '', confirmPassword: '' }); setResetErrors({});}}>X</span>
      <h2 className="modal-title-Reset">Reset Password</h2>
      <form onSubmit={async (e) => {
        e.preventDefault();
        // Validate
        const errors = {};
        if (!resetData.otp) errors.otp = "OTP is required";
        if (!resetData.newPassword) errors.newPassword = "Password is required";
        else if (resetData.newPassword.length < 6) errors.newPassword = "Password must be at least 6 characters";
        if (resetData.newPassword !== resetData.confirmPassword) errors.confirmPassword = "Passwords don't match";
        
        if (Object.keys(errors).length > 0) {
          setResetErrors(errors);
          return;
        }

        try {
          const response = await fetch("http://localhost:5001/api/auth/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: forgotEmail,
              otp: resetData.otp,
              newPassword: resetData.newPassword
            }),
          });
          
          const data = await response.json();
          if (response.ok) {
            setToastMsg("Password reset successfully!");
            setShowLogin(true);
            setShowResetPassword(false);
            setShowForgotPassword(false);
            setResetData({ otp: "", newPassword: "", confirmPassword: "", email: "" });
            setResetErrors({});
           setForgotEmail("");
          } else {
            setToastMsg(data.message || "Password reset failed");
          }
        } catch (err) {
          setToastMsg("Error resetting password");
        }
      }}>
        <div className="form-group">
          <input
            type="text"
            id="otp-code"
            placeholder="OTP Code"
            value={resetData.otp}
            onChange={(e) => setResetData({...resetData, otp: e.target.value})}
          />
          {resetErrors.otp && <span className="error" style={{marginLeft: "60px"}}>{resetErrors.otp}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password-new"
            placeholder="New Password"
            value={resetData.newPassword}
            onChange={(e) => setResetData({...resetData, newPassword: e.target.value})}
          />
          {resetErrors.newPassword && <span className="error" style={{marginLeft: "60px"}}>{resetErrors.newPassword}</span>}
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password-confirm"
            placeholder="Confirm New Password"
            value={resetData.confirmPassword}
            onChange={(e) => setResetData({...resetData, confirmPassword: e.target.value})}
          />
          {resetErrors.confirmPassword && <span className="error" style={{marginLeft: "60px"}}>{resetErrors.confirmPassword}</span>}
        </div>
        <button type="submit" className="ResetLink">Reset Password</button>
      </form>
    </div>
  </div>
)}

      </nav>
    </header>
    
  );
};

export default Navbar;

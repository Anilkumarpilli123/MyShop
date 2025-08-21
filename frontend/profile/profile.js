import React from "react";
import "./profile.css"; 
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [editMode, setEditMode] = React.useState(false); 

  // const { user } = useContext(AuthContext); // dynamically get user from context

  const [activeMenu, setActiveMenu] = React.useState("Profile Information");

  // fallback values if user is undefined or partially loaded

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [phone, setPhone] = React.useState("");

React.useEffect(() => {
  if (user) {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setEmail(user.email || "");
    setGender(user.gender || "");
    setPhone(user.phone || "");
  }
}, [user]);

 const handleMyOrders = () => {
  navigate("/orders");
 };

 const handleMyWishlist = () => {
  navigate("/wishlist");
 };

 const handleMyCart = () => {
  navigate("/cart");
 }

 const handleLogout = () => {
  localStorage.removeItem("jwtToken");
  setUser(null); // Clear the auth context
  alert("Logged out successfully");
  setFirstName("");
  setLastName("");
  setEmail("");
  setGender("");
  setPhone("");
  // window.location.href = "/"; 
};
 
const saveProfile = async () => {
  try {
    // 1. Get token properly
    const token = localStorage.getItem('jwtToken');
    console.log('Current token:', token); // Debugging
    
    if (!token) {
      alert("Your session has expired. Please login again.");
      navigate('/');
      return;
    }

    // 2. Make the request with proper headers
    const response = await fetch('http://localhost:5001/api/updateProfile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        firstName, 
        lastName, 
        email, 
        gender, 
        phone 
      }),
    });

    // 3. Handle response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Update failed");
    }

    await response.json();
    alert("Profile updated successfully!");
    setEditMode(false);
    
  } catch (error) {
    console.error("Update error:", error);
    alert(`Error: ${error.message}`);
    
    // If token is invalid, clear it and redirect
    if (error.message.includes("token")) {
      localStorage.removeItem('token');
      navigate('/');
    }
  }
};

console.log('Stored token:', localStorage.getItem('token'));

const token = localStorage.getItem('token');
if (token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  console.log('Token expires:', new Date(payload.exp * 1000));
}


  return (
    <div className="profile-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="user-info">
          <div className="avatar">👤</div>
          <h3>{firstName} {lastName}</h3>
        </div>

        <div className="menu-wrapper">
          <div className="menu-section">
            <li className="my-orders-header" onClick={handleMyOrders}>MY ORDERS
               <span className="orders-arrow">→</span>
            </li>
            <li className="my-orders-header" onClick={handleMyWishlist}>MY WISHLIST
               <span className="orders-arrow">→</span>
            </li>
            <li className="my-orders-header" onClick={handleMyCart}>MY CART
               <span className="orders-arrow">→</span>
            </li>
          </div>

          <div className="menu-section">
            <h4>ACCOUNT SETTINGS</h4>
            <ul>
              <li className={activeMenu === "Profile Information" ? "active" : ""}
                  onClick={() => setActiveMenu("Profile Information")}
              >Profile Information</li>

              <li className={activeMenu === "Manage Addresses" ? "active" : ""}
                  onClick={() => setActiveMenu("Manage Addresses")}
              >Manage Addresses</li>

              <li className={activeMenu === "PAN Card Information" ? "active" : ""}
                  onClick={() => setActiveMenu("PAN Card Information")}
              >PAN Card Information</li>
            </ul>
          </div>

          <div className="menu-section">
            <h4>PAYMENTS</h4>
            <ul>
              <li className={activeMenu === "Gift Cards" ? "active" : ""}
                  onClick={() => setActiveMenu("Gift Cards")}
              >Gift Cards <span className="green">₹0</span></li>

              <li className={activeMenu === "Saved UPI" ? "active" : ""}
                  onClick={() => setActiveMenu("Saved UPI")}
              >Saved UPI</li>
            </ul>
          </div>

          <div className="menu-section"> 
            <h4>Profile</h4>
            <ul>
              <li className={activeMenu === "Edit-Profile" ? "active" : ""}
                 onClick={() => {setActiveMenu("Edit-Profile"); setEditMode(true);}}
              >Edit Profile</li>
              <li className={activeMenu === "Log-out" ? "active" : ""}
                 onClick={() => {setActiveMenu("Log-out"); handleLogout();}}
              >Logout</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="section">
          <h2 className="section-title">
            <span>Personal Information</span>
            <span className="edit-link" onClick={() => {if(editMode){saveProfile();} else {setEditMode(true)}}}>{editMode ? "Save" : "Edit"}</span>
          </h2>
          <div className="input-row">
            <input type="text" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} readOnly={!editMode} />
            <input type="text" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} readOnly={!editMode} />
          </div>

          <h2 className="section-title"> 
          <span>Your Gender</span> 
          </h2>
          <div className="radio-group">
            <label>
              <input type="radio" value="male" checked={gender.toLowerCase() === "male"} disabled={!editMode} onChange={() => setGender("male")} /> Male
            </label>
            <label>
             <input type="radio" value="female" checked={gender.toLowerCase() === "female"} disabled={!editMode} onChange={() => setGender("female")} /> Female
            </label>
          </div>
        </div>

        <div className="section">
          <h2 className="section-title">
           <span>Email Address</span> 
          </h2>
         <input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!editMode} />
        </div>

        <div className="section">
          <h2 className="section-title">
           <span>Mobile Number</span>  
          </h2>
          <input type="tel" id="Number" value={phone} onChange={(e) => setPhone(e.target.value)} readOnly={!editMode} placeholder="Not provided" />
        </div>
      </div>
    </div>
  );
};



export default ProfilePage;

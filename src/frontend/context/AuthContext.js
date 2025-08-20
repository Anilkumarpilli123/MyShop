import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Automatically decode token on first load
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    // let firstName = '';
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);
          // firstName = decoded.firstName;
        const currentTime = Date.now() / 1000;
        if (decoded.exp > currentTime) {
          setUser(decoded.user || decoded); // use decoded.user if you encoded it that way
        } else {
          localStorage.removeItem("jwtToken"); // Expired
        }
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("jwtToken");
      }
    }
  }, []);

  const handleLoginOrSignup = (token) => {
  localStorage.setItem("jwtToken", token);
  const decoded = jwtDecode(token);
  setUser(decoded);  // decoded should have { name, email, id } if backend includes it
};

  return (
    <AuthContext.Provider value={{ user, setUser, handleLoginOrSignup }}>
      {children}
    </AuthContext.Provider>
  );
};

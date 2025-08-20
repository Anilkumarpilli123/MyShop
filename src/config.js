// src/config.js
const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5001"
    : "https://myapp.onrender.com";
    // : `http://${window.location.hostname}:5001`;

export default API_BASE_URL;

// const API_BASE_URL = `${window.location.origin}/api`;
// export default API_BASE_URL;


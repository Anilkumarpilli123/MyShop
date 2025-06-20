import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); 
  
  useEffect(() => {
    const container = document.querySelector(".app-container");
    if (container) {
      container.scrollTop = 0;
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  

  return null;
}

export default ScrollToTop;

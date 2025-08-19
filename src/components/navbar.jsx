"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";

/**
 * Navigation component with responsive design
 * Includes mobile hamburger menu and active link highlighting
 */
function Navbar({ram}) {
  const navigate = useNavigate();
  /*const [totalItems,setTotalitems]=useState(0)*/
  const totalItems=ram.length
 
  
    
 
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()



   

/*
 
useEffect(() => {
  const stored = localStorage.getItem("cartitems");

  if (stored) {
    const parsed = JSON.parse(stored);
    setTotalitems(parsed.length);

  } else {
    setTotalitems(0); // fallback
  }
},[]); // ✅ run only once on mount
*/


 

  
   
 
 



 

  // Helper function to check if link is active
  const isActiveLink = (path) => {
    return location.pathname === path
  }

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/home" className="navbar-logo">
          <div className="navbar-logo-icon">
            <span>TA</span>
          </div>
          <span className="navbar-brand">Taagubothu Adda</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-nav">
          <Link to="/home" className={`navbar-link ${isActiveLink("/") ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/products" className={`navbar-link ${isActiveLink("/products") ? "active" : ""}`}>
            Products
          </Link>
        

          {/* Cart Icon */}
          <div className="navbar-cart" onClick={() => navigate("/cart")}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
              />
            </svg>
            <span className="navbar-cart-badge">{totalItems}</span>
          </div>
        </div>

        {/* Mobile menu button */}
        <button onClick={toggleMenu} className="navbar-toggle">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`navbar-mobile ${isMenuOpen ? "show" : ""}`}>
        <div className="container">
          <Link
            to="/"
            onClick={() => setIsMenuOpen(false)}
            className={`navbar-mobile-link ${isActiveLink("/") ? "active" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMenuOpen(false)}
            className={`navbar-mobile-link ${isActiveLink("/products") ? "active" : ""}`}
          >
            Products
          </Link>
          <Link to="/cart" 
           onClick={()=>setIsMenuOpen(false)}
           className={`navbar-mobile-link ${isActiveLink("/cart")? "active":""}`}
          >Cart</Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

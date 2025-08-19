"use client"

import { useNavigate } from "react-router-dom"
import UserRegistration from "../../components/userRegistrations/userregistration"
import "./registerpage.css"

function RegisterPage() {
  const navigate = useNavigate()

  return (
    <div className="main-container">

    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="logo-icon">🛍️</div>
        <h1>E-Commerce Store</h1>
        <p>Create your account to start shopping</p>
      </div>

      {/* Navigation Links */}
      <div className="navigation-links">
        <span className="nav-link active">📝 Register</span>
        <button className="nav-link" onClick={() => navigate("/login")}>
          👤 Login
        </button>
        <button className="nav-link" onClick={() => navigate("/admin-login")}>
          🔐 Admin
        </button>
      </div>

      {/* Content */}
      <UserRegistration />

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </div>
    </div>
     </div>
  )
}

export default RegisterPage

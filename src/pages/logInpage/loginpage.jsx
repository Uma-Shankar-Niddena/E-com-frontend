"use client"

import { useNavigate } from "react-router-dom"
import UserLogin from "../../components/userLogin/userlogin"
import "./loginpage.css"

function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="logo-icon">🛍️</div>
        <h1>E-Commerce Store</h1>
        <p>Sign in to your account</p>
      </div>

      {/* Navigation Links */}
      <div className="navigation-links">
        <button className="nav-link" onClick={() => navigate("/")}>
          📝 Register
        </button>
        <span className="nav-link active">👤 Login</span>
        <button className="nav-link" onClick={() => navigate("/admin-login")}>
          🔐 Admin
        </button>
      </div>

      {/* Content */}
      <UserLogin />

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default LoginPage

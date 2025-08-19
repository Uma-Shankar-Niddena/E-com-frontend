"use client"

import { useNavigate } from "react-router-dom"
import AdminLogin from "../../components/adminLogin/adminlogin"
import "./adminlogin.css"

function AdminLoginPage() {
  const navigate = useNavigate()

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header admin-header">
        <div className="logo-icon">🛡️</div>
        <h1>Admin Portal</h1>
        <p>Secure access for administrators</p>
      </div>

      {/* Navigation Links */}
      <div className="navigation-links">
        <button className="nav-link" onClick={() => navigate("/")}>
          📝 Register
        </button>
        <button className="nav-link" onClick={() => navigate("/login")}>
          👤 Login
        </button>
        <span className="nav-link active">🔐 Admin</span>
      </div>

      {/* Content */}
      <AdminLogin />

      {/* Footer */}
      <div className="footer">
        <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
      </div>
    </div>
  )
}

export default AdminLoginPage

"use client"

import { useState } from "react"
import "./adminlogin.css"

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    setError("")

    // Simple admin validation (you can change these credentials)
    const ADMIN_EMAIL = "admin@store.com"
    const ADMIN_PASSWORD = "admin123"

    setTimeout(() => {
      if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
        setMessage("Admin login successful! Welcome to the dashboard.")
        console.log("Admin Login Successful:", formData)
      } else {
        setError("Invalid admin credentials. Please check your email and password.")
      }
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="admin-login">
      <div className="admin-header">
        <div className="admin-icon">🛡️</div>
        <h2>Admin Access</h2>
        <p>Secure login for store administrators</p>
      </div>

      <div className="admin-info">
        <div className="info-box">
          <h4>🔐 Admin Credentials</h4>
          <p>
            <strong>Email:</strong> admin@store.com
          </p>
          <p>
            <strong>Password:</strong> admin123
          </p>
          <small>Change these in production!</small>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="adminEmail">Admin Email</label>
          <div className="input-container">
            <span className="input-icon">👨‍💼</span>
            <input
              type="email"
              id="adminEmail"
              name="email"
              placeholder="Enter admin email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="adminPassword">Admin Password</label>
          <div className="input-container">
            <span className="input-icon">🔐</span>
            <input
              type={showPassword ? "text" : "password"}
              id="adminPassword"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <button type="submit" className="admin-submit-btn" disabled={isLoading}>
          {isLoading ? (
            <span>
              <span className="spinner"></span>
              Authenticating...
            </span>
          ) : (
            <span>🚀 Access Admin Panel</span>
          )}
        </button>

        {message && <div className="success-message">✅ {message}</div>}

        {error && <div className="error-message">❌ {error}</div>}
      </form>

      <div className="admin-features">
        <h4>Admin Panel Features:</h4>
        <ul>
          <li>📊 Sales Dashboard</li>
          <li>📦 Product Management</li>
          <li>👥 User Management</li>
          <li>📈 Analytics & Reports</li>
        </ul>
      </div>
    </div>
  )
}

export default AdminLogin

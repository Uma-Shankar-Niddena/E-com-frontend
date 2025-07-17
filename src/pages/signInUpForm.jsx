"use client"

import { useState,useEffect } from "react"
import UserLogin from "../components/userLogin/userlogin"
import UserRegistration from "../components/userRegistrations/userregistration"
import AdminLogin from "../components/adminLogin/adminlogin"
import "../styles/signinup.css"
"use client"



export default function AuthApp() {
  const [activeTab, setActiveTab] = useState("login")

  // Handle URL routing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const tabParam = urlParams.get("tab")

    if (tabParam === "register") {
      setActiveTab("register")
    } else if (tabParam === "admin") {
      setActiveTab("admin")
    } else {
      setActiveTab("login")
    }
  }, [])

  // Update URL when tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    const newUrl = tab === "login" ? "/" : `/?tab=${tab}`
    window.history.pushState(null, "", newUrl)
  }

  return (
    <div className="app">
      <div className="auth-container">
        {/* Header */}
        <div className="header">
          <div className="logo">
            <div className="logo-icon">🛍️</div>
            <h1>E-Commerce Store</h1>
            <p>Secure Authentication Portal</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === "login" ? "active" : ""}`} onClick={() => handleTabChange("login")}>
            👤 User Login
          </button>
          <button
            className={`tab ${activeTab === "register" ? "active" : ""}`}
            onClick={() => handleTabChange("register")}
          >
            📝 Register
          </button>
          <button className={`tab ${activeTab === "admin" ? "active" : ""}`} onClick={() => handleTabChange("admin")}>
            🔐 Admin Login
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "login" && <UserLogin />}
          {activeTab === "register" && <UserRegistration />}
          {activeTab === "admin" && <AdminLogin />}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>&copy; 2024 E-Commerce Store. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

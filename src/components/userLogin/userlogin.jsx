"use client"

import { useState } from "react"
import "./userlogin.css"
import { useNavigate } from "react-router-dom"
import  Cookies from 'js-cookie'
import { useEffect } from "react"

function UserLogin() {
  const navigation=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState('')
  const [message, setMessage] = useState("")
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')

 useEffect(() => {
    // 💣 Delete the token cookie when the Login page loads
    document.cookie = "token=; path=/;";
  });

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const url = "https://e-com-backend-5dfi.onrender.com/user/login";
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include", // ✅ allow cookies to be set
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (response.ok) {
      setMessage(data.message);
      setErrors("");
      setTimeout(() => {
           navigation("/home");
      }, 2000);
      console.log("we have to redirect now");
   
    } else {
      setErrors(data.message);
      setTimeout(() => {
        setUsername("");
        setPassword("");
        setIsLoading(false);
      }, 1000);
    }
  } catch (error) {
    setErrors(error.message);
    setIsLoading(false);
  }
};


  return (
    <div className="user-login">
      <div className="form-header">
        <h2>Welcome Back!</h2>
      
        <p>Sign in to your account to continue shopping</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">User Name</label>
          <div className="input-container">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="email"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="input-container">
            <span className="input-icon">🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
              required
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

      {errors && <div className="error-message">❌ {errors}</div>}


        
        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? (
            <span>
              <span className="spinner"></span>
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {message && <div className="success-message">✅ {message}</div>}

        <div className="form-footer">
          <a href="#" className="forgot-link">
            Forgot your password?
          </a>
        </div>
      </form>
    </div>
  )
}

export default UserLogin

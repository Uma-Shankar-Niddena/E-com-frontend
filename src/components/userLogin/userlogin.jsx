"use client"

import { useState } from "react"
import "./userlogin.css"
import { useNavigate } from "react-router-dom"
import  Cookies from 'js-cookie'

function UserLogin() {
  const navigation=useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState([])
  const [message, setMessage] = useState("")
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')


  const handleSubmit = async(e) => {
    e.preventDefault()
    setErrors([]);

    setIsLoading(true)
    const userDetails={username,password}
    try{
      const url="http://localhost:3001/login"
      const options={
        method:"POST",
        credentials: "include",
        headers:{
        "Content-Type":"application/json",
        },
        
        body:JSON.stringify(userDetails)
      }
      const response=await fetch(url,options)
      const data=await response.json()
      Cookies.set("token", data.jwtToken);  // Save JWT
      {console.log(data)}
       

       if (!response.ok){
        const errorTxt=await response.text()

          setErrors([errorTxt])
       }
       setTimeout(() => {

            navigation('/home')

      }, 2000);
       
       
       
       setMessage(data.message)

    

       

    }
    catch(error){
      setErrors(error.message)
        
    }
    setMessage("")

    // Simulate API call
    
  }

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

        {errors.length > 0 && (
          <div className="error-message">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>❌ {error}</li>
              ))}
            </ul>
          </div>
        )}

        
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

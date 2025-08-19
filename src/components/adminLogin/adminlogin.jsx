"use client"


import "./adminlogin.css"
import { useState } from "react"

import { useNavigate } from "react-router-dom"
import  Cookies from 'js-cookie'
import { useEffect } from "react"

function AdminLogin() {
  const Navigate=useNavigate()

  const [username,setUsername]=useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [showPassword,setShowPassword]=useState(false)


  useEffect(()=>{
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  },[])

  const handleSubmit =async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const userDetails={username,password}
  
    
    try{
      const url="http://localhost:3001/admin/signIn"
      const options={
        method:"POST",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(userDetails)

        
      }

      const response=await fetch(url,options) 
      const data=await response.json()
      console.log(data)

      
      if (response.ok){
        Cookies.set("token",data.jwttoken)
        
        setMessage(data.message)
        setError("")

        setTimeout(() => {
          Navigate("/admin")
        }, 2000);
      
      }
      
      console.log(response.ok) 
      if (!response.ok){
         setError(data.message)
        
         
      setTimeout(() => {
        setIsLoading(false)
        setError('') 
        setUsername("")
         setPassword("")
      


       
        
      }, 1000);
      }
     
      
    

    }
    catch(err){
      setError(err.message)
      setUsername('')
      setPassword('')
       setIsLoading(false)

    }




  

   


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
            <strong>username:</strong> shankar_0077
          </p>
          <p>
            <strong>Password:</strong>uma@1234
          </p>
          <small>Change these in production!</small>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label htmlFor="adminEmail" className="label">Admin Username</label>
          <div className="input-container">
            <span className="input-icon">👨‍💼</span>
            <input
              type="text"
              id="adminEmail"
              name="username"
              placeholder="Enter admin username"
             value={username}
              onChange={(e)=>{setUsername(e.target.value)}}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="adminPassword" className="label">Admin Password</label>
          <div className="input-container">
            <span className="input-icon">🔐</span>
            <input
              type={showPassword ? "text" : "password"}
              id="adminPassword"
              name="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e)=>{setPassword(e.target.value)}}
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

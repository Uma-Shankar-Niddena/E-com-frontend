"use client"

import { useState } from "react"
import "./userRegistration.css"
import { useNavigate } from "react-router-dom"

function UserRegistration() {
  const navigation=useNavigate()
  const [formData, setFormData] = useState({
  
    agreeToTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [errors, setErrors] = useState([])
  const  [username,handlenameValue]=useState("")
  const [password,setPass]=useState('')
 
  const [checkbox,setCheckbox]=useState(false)
  const [email,setEmail]=useState('')
  


  const validateForm = () => {
    const newErrors = []

   
    if (!formData.agreeToTerms) {
      newErrors.push("You must agree to the terms and conditions")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const userDetails={username,email,password}
     const url='${import.meta.env.VITE_API_URL}/signup' 
     
    try{
        const options={
        method:"POST",
        headers: {
          "Content-Type": "application/json"
         },
        body:JSON.stringify(userDetails),
     }
         setMessage("Registration SucessFull")

       handlenameValue("")
       setPass("")
       setEmail("")
       setFormData({
        agreeToTerms:false
      })

     const response=await fetch(url,options)
   
   if (!response.ok) {
    const errorText = await response.text(); // fallback if it's not JSON
    console.error("Server error:", errorText);
    setErrors(errorText)
   
    return;
  }
      
      const data = await response.json();
      setTimeout(() => {

            navigation('/login')

      }, 2000);
     
      
      

     

     
    
     } 
     catch(err){
         setErrors(err.message)
     }
    

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    // Simulate API call
    
  }
   
  const  handlecheckbox=(e)=>{
    
    
    setFormData(prevData=>({
        ...prevData,agreeToTerms:!prevData.agreeToTerms
    }))

        
     
  }

  return (
    <div className="user-registration">
      <div className="form-header">
        <h2>Create Account</h2>
        <p>Join our store and start shopping today</p>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label htmlFor="fullName">User Name</label>
          <div className="input-container">
            <span className="input-icon">👤</span>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={username}
              onChange={(e)=>{handlenameValue(e.target.value)}}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <div className="input-container">
            <span className="input-icon">📧</span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              required
            />
          </div>
        </div>

        

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-container">
              <span className="input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Create password"
                value={password}
                onChange={(e)=>{setPass(e.target.value)}}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

        
        </div>

 <div className="checkbox-group">
          <input
            type="checkbox"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}



            onChange={handlecheckbox}
          />
          <label htmlFor="agreeToTerms">
            I agree to the{" "}
            <a href="#" className="terms-link">
              Terms and Conditions
            </a>
          </label>
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
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {message && <div className="success-message">✅ {message}</div>}
      </form>
    </div>
  )
}

export default UserRegistration

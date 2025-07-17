import { Routes, Route,useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";

import './styles/tooltip.css'
import Products from "./pages/products";
import CartProducts from "./components/cart";
import { useState } from "react";
import { useEffect } from "react";
import RegisterPage from "./pages/registerPage/registerpage";
import LoginPage from "./pages/logInpage/loginpage";
import AdminLoginPage from "./pages/adminLogin/adminlogin";
import SignInUp from './pages/signInUpForm'
import ProtectedRouter from "./components/protectedRoute";

let count=0

function App() {
  const [cartItems, setCartItems] = useState([]);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

 
 



  const addToCart = async (product) => {
        localStorage.setItem("cartitems",JSON.stringify(cartItems));
 
    setCartItems((prevPro)=>[...prevPro,product])
    setShowToast(true)

 
     setToastMessage(`${product.name} added to Cart!`);
    const productId=product.id

    const quantity=product.quantity
    setTimeout(() => {
          
          setToastMessage("")
          setShowToast(false)
          
 
      }, 1000);
    
   

     try{
      const url='http://localhost:3001/cart/add'
      const options={
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          credentials: "include",
          body:JSON.stringify({productId,quantity})
        
      }

      const response=await fetch(url,options)
      const data=await response.json()   
      
      
      
     }
     
     catch(error){

     }
          console.log(showToast)

 
   
     
    
  };

  const handleAddToCart = (product) => {
     
    
      
    };
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem=async(id)=>{
    try{
      const url=`http://localhost:3001/cart/remove/${id}`
      const options={
        method:"DELETE",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"

        },
      }
      const response=await fetch(url,options)
      const data= await response.data 
      console.log(data.message)
      
    }
    catch(error){
    console.log("error.message")
  }

  }
  

 

  const location = useLocation();
  const hideNavbar = location.pathname === "/" || location.pathname==='/login' || location.pathname==='/admin-login' ;
  const hidefooter=location.pathname==='/' || location.pathname==='/login' || location.pathname==='/admin-login'; // hide on sign in/up page


  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    {!hideNavbar && <Navbar cartItems={cartItems} />}
   



      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin-login' element={<AdminLoginPage/>}/>
      
          <Route path="/home" element={<ProtectedRouter><Home addToCart={addToCart} /></ProtectedRouter>} />
          <Route path="/products" element={<ProtectedRouter><Products addToCart={addToCart}  handleAddToCart={handleAddToCart} /></ProtectedRouter>} />
          <Route
            path="/cart"
            element={
              <ProtectedRouter><CartProducts
                
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                 removeItem={removeItem}
                handleAddToCart={handleAddToCart}
               
             
              /></ProtectedRouter>
            }
          />
        </Routes>

        {showToast && (
  <div className="toast">
    {toastMessage}
  </div>
)}

      </main>



        {!hidefooter &&  <Footer  />}
     
    </div>
  );
  
}

export default App;

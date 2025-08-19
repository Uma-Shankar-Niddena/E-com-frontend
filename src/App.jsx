import { Routes, Route,useLocation } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";

import './styles/tooltip.css'
import './styles/index.css'
import Products from "./pages/products";
import CartProducts from "./components/cart";
import { useState } from "react";
import { useEffect } from "react";
import RegisterPage from "./pages/registerPage/registerpage";
import LoginPage from "./pages/logInpage/loginpage";
import AdminLoginPage from "./pages/adminLogin/adminlogin";
import SignInUp from './pages/signInUpForm'
import AdminpageOrders from './components/adminpage/AdminpageOrders'

import ProtectedRouter from "./components/protectedRoute";
import CheckOutpage from './components/checkOutpage'
let count=0

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [countCartitems,setCountcart]=useState([])

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

 
 

useEffect(()=>{
  localStorage.setItem("cartitems",JSON.stringify(cartItems))

  const getIntial=async()=>{
    const url='http://localhost:3001/cart' 
  const options={
    method:"GET",
    credentials:"include"
  }

  
  const responsee=await fetch(url,options)

   return responsee

  }

  const data=async()=>{
       const inititalCartItems=await getIntial()
        const respo=await inititalCartItems.json()
       
       setCartItems(respo.message)


  }

  data()



  
   

  
})

  const addToCart = async (product) => {
     setCartItems((prevData)=>[...prevData,product])
    setShowToast(true)

 
     setToastMessage(`${product.name} added to Cart!`);
    const productId=product.id

    const quantity=1
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

const removeItem=async(removecartItem)=>{
   
    const id=removecartItem

    try{
      const url="http://localhost:3001/cart/remove/${id}"
      const options={
        method:"DELETE",
        credentials:"include",
        headers:{
          "Content-Type":"application/json"

        },
      }
      const response=await fetch(url,options)
      console.log(response)
      
      if(!response.ok){
         alert("something went wrong on remove!")
      }
        ///get updated cartitems 
        
     const url2="http://localhost:3001/cart"
     const options2={
       method:"GET",
       credentials:"include",
      
     }
    const resposnefromDb=await fetch(url2,options2)
    const updatedCartItems=await resposnefromDb.json()
   
   
        setCartItems(updatedCartItems.message);
    localStorage.setItem("cartitems", JSON.stringify(updatedCartItems));
    
      

      
    }
    catch(error){   
    console.log(error)
  }

  }
  

 

  const location = useLocation(); 
  const hideNavbar = location.pathname === "/" || location.pathname==='/login' || location.pathname==='/admin-login' || location.pathname==="/admin" ;
  const hidefooter=location.pathname==='/' || location.pathname==='/login' || location.pathname==='/admin-login' || location.pathname==='/admin'; // hide on sign in/up page



  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
    {!hideNavbar && <Navbar ram={cartItems}/>}
   



      <main style={{ flex: 1 }}>
        <Routes>
          <Route path='/' element={<RegisterPage/>} />
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin-login' element={<AdminLoginPage/>}/>
          <Route path='/admin' element={<AdminpageOrders/>}/>
      
          <Route path="/home" element={<ProtectedRouter><Home addToCart={addToCart} /></ProtectedRouter>} />
          <Route path="/products" element={<ProtectedRouter><Products addToCart={addToCart} /></ProtectedRouter>} />
          <Route
            path="/cart"
            element={
              <ProtectedRouter><CartProducts
                
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                 removeItem={removeItem}
            
               
             
              /></ProtectedRouter>
            }
          />
          <Route path='/checkout' element={<ProtectedRouter><CheckOutpage/></ProtectedRouter>}/>
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

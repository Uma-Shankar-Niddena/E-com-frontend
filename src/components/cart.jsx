"use client"

import {useNavigate} from 'react-router-dom'
import { useState } from "react"
import "../styles/cartItem.css"
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect } from 'react'
import checkOutpage from './checkOutpage'

const CartComponent = ({increaseQuantity, decreaseQuantity }) => {
  const Navigate=useNavigate()
  const [cartItems,setCartItems]=useState([])
  const [isLoading,setLoading]=useState(false)

  // Calculate totals
const fetchCartItems = async () => {
  setLoading(true);

  try {
    const url = "https://e-com-backend-5dfi.onrender.com/cart";

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    console.log("cart data is ", data);

    if (Array.isArray(data.allCartItems)) {
      setCartItems(data.allCartItems);
    } else {
      console.warn("Unexpected response format:", data);
      setCartItems([]);
    }

  } catch (error) {
    console.error("Fetch error:", error.message);
    setCartItems([]);
  } finally {
    setLoading(false);
  }
};


  
  
useEffect(()=>{
  fetchCartItems()


},[])

const removeItem=async(removecartItem)=>{
   
    const id=removecartItem
    console.log(id)

    try{
      const url = `https://e-com-backend-5dfi.onrender.com/cart/delete/${id}`;

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
        
    
    await fetchCartItems()
   
   
    
      

      
    }
    catch(error){   
    console.log(error)
  }

  } 



  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const taxes = subtotal * 0.08
  const total = subtotal + deliveryFee + taxes
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
   
  const handlePlaceorder=()=>{
    Navigate('/checkout')
      
       
       

  }

  // If showing checkout page


 
  // If cart is empty
 
 





 
  
  // Main cart view

 const  animationUrl="/wineicon.json"

            
  return (
    <>
    {
isLoading?(<div className='for-icon'><Player
                  autoplay
                  loop
                  src={animationUrl} // winebottleAni.json
                  style={{ height: '200px', width: '200px', marginRight:"50vw" }}
                /></div>):cartItems.length===0?(
                    
                        <div className='empty-cart-container'>
                      <div className="empty-cart-content">
                          <div className="empty-cart-icon">🛒</div>
                          <h2>Your cart is empty</h2>
                          <p>Looks like you haven't added any items to your cart yet.</p>
                          <button className="start-shopping-btn" onClick={() => Navigate('/products')}>
                            Start Shopping
                          </button>
                        </div>
                        </div>
                     
                      ):((
              
    <div className="cart-container">
      {/* Header */}
      <div className="cart-header">
        <div>
          <h1>Your Cart</h1>
          <p>
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>
        <div className="cart-total-badge">₹{subtotal.toFixed(2)}</div>
      </div>

      <div className="cart-main">
        {/* Cart Items */}
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img
                  src={item.image || "/placeholder.svg?height=100&width=100"}
                  alt={item.name}
                  className='inside-card-image'
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=100&width=100"
                  }}
                />
              </div>

              <div className="item-details">
                <div className="item-header">
                  <div className='card-div'>
                    <h3>{item.name}</h3>
                    {item.description && <p className="item-description">{item.description}</p>}
                    {item.category && <span className="item-category">{item.category}</span>}
                    <p className='item-description'>Quantity:{item.quantity}</p>
                  </div>
                  
                </div>

                <div className="item-footer">
                  <div className="item-price">₹{item.price.toFixed(2)}</div>

                 
                </div>

                <div className="item-subtotal">
                  <button className="remove-btn" onClick={() => removeItem(item.cartId)}>
                    🗑️
                  </button>

                  Subtotal: <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal ({totalItems} items)</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "free-delivery" : ""}>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="free-delivery-note">Add ₹{(50 - subtotal).toFixed(2)} more for free delivery</p>
            )}
            <div className="summary-row">
              <span>Taxes & Fees</span>
              <span>₹{taxes.toFixed(2)}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-actions">
            <button className="checkout-btn" onClick={() => handlePlaceorder()}>
              Proceed to Checkout
            </button>
            <button className="continue-shopping-btn" onClick={() => Navigate('/products')}>
              Continue Shopping
            </button>
          </div>

          <div className="delivery-info">
            <span>🕐 Estimated delivery: 25-35 mins</span>
          </div>
        </div>
      </div>
    </div>))
   }   
   </>
  )
}

export default CartComponent

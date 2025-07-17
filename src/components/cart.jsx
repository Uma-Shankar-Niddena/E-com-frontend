"use client"

import {useNavigate} from 'react-router-dom'
import { useState } from "react"
import "./cartItems.css"
import { useEffect } from 'react'

const CartComponent = ({increaseQuantity, decreaseQuantity, removeItem }) => {
  const Navigate=useNavigate()
  const [showCheckout, setShowCheckout] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [cartItems,setCartItems]=useState([])
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("")

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const taxes = subtotal * 0.08
  const total = subtotal + deliveryFee + taxes
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
useEffect( ()=>{

  const fetchCartItems=async()=>{
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  try{
     const url="http://localhost:3001/cart"
     const options={
         method:"GET",
         credentials:"include",
         headers:{
          "Content-Type":"application/json"
         }
     }

    const response=await fetch(url,options)
    const data=await response.json()
    
    return data

    

  }
  catch(error){
    return (error.message)
  }


  }

  const data=async()=>{
    const dataa=await fetchCartItems()
    setCartItems(dataa.message)

  }
  data()
  
},[])

  // If showing checkout page
  if (showCheckout) {
    return (
      <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-button" onClick={() => setShowCheckout(false)}>
            ← Back
          </button>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {/* Delivery Address */}
            <div className="form-section">
              <h2>📍 Delivery Address</h2>
              <textarea
                placeholder="Enter your complete delivery address..."
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="address-input"
              />
              <div className="contact-row">
                <input type="text" placeholder="Phone Number" className="contact-input" />
                <input type="text" placeholder="Your Name" className="contact-input" />
              </div>
            </div>

            {/* Delivery Time */}
            <div className="form-section">
              <h2>🕐 Delivery Time</h2>
              <div className="time-options">
                <button className="time-option active">
                  <div>ASAP</div>
                  <small>25-35 mins</small>
                </button>
                <button className="time-option">
                  <div>Schedule</div>
                  <small>Choose time</small>
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2>💳 Payment Method</h2>
              <div className="payment-options">
                <button
                  className={`payment-option ${selectedPayment === "card" ? "selected" : ""}`}
                  onClick={() => setSelectedPayment("card")}
                >
                  💳 Credit/Debit Card
                </button>
                <button
                  className={`payment-option ${selectedPayment === "wallet" ? "selected" : ""}`}
                  onClick={() => setSelectedPayment("wallet")}
                >
                  📱 Digital Wallet
                </button>
                <button
                  className={`payment-option ${selectedPayment === "cash" ? "selected" : ""}`}
                  onClick={() => setSelectedPayment("cash")}
                >
                  💵 Cash on Delivery
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div className="form-section">
              <h2>📝 Special Instructions</h2>
              <textarea
                placeholder="Any special requests for your order..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="instructions-input"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div>
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">Qty: {item.quantity}</div>
                  </div>
                  <div className="item-price">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}</span>
              </div>
              <div className="total-row">
                <span>Taxes & Fees</span>
                <span>₹{taxes.toFixed(2)}</span>
              </div>
              <div className="total-row final-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            <button className="place-order-btn" onClick={() => alert(`Order placed! Total: ₹${total.toFixed(2)}`)}>
              Place Order • ₹{total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items to your cart yet.</p>
          <button className="start-shopping-btn" onClick={() => Navigate('/products')}>
            Start Shopping
          </button>
        </div>
      </div>
    )
  }

  // Main cart view
  return (
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
                  <div>
                    <h3>{item.name}</h3>
                    {item.description && <p className="item-description">{item.description}</p>}
                    {item.category && <span className="item-category">{item.category}</span>}
                  </div>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}>
                    🗑️
                  </button>
                </div>

                <div className="item-footer">
                  <div className="item-price">₹{item.price.toFixed(2)}</div>

                  <div className="quantity-controls">
                    <button className="qty-btn" onClick={() => decreaseQuantity(item.id)} disabled={item.quantity <= 1}>
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="item-subtotal">
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
            <button className="checkout-btn" onClick={() => setShowCheckout(true)}>
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
    </div>
  )
}

export default CartComponent

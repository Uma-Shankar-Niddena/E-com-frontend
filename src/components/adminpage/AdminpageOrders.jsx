"use client"

import { useState, useEffect } from "react"
import "./AdminOrders.css"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
   const currentlocation=useLocation()
   const navigation=useNavigate()

  // Fetch orders from API
  useEffect(() => {
   
    const currentPath=currentlocation.pathname==='/admin'
    if (!currentPath){
        Cookies.remove("token")
    }
    

    const fetchOrders = async () => {
      const url="http://localhost:3001/admin/checkout-Data"
      try {
        const response = await fetch(url,{
            method:"GET",
            credentials:"include",
            headers:{
               "Content-Type":"application/json"
            }
        })
        if (!response.ok) {
          navigation("/admin-login")
           
          throw new Error("Failed to fetch orders")
        }
        const data = await response.json()
        
        setOrders(data)
        setLoading(false)
        console.log(data)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  // Parse items from JSON string
  const parseItems = (itemsString) => {
    try {
      return JSON.parse(itemsString)
    } catch (e) {
      return []
    }
  }

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  if (loading) {
    return <div className="loading">Loading orders...</div>
  }

  if (error) {
    return <div className="error">Error: {error}</div>
  }

  return (
    <div className="admin-orders">
      <h1>Admin Orders Dashboard</h1>

      <div className="orders-container">
        {orders.map((order) => {
          const items = parseItems(order.items)

          return (
            <div key={order.id} className="order-card">
              {/* Order Header */}
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span className={`status ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>

              {/* Customer Info */}
              <div className="customer-info">
                <h4>Customer Details</h4>
                <p>
                  <strong>Name:</strong> {order.userName}
                </p>
                <p>
                  <strong>Phone:</strong> {order.phoneNumber}
                </p>
                <p>
                  <strong>Address:</strong> {order.deliveryAddress}
                </p>
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>
              </div>

              {/* Order Items */}
              <div className="order-items">
                <h4>Items Ordered</h4>
                {items.map((item, index) => (
                  <div key={index} className="item">
                    <div className="item-details">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                      <span className="item-price">₹{item.price}</span>
                    </div>
                   
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              
              <div className="price-breakdown">
                <h4>Price Details</h4>
                <div className="price-row">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="price-row">
                  <span>Delivery Fee:</span>
                  <span>{order.deliveryFee === "FREE" ? "FREE" : `₹${order.deliveryFee}`}</span>
                </div>
                <div className="price-row">
                  <span>Taxes:</span>
                  <span>₹{order.taxes}</span>
                </div>
                <div className="price-row total">
                  <span>
                    <strong>Total:</strong>
                  </span>
                  <span>
                    <strong>₹{order.total}</strong>
                  </span>
                </div>
              </div>

              {/* Order Date */}
              <div className="order-date">
                <small>Ordered on: {formatDate(order.createdAt)}</small>
              </div>

              {/* Special Instructions */}
              {order.specialInstructions && (
                <div className="special-instructions">
                  <strong>Special Instructions:</strong> {order.specialInstructions}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AdminOrders

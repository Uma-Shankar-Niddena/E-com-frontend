import { useEffect, useState } from "react"

import { useNavigate} from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player';
import '../styles/cartItem.css'

const Checkoutpage=()=> {
    
    const navigation= useNavigate()
    const [cartItems,setCartItems]=useState([])


    const [deliveryAddress,setDeliveryAddress]=useState("")
    const [selectedPayment,setSelectedPayment]=useState("")
    const [usernamuu,setUsername]=useState('')
    const [phonenumber,setPhonenumber]=useState('')
    const [orderPlaced,setOrderplaced]=useState(false)
   
  const [specialInstructions, setSpecialInstructions] = useState("")


    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = subtotal > 50 ? 0 : 5.99
  const taxes = subtotal * 0.08
  const total = subtotal + deliveryFee + taxes
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
 
   
   const orderDatabyUser = {
  username: usernamuu,
  phoneNumber: phonenumber,
  deliveryAddress: deliveryAddress,
  paymentMethod: selectedPayment,
  specialInstructions: specialInstructions,
  items: cartItems, // ✅ send as array, not JSON string
  subtotal: subtotal,
  deliveryFee: deliveryFee === 0 ? "FREE" : deliveryFee, // better to be consistent
  taxes: taxes,
  total: total
}


 const fetchCartItems=async()=>{
 
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
    

    setCartItems(data.message)

   
 
   

  }
  catch(error){
    console.log (error.message)
  }


  }
  
  
useEffect(()=>{
  fetchCartItems()


},[])



 
  const addOrdersItems=async()=>{
 

       if(!deliveryAddress){
          alert("Add delievery Address To Deliver!")
        }
        else if (!phonenumber){
          alert("Add Contact Number!")
        }

        else{
           try{   
        setOrderplaced(true)
            
        ///adding to orders table what he ordered?  

        const whatHeordered=await fetch("http://localhost:3001/orders/place-order",{
          method:"POST",
          credentials:"include",
          headers:{
                      "Content-Type":"application/json"
                  },
          body:JSON.stringify({total})
        })

        
        
              
        
        ///adding details of ordersbill where should to be deliever!
      
          
        

        const checkouturl="http://localhost:3001/place-order/add-checkout-details"
              const options={
                  method:"POST",
                  credentials:"include",
                  headers:{
                      "Content-Type":"application/json"
                  },
                  body:JSON.stringify(orderDatabyUser)
              } 
                const responsefromdb=await fetch(checkouturl,options)

              ///remove cartItems after placing order 

          
              const url2="http://localhost:3001/cart/remove-all-items"
              const removeCartitems=await fetch(url2,{
                  method:"DELETE",
                  credentials:"include" 
              }) 
              console.log(removeCartitems)
              console.log("order placed!")

              setTimeout(() => {
                setOrderplaced(false)
            

                  navigation('/home')

              }, 3500);

        
              
            

          

              
          }
          catch(err){
            console.log(err.message)
        }

        }
     
  }





 
    return (

    <>     {orderPlaced?(<div className='for-icon'>
                              <Player
                                autoplay
                                loop
                                src={'./placeorder.json'} // winebottleAni.json
                                style={{ height: '200px', width: '200px', marginRight:"50vw" }}
                              /></div>) : (
                              
                              
                          <div className="checkout-container">
        <div className="checkout-header">
          <button className="back-button" onClick={() => Navigate('/cart')}>
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
                required
              />
              <div className="contact-row">
                <input type="text" placeholder="Phone Number" onChange={(e)=>setPhonenumber(e.target.value)} required className="contact-input" />
                <input type="text" placeholder="Your Name" onChange={(e)=>setUsername(e.target.value)} required className="contact-input" />
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
                  defaultChecked
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
            

            <button className="place-order-btn" onClick={() =>addOrdersItems() }>
              Place Order • ₹{total.toFixed(2)}
            </button>


          </div>
        </div>
      </div>)}
      </>

    )
  }

  export default Checkoutpage;
function ProductCard({ product, addToCart, handleAddToCart }) {
  const {
    id = 1,
    name = "Premium Wine",
    price = 29.99,
    originalPrice = null,
    image = "/wine1.png",
    description = "A fine wine with excellent taste",
    vintage = "2020",
    region = "Napa Valley",
    type = "Red Wine",
    rating = 4.5,
    inStock = true,
  } = product || {}



  const formatPrice = (price) => `₹${price.toFixed(2)}`

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`star-${i}`} className="star" viewBox="0 0 20 20" aria-label="star">
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      )
    }

    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="star" viewBox="0 0 20 20" aria-label="half-star">
          <defs>
            <linearGradient id={`half-gradient-${id}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#half-gradient-${id})`}
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
          />
        </svg>
      )
    }

    return stars
  }

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image-container">
      <img
          src={image}
          alt={name}
          className="product-image"
          onError={(e) => (e.target.src = "/placeholder.svg")}
        />

        {originalPrice && originalPrice > price && (
          <div className="product-badge">Sale</div>
        )}
        {!inStock && <div className="product-stock-badge">Out of Stock</div>}
      </div>

      {/* Product Details */}
      <div className="product-details">
        <div className="product-header">
          <span className="product-type">{type}</span>
          <span className="product-vintage">{vintage}</span>
        </div>

        <h3 className="product-name">{name}</h3>
        <p className="product-region">{region}</p>
        <p className="product-description">{description}</p>

        <div className="product-rating">
          <div className="product-stars">{renderStars(rating)}</div>
          <span className="product-rating-text">({rating})</span>
        </div>

        <div className="product-price-container">
          <div>
            <span className="product-price">{formatPrice(price)}</span>
            {originalPrice && originalPrice > price && (
              <span className="product-original-price">
                {formatPrice(originalPrice)}
              </span>
            )}
          </div>
        </div>

        <button
          className={`product-button ${inStock ? "in-stock" : "out-of-stock"}`}
          disabled={!inStock}
          onClick={() =>{
              addToCart(product)
           
          }
            
          
          }
            
        >
          {inStock ? "Add to Cart" : "Out of Stock"}
        </button>
       
      </div>
    </div>
  )
}

export default ProductCard

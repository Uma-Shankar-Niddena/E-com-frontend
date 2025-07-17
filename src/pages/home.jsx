import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

/**
 * Home page component with hero section and featured products
 * Showcases the wine collection with call-to-action elements
 */
function Home({addToCart}) {
  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Château Margaux 2018",
      price: 299.99,
      originalPrice: 349.99,
      image: "/chatea.jpg",
      description: "An exceptional Bordeaux with complex flavors and elegant finish.",
      vintage: "2018",
      region: "Bordeaux, France",
      type: "Red Wine",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Dom Pérignon Vintage",
      price: 189.99,
      image: "/dom.jpg?height=300&width=200",
      description: "Prestigious champagne with fine bubbles and refined taste.",
      vintage: "2012",
      region: "Champagne, France",
      type: "Champagne",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 3,
      name: "Opus One 2019",
      price: 425.0,
      image: "/opus.jpg?height=300&width=200",
      description: "Iconic Napa Valley blend of Cabernet Sauvignon and Merlot.",
      vintage: "2019",
      region: "Napa Valley, USA",
      type: "Red Wine",
      rating: 4.7,
      inStock: false,
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Discover Exceptional Wines</h1>
          <p className="hero-subtitle">Premium wines, curated with taste and delivered with care.</p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Why Choose Wine Cellar?</h2>
            <p className="features-subtitle">
              We're passionate about bringing you the finest wines with exceptional service
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Premium Quality</h3>
              <p className="feature-description">
                Hand-selected wines from renowned vineyards and trusted producers worldwide
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Fast Delivery</h3>
              <p className="feature-description">Quick and secure shipping with temperature-controlled packaging</p>
            </div>

            {/* Feature 3 */}
            <div className="feature-item">
              <div className="feature-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="feature-title">Expert Support</h3>
              <p className="feature-description">Professional wine consultants to help you find the perfect bottle</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{ padding: "64px 0" }}>
        <div className="container">
          <div className="features-header">
            <h2 className="features-title">Featured Wines</h2>
            <p className="features-subtitle">Discover our carefully curated selection of exceptional wines</p>
          </div>

          <div className="products-grid" style={{ marginBottom: "48px" }}>
            {featuredProducts.map((product) => (
              
              <ProductCard key={product.id} product={product} addToCart={addToCart}/>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link to="/products" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Subscribe to our newsletter for exclusive offers and wine recommendations
          </p>

          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input" />
            <button className="newsletter-button">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

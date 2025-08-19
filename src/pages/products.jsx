"use client"

import { useState, useEffect } from "react"
import ProductCard from "../components/product-card"
import "../styles/category.css"
import LoadingAnimation from '../components/LoadingAnimation'

function Products({ addToCart, handleAddToCart }) {
  const [allProducts, setAllProducts] = useState([])
  const [selectedType, setSelectedType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [eachCatTopHead,setTopHead]=useState("All")
  const [placeholderuu,setPlaceHolder]=useState("Search Products..")
  const [sortBy, setSortBy] = useState("name")
  const [selectCategory, setCategory] = useState("all")

  // Mock data
  const wineProducts = [
    {
      id: 1,
      name: "Château Margaux 2018",
      price: 299.99,
      originalPrice: 349.99,
      image: "/placeholder.svg?height=300&width=200",
      description: "An exceptional Bordeaux with complex flavors and elegant finish.",
      vintage: "2018",
      region: "Bordeaux, France",
      type: "Red Wine",
      rating: 4.8,
      category: "wine",
      inStock: true,
    },
    {
      id: 2,
      name: "Dom Pérignon Vintage",
      price: 189.99,
      image: "/placeholder.svg?height=300&width=200",
      description: "Prestigious champagne with fine bubbles and refined taste.",
      vintage: "2012",
      category: "wine",
      region: "Champagne, France",
      type: "Champagne",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 3,
      name: "Opus One 2019",
      price: 425.0,
      image: "/placeholder.svg?height=300&width=200",
      description: "Iconic Napa Valley blend of Cabernet Sauvignon and Merlot.",
      vintage: "2019",
      category: "wine",
      region: "Napa Valley, USA",
      type: "Red Wine",
      rating: 4.7,
      inStock: false,
    },
    {
      id: 4,
      name: "Royal Stag",
      price: 799,
      image: "/placeholder.svg?height=300&width=200",
      description: "Popular Indian whiskey.",
      vintage: "2019",
      region: "India",
      category: "wine",
      type: "Whiskey",
      rating: 4.7,
      inStock: true,
    },
    {
      id: 5,
      name: "Chicken 65",
      price: 320,
      image: "/placeholder.svg?height=300&width=200",
      description: "Spicy chicken 65 with tomato ketchup.",
      vintage: "2021",
      region: "India",
      category: "stuff",
      type: "Starter",
      rating: 4.9,
      inStock: true,
    },
  ]

  useEffect(() => {
  const fetchProducts=async ()=>{
    
      try{
         
        ///products data 
       
        let fetchedData=await fetch("http://localhost:3001/api/products")
        let data=await fetchedData.json()
        console.log("api data from backend")
        console.log(data)
      
        return (data.message)
      }
      catch{
           console.log("error to get data from server")

      }

    }
    
    const getData=async ()=>{
      let serverData=await fetchProducts()
     
     
        setAllProducts(serverData)
    } 

    
     
    getData()
    
  }, [])

  // Filter logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectCategory === "all" || product.category.toLowerCase() === selectCategory.toLowerCase()
    const matchesType = selectedType === "" || product.type === selectedType
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.region.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesType && matchesSearch
  })

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })
  const categoryHeadings = {
    all: {
      title: "Our Entire Collection",
      subtitle: "Explore our full range of premium selections",
    },
    wine: {
      title: "Our Wine Collection",
      subtitle: "Discover premium wines from around the world",
    },
    stuff: {
      title: "Stuff & Starters",
      subtitle: "Delicious appetizers to pair with your drinks",
    },
    cigars: {
      title: "Luxury Cigars",
      subtitle: "Premium hand-rolled cigars for the finest moments",
    },
    water: {
      title: "Refreshing Waters",
      subtitle: "Stay hydrated with our exclusive water collection",
    },
    soda: {
      title: "Sodas & Soft Drinks",
      subtitle: "Cool down with refreshing sodas and beverages",
    },
  }
  useEffect(() => {
    clickedOnWineSection("all")
    // Default when component loads
  },[])
  // Handle category click
  const clickedOnWineSection = (cat = "all") => {
    setCategory(cat)
    
  
    switch (cat.toLowerCase()) {
      case "wine":
        setTopHead(categoryHeadings["wine"])
        setPlaceHolder("Search wines...")
        break
      case "stuff":
         
        setTopHead(categoryHeadings["stuff"])
        setPlaceHolder("Search Stuff...")
        break
      case "water":
        setTopHead(categoryHeadings["water"])
        setPlaceHolder("Search Water...")
        break
      case "cigar":
        setTopHead(categoryHeadings["cigars"])
        setPlaceHolder("Search Cigars...")
        break
      default:
        console.log("default triggered for:", cat)
        setTopHead(categoryHeadings["all"])
        setPlaceHolder("Search All Products...")
        break
    }
  }
  

 
  



  const categoryImages = {
  Wine: "/wine-icon.svg",
  Stuff: "/food-icon.svg",
  Water: "/water-bottle-icon.svg",
  cigar: "/cigar-icon.svg"
};

  return (
    <>
      {/* Category Section */}
      <div className="number-of-products">
        {[ "Wine", "Stuff", "Water", "cigar"].map((cat) => (
          <div className="each-category" key={cat}>
             <img src={categoryImages[cat]} alt={cat} className="imagicon" />
             
             




            <p className="each-text">
              <a href="#" onClick={() => clickedOnWineSection(cat.toLowerCase())}>{cat}</a>
            </p>
          </div>
        ))}
      </div>

      {/* Main Section */}
      <div style={{ minHeight: "100vh", minWidth: "100vw", backgroundColor: "#f9fafb" }}>
        <div className="products-header inline-block" >
          <div className="container">
            <LoadingAnimation cate={selectCategory}/>
            <h1 className="products-title">{eachCatTopHead.title}</h1>
            <p className="products-subtitle">{eachCatTopHead.subtitle}</p>
          </div>
        </div>

        <div className="container" style={{ padding: "32px 20px" }}>
          {/* Filters */}
          <div className="products-filters">
            <div className="filters-row">
              {/* Search */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder={placeholderuu}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
                <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Sorting */}
              <div className="filters-group">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-select"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="results-count">
              Showing {sortedProducts.length} of {allProducts.length} products
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length > 0 ? (
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <svg className="no-results-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.007-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2.306"
                />
              </svg>
              <h3 className="no-results-title">No products found</h3>
              <p className="no-results-description">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedType("All")
                  setCategory("All")
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Products

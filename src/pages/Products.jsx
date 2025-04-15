import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaFilter, FaSort, FaSearch } from "react-icons/fa";
import "./Products.css";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([
    "All",
    "Women",
    "Men",
    "Accessories",
    "Shoes",
    "Kids",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [showFilters, setShowFilters] = useState(false);

  // Sample product data (in a real app, this would come from an API)
  const sampleProducts = [
    {
      id: 1,
      name: "Summer Floral Dress",
      price: 59.99,
      image: "/assets/images/products/dress1.jpg",
      category: "Women",
      rating: 4.5,
      reviews: 24,
      isFeatured: true,
      isOnSale: false,
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 79.99,
      image: "/assets/images/products/jacket1.jpg",
      category: "Men",
      rating: 4.2,
      reviews: 18,
      isFeatured: true,
      isOnSale: true,
    },
    {
      id: 3,
      name: "Casual Sneakers",
      price: 49.99,
      image: "/assets/images/products/shoes1.jpg",
      category: "Shoes",
      rating: 4.7,
      reviews: 32,
      isFeatured: false,
      isOnSale: false,
    },
    {
      id: 4,
      name: "Leather Handbag",
      price: 89.99,
      image: "/assets/images/products/bag1.jpg",
      category: "Accessories",
      rating: 4.8,
      reviews: 15,
      isFeatured: true,
      isOnSale: false,
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      price: 69.99,
      image: "/assets/images/products/jeans2.jpg",
      category: "Men",
      rating: 4.3,
      reviews: 27,
      isFeatured: false,
      isOnSale: true,
    },
    {
      id: 6,
      name: "Boho Maxi Skirt",
      price: 45.99,
      image: "/assets/images/products/skirt1.jpg",
      category: "Women",
      rating: 4.1,
      reviews: 19,
      isFeatured: false,
      isOnSale: false,
    },
    {
      id: 7,
      name: "Silver Hoop Earrings",
      price: 29.99,
      image: "/assets/images/products/accesories3.jpg",
      category: "Accessories",
      rating: 4.6,
      reviews: 22,
      isFeatured: false,
      isOnSale: true,
    },
    {
      id: 9,
      name: "Kids Cartoon T-Shirt",
      price: 24.99,
      image: "/assets/images/products/kidsshirt3.jpg",
      category: "Kids",
      rating: 4.8,
      reviews: 28,
      isFeatured: true,
      isOnSale: true,
    },
  ];

  useEffect(() => {
    // Simulate API fetch with a timeout
    const fetchProducts = () => {
      setTimeout(() => {
        setProducts(sampleProducts);
        setLoading(false);
      }, 800);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Check if there's a category in the URL params
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      // Capitalize first letter to match our category format
      const formattedCategory =
        categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      if (categories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      }
    }

    // Check if there's a sale filter
    const saleParam = searchParams.get("sale");
    if (saleParam === "true") {
      setSelectedCategory("Sale");
    }
  }, [searchParams, categories]);

  useEffect(() => {
    // Filter and sort products whenever dependencies change
    let result = [...products];

    // Apply category filter
    if (selectedCategory !== "All") {
      if (selectedCategory === "Sale") {
        result = result.filter((product) => product.isOnSale);
      } else {
        result = result.filter(
          (product) => product.category === selectedCategory
        );
      }
    }

    // Apply search query filter
    if (searchQuery) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    result = result.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, selectedCategory, sortOption, searchQuery, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: Number(value),
    }));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Discover our curated collection of fashion items</p>
      </div>

      <div className="products-controls">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div className="filter-sort-controls">
          <button className="filter-toggle" onClick={toggleFilters}>
            <FaFilter /> Filters
          </button>

          <div className="sort-control">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortOption} onChange={handleSortChange}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-container">
        <div className={`filters-sidebar ${showFilters ? "show" : ""}`}>
          <div className="filter-section">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category) => (
                <li key={category}>
                  <button
                    className={selectedCategory === category ? "active" : ""}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className={selectedCategory === "Sale" ? "active" : ""}
                  onClick={() => handleCategoryChange("Sale")}
                >
                  Sale
                </button>
              </li>
            </ul>
          </div>

          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="price-inputs">
              <div className="price-input">
                <label htmlFor="min-price">Min:</label>
                <input
                  type="number"
                  id="min-price"
                  min="0"
                  max={priceRange.max}
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                />
              </div>
              <div className="price-input">
                <label htmlFor="max-price">Max:</label>
                <input
                  type="number"
                  id="max-price"
                  min={priceRange.min}
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="products-grid">
          {loading ? (
            <div className="loading-spinner">Loading products...</div>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                  {product.isOnSale && <span className="sale-badge">Sale</span>}
                </div>
                <h3>{product.name}</h3>
                <div className="product-info">
                  <p className="product-price">${product.price.toFixed(2)}</p>
                  <div className="product-rating">
                    <span className="rating-stars">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <span
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "star filled"
                                : "star"
                            }
                          >
                            ★
                          </span>
                        ))}
                    </span>
                    <span className="rating-count">({product.reviews})</span>
                  </div>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="view-product-btn"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No products found matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setPriceRange({ min: 0, max: 200 });
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

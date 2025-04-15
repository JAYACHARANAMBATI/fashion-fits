import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaHeart,
  FaShareAlt,
  FaLink,
  FaTruck,
  FaShieldAlt,
  FaExchangeAlt,
} from "react-icons/fa";
import sampleProducts from "../../data/products.js";
import "./ProductDetail.css";

const ProductDetail = ({ cart, setCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [pairProducts, setPairProducts] = useState([]);
  const [pairedItems, setPairedItems] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
  });
  const mainImageRef = useRef(null);

  // Handle zoom functionality with mouse movement
  const handleImageMouseMove = (e) => {
    if (!isZoomed || !mainImageRef.current) return;

    const { left, top, width, height } =
      mainImageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    mainImageRef.current.style.transformOrigin = `${x * 100}% ${y * 100}%`;
  };

  useEffect(() => {
    const fetchProduct = () => {
      try {
        const foundProduct = sampleProducts.find((p) => p.id === parseInt(id));

        if (!foundProduct) {
          throw new Error("Product not found");
        }

        setProduct(foundProduct);

        // Find products that would pair well with this one
        // Algorithm:
        // 1. Different category than current product
        // 2. Limit to 4 products
        const complementaryProducts = sampleProducts
          .filter(
            (p) => p.id !== parseInt(id) && p.category !== foundProduct.category
          )
          .slice(0, 4);

        setPairProducts(complementaryProducts);

        // Reset paired items when viewing a new product
        setPairedItems([]);

        // Simulate random wishlist state
        setIsWishlisted(Math.random() > 0.5);

        // Reset zoom state when changing products
        setIsZoomed(false);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    window.scrollTo(0, 0);
    setLoading(true);
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setNotification({
        show: true,
        message: "Please select a size",
      });

      setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 3000);
      return;
    }

    setLoadingAddToCart(true);

    const newItem = {
      ...product,
      size: selectedSize,
      quantity: quantity,
      image: product.images ? product.images[0] : product.image,
    };

    // Simulate network request
    setTimeout(() => {
      // If there are paired items, add them too
      if (pairedItems.length > 0) {
        const allItems = [
          newItem,
          ...pairedItems.map((item) => ({
            ...item,
            size: selectedSize, // Use same size for simplicity, in a real app you'd handle this better
            quantity: 1, // Default quantity for paired items
          })),
        ];

        setCart([...cart, ...allItems]);
        setNotification({
          show: true,
          message: `Added ${allItems.length} items to cart!`,
        });
      } else {
        setCart([...cart, newItem]);
        setNotification({
          show: true,
          message: "Item added to cart!",
        });
      }

      setLoadingAddToCart(false);

      setTimeout(() => {
        setNotification({ show: false, message: "" });
      }, 3000);
    }, 800);
  };

  const handlePairItem = (item, event) => {
    event.preventDefault(); // Prevent navigation

    // Check if already paired
    const alreadyPaired = pairedItems.some(
      (pairedItem) => pairedItem.id === item.id
    );

    if (alreadyPaired) {
      // Remove from paired items
      setPairedItems(
        pairedItems.filter((pairedItem) => pairedItem.id !== item.id)
      );
    } else {
      // Add to paired items
      setPairedItems([...pairedItems, item]);
    }
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);

    setNotification({
      show: true,
      message: !isWishlisted
        ? "Added to your wishlist!"
        : "Removed from your wishlist!",
    });

    setTimeout(() => {
      setNotification({ show: false, message: "" });
    }, 3000);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <motion.div
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="error"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Product not found</h2>
        <Link to="/products" className="back-link">
          <FaArrowLeft /> Back to Products
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="product-detail-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/products" className="back-link">
        <FaArrowLeft /> Back to Products
      </Link>

      <div className="product-content">
        {/* Left Column - Product Images */}
        <motion.div
          className="product-images-column"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div
            className="main-image-container"
            onMouseMove={handleImageMouseMove}
            onClick={() => setIsZoomed(!isZoomed)}
          >
            <motion.img
              ref={mainImageRef}
              src={product.images[selectedImage]}
              alt={product.name}
              className={`main-image ${isZoomed ? "zoomed" : ""}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={selectedImage}
              transition={{ duration: 0.3 }}
            />
            {product.images.length > 1 && (
              <>
                <motion.button
                  className="image-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    );
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft />
                </motion.button>
                <motion.button
                  className="image-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    );
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight />
                </motion.button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="thumbnail-container">
              {product.images.map((img, index) => (
                <motion.div
                  key={index}
                  className={`thumbnail ${
                    selectedImage === index ? "active" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <img src={img} alt={`${product.name} view ${index + 1}`} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Right Column - Product Info */}
        <motion.div
          className="product-info-column"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="product-header">
            <h1 className="product-title">{product.name}</h1>
            <div className="product-actions">
              <motion.button
                className={`action-btn wishlist-btn ${
                  isWishlisted ? "active" : ""
                }`}
                onClick={toggleWishlist}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaHeart />
              </motion.button>
              <motion.button
                className="action-btn share-btn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaShareAlt />
              </motion.button>
            </div>
          </div>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 * i }}
                  >
                    {product.rating >= ratingValue ? (
                      <FaStar className="star filled" />
                    ) : product.rating >= ratingValue - 0.5 ? (
                      <FaStarHalfAlt className="star filled" />
                    ) : (
                      <FaRegStar className="star" />
                    )}
                  </motion.span>
                );
              })}
            </div>
            <span className="review-count">{product.reviews} Reviews</span>
          </div>

          <motion.div
            className="product-price-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="price">${product.price.toFixed(2)}</p>
            {product.isOnSale && (
              <motion.span
                className="sale-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 15,
                }}
              >
                SALE
              </motion.span>
            )}
          </motion.div>

          <div className="product-description">
            <p>{product.description}</p>
          </div>

          <div className="product-category">
            <span className="category-label">Category:</span> {product.category}
          </div>

          <div className="product-options">
            <div className="size-selector">
              <label>Size:</label>
              <div className="size-options">
                {["S", "M", "L", "XL"].map((size) => (
                  <motion.button
                    key={size}
                    className={`size-btn ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <motion.button
                  className="quantity-btn"
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  disabled={quantity <= 1}
                  whileTap={{ scale: 0.9 }}
                >
                  -
                </motion.button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                />
                <motion.button
                  className="quantity-btn"
                  onClick={() => setQuantity((prev) => prev + 1)}
                  whileTap={{ scale: 0.9 }}
                >
                  +
                </motion.button>
              </div>
            </div>
          </div>

          <motion.div
            className="product-actions-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button
              className={`add-to-cart-btn ${loadingAddToCart ? "loading" : ""}`}
              onClick={handleAddToCart}
              disabled={loadingAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {loadingAddToCart ? (
                <div className="btn-spinner"></div>
              ) : (
                <>
                  <FaShoppingCart /> Add to Cart
                </>
              )}
            </motion.button>
            <motion.button
              className="buy-now-btn"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Buy Now
            </motion.button>
          </motion.div>

          <motion.div
            className="product-benefits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="benefit">
              <FaTruck className="benefit-icon" />
              <span>Free shipping over $50</span>
            </div>
            <div className="benefit">
              <FaShieldAlt className="benefit-icon" />
              <span>2 year warranty</span>
            </div>
            <div className="benefit">
              <FaExchangeAlt className="benefit-icon" />
              <span>30 day returns</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Additional Product Information Section */}
      <div className="additional-info">
        <div className="info-tabs">
          <button className="tab-btn active">Details</button>
          <button className="tab-btn">Reviews ({product.reviews})</button>
          <button className="tab-btn">Shipping</button>
        </div>

        <div className="tab-content">
          <div className="product-details">
            <div className="detail-item">
              <h3>Material</h3>
              <p>Premium quality fabric for comfort and durability</p>
            </div>
            <div className="detail-item">
              <h3>Care Instructions</h3>
              <p>Machine wash cold, tumble dry low</p>
            </div>
            <div className="detail-item">
              <h3>Features</h3>
              <p>Breathable, lightweight, and stylish design</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pair Matchings Section */}
      <motion.div
        className="pair-matchings-section"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <h2 className="section-title">Pair With These Items</h2>

        <AnimatePresence>
          {pairedItems.length > 0 && (
            <motion.div
              className="paired-summary"
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                transition: { duration: 0.3 },
              }}
              exit={{ opacity: 0, height: 0 }}
            >
              <p>
                <strong>{pairedItems.length}</strong> items paired with this{" "}
                {product.name}.
                <span className="paired-message">
                  These items will be added to your cart together.
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="pair-products-container">
          {pairProducts.map((item, index) => {
            const isPaired = pairedItems.some(
              (pairedItem) => pairedItem.id === item.id
            );

            return (
              <motion.div
                key={item.id}
                className="pair-product-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <Link to={`/product/${item.id}`} className="pair-product-link">
                  <div className="pair-product-image">
                    <img src={item.image} alt={item.name} />
                    {item.isOnSale && (
                      <motion.span
                        className="pair-sale-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      >
                        SALE
                      </motion.span>
                    )}
                  </div>
                  <div className="pair-product-info">
                    <h3 className="pair-product-name">{item.name}</h3>
                    <p className="pair-product-price">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="pair-product-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => {
                          const ratingValue = i + 1;
                          return (
                            <span key={i}>
                              {item.rating >= ratingValue ? (
                                <FaStar className="star filled" />
                              ) : item.rating >= ratingValue - 0.5 ? (
                                <FaStarHalfAlt className="star filled" />
                              ) : (
                                <FaRegStar className="star" />
                              )}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
                <motion.button
                  className={`pair-with-btn ${isPaired ? "paired" : ""}`}
                  onClick={(e) => handlePairItem(item, e)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaLink /> {isPaired ? "Unpair Item" : "Pair with this"}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className="notification"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductDetail;

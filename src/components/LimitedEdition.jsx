import React, { useState } from "react";
import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";
import "./LimitedEdition.css";

const LimitedEdition = ({ cart, setCart }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedProduct, setSelectedProduct] = useState("shoes");
  const [splineError, setSplineError] = useState(false);

  const products = [
    {
      id: "shoes",
      name: "Premium Sneakers",
      price: 129.99,
      description:
        "Limited edition premium sneakers with unique design and superior comfort.",
      scene: "https://prod.spline.design/02gJi0VQXDC81npN/scene.splinecode",
      image: "/assets/images/products/Premium Sneakers.png",
    },
    {
      id: "sweater",
      name: "Designer Sweater",
      price: 89.99,
      description: "Exclusive designer sweater made from premium materials.",
      scene: "https://prod.spline.design/8EJmd3jysRzNYtNV/scene.splinecode",
      image: "/assets/images/products/Designer Sweater.png",
    },
    {
      id: "cap",
      name: "Signature Cap",
      price: 39.99,
      description:
        "Limited edition cap with unique embroidery and premium materials.",
      scene: "https://prod.spline.design/xVQC-w-VJo5e7P9K/scene.splinecode",
      image: "/assets/images/products/Signature Cap.png",
    },
    {
      id: "boots",
      name: "Premium Boots",
      price: 159.99,
      description:
        "Handcrafted premium boots with superior durability and style.",
      scene: "https://prod.spline.design/9SkGIHuV5Lz8qUbq/scene.splinecode",
      image: "/assets/images/products/Premium Boots.png",
    },
    {
      id: "tshirt",
      name: "Limited Edition T-Shirt",
      price: 49.99,
      description:
        "Premium quality t-shirt with unique limited edition design and superior comfort.",
      scene: "https://prod.spline.design/3sawo4mBe7AAuQc9/scene.splinecode",
      image: "/assets/images/products/Limited Edition T-Shirt.png",
    },
  ];

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    const product = products.find((p) => p.id === selectedProduct);
    const newItem = {
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: 1,
      image: product.image,
    };

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };

  const currentProduct = products.find((p) => p.id === selectedProduct);

  return (
    <motion.div
      className="limited-edition-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="limited-edition-header">
        <h1>Limited Edition Collection</h1>
        <p>Exclusive designs with premium quality</p>
      </div>

      <div className="product-selector">
        {products.map((product) => (
          <motion.button
            key={product.id}
            className={`product-tab ${
              selectedProduct === product.id ? "active" : ""
            }`}
            onClick={() => {
              setSelectedProduct(product.id);
              setIsLoading(true);
              setSplineError(false);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {product.name}
          </motion.button>
        ))}
      </div>

      <div className="product-viewer">
        <div className="spline-container">
          {isLoading && (
            <div className="loading-overlay">
              <div className="spinner"></div>
            </div>
          )}
          {currentProduct.scene && !splineError ? (
            <Spline
              scene={currentProduct.scene}
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setSplineError(true);
              }}
            />
          ) : (
            <div className="fallback-image">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=Product+Image";
                }}
              />
            </div>
          )}
        </div>

        <div className="product-details">
          <h2>{currentProduct.name}</h2>
          <p className="price">${currentProduct.price}</p>
          <p className="description">{currentProduct.description}</p>

          <div className="size-selector">
            <h3>Size</h3>
            <div className="size-options">
              {sizes.map((size) => (
                <motion.button
                  key={size}
                  className={`size-option ${
                    selectedSize === size ? "selected" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default LimitedEdition;

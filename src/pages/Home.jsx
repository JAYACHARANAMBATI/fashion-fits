import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Spline from "@splinetool/react-spline";
import TrendingCard from "../components/UI/TrendingCard";
import "./Home.css";
// Import images
import dress2 from "/assets/images/products/dress2.jpg";
import dress3 from "/assets/images/products/dress3.jpg";
import jacket2 from "/assets/images/products/jacket2.jpg";
import shoes2 from "/assets/images/products/shoes2.jpg";
import bag2 from "/assets/images/products/bag2.jpg";
import women from "/assets/images/products/women.avif";
import men from "/assets/images/products/men.webp";
import accessories from "/assets/images/products/accessories.jpg";
import shoes from "/assets/images/products/shoes.jpg";
import kids from "/assets/images/products/kids.jpg";

const Home = () => {
  // Refs for parallax effects
  const heroRef = useRef(null);
  const trendingRef = useRef(null);

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  // Testimonials data
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      text: "Fashion Fits has completely transformed my wardrobe! The quality of their clothes is exceptional, and their customer service is top-notch.",
      author: "Sarah Johnson",
      role: "Fashion Blogger",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      text: "I've been shopping here for years and have never been disappointed. The variety of styles and sizes is impressive!",
      author: "Michael Chen",
      role: "Loyal Customer",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      text: "The trendy collections and affordable prices keep me coming back. Fashion Fits understands what modern shoppers want!",
      author: "Emma Rodriguez",
      role: "Style Enthusiast",
      avatar: "https://randomuser.me/api/portraits/women/63.jpg",
    },
  ]);

  // Trending products data
  const [trendingProducts, setTrendingProducts] = useState([
    {
      id: 5,
      name: "Elegant Evening Dress",
      price: 89.99,
      image: dress2,
      category: "dresses",
    },
    {
      id: 6,
      name: "Vintage Leather Jacket",
      price: 129.99,
      image: jacket2,
      category: "outerwear",
    },
    {
      id: 7,
      name: "Designer Tote Bag",
      price: 69.99,
      image: bag2,
      category: "accessories",
    },
    {
      id: 8,
      name: "Premium Running Shoes",
      price: 119.99,
      image: shoes2,
      category: "shoes",
    },
  ]);

  // Trending products data only - Featured products removed

  const categories = [
    { id: 1, name: "Women", image: women },
    { id: 2, name: "Men", image: men },
    { id: 3, name: "Accessories", image: accessories },
    { id: 4, name: "Shoes", image: shoes },
    { id: 5, name: "Kids", image: kids },
  ];

  return (
    <div className="home-container">
      {/* Spline 3D Scene */}
      <div className="hero-banner">
        <Spline scene="https://prod.spline.design/AdwzPLKdxuiFG8ZB/scene.splinecode" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Fashion That Fits Your Style
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Discover the latest trends and express yourself with our curated
            collection
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <motion.section
        className="categories-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Shop By Category
        </motion.h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              className="category-card"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <motion.div
                className="category-img-container"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-img"
                />
              </motion.div>
              <h3>{category.name}</h3>
              <Link
                to={`/products?category=${category.name.toLowerCase()}`}
                className="category-link"
              >
                Explore
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Newsletter Signup with Enhanced Animation */}
      <motion.section
        className="newsletter"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
      >
        <div className="newsletter-content">
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Stay Updated
          </motion.h2>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Subscribe to our newsletter for the latest trends and exclusive
            offers
          </motion.p>
          <motion.form
            className="newsletter-form"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <input type="email" placeholder="Your email address" required />
            <motion.button
              type="submit"
              className="subscribe-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </motion.form>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart, FaUser, FaSearch, FaHeart } from "react-icons/fa";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

const Navbar = ({ user, cartCount }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if the current path matches the link
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img
            src="/assets/images/products/logo.jpg"
            alt="FashionLimit Logo"
            className="navbar-logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className="brand-text">Fashion</span>
          <span className="brand-highlight">Limit</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ "--bs-scroll-height": "100px" }}
          >
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActive("/") ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/products"
                className={`nav-link ${isActive("/products") ? "active" : ""}`}
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/limited-edition"
                className={`nav-link ${
                  isActive("/limited-edition") ? "active" : ""
                }`}
              >
                Limited Edition
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    to="/products?category=clothing"
                  >
                    Clothing
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/products?category=accessories"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/products?category=sale">
                    Sale Items
                  </Link>
                </li>
              </ul>
            </li>
            {user ? (
              <li className="nav-item">
                <Link
                  to="/dashboard"
                  className={`nav-link ${
                    isActive("/dashboard") ? "active" : ""
                  }`}
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <Link
                  to="/login"
                  className={`nav-link ${isActive("/login") ? "active" : ""}`}
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
          <form className="d-flex search-form" role="search">
            <div className="search-input-container">
              <input
                className="form-control search-input"
                type="search"
                placeholder="Search products..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="search-button" type="submit">
                <FaSearch />
              </button>
            </div>
          </form>
          <div className="ms-3 d-flex align-items-center nav-icons">
            <Link to="/wishlist" className="icon-link">
              <FaHeart className="nav-icon" />
            </Link>
            <Link to="/checkout" className="icon-link position-relative">
              <FaShoppingCart className="nav-icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to={user ? "/dashboard" : "/login"} className="icon-link">
              <FaUser className="nav-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

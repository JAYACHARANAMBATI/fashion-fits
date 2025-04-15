import { useState } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaCreditCard,
  FaHeart,
  FaSignOutAlt,
  FaCog,
} from "react-icons/fa";
import "../App.css";
import "./Dashboard.css";

import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Dashboard = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };
  const [activeTab, setActiveTab] = useState("profile");

  // Mock order data (in a real app, this would come from an API)
  const [orders, setOrders] = useState([
    {
      id: "ORD-1234",
      date: "2023-05-15",
      total: 139.98,
      status: "Delivered",
      items: [
        { id: 1, name: "Summer Floral Dress", price: 59.99, quantity: 1 },
        { id: 2, name: "Classic Denim Jacket", price: 79.99, quantity: 1 },
      ],
    },
    {
      id: "ORD-5678",
      date: "2023-04-28",
      total: 49.99,
      status: "Processing",
      items: [{ id: 3, name: "Casual Sneakers", price: 49.99, quantity: 1 }],
    },
  ]);

  // Mock wishlist data
  const [wishlist, setWishlist] = useState([
    {
      id: 4,
      name: "Leather Handbag",
      price: 89.99,
      image: "/src/assets/images/products/bag1.jpg",
    },
    {
      id: 5,
      name: "Slim Fit Jeans",
      price: 69.99,
      image: "/src/assets/images/products/jeans1.jpg",
    },
  ]);

  // Mock address data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      street: "123 Fashion Street",
      city: "Styleville",
      state: "CA",
      zip: "90210",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      street: "456 Trend Avenue",
      city: "Styleville",
      state: "CA",
      zip: "90211",
      isDefault: false,
    },
  ]);

  // Mock payment methods
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Credit Card",
      last4: "4242",
      expiry: "05/25",
      isDefault: true,
    },
    {
      id: 2,
      type: "PayPal",
      email: "user@example.com",
      isDefault: false,
    },
  ]);

  if (!user) {
    return (
      <div className="dashboard-container">
        <div className="auth-message">
          <h2>Please log in to view your dashboard</h2>
          <a href="/login" className="auth-button">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome {user.name}</h1>
        <button onClick={handleLogout} className="auth-button">
          Logout
        </button>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-sidebar">
          <div className="user-info">
            <div className="user-avatar">
              <FaUser size={40} />
            </div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <ul className="dashboard-nav">
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser /> Profile
            </li>
            <li
              className={activeTab === "orders" ? "active" : ""}
              onClick={() => setActiveTab("orders")}
            >
              <FaShoppingBag /> Orders
            </li>
            <li
              className={activeTab === "wishlist" ? "active" : ""}
              onClick={() => setActiveTab("wishlist")}
            >
              <FaHeart /> Wishlist
            </li>
            <li
              className={activeTab === "payment" ? "active" : ""}
              onClick={() => setActiveTab("payment")}
            >
              <FaCreditCard /> Payment Methods
            </li>
            <li
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog /> Settings
            </li>
            <li className="logout">
              <FaSignOutAlt /> Logout
            </li>
          </ul>
        </div>

        <div className="dashboard-main">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Profile Information</h2>
              <div className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" defaultValue={user.name} />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="Add phone number" />
                </div>
                <button className="update-button">Update Profile</button>
              </div>

              <h3>Addresses</h3>
              <div className="addresses-list">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`address-card ${
                      address.isDefault ? "default" : ""
                    }`}
                  >
                    <div className="address-header">
                      <h4>{address.type}</h4>
                      {address.isDefault && (
                        <span className="default-badge">Default</span>
                      )}
                    </div>
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zip}
                    </p>
                    <div className="address-actions">
                      <button className="edit-btn">Edit</button>
                      {!address.isDefault && (
                        <button className="delete-btn">Delete</button>
                      )}
                    </div>
                  </div>
                ))}
                <button className="add-address-btn">Add New Address</button>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="orders-section">
              <h2>Order History</h2>
              {orders.length > 0 ? (
                <div className="orders-list">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-header">
                        <div>
                          <h3>Order #{order.id}</h3>
                          <p className="order-date">Placed on {order.date}</p>
                        </div>
                        <div className="order-status">
                          <span
                            className={`status-badge ${order.status.toLowerCase()}`}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="order-items">
                        {order.items.map((item) => (
                          <div key={item.id} className="order-item">
                            <div className="item-details">
                              <h4>{item.name}</h4>
                              <p>Quantity: {item.quantity}</p>
                            </div>
                            <div className="item-price">
                              ${item.price.toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="order-footer">
                        <div className="order-total">
                          <p>
                            Total: <span>${order.total.toFixed(2)}</span>
                          </p>
                        </div>
                        <div className="order-actions">
                          <button className="view-details-btn">
                            View Details
                          </button>
                          {order.status === "Delivered" && (
                            <button className="write-review-btn">
                              Write a Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaShoppingBag size={48} />
                  <h3>No orders yet</h3>
                  <p>When you place orders, they will appear here</p>
                  <a href="/products" className="shop-now-btn">
                    Shop Now
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="wishlist-section">
              <h2>My Wishlist</h2>
              {wishlist.length > 0 ? (
                <div className="wishlist-grid">
                  {wishlist.map((item) => (
                    <div key={item.id} className="wishlist-item">
                      <div className="wishlist-img-container">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="wishlist-img"
                        />
                      </div>
                      <div className="wishlist-item-details">
                        <h3>{item.name}</h3>
                        <p className="wishlist-price">
                          ${item.price.toFixed(2)}
                        </p>
                        <div className="wishlist-actions">
                          <button className="add-to-cart-btn">
                            Add to Cart
                          </button>
                          <button className="remove-wishlist-btn">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaHeart size={48} />
                  <h3>Your wishlist is empty</h3>
                  <p>Save items you love to your wishlist</p>
                  <a href="/products" className="shop-now-btn">
                    Browse Products
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === "payment" && (
            <div className="payment-section">
              <h2>Payment Methods</h2>
              <div className="payment-methods-list">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`payment-card ${
                      method.isDefault ? "default" : ""
                    }`}
                  >
                    <div className="payment-card-header">
                      <h4>{method.type}</h4>
                      {method.isDefault && (
                        <span className="default-badge">Default</span>
                      )}
                    </div>
                    <div className="payment-card-details">
                      {method.type === "Credit Card" ? (
                        <p>
                          •••• •••• •••• {method.last4} | Expires:{" "}
                          {method.expiry}
                        </p>
                      ) : (
                        <p>{method.email}</p>
                      )}
                    </div>
                    <div className="payment-card-actions">
                      {!method.isDefault && (
                        <button className="make-default-btn">
                          Make Default
                        </button>
                      )}
                      <button className="delete-btn">Remove</button>
                    </div>
                  </div>
                ))}
                <button className="add-payment-btn">Add Payment Method</button>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <h2>Account Settings</h2>

              <div className="settings-group">
                <h3>Password</h3>
                <div className="form-group">
                  <label>Current Password</label>
                  <input type="password" />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input type="password" />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input type="password" />
                </div>
                <button className="update-button">Update Password</button>
              </div>

              <div className="settings-group">
                <h3>Notifications</h3>
                <div className="checkbox-group">
                  <input type="checkbox" id="order-updates" defaultChecked />
                  <label htmlFor="order-updates">Order updates</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="promotions" defaultChecked />
                  <label htmlFor="promotions">Promotions and sales</label>
                </div>
                <div className="checkbox-group">
                  <input type="checkbox" id="new-products" />
                  <label htmlFor="new-products">New product arrivals</label>
                </div>
                <button className="update-button">Save Preferences</button>
              </div>

              <div className="danger-zone">
                <h3>Danger Zone</h3>
                <button className="delete-account-btn">Delete Account</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

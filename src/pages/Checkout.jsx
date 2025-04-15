import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaCreditCard,
  FaMapMarkerAlt,
  FaCheck,
} from "react-icons/fa";
import "./Checkout.css";

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState("");

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContinue = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    // Generate a random order ID
    const newOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(newOrderId);
    setOrderComplete(true);
    setStep(4);
    // Clear cart after successful order
    setCart([]);
  };

  const handleContinueShopping = () => {
    navigate("/products");
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="checkout-container empty-cart">
        <FaShoppingCart size={48} />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button
          className="continue-shopping-btn"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      {/* Checkout Progress */}
      <div className="checkout-progress">
        <div className={`progress-step ${step >= 1 ? "active" : ""}`}>
          <div className="step-number">1</div>
          <div className="step-label">Cart Review</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 2 ? "active" : ""}`}>
          <div className="step-number">2</div>
          <div className="step-label">Shipping</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 3 ? "active" : ""}`}>
          <div className="step-number">3</div>
          <div className="step-label">Payment</div>
        </div>
        <div className="progress-line"></div>
        <div className={`progress-step ${step >= 4 ? "active" : ""}`}>
          <div className="step-number">4</div>
          <div className="step-label">Confirmation</div>
        </div>
      </div>

      {/* Step 1: Cart Review */}
      {step === 1 && (
        <div className="checkout-step">
          <h2>Review Your Cart</h2>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100x100?text=Product+Image";
                    }}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="item-quantity">
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="checkout-actions">
            <button className="continue-btn" onClick={handleContinue}>
              Continue to Shipping
            </button>
            <button
              className="back-to-shop-btn"
              onClick={handleContinueShopping}
            >
              Back to Shopping
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Shipping Information */}
      {step === 2 && (
        <div className="checkout-step">
          <h2>Shipping Information</h2>
          <form className="shipping-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={shippingInfo.state}
                  onChange={handleShippingChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="zipCode">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={shippingInfo.zipCode}
                  onChange={handleShippingChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={shippingInfo.phone}
                onChange={handleShippingChange}
                required
              />
            </div>
          </form>
          <div className="checkout-actions">
            <button className="continue-btn" onClick={handleContinue}>
              Continue to Payment
            </button>
            <button className="back-btn" onClick={handleBack}>
              Back to Cart
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {step === 3 && (
        <div className="checkout-step">
          <h2>Payment Method</h2>
          <div className="payment-methods">
            <div className="payment-method-selection">
              <div
                className={`payment-method ${
                  paymentMethod === "credit-card" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("credit-card")}
              >
                <FaCreditCard />
                <span>Credit Card</span>
              </div>
              <div
                className={`payment-method ${
                  paymentMethod === "paypal" ? "selected" : ""
                }`}
                onClick={() => setPaymentMethod("paypal")}
              >
                <span className="paypal-icon">PayPal</span>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <form className="credit-card-form">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInfoChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={cardInfo.cardName}
                    onChange={handleCardInfoChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardInfo.expiry}
                      onChange={handleCardInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardInfo.cvv}
                      onChange={handleCardInfoChange}
                      required
                    />
                  </div>
                </div>
              </form>
            )}

            {paymentMethod === "paypal" && (
              <div className="paypal-info">
                <p>
                  You will be redirected to PayPal to complete your payment.
                </p>
              </div>
            )}
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Items ({cart.length}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping:</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="checkout-actions">
            <button className="place-order-btn" onClick={handleSubmitOrder}>
              Place Order
            </button>
            <button className="back-btn" onClick={handleBack}>
              Back to Shipping
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Order Confirmation */}
      {step === 4 && (
        <div className="checkout-step confirmation">
          <div className="confirmation-icon">
            <FaCheck size={48} />
          </div>
          <h2>Order Confirmed!</h2>
          <p className="order-id">Order #{orderId}</p>
          <p className="confirmation-message">
            Thank you for your purchase! We've received your order and will
            begin processing it right away. You will receive a confirmation
            email shortly with your order details.
          </p>
          <div className="order-details">
            <h3>Order Details</h3>
            <div className="summary-row">
              <span>Order Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping Address:</span>
              <span>
                {shippingInfo.fullName}
                <br />
                {shippingInfo.address}
                <br />
                {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
              </span>
            </div>
          </div>
          <button
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;

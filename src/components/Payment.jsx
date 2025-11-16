import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import logo from "../assets/navlogopic.png";

function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    phone: "",
    streetAddress: "",
    aptNumber: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tahCart") || "[]");
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = cartItems.length > 0 ? 0.00 : 0;
  const total = subtotal + shippingCost;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    // Navigate to Stripe payment page with order data
    navigate("/payment-page", {
      state: {
        cartItems,
        subtotal,
        shippingCost,
        total,
        shippingAddress: formData,
      },
    });
  };

  return (
    <>
      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="shop-navbar-container">
          <div className="shop-navbar-content">
            <div className="shop-navbar-logo">
              <a href="/">
                <img src={logo} alt="Tah Logo" />
              </a>
            </div>

            <div className="shop-navbar-actions">
              <button className="cart-button" onClick={() => navigate("/cart")}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path
                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="cart-badge">{cartItems.length}</span>
              </button>

              <button className="shop-menu-button" onClick={toggleMenu}>
                <svg fill="#270E07" stroke="currentColor" viewBox="1 1 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Payment Section */}
      <section className="payment-section">
        <div className="payment-container">
          {/* Left Column */}
          <div className="payment-left">
            {/* Shipping Address */}
            <div className="payment-form-section">
              <h2 className="payment-section-title">Shipping Address</h2>
              <form className="payment-form" onSubmit={handlePayment}>
                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-input"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-input"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    name="city"
                    className="form-input"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group third">
                    <label className="form-label">State</label>
                    <input
                      type="text"
                      name="state"
                      className="form-input"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group third">
                    <label className="form-label">Country</label>
                    <input
                      type="text"
                      name="country"
                      className="form-input"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group third">
                    <label className="form-label">Zip/Postal Address</label>
                    <input
                      type="text"
                      name="zip"
                      className="form-input"
                      value={formData.zip}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    className="form-input"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group third">
                    <label className="form-label">Apt Number</label>
                    <input
                      type="text"
                      name="aptNumber"
                      className="form-input"
                      value={formData.aptNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <p className="payment-note">
                  🔒︎ Your payment is secure and encrypted
                </p>

                <button type="submit" className="pay-now-button">
                  Continue to Payment
                </button>
                <p className="security-note">
                  Payments processed securely through{" "}
                  <span className="stripe-text">Stripe</span> Inc.
                </p>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="payment-right">
            <div className="order-summary-card">
              <h3 className="order-summary-title">Order Summary</h3>

              {cartItems.length === 0 ? (
                <p className="empty-summary">No items in your cart.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div className="order-product" key={`${item.id}-${index}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="order-product-image"
                    />
                    <div className="order-summary-details">
                      <div className="order-summary-row">
                        <span className="summary-label">Item</span>
                        <span className="summary-value">{item.name}</span>
                      </div>
                      <div className="order-summary-row">
                        <span className="summary-label">Size</span>
                        <span className="summary-value">
                          {item.selectedSize}
                        </span>
                      </div>
                      <div className="order-summary-row">
                        <span className="summary-label">Color</span>
                        <span className="summary-value">{item.color}</span>
                      </div>
                      <div className="order-summary-row">
                        <span className="summary-label">Qty</span>
                        <span className="summary-value">{item.quantity}</span>
                      </div>
                      <div className="order-summary-row">
                        <span className="summary-label">Price</span>
                        <span className="summary-value">{item.price}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}

              <hr className="summary-divider" />

              <div className="order-summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="order-summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">
                  £{shippingCost.toFixed(2)}
                </span>
              </div>

              <div className="order-total">
                <span className="total-label">Total</span>
                <span className="total-value">£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;
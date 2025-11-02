import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Payment.css";
import logo from "../assets/navlogopic.png";

function Payment() {
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tahCart") || "[]");
    setCartItems(savedCart);
  }, []);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = cartItems.length > 0 ? 70 : 0;
  const total = subtotal + shippingCost;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Simulate payment success
    setTimeout(() => {
      localStorage.removeItem("tahCart");
      setCartItems([]);
      setShowModal(true);
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/"); // Redirect to homepage after closing modal
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

              <div className="payment-form">
                <div className="form-row">
                  <div className="form-group half">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-input" />
                  </div>
                  <div className="form-group half">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">City</label>
                  <input type="text" className="form-input" />
                </div>

                <div className="form-row">
                  <div className="form-group third">
                    <label className="form-label">State</label>
                    <input type="text" className="form-input" />
                  </div>
                  <div className="form-group third">
                    <label className="form-label">Country</label>
                    <input type="text" className="form-input" />
                  </div>
                  <div className="form-group third">
                    <label className="form-label">Zip</label>
                    <input type="text" className="form-input" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input type="tel" className="form-input" />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="payment-form-section">
              <h2 className="payment-section-title">Payment Method</h2>

              <div className="payment-method-option">
                <input type="radio" id="card" name="payment" defaultChecked />
                <label htmlFor="card" className="payment-method-label">
                  Credit or Debit card
                  <div className="payment-logos">
                    <span className="payment-logo stripe">stripe</span>
                    <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="#0570DE" />
                      <path
                        d="M14 12h12M20 6l6 6-6 6"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </label>
              </div>

              <div className="card-input-group">
                <div className="card-number-input">
                  <span className="card-dots">•••• •••• ••••</span>
                  <span className="card-number">3456</span>
                  <span className="card-type">VISA</span>
                </div>
              </div>

              <div className="form-row card-details">
                <div className="form-group">
                  <label className="form-label">MM / YY</label>
                  <input
                    type="text"
                    placeholder="•••"
                    className="form-input small"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">CCV</label>
                  <input
                    type="text"
                    placeholder="•••"
                    className="form-input small"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Postal Code</label>
                  <input
                    type="text"
                    placeholder="10012"
                    className="form-input small"
                  />
                </div>
              </div>

              <div className="form-checkbox">
                <input type="checkbox" id="saveCard" defaultChecked />
                <label htmlFor="saveCard">Save this card for faster use</label>
              </div>

              <p className="billing-note">
                Billing address is the same as shipping address
              </p>

              <div className="billing-address-group">
                <label className="form-label">Street Address</label>
                <input type="text" className="form-input" />
              </div>

              <div className="form-row">
                <div className="form-group third">
                  <label className="form-label">Apt Number</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group third">
                  <label className="form-label">State</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group third">
                  <label className="form-label">Zip</label>
                  <input type="text" className="form-input" />
                </div>
              </div>

              <p className="payment-note">
                🔒︎ Your payment is secure and encrypted
              </p>

              <button className="pay-now-button" onClick={handlePayment}>
                Pay Now
              </button>
              <p className="security-note">
                Payments processed securely through{" "}
                <span className="stripe-text">Stripe</span> Inc.
              </p>
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
                        <span className="summary-value">{item.selectedSize}</span>
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
                <span className="summary-value">USD {subtotal.toFixed(2)}</span>
              </div>
              <div className="order-summary-row">
                <span className="summary-label">Shipping</span>
                <span className="summary-value">USD {shippingCost.toFixed(2)}</span>
              </div>

              <div className="order-total">
                <span className="total-label">Total</span>
                <span className="total-value">USD {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal with checkmark */}
        {showModal && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="success-icon" style={{ marginBottom: "1rem" }}>
                <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                  <circle cx="30" cy="30" r="30" fill="#22C55E" />
                  <path
                    d="M17 30L26 39L43 22"
                    stroke="white"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Payment Successful!</h3>
              <p>Thank you for your purchase. Your order has been confirmed.</p>
              <button onClick={closeModal} className="close-modal-btn">
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Payment;

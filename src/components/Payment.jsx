import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";
import logo from "../assets/navlogopic.png";

function Payment() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve passed product data
  const {
    product,
    selectedSize,
    selectedColor,
    quantity,
    total,
    shippingCost,
    subtotal,
  } = location.state || {};

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="payment-navbar">
        <div className="payment-navbar-container">
          <div className="payment-navbar-content">
            <div className="payment-navbar-logo">
              <a href="/">
                <img src={logo} alt="Tah Logo" />
              </a>
            </div>

            <div className="payment-navbar-actions">
              <button className="payment-cart-button">
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
                <span className="payment-cart-badge">{quantity || 0}</span>
              </button>

              <button className="payment-menu-button" onClick={toggleMenu}>
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
          {/*  Left Column - Shipping & Payment */}
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
                By confirming your payment, you allow us to charge your card for
                this and future transactions under our terms.
              </p>

              <button
                className="pay-now-button"
                onClick={() => navigate("/success")}
              >
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
              <div className="order-product">
                <img
                  src={product?.image || "/assets/orange-hoodie.jpg"}
                  alt={product?.name || "Product"}
                  className="order-product-image"
                />
                <p className="order-product-note">
                  We only ship your order if we cannot find a more
                  privacy-first courier alternative.
                </p>
              </div>

              <div className="order-summary-details">
                <h3 className="order-summary-title">Order Summary</h3>

                <div className="order-summary-row">
                  <span className="summary-label">Product</span>
                  <span className="summary-value">
                    {product?.name || "—"}
                  </span>
                </div>

                <div className="order-summary-row">
                  <span className="summary-label">Color</span>
                  <span className="summary-value">
                    {selectedColor || "—"}
                  </span>
                </div>

                <div className="order-summary-row">
                  <span className="summary-label">Size</span>
                  <span className="summary-value">{selectedSize || "—"}</span>
                </div>

                <div className="order-summary-row">
                  <span className="summary-label">Quantity</span>
                  <span className="summary-value">{quantity || 1}</span>
                </div>

                <div className="order-summary-row">
                  <span className="summary-label">Item(s)</span>
                  <span className="summary-value">
                    {subtotal ? subtotal.toFixed(2) : "200.00"}
                  </span>
                </div>
                <div className="order-summary-row">
                  <span className="summary-label">Shipping</span>
                  <span className="summary-value">
                    {shippingCost ? shippingCost.toFixed(2) : "70.00"}
                  </span>
                </div>

                <div className="order-total">
                  <span className="total-label">Order Total</span>
                  <span className="total-value">
                    {total ? total.toFixed(2) : "270.00"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Payment;

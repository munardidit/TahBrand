import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./SuccessModal.css";

function SuccessModal({
  isOpen,
  onClose,
  product,
  selectedSize,
  selectedColor,
  quantity = 1,
  total = 0,
  shippingCost = 0,
  subtotal = 0,
}) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  // Focus management for accessibility
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    // Validate required data
    if (!product) {
      console.error("Product data is missing");
      onClose();
      return;
    }

    // Safely parse price
    const parsePrice = (price) => {
      if (!price) return 0;
      if (typeof price === 'number') return price;
      
      const numericPrice = parseFloat(price.toString().replace(/[^\d.-]/g, ""));
      return isNaN(numericPrice) ? 0 : numericPrice;
    };

    const checkoutData = {
      product: {
        ...product,
        image: product.image || "",
        name: product.name || "Unknown Product",
        price: parsePrice(product.price),
      },
      selectedSize,
      selectedColor,
      quantity: Math.max(1, quantity),
      total: Math.max(0, total),
      shippingCost: Math.max(0, shippingCost),
      subtotal: Math.max(0, subtotal),
    };

    onClose();
    navigate("/payment", { state: checkoutData });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div 
      className="successes-modal-overlay" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div
        ref={modalRef}
        className="successes-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="successes-modal-header">
          <h2 id="success-modal-title" className="successes-modal-title">
            Your Cart
          </h2>
          <button 
            className="successes-modal-close" 
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="successes-modal-content">
          <div className="successes-icon" aria-hidden="true">
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

          <p className="successes-message">
            Your item has been successfully <br /> added to cart.
          </p>

          <div className="successes-actions">
            <button
              className="successes-btn continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>

            <button
              className="successes-btn checkout-now-btn"
              onClick={handleCheckout}
              autoFocus
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessModal;
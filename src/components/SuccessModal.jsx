import { useNavigate } from "react-router-dom";
import "./SuccessModal.css";

function SuccessModal({
  isOpen,
  onClose,
  product,
  selectedSize,
  selectedColor,
  quantity,
  total,
  shippingCost,
  subtotal,
}) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/payment", {
      state: {
        product: {
          ...product,
          image: product?.image,
          name: product?.name,
          price: product?.price
            ? parseFloat(product.price.replace(/[^\d.]/g, ""))
            : 200,
        },
        selectedSize,
        selectedColor,
        quantity,
        total,
        shippingCost,
        subtotal,
      },
    });
  };

  return (
    <div className="successes-modal-overlay" onClick={onClose}>
      <div
        className="successes-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="successes-modal-header">
          <h2 className="successes-modal-title">Your Cart</h2>
          <button className="successes-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="successes-modal-content">
          <div className="successes-icon">
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

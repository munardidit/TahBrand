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
    <div className="success-modal-overlay" onClick={onClose}>
      <div
        className="success-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="success-modal-header">
          <h2 className="success-modal-title">Your Cart</h2>
          <button className="success-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="success-modal-content">
          <div className="success-icon">
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

          <p className="success-message">
            Your item has been successfully <br /> added to cart.
          </p>

          <div className="success-actions">
            <button
              className="success-btn continue-shopping-btn"
              onClick={onClose}
            >
              Continue Shopping
            </button>

            <button
              className="success-btn checkout-now-btn"
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

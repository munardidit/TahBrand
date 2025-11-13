import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function Modal({
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

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCheckout = () => {
    if (!product) {
      console.error("Product data is missing");
      onClose();
      return;
    }

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

  // Inline styles as fallback
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3500,
    padding: '1rem',
    boxSizing: 'border-box',
  };

  const modalStyle = {
    fontFamily: '"Kumbh Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#fff6f3',
    width: '100%',
    maxWidth: 'min(400px, 90vw)',
    borderRadius: '16px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    margin: 'auto',
    boxSizing: 'border-box',
    border: '1px solid rgba(0, 0, 0, 0.1)',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 2rem',
    borderBottom: '1px solid #e8d6d0',
    boxSizing: 'border-box',
  };

  const titleStyle = {
    fontSize: '1.125rem',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: 0,
    lineHeight: 1.2,
  };

  const closeButtonStyle = {
    background: 'none',
    border: 'none',
    color: '#d84315',
    fontSize: '1.25rem',
    cursor: 'pointer',
    fontWeight: 500,
    padding: '0.5rem',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const contentStyle = {
    padding: '3rem 2rem 2rem 2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxSizing: 'border-box',
  };

  const iconStyle = {
    marginBottom: '1.5rem',
  };

  const messageStyle = {
    fontSize: '0.95rem',
    color: '#5a5a5a',
    margin: '0 0 2rem 0',
    lineHeight: 1.6,
    fontWeight: 400,
  };

  const actionsStyle = {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    boxSizing: 'border-box',
  };

  const baseButtonStyle = {
    flex: 1,
    padding: '0.75rem 1.3rem',
    borderRadius: '50px',
    fontFamily: '"Kumbh Sans", sans-serif',
    fontSize: '0.875rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    minHeight: '44px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const continueButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: 'transparent',
    border: '2px solid #1a1a1a',
    color: '#1a1a1a',
  };

  const checkoutButtonStyle = {
    ...baseButtonStyle,
    backgroundColor: '#5856d6',
    border: '2px solid #5856d6',
    color: '#fff',
  };

  return (
    <div 
      style={overlayStyle}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div style={headerStyle}>
          <h2 id="modal-title" style={titleStyle}>
            Your Cart
          </h2>
          <button 
            style={closeButtonStyle}
            onClick={onClose}
            aria-label="Close modal"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(216, 67, 21, 0.1)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        <div style={contentStyle}>
          <div style={iconStyle} aria-hidden="true">
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

          <p style={messageStyle}>
            Your item has been successfully <br /> added to cart.
          </p>

          <div style={actionsStyle}>
            <button
              style={continueButtonStyle}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#1a1a1a';
              }}
            >
              Continue Shopping
            </button>

            <button
              style={checkoutButtonStyle}
              onClick={handleCheckout}
              autoFocus
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4a47b8';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(88, 86, 214, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#5856d6';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
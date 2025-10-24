import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartModal.css";
import SuccessModal from "./SuccessModal";

function CartModal({ isOpen, onClose, product, selectedSize, selectedColor }) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  const pricePerItem = product?.price
    ? parseFloat(product.price.replace(/[^\d.]/g, ""))
    : 200;

  const shippingCost = 70;
  const subtotal = pricePerItem * quantity;
  const total = subtotal + shippingCost;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsFadingOut(false);
      onClose();
      setShowSuccess(true);
    }, 400);
  };

  const handleCheckout = () => {
    setShowSuccess(false);
    navigate("/payment", {
      state: {
        product: {
          ...product,
          image: product?.image,
          name: product?.name,
          price: pricePerItem,
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

  const isReadyToAdd = selectedSize && selectedColor;

  return (
    <>
      {/* Cart Modal */}
      {isOpen && product && (
        <div
          className={`cart-modal-overlay ${isFadingOut ? "fade-out" : "fade-in"}`}
          onClick={onClose}
        >
          <div
            className={`cart-modal ${isFadingOut ? "fade-out" : "fade-in"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-modal-header">
              <h2 className="cart-modal-title">Your Cart</h2>
              <button className="cart-modal-close" onClick={onClose}>
                ✕
              </button>
            </div>

            <div className="cart-modal-content">
              {/* Product Header */}
              <div className="cart-product-header">
                <span className="header-product">Product</span>
                <span className="header-total">Total</span>
              </div>

              {/* Product Item */}
              <div className="cart-product-item">
                <div className="cart-product-left">
                  <div className="cart-product-image">
                    <img
                      src={product?.image}
                      alt={product?.name || "Product"}
                      onError={(e) => {
                        e.target.src = "/fallback-image.png"; 
                      }}
                    />
                  </div>

                  <div className="cart-product-info">
                    <h3 className="cart-product-name">{product?.name}</h3>
                    <p className="cart-product-price">USD {pricePerItem}</p>
                    <p className="cart-product-color">
                      Colour: {selectedColor || "Not selected"}
                    </p>
                    <p className="cart-product-size">
                      Size: {selectedSize || "Not selected"}
                    </p>
                  </div>
                </div>

                <div className="cart-product-right">
                  <div className="quantity-controls">
                    <label className="quantity-label">Quantity</label>
                    <div className="quantity-input-group">
                      <button className="quantity-btn" onClick={handleDecrease}>
                        -
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="quantity-input"
                      />
                      <button className="quantity-btn" onClick={handleIncrease}>
                        +
                      </button>
                    </div>
                  </div>

                  <div className="cart-product-total">
                    <span className="product-total-price">
                      USD {subtotal.toFixed(2)}
                    </span>
                    <span className="product-shipping">
                      Shipping: ${shippingCost}
                    </span>
                  </div>
                </div>
              </div>

              {/* Total Summary */}
              <div className="cart-estimated-total">
                <span className="estimated-label">Estimated Total</span>
                <span className="estimated-amount">USD {total.toFixed(2)}</span>
              </div>

              {/* Buttons */}
              <div className="cart-actions">
                <button
                  className={`cart-btn add-to-cart-btn ${
                    !isReadyToAdd ? "disabled" : ""
                  }`}
                  disabled={!isReadyToAdd}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>

                <button
                  className={`cart-btn checkout-btn ${
                    !isReadyToAdd ? "disabled" : ""
                  }`}
                  disabled={!isReadyToAdd}
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
  isOpen={showSuccess}
  onClose={() => setShowSuccess(false)}
  product={product}
  selectedSize={selectedSize}
  selectedColor={selectedColor}
  quantity={quantity}
  total={total}
  shippingCost={shippingCost}
  subtotal={subtotal}
/>
    </>
  );
}

export default CartModal;

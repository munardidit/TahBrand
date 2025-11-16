import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CartModal.css";
import Modal from "./Modal";

function CartModal({ isOpen, onClose, product, selectedSize, selectedColor }) {
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const navigate = useNavigate();

  const pricePerItem = product?.price
    ? parseFloat(product.price.replace(/[^\d.]/g, ""))
    : 200;

  const shippingCost = 0.00;
  const subtotal = pricePerItem * quantity;
  const total = subtotal + shippingCost;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('tahCart') || '[]');
    
    // Create the new cart item
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize,
      color: selectedColor,
      type: product.type,
      quantity: quantity
    };
    
    // Check if item with same id and size already exists
    const existingItemIndex = existingCart.findIndex(
      item => item.id === product.id && item.selectedSize === selectedSize
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('tahCart', JSON.stringify(existingCart));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));

    // Show success modal
    setIsFadingOut(true);
    setTimeout(() => {
      setIsFadingOut(false);
      onClose();
      setShowSuccess(true);
    }, 400);
  };

  const handleCheckout = () => {
    // Create a temporary cart item for direct checkout
    const checkoutItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize,
      color: selectedColor,
      type: product.type,
      quantity: quantity
    };

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('tahCart') || '[]');
    
    // Check if item with same id and size already exists
    const existingItemIndex = existingCart.findIndex(
      item => item.id === product.id && item.selectedSize === selectedSize
    );
    
    if (existingItemIndex > -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      existingCart.push(checkoutItem);
    }
    
    // Save to localStorage
    localStorage.setItem('tahCart', JSON.stringify(existingCart));
    
    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event('cartUpdated'));

    // Close modal and navigate to payment
    onClose();
    navigate("/payment");
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
                <div className="cart-product-image">
                  <img
                    src={product?.image}
                    alt={product?.name || "Product"}
                    onError={(e) => {
                      e.target.src = "/fallback-image.png"; 
                    }}
                  />
                </div>

                <div className="cart-product-details">
                  <h3 className="cart-product-name">{product?.name}</h3>
                  <p className="cart-product-price">USD {pricePerItem}</p>
                  <p className="cart-product-color">
                    Colour: {selectedColor || "Not selected"}
                  </p>
                  <p className="cart-product-size">
                    Size: {selectedSize || "Not selected"}
                  </p>

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
                </div>

                <div className="cart-product-total">
                  <span className="product-total-price">
                    USD {subtotal.toFixed(1)}
                  </span>
                  <span className="product-shipping">
                    Shipping: ${shippingCost}
                  </span>
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
      <Modal
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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  const availableSizes = ["XS", "S", "M", "L", "XL"];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("tahCart") || "[]");
    setCartItems(savedCart);

    const handleCartUpdate = () => {
      const updatedCart = JSON.parse(localStorage.getItem("tahCart") || "[]");
      setCartItems(updatedCart);
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleRemove = (id, selectedSize) => {
    const updatedCart = cartItems.filter(
      (item) => !(item.id === id && item.selectedSize === selectedSize)
    );
    localStorage.setItem("tahCart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleEdit = (item, index) => {
    if (editingIndex === index) {
      const updatedCart = [...cartItems];
      
      // Get the original item that was being edited
      const originalItem = updatedCart[index];
      
      // Check if size changed
      const sizeChanged = editingItem.selectedSize !== originalItem.selectedSize;
      
      if (sizeChanged) {
        // Remove the original item
        updatedCart.splice(index, 1);
        
        // Check if item with new size already exists
        const existingItemIndex = updatedCart.findIndex(
          cartItem => cartItem.id === editingItem.id && cartItem.selectedSize === editingItem.selectedSize
        );
        
        if (existingItemIndex > -1) {
          updatedCart[existingItemIndex].quantity += editingItem.quantity;
        } else {
          updatedCart.push(editingItem);
        }
      } else {
        updatedCart[index] = editingItem;
      }
      
      setCartItems(updatedCart);
      localStorage.setItem("tahCart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setEditingItem(null);
      setEditingIndex(null);
    } else {
      setEditingItem({ 
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        selectedSize: item.selectedSize,
        color: item.color,
        quantity: item.quantity
      });
      setEditingIndex(index);
    }
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    setEditingItem((prev) => ({ ...prev, quantity: newQty }));
  };

  const handleSizeChange = (newSize) => {
    setEditingItem((prev) => ({ ...prev, selectedSize: newSize }));
  };

  const cancelEdit = () => {
    setEditingItem(null);
    setEditingIndex(null);
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = cartItems.length > 0 ? 0.00 : 0;
  const total = subtotal + shippingCost;

  const handleCheckout = () => {
    navigate("/payment", {
      state: {
        cartItems,
        subtotal,
        shippingCost,
        total,
      },
    });
  };

  return (
    <div className="cart-page">
      {/* Back Arrow Button */}
      <div className="cart-header">
        <button className="back-arrow-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M19 12H5M12 19l-7-7 7-7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="cart-title">Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => {
              const isEditing = editingIndex === index;

              return (
                <div className="cart-item" key={`${item.id}-${item.selectedSize}-${index}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    {isEditing ? (
                      <div className="edit-controls">
                        <div className="size-edit">
                          <label>Size:</label>
                          <select
                            value={editingItem.selectedSize}
                            onChange={(e) => handleSizeChange(e.target.value)}
                            className="size-select"
                          >
                            {availableSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="quantity-edit">
                          <label>Quantity:</label>
                          <div className="quantity-controlss">
                            <button
                              className="qty-btn"
                              onClick={() => handleQuantityChange(editingItem.quantity - 1)}
                            >
                              −
                            </button>
                            <span className="qty-display">{editingItem.quantity}</span>
                            <button
                              className="qty-btn"
                              onClick={() => handleQuantityChange(editingItem.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        <div className="current-details">
                          <p>Color: {item.color}</p>
                          <p>Price: {item.price}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="item-details">
                        <p>Size: {item.selectedSize}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Color: {item.color}</p>
                        <p>Price: {item.price}</p>
                      </div>
                    )}

                    <div className="cart-actions">
                      {isEditing ? (
                        <>
                          <button className="save-btn" onClick={() => handleEdit(item, index)}>
                            Save
                          </button>
                          <button className="cancel-btn" onClick={cancelEdit}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button className="edit-btn" onClick={() => handleEdit(item, index)}>
                            Edit
                          </button>
                          <button
                            className="remove-btn"
                            onClick={() => handleRemove(item.id, item.selectedSize)}
                          >
                            Remove
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>
              Subtotal: <span><strong>GBP</strong> {subtotal.toFixed(2)}</span>
            </h3>
            <h3>
              Shipping: <span><strong>GBP</strong> {shippingCost.toFixed(2)}</span>
            </h3>
            <h3>
              Total: <span className="total-amount"><strong>GBP</strong> {total.toFixed(2)}</span>
            </h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
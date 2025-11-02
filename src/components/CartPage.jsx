import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // store the whole item being edited
  const navigate = useNavigate();

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

  const handleEdit = (item) => {
    if (
      editingItem &&
      editingItem.id === item.id &&
      editingItem.selectedSize === item.selectedSize
    ) {
      // Save changes
      let updatedCart;

      const oldSize = item.selectedSize;
      const newSize = editingItem.selectedSize;
      const sizeChanged = newSize !== oldSize;

      if (sizeChanged) {
        // Remove old item (with old size)
        updatedCart = cartItems.filter(
          (cartItem) => !(cartItem.id === item.id && cartItem.selectedSize === oldSize)
        );

        // Check if an item with the new size already exists
        const existingIndex = updatedCart.findIndex(
          (cartItem) => cartItem.id === editingItem.id && cartItem.selectedSize === newSize
        );

        if (existingIndex > -1) {
          // Merge quantities if duplicate
          updatedCart[existingIndex] = {
            ...updatedCart[existingIndex],
            quantity: updatedCart[existingIndex].quantity + editingItem.quantity,
          };
        } else {
          // Add edited item with new size
          updatedCart.push(editingItem);
        }
      } else {
        // Size unchanged, update item in place
        updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === editingItem.id && cartItem.selectedSize === oldSize) {
            return editingItem;
          }
          return cartItem;
        });
      }

      setCartItems(updatedCart);
      localStorage.setItem("tahCart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("cartUpdated"));
      setEditingItem(null);
    } else {
      // Start editing
      setEditingItem({ ...item });
    }
  };

  const handleQuantityChange = (newQty) => {
    if (newQty < 1) return;
    setEditingItem((prev) => ({ ...prev, quantity: newQty }));
  };

  const handleSizeChange = (newSize) => {
    setEditingItem((prev) => ({ ...prev, selectedSize: newSize }));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace(/[^\d.]/g, "")) || 0;
    return acc + price * item.quantity;
  }, 0);

  const shippingCost = cartItems.length > 0 ? 70 : 0;
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
      <h1 className="cart-title">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => {
              const isEditing =
                editingItem &&
                editingItem.id === item.id &&
                editingItem.selectedSize === item.selectedSize;

              return (
                <div className="cart-item" key={`${item.id}-${index}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-info">
                    <h3>{item.name}</h3>

                    {isEditing ? (
                      <>
                        <label>
                          Size:{" "}
                          <select
                            value={editingItem.selectedSize}
                            onChange={(e) => handleSizeChange(e.target.value)}
                          >
                            {/* Replace these sizes with actual available sizes if dynamic */}
                            {["S", "M", "L", "XL"].map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </label>
                        <label>
                          Qty:{" "}
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
                        </label>
                      </>
                    ) : (
                      <>
                        <p>Size: {item.selectedSize}</p>
                        <p>Qty: {item.quantity}</p>
                      </>
                    )}

                    <p>Color: {item.color}</p>
                    <p>Price: {item.price}</p>

                    <div className="cart-actions">
                      <button className="edit-btn" onClick={() => handleEdit(item)}>
                        {isEditing ? "Done" : "Edit"}
                      </button>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.id, item.selectedSize)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>
              Subtotal: <span>USD {subtotal.toFixed(2)}</span>
            </h3>
            <h3>
              Shipping: <span>USD {shippingCost.toFixed(2)}</span>
            </h3>
            <h3>
              Total: <span className="total-amount">USD {total.toFixed(2)}</span>
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

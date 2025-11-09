import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import "./PaymentPage.css";

const stripePromise = loadStripe("pk_test_51SQyb4PBhoWYbFy77kJQSZe5W2jGqQ1Mj9kcPRXxO3Ex1nOi8lwgBWZLs7e1xLe4gD4CPeulMmIpuDH6ZSuO63qL000apBaKvn");

const CheckoutForm = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required", // Handle redirect-based payments
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      localStorage.removeItem("tahCart");
      navigate("/success");
    } else {
      
      setLoading(false);
    }
  };

  return (
    <div className="checkout-form-container">
      <div className="order-summary-sidebar">
        <h3>Order Summary</h3>
        
        <div className="summary-items">
          {orderData?.cartItems?.map((item, index) => (
            <div key={index} className="summary-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="item-name">{item.name}</p>
                <p className="item-details">
                  Size: {item.selectedSize} | Qty: {item.quantity}
                </p>
                <p className="item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>£{orderData?.subtotal?.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>£{orderData?.shippingCost?.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>£{orderData?.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="payment-form-stripe">
        <h2>Complete Your Payment</h2>
        
        <div className="shipping-info">
          <h4>Shipping to:</h4>
          <p>
            {orderData?.shippingAddress?.firstName}{" "}
            {orderData?.shippingAddress?.lastName}
          </p>
          <p>{orderData?.shippingAddress?.phone}</p>
        </div>

        <PaymentElement />
        
        <button
          disabled={!stripe || loading}
          className="stripe-pay-button"
          type="submit"
        >
          {loading ? "Processing..." : `Pay £${orderData?.total?.toFixed(2)}`}
        </button>
        
        {message && <div className="error-message">{message}</div>}
        
        <p className="secure-text">🔒 Secure payment powered by Stripe</p>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderData = location.state;
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect if no order data
    if (!orderData || !orderData.cartItems || orderData.cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post(
          "https://tahbackend.onrender.com/create-payment-intent", 
          {
            amount: Math.round(orderData.total * 100), 
            currency: "gbp",
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.error("Payment intent error:", err);
        setError("Failed to initialize payment. Please try again.");
      }
    };

    createPaymentIntent();
  }, [orderData, navigate]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#5856d6",
      colorBackground: "#ffffff",
      colorText: "#1a1a1a",
      colorDanger: "#df1b41",
      fontFamily: "Kumbh Sans, system-ui, sans-serif",
      spacingUnit: "4px",
      borderRadius: "8px",
    },
  };

  const options = {
    clientSecret,
    appearance,
  };

  if (error) {
    return (
      <div className="payment-error-container">
        <h2>Payment Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/cart")}>Return to Cart</button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="payment-loading">
        <div className="spinner"></div>
        <p>Preparing your payment...</p>
      </div>
    );
  }

  return (
    <div className="payment-page-container">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm orderData={orderData} />
      </Elements>
    </div>
  );
};

export default PaymentPage;
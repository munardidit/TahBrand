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

const stripePromise = loadStripe("pk_live_51SQyZbAmHV8jSelWiXrF06irPeMkZNLM1DPsZcLiW0w6LJEtE7VSRT6UJ16nnuNj6O2iMgUAhwW4VjmXM7hLYXPh00rhe0RwXm");

const countryCodes = {
  'nigeria': 'NG',
  'united states': 'US',
  'united states of america': 'US',
  'usa': 'US',
  'united kingdom': 'GB',
  'uk': 'GB',
  'great britain': 'GB',
  'canada': 'CA',
  'australia': 'AU',
  'germany': 'DE',
  'france': 'FR',
  'italy': 'IT',
  'spain': 'ES',
  'netherlands': 'NL',
  'belgium': 'BE',
  'sweden': 'SE',
  'norway': 'NO',
  'denmark': 'DK',
  'finland': 'FI',
  'ireland': 'IE',
  'portugal': 'PT',
  'austria': 'AT',
  'switzerland': 'CH',
  'japan': 'JP',
  'south korea': 'KR',
  'china': 'CN',
  'india': 'IN',
  'brazil': 'BR',
  'mexico': 'MX',
  'south africa': 'ZA',
  'egypt': 'EG',
  'kenya': 'KE',
  'ghana': 'GH',
};

// Function to convert country name to ISO code
const getCountryCode = (countryName) => {
  if (!countryName) return 'GB';
  
  const normalized = countryName.toString().toLowerCase().trim();
  
  // Check if it's already a 2-letter code
  if (/^[A-Z]{2}$/i.test(normalized)) {
    return normalized.toUpperCase();
  }
  
  return countryCodes[normalized] || 'GB';
};

const CheckoutForm = ({ orderData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/success`,
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Payment confirmation error:", error);
        setMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        localStorage.removeItem("tahCart");
        navigate("/success", { 
          state: { 
            paymentIntentId: paymentIntent.id,
            orderData: orderData 
          } 
        });
      }
    } catch (err) {
      console.error("Unexpected payment error:", err);
      setMessage("An unexpected error occurred. Please try again.");
    } finally {
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
          <p>{orderData?.shippingAddress?.streetAddress}, {orderData?.shippingAddress?.city}</p>
          <p>{orderData?.shippingAddress?.country} ({orderData?.shippingAddress?.country && getCountryCode(orderData.shippingAddress.country)})</p>
          <p>{orderData?.shippingAddress?.phone}</p>
        </div>

        <div className="payment-element-container">
          <PaymentElement 
            options={{
              layout: {
                type: 'tabs',
                defaultCollapsed: false,
              },
              wallets: {
                applePay: 'auto',
                googlePay: 'auto',
              },
            }}
          />
        </div>
        
        <button
          disabled={!stripe || loading}
          className={`stripe-pay-button ${loading ? 'loading' : ''}`}
          type="submit"
        >
          {loading ? (
            <>
              <div className="button-spinner"></div>
              Processing...
            </>
          ) : (
            `Pay £${orderData?.total?.toFixed(2)}`
          )}
        </button>
        
        {message && (
          <div className={`message ${message.includes('error') ? 'error-message' : 'info-message'}`}>
            {message}
          </div>
        )}
        
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
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Redirect if no order data
    if (!orderData || !orderData.cartItems || orderData.cartItems.length === 0) {
      navigate("/cart");
      return;
    }

    // Create payment intent
    const createPaymentIntent = async () => {
      try {
        console.log("🔄 Creating payment intent with data:", {
          amount: Math.round(orderData.total * 100),
          total: orderData.total,
          currency: "gbp",
          hasShipping: !!orderData.shippingAddress,
          itemCount: orderData.cartItems.length,
          country: orderData.shippingAddress?.country
        });

        // Prepare cart items data safely
        const cartItems = orderData.cartItems.map(item => ({
          name: item.name || "Product",
          price: item.price || "0.00",
          quantity: item.quantity || 1,
          image: item.image || ""
        }));

        // Prepare shipping data safely with country conversion
        const shippingData = orderData.shippingAddress ? {
          firstName: orderData.shippingAddress.firstName || "",
          lastName: orderData.shippingAddress.lastName || "",
          email: orderData.shippingAddress.email || "",
          phone: orderData.shippingAddress.phone || "",
          streetAddress: orderData.shippingAddress.streetAddress || "",
          aptNumber: orderData.shippingAddress.aptNumber || "",
          city: orderData.shippingAddress.city || "",
          state: orderData.shippingAddress.state || "",
          zip: orderData.shippingAddress.zip || "",
          country: orderData.shippingAddress.country || "United Kingdom" 
        } : null;

        // Log country conversion for debugging
        if (shippingData?.country) {
          const countryCode = getCountryCode(shippingData.country);
          console.log(`🌍 Country conversion: "${shippingData.country}" → "${countryCode}"`);
        }

        const requestData = {
          amount: Math.round(orderData.total * 100), // Convert to pence
          currency: "gbp",
          shipping: shippingData,
          cartItems: cartItems
        };

        console.log("📤 Sending request data:", {
          ...requestData,
          shipping: {
            ...requestData.shipping,
            // Don't log sensitive data
            email: requestData.shipping?.email ? '***' : undefined,
            phone: requestData.shipping?.phone ? '***' : undefined
          }
        });

        const response = await axios.post(
          "https://tahbackend.onrender.com/create-payment-intent",
          requestData,
          {
            timeout: 15000,
            headers: {
              'Content-Type': 'application/json',
            }
          }
        );

        console.log("✅ Payment intent created:", {
          id: response.data.paymentIntentId,
          detectedCountry: response.data.detectedCountry,
          usedCountryCode: response.data.usedCountryCode,
          availablePaymentMethods: response.data.availablePaymentMethods
        });
        
        setClientSecret(response.data.clientSecret);
        setError("");
        setRetryCount(0); // Reset retry count on success

      } catch (err) {
        console.error("❌ Payment intent error details:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          code: err.code
        });

        // Handle specific error cases
        let errorMessage = "Failed to initialize payment. Please try again.";
        
        if (err.response?.data?.error) {
          errorMessage = err.response.data.error;
          
          if (err.response.data.error.includes('country') || err.response.data.error.includes('Country')) {
            errorMessage = "We've updated our payment system. Your country has been automatically converted for processing.";
          }
        } else if (err.code === 'ERR_NETWORK') {
          errorMessage = "Network error. Please check your internet connection and try again.";
        } else if (err.response?.status === 500) {
          errorMessage = "Server error. Please try again in a moment.";
        }

        setError(errorMessage);
        
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [orderData, navigate, retryCount]); 

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setError("");
    setLoading(true);
  };

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
    rules: {
      '.Input': {
        border: '1px solid #e1e5e9',
        padding: '12px',
      },
      '.Input:focus': {
        borderColor: '#5856d6',
        boxShadow: '0 0 0 1px #5856d6',
      }
    }
  };

  const options = {
    clientSecret,
    appearance,
    loader: "auto"
  };

  if (error) {
    return (
      <div className="payment-error-container">
        <div className="error-content">
          <h2>Payment Setup Error</h2>
          <p>{error}</p>
          {error.includes('country') && (
            <div className="country-info">
              <p><strong>Note:</strong> We now use standard country codes for better compatibility.</p>
              <p>Your country "<strong>{orderData?.shippingAddress?.country}</strong>" will be automatically converted.</p>
            </div>
          )}
          <div className="error-actions">
            <button onClick={() => navigate("/cart")} className="secondary-button">
              Return to Cart
            </button>
            <button onClick={handleRetry} className="primary-button">
              Try Again
            </button>
          </div>
          {retryCount > 0 && (
            <p className="retry-count">Attempt {retryCount + 1} of 3</p>
          )}
        </div>
      </div>
    );
  }

  if (loading || !clientSecret) {
    return (
      <div className="payment-loading">
        <div className="spinner"></div>
        <p>Preparing your payment...</p>
        {orderData?.shippingAddress?.country && (
          <p className="loading-note">
            Processing shipping to {orderData.shippingAddress.country}
          </p>
        )}
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
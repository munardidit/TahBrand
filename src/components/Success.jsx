import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51SQyb4PBhoWYbFy77kJQSZe5W2jGqQ1Mj9kcPRXxO3Ex1nOi8lwgBWZLs7e1xLe4gD4CPeulMmIpuDH6ZSuO63qL000apBaKvn");

function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const stripe = await stripePromise;
      const clientSecret = searchParams.get("payment_intent_client_secret");

      if (!clientSecret) {
        // Direct success (from card payment without redirect)
        setStatus("success");
        localStorage.removeItem("tahCart");
        return;
      }

      // Verify payment status for redirect-based payments (PayPal, Klarna, etc.)
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      if (paymentIntent) {
        switch (paymentIntent.status) {
          case "succeeded":
            setStatus("success");
            setMessage("Payment successful! Thank you for your purchase.");
            localStorage.removeItem("tahCart");
            break;
          case "processing":
            setStatus("processing");
            setMessage("Your payment is being processed. You'll receive a confirmation email shortly.");
            break;
          case "requires_payment_method":
            setStatus("error");
            setMessage("Payment failed. Please try again.");
            break;
          default:
            setStatus("error");
            setMessage("Something went wrong. Please contact support.");
            break;
        }
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "Kumbh Sans, sans-serif"
      }}>
        <div style={{
          width: "50px",
          height: "50px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #5856d6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite"
        }}></div>
        <p style={{ marginTop: "1rem", color: "#666" }}>Verifying your payment...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "2rem",
        fontFamily: "Kumbh Sans, sans-serif"
      }}>
        <div style={{ marginBottom: "2rem" }}>
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="40" fill="#EF4444" />
            <path
              d="M25 25L55 55M55 25L25 55"
              stroke="white"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 style={{ marginBottom: "1rem", color: "#1a1a1a" }}>Payment Failed</h1>
        <p style={{ marginBottom: "2rem", color: "#666" }}>{message}</p>
        <button
          onClick={() => navigate("/payment")}
          style={{
            padding: "1rem 2rem",
            background: "#5856d6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600"
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "Kumbh Sans, sans-serif"
    }}>
      <div style={{ marginBottom: "2rem" }}>
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="40" fill="#22C55E" />
          <path
            d="M22 40L34 52L58 28"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h1 style={{ marginBottom: "1rem", color: "#1a1a1a" }}>
        {status === "processing" ? "Payment Processing" : "Payment Successful!"}
      </h1>
      <p style={{ marginBottom: "2rem", color: "#666", maxWidth: "500px" }}>
        {message || "Thank you for your purchase. Your order has been confirmed and you'll receive a confirmation email shortly."}
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          padding: "1rem 2rem",
          background: "#5856d6",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "1rem",
          fontWeight: "600",
          transition: "background 0.3s ease"
        }}
        onMouseOver={(e) => e.target.style.background = "#4a47b8"}
        onMouseOut={(e) => e.target.style.background = "#5856d6"}
      >
        Return to Home
      </button>
    </div>
  );
}

export default Success;
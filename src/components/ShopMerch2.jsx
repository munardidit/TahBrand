import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { productsData } from "../data/productsData";
import CartModal from "../components/CartModal";
import logo from "../assets/navlogopic.png";
import "./ShopMerch2.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopMerch2 = () => {
  const { id } = useParams();
  const product = productsData.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizes = ["XS", "S", "M", "L", "XL"];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const getCartItemsCount = () => {
    const existingCart = JSON.parse(localStorage.getItem("tahCart") || "[]");
    return existingCart.reduce((total, item) => total + item.quantity, 0);
  };

  useEffect(() => {
    setCartItemsCount(getCartItemsCount());

    const handleCartUpdate = () => {
      setCartItemsCount(getCartItemsCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleCartClick = () => navigate("/cart");

  const handleContinue = () => {
    if (!selectedSize) {
      alert("Please select a size before continuing.");
      return;
    }
    setIsCartOpen(true);
  };

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToImage = (index) => {
    if (isAnimating || index === currentImageIndex) return;
    setIsAnimating(true);
    setCurrentImageIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="shop-navbar">
        <div className="shop-navbar-container">
          <div className="shop-navbar-content">
            <div className="shop-navbar-logo">
              <Link to="/">
                <img src={logo} alt="Tah Logo" />
              </Link>
            </div>

            <div className="shop-navbar-actions">
              <button onClick={handleCartClick} className="cart-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path
                    d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartItemsCount > 0 && (
                  <span className="cart-badge">
                    {cartItemsCount > 99 ? "99+" : cartItemsCount}
                  </span>
                )}
              </button>

              <button className="shop-menu-button" onClick={toggleMenu}>
                <svg fill="#270E07" stroke="currentColor" viewBox="1 1 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div className={`shop-menu-overlay ${isMenuOpen ? "open" : ""}`}>
        <div className="shop-menu-header">
          <div className="shop-menu-logo">
            <img src={logo} alt="Tah Logo" />
          </div>
          <button className="shop-menu-close" onClick={toggleMenu}>
            Close
          </button>
        </div>

        <div className="shop-menu-content">
          <nav className="shop-menu-nav">
            <Link to="/episodes" onClick={toggleMenu}>
              View All Episodes
            </Link>
            <Link to="/merch" onClick={toggleMenu}>
              Shop TAH Merchs
            </Link>

            <div className="shop-menu-section">
              <button className="shop-menu-dropdown">
                Subscribe to our channels
                <svg
                  className="shop-dropdown-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="shop-dropdown-content">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spotify
                </a>
                <a
                  href="https://podcasts.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apple Podcast
                </a>
              </div>
            </div>

            <Link to="/newsletter" onClick={toggleMenu}>
              Subscribe to our weekly newsletter
            </Link>
            <Link to="/hosts" onClick={toggleMenu}>
              About the Hosts
            </Link>
          </nav>
        </div>
      </div>

      {/* PRODUCT DETAIL */}
      <section className="product-detail-section">
        <div className="product-detail-container">
          <div className="product-header-top">
            <button className="back-arrow-btn" onClick={() => navigate(-1)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M12 19l-7-7 7-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="product-header">
            <div className="product-title-section">
              <h1 className="product-title-main">{product.name}</h1>
              <p className="product-subtitle">Apparel / {product.type}</p>
            </div>
            <p className="product-price-main">{product.price}</p>
          </div>

          <div className="product-content-detail">
            <div className="product-carousel-container">
              <div className="product-carousel-wrapper">
                <div className="product-carousel">
                  {/* Navigation Buttons */}
                  <button 
                    className="carousel-nav-btn carousel-prev" 
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  
                  {/* Main Image Display with Slide Animation */}
                  <div className="carousel-track">
                    {product.images.map((img, idx) => (
                      <div
                        key={idx}
                        className={`carousel-slide ${
                          idx === currentImageIndex ? "active" : ""
                        } ${idx < currentImageIndex ? "prev" : ""} ${
                          idx > currentImageIndex ? "next" : ""
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`${product.name} view ${idx + 1}`} 
                        />
                      </div>
                    ))}
                  </div>

                  <button 
                    className="carousel-nav-btn carousel-next" 
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>

                  {/* Image Counter */}
                  <div className="carousel-counter">
                    <span className="counter-current">{currentImageIndex + 1}</span>
                    <span className="counter-divider">/</span>
                    <span className="counter-total">{product.images.length}</span>
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="carousel-thumbnails">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`thumbnail-item ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={() => goToImage(idx)}
                      aria-label={`View image ${idx + 1}`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                      <div className="thumbnail-overlay"></div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="size-and-actions">
              <div className="size-section">
                <label className="size-label-main">Size</label>
                <div className="size-buttons-grid">
                  {sizes.map((size) => {
                    const isDefault = size === "XS" && !selectedSize;
                    const isSelected = selectedSize === size;
                    return (
                      <button
                        key={size}
                        className={`size-btn ${isDefault ? "default-xs" : ""} ${
                          isSelected ? "selected" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {!selectedSize && (
                  <p className="size-hint">
                    Please select a size before continuing.
                  </p>
                )}
              </div>

              <div className="product-actions">
                <Link to="/merch" className="action-btn backs-btn">
                  Back
                </Link>
                <button
                  className={`action-btn continue-btn ${
                    !selectedSize ? "disabled" : ""
                  }`}
                  onClick={handleContinue}
                  disabled={!selectedSize}
                >
                  Continue
                </button>
              </div>
            </div>

            <div className="details-section">
              <h3 className="details-title">Details</h3>
              <p className="details-description">
                This {product.color.toLowerCase()} {product.type} from TAH is
                crafted for both comfort and bold street style. Made from
                premium fabric and finished with the TAH logo, it's perfect for
                all-day wear during cool seasons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        product={product}
        selectedSize={selectedSize}
        selectedColor={product.color}
      />
    </>
  );
};

export default ShopMerch2;
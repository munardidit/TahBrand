import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/productsData';
import CartModal from '../components/CartModal';
import logo from '../assets/navlogopic.png';
import './ShopMerch2.css';

const ShopMerch2 = () => {
  const { id } = useParams();
  const product = productsData.find(p => p.id === parseInt(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleContinue = () => {
    if (!selectedSize) {
      alert('Please select a size before continuing.');
      return;
    }
    setIsCartOpen(true);
  };

  if (!product) {
    return <div className="not-found">Product not found</div>;
  }

  return (
    <>
      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="shop-navbar-container">
          <div className="shop-navbar-content">
            <div className="shop-navbar-logo">
              <a href="/">
                <img src={logo} alt="Tah Logo" />
              </a>
            </div>

            <div className="shop-navbar-actions">
              <button className="cart-button" onClick={() => setIsCartOpen(true)}>
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
                <span className="cart-badge">1</span>
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

      {/* Mobile Menu */}
      <div className={`shop-menu-overlay ${isMenuOpen ? 'open' : ''}`}>
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
            <a href="/episodes" onClick={toggleMenu}>
              View All Episodes
            </a>
            <a href="/merch" onClick={toggleMenu}>
              Shop TAH Merchs
            </a>

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
                    strokeWidth={2}
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
                  Youtube
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

            <a href="/newsletter" onClick={toggleMenu}>
              Subscribe to our weekly newsletter
            </a>
            <a href="/hosts" onClick={toggleMenu}>
              About the Hosts
            </a>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <section className="product-detail-section">
        <div className="product-detail-container">
          {/* Category Tabs */}
          <div className="category-tabs-detail">
            <a href="/merch" className="category-tab-detail">
              Apparels
            </a>
            <a href="/merch" className="category-tab-detail">
              Caps
            </a>
            <a href="/merch" className="category-tab-detail">
              Accessories
            </a>
          </div>

          {/* Product Header */}
          <div className="product-header">
            <div className="product-title-section">
              <h1 className="product-title-main">{product.name}</h1>
              <p className="product-subtitle">Apparel / {product.type}</p>
            </div>
            <p className="product-price-main">{product.price}</p>
          </div>

          {/* Product Content */}
          <div className="product-content-detail">
            {/* Product Images */}
            <div className="product-images-grid">
              <div className="product-image-item">
                <img src={product.image} alt={`${product.name} Front`} />
              </div>
              <div className="product-image-item">
                <img src={product.image} alt={`${product.name} Back`} />
              </div>
            </div>

            {/* Size Selection + Buttons */}
            <div className="size-and-actions">
              <div className="size-section">
                <label className="size-label-main">Size</label>
                <div className="size-buttons-grid">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${
                        selectedSize === size ? 'selected' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-actions">
                <Link to="/merch" className="action-btn backs-btn">
                  Back
                </Link>

                {/* ✅ Continue button disabled until size selected */}
                <button
                  className={`action-btn continue-btn ${
                    !selectedSize ? 'disabled' : ''
                  }`}
                  onClick={handleContinue}
                  disabled={!selectedSize}
                >
                  Continue
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="details-section">
              <h3 className="details-title">Details</h3>
              <p className="details-description">
                This {product.color.toLowerCase()} {product.type} from TAH is
                crafted for both comfort and bold street style. Made from premium
                fabric and finished with the TAH logo, it's perfect for all-day
                wear during cool seasons.
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

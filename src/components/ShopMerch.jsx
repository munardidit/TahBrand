import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/navlogopic.png';
import { productsData } from '../data/productsData';
import CartModal from './CartModal';
import './ShopMerch.css';

const ShopMerch = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const goBack = () => navigate(-1);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  // Filter products based on category
  const filteredProducts =
    selectedCategory === 'All'
      ? productsData
      : productsData.filter((p) => p.category === selectedCategory);

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
              <button onClick={() => navigate("/cart")} className="cart-icon">
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
                <span className="cart-badge"></span>
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

      {/* Mobile Menu Overlay */}
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

      {/* Shop Merch Section */}
      <section className="shop-merch-section">
        <div className="shop-merch-container">
          <div className="shop-merch-header">
            <button className="back-button" onClick={goBack}>
              🡰
            </button>

            <h1 className="shop-merch-title">SHOP TAH MERCH</h1>

            <div className="dropdown-container">
              <button
                className="filter-newest-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span>{selectedCategory === 'All' ? 'Filter by Category' : selectedCategory}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <ul className="category-dropdown">
                  <li onClick={() => handleCategorySelect('All')}>All</li>
                  <li onClick={() => handleCategorySelect('Apparels')}>Apparels</li>
                  <li onClick={() => handleCategorySelect('Hoodies')}>Hoodies</li>
                  <li onClick={() => handleCategorySelect('Caps')}>Caps</li>
                </ul>
              )}
            </div>
          </div>

          {/* Product Grid */}
          <div className="shop-merch-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="product-card-link"
                onClick={() => navigate(`/merch/product/${product.id}`)}
              >
                <div className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-footer">
                      <span className="product-price">{product.price}</span>
                      <button
                        className="add-to-cart-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/merch/product/${product.id}`);
                        }}
                      >
                        ⟶︎
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-button active">1</button>
            <Link to="#">
              <button className="pagination-button">2</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cart Modal */}
      {isCartOpen && <CartModal onClose={closeCart} />}
    </>
  );
};

export default ShopMerch;

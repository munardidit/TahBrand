import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/navlogopic.png';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="shop-navbar">
        <div className="shop-navbar-container">
          <div className="shop-navbar-content">
            <div className="shop-navbar-logo">
              <Link to="/">
                <img src={logo} alt="Tah Logo" />
              </Link>
            </div>

            <div className="shop-navbar-actions">
              <button className="shop-menu-button" onClick={toggleMenu}>
                <svg fill="#270E07" stroke="currentColor" viewBox="1 1 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M4 6h16M4 12h16M4 18h16" />
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
            <Link to="/episodes" onClick={toggleMenu}>
              View All Episodes
            </Link>
            <Link to="/merch" onClick={toggleMenu}>
              Shop TAH Merchs
            </Link>

            <div className="shop-menu-section">
              <button className="shop-menu-dropdown">
                Subscribe to our channels
                <svg className="shop-dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="shop-dropdown-content">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  Youtube
                </a>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                  Spotify
                </a>
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">
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
    </>
  );
}

export default Navbar;
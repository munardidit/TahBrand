import { useState, useEffect } from 'react';
import logo from '../assets/navlogopic.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Toggle body scroll
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
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="navbar-logo">
              <a href="/">
                <img src={logo} alt="Tah Logo" />
              </a>
            </div>

            {/* Hamburger menu - always visible */}
            <button 
              className="mobile-menu-button" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg fill="#270E07" stroke="currentColor" viewBox="1 1 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`menu-overlay ${isMenuOpen ? 'open' : ''}`}>
        <div className="menu-header">
          <div className="menu-logo">
            <img src={logo} alt="Tah Logo" />
          </div>
          <button className="menu-close" onClick={toggleMenu}>
            Close
          </button>
        </div>

        <div className="menu-content">
          <nav className="menu-nav">
            <Link to="/episodes" onClick={toggleMenu}>View All Episodes</Link>
            <a href="/merch" onClick={toggleMenu}>Shop TAH Merchs</a>
            
            <div className="menu-section">
              <button className="menu-dropdown">
                Subscribe to our channels
                <svg className="dropdown-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="dropdown-content">
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">Youtube</a>
                <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">Spotify</a>
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer">Apple podcast</a>
              </div>
            </div>

            <a href="/newsletter" onClick={toggleMenu}>Subscribe to our weekly newsletter</a>
            <a href="/hosts" onClick={toggleMenu}>About the Hosts</a>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
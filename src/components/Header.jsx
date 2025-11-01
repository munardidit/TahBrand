import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import hoodie from '../assets/hoodie.png';
import hostsBg from '../assets/navbar.png';

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      type: 'hosts',
      backgroundImage: hostsBg,
    },
    {
      type: 'merch',
      hoodieImage: hoodie,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <header className="header">
      <div className="header-slider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''} ${slide.type}`}
          >
            {/* HOSTS SLIDE */}
            {slide.type === 'hosts' && (
              <div
                className="hosts-background"
                style={{ backgroundImage: `url(${slide.backgroundImage})` }}
              >
                <div className="hosts-overlay">
                  <p className="header-subtitle">
                    Now Available on Apple Podcast and Spotify
                  </p>
                  <h1 className="header-title">
                    TRULY & <br /> HONESTLY
                  </h1>
                  <p className="header-hosts">With Yinka & Dicta</p>
                  <div className="header-buttons">
                    <button className="btn btn-subscribes">Subscribe</button>
                    <button
                      className="btn btn-shops"
                      onClick={() => navigate('/shopmerch')}
                    >
                      Shop Merch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MERCH SLIDE */}
            {slide.type === 'merch' && (
              <>
                <div className="merch-background"></div>
                <div className="merch-container">
                  <div className="merch-content">
                    <div className="merch-text">
                      <h2 className="merch-title">
                        TRULY & HONESTLY <br /> MERCHS AVAILABLE!
                      </h2>
                      <p className="merch-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                        do eiusmod tempor incididunt ut
                      </p>
                      <button
                        className="btn-merch"
                        onClick={() => navigate('/shopmerch')}
                      >
                        Shop Merch
                      </button>
                    </div>
                    <div className="merch-image">
                      <img src={slide.hoodieImage} alt="Orange Hoodie Merch" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </header>
  );
}

export default Header;

import { useState, useEffect } from 'react';
import './Header.css'
import hoodie from '../assets/hoodie.png'; 
import merchBg from '../assets/background.png';

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      type: 'combined',
      maleImage: maleHost,
      femaleImage: femaleHost
    },
    {
      type: 'merch',
      hoodieImage: hoodie,
      backgroundImage: merchBg
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

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
            {slide.type === 'combined' && (
              <>
                <div className="slide-background"></div>
                <div className="hosts-container">
                  <div className="host-image left">
                    <img src={slide.maleImage} alt="Male Host" />
                  </div>
                  <div className="host-image right">
                    <img src={slide.femaleImage} alt="Female Host" />
                  </div>
                </div>
              </>
            )}
            
            {slide.type === 'merch' && (
              <>
                <div className="merch-background" style={{ backgroundImage: `url(${slide.backgroundImage})` }}></div>
                <div className="merch-container">
                  <div className="merch-content">
                    <div className="merch-text">
                      <h2 className="merch-title">TRULY & HONESTLY<br />MERCHS AVAILABLE!</h2>
                      <p className="merch-description">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
                      </p>
                      <button className="btn-merch">Shop Merch</button>
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

      <div className={`header-content ${currentSlide !== 0 ? 'hidden' : ''}`}>
        <div className="header-text">
          <p className="header-subtitle">Now Available on Apple Podcast and Spotify</p>
          <h1 className="header-title">
            TRULY &<br />
            HONESTLY
          </h1>
          <p className="header-hosts">With Yinka & Dicta</p>
          
          <div className="header-buttons">
            <button className="btn btn-subscribe">Subscribe</button>
            <button className="btn btn-shop">Shop Merch</button>
          </div>
        </div>
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
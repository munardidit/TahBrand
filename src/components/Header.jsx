import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Premium typewriter animation without cursor
  const typewriterVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.05 // Crisp, professional typing speed
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const letterVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      filter: "blur(4px)",
      y: 10
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4
      }
    }
  };

  const hostsText = "With Yinka & Dicta";

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
                  
                  {/* Premium Typewriter Animation - No Cursor */}
                  <AnimatePresence mode="wait">
                    {index === currentSlide && (
                      <motion.p 
                        className="header-hosts"
                        variants={typewriterVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key="hosts-text"
                        style={{ pointerEvents: 'none' }} // Add this line
                      >
                        {hostsText.split('').map((char, i) => (
                          <motion.span
                            key={i}
                            variants={letterVariants}
                            style={{ 
                              display: 'inline-block',
                              fontFamily: '"Licorice", cursive',
                              fontStyle: 'italic',
                              fontWeight: 600,
                              pointerEvents: 'none' // Add this line
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </motion.span>
                        ))}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="header-buttons" style={{ position: 'relative', zIndex: 10 }}>
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
                        Lorem ipsum dolor sit 
                        do eiusmod tempor incididunt ut dolor sit dolor sit dolor sit z
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
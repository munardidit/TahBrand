import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';
import hoodie from '../assets/pjstacked.png';
import hostsBg from '../assets/navbar.png';

function Header() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const hostsText = "With Yinka & Dicta";

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

  const typewriterVariants = {
    hidden: { 
      opacity: 0 
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
        when: "beforeChildren",
        staggerChildren: 0.05 
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

  // Modern 2025 animation variants for merch image
  const merchImageVariants = {
    initial: {
      opacity: 0,
      scale: 0.8,
      y: 60,
      rotateY: -15,
      filter: "blur(12px) brightness(0.8)",
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateY: 0,
      filter: "blur(0px) brightness(1)",
      transition: {
        opacity: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
        scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
        y: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
        rotateY: { duration: 1, ease: "circOut" },
        filter: { duration: 1, ease: "easeOut" },
      }
    },
    hover: {
      scale: 1.02,
      y: -8,
      rotateY: 5,
      filter: "brightness(1.1) drop-shadow(0 20px 40px rgba(255,255,255,0.15))",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 40,
      rotateY: 10,
      filter: "blur(8px) brightness(0.7)",
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingAnimation = {
    animate: {
      y: [0, -15, 0],
      rotateZ: [0, -1, 0],
      transition: {
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotateZ: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    }
  };

  const glowEffectVariants = {
    animate: {
      opacity: [0.3, 0.7, 0.3],
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const particlesVariants = {
    animate: {
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    }
  };

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
                  
                  <AnimatePresence mode="wait">
                    {index === currentSlide && (
                      <motion.p 
                        className="header-hosts"
                        variants={typewriterVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        key="hosts-text"
                        style={{ pointerEvents: 'none' }} 
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
                              pointerEvents: 'none' 
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
                        TRULY & HONESTLY <br /> CHRISTMAS MERCHS AVAILABLE!
                      </h2>
                      <p className="merch-description">
                        Truly and Honestly brand merchs are currently available for sale.
                        Click below to get yours today.
                      </p>
                      <button
                        className="btn-merch"
                        onClick={() => navigate('/shopmerch')}
                      >
                        Shop Merch
                      </button>
                    </div>

                    {/* MERCH IMAGE ANIMATION */}
                    <motion.div 
                      className="merch-image"
                      whileHover="hover"
                    >
                      {/* Main Image Container */}
                      <motion.div
                        className="image-container"
                        variants={merchImageVariants}
                        initial="initial"
                        animate={index === currentSlide ? "animate" : "exit"}
                        whileHover="hover"
                      >
                        {/* Floating Animation */}
                        <motion.div
                          variants={floatingAnimation}
                          animate="animate"
                        >
                          {/* Glow Effect */}
                          <motion.div
                            className="glow-effect"
                            variants={glowEffectVariants}
                            animate="animate"
                          />
                          
                          {/* Main Image */}
                          <motion.img
                            src={slide.hoodieImage}
                            alt="Orange Hoodie Merch"
                            style={{ 
                              width: "100%", 
                              height: "auto",
                              position: "relative",
                              zIndex: 2
                            }}
                          />
                        </motion.div>

                        {/* Subtle Particles/Orbs */}
                        <motion.div
                          className="particle particle-1"
                          variants={particlesVariants}
                          animate="animate"
                        />
                        <motion.div
                          className="particle particle-2"
                          variants={particlesVariants}
                          animate="animate"
                          style={{ animationDelay: '0.5s' }}
                        />
                        <motion.div
                          className="particle particle-3"
                          variants={particlesVariants}
                          animate="animate"
                          style={{ animationDelay: '1s' }}
                        />
                      </motion.div>
                    </motion.div>
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
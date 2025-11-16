import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import './NewMerch.css';
import hoodieImage from '../assets/hoodie.png';
import hoodieImage2 from '../assets/Bhoodie.png'; 

function NewMerch() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  
  const images = [
    { src: hoodieImage, alt: "Orange Hoodie Front" },
    { src: hoodieImage2, alt: "Orange Hoodie Back" } 
  ];

  const handleShopNowClick = () => {
    navigate('/merch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  
  useEffect(() => {
    if (!isImageVisible) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isImageVisible, images.length]);

  
  const titleVariants = {
    animate: {
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const lineVariants = {
    animate: {
      opacity: [1, 0.8, 1],
      scale: [1, 1.1, 1],
      y: [0, -8, 0],
      textShadow: [
        "0 0 0px rgba(255,242,238,0)",
        "0 0 10px rgba(255,242,238,0.5)",
        "0 0 0px rgba(255,242,238,0)"
      ],
      transition: {
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5
      }
    }
  };

  
  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
    })
  };

  const floatVariants = {
    float: {
      y: [0, -15, 0],
      rotate: [0, 2, -1, 0],
      scale: [1, 1.03, 1],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsImageVisible(true);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  // Fallback timeout in case Intersection Observer doesn't trigger
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isImageVisible) {
        setIsImageVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isImageVisible]);

  // Manual navigation handlers
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="new-merch-section">
      <div className="new-merch-container">
        <div className="new-merch-content">
          <div className="new-merch-text">
            <motion.h2 
              className="new-merch-title"
              variants={titleVariants}
              initial="animate"
              animate="animate"
            >
              <motion.span variants={lineVariants}>New Merch</motion.span>
              <br />
              <motion.span variants={lineVariants}>Collections</motion.span>
              <br />
              <motion.span variants={lineVariants}>Now Available!</motion.span>
            </motion.h2>

            <motion.button 
              onClick={handleShopNowClick} 
              className="new-merch-button"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#FFF2EE",
                color: "#270E07"
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Shop Now
            </motion.button>
          </div>
          
          <div ref={imageRef} className="new-merch-image">
            <div className="image-slider-container">
              <motion.div
                key={currentImageIndex}
                custom={1} // Direction for animation
                variants={imageVariants}
                initial="enter"
                animate={isImageVisible ? ["center", "float"] : "enter"}
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="slider-image"
              >
                <img 
                  src={images[currentImageIndex].src} 
                  alt={images[currentImageIndex].alt}
                />
              </motion.div>

              {/* Navigation Dots */}
              <div className="slider-dotss">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`dots ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button className="slider-arrow prev" onClick={goToPrevious}>
                ‹
              </button>
              <button className="slider-arrow next" onClick={goToNext}>
                ›
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewMerch;
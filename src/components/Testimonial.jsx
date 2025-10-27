import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonial.css";

function Testimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "David345",
    },
    {
      id: 2,
      rating: 5,
      text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Sarah123",
    },
    {
      id: 3,
      rating: 5,
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Mike789",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, [testimonials.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  // Auto-slide every 6 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  // Swipe gestures
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    if (distance > minSwipeDistance) nextSlide();
    else if (distance < -minSwipeDistance) prevSlide();
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Animation variants
  const cardVariants = {
    initial: { opacity: 0, y: -50, scale: 0.9, rotateX: -10 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: { type: "spring", duration: 0.8 },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.9,
      rotateX: 10,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2 className="testimonial-heading">
            Thank you for always
            <br />
            listening to us.
          </h2>
        </div>

        <div
          className="testimonial-slider"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="testimonial-stack">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[currentIndex].id}
                className="testimonial-card stacked"
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <div className="testimonial-stars">
                  {[...Array(testimonials[currentIndex].rating)].map(
                    (_, index) => (
                      <span key={index} className="star">
                        ★
                      </span>
                    )
                  )}
                </div>
                <p className="testimonial-text">
                  {testimonials[currentIndex].text}
                </p>
                <div className="testimonial-footer">
                  <span className="testimonial-author">
                    {testimonials[currentIndex].author}
                  </span>
                  <button
                    className="testimonial-arrow"
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

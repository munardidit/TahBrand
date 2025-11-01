import { motion } from "framer-motion";
import "./Testimonial.css";

function Testimonial() {
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
    {
      id: 4,
      rating: 5,
      text: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "Jane001",
    },
  ];

  const loopedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <div className="testimonial-header">
          <h2 className="testimonial-heading">
            Thank you for always
            <br />
            listening to us...
          </h2>
        </div>

        <div className="testimonial-credits-wrapper">
          <motion.div
            className="testimonial-credits"
            animate={{ y: ["0%", "-100%"] }}
            transition={{
              duration: 25, 
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {loopedTestimonials.map((t, index) => (
              <div key={index} className="testimonial-card credit-roll">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
                </div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-footer">
                  <span className="testimonial-author">{t.author}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;

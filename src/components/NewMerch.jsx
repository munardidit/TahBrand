import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NewMerch.css';
import hoodieImage from '../assets/Sweater.png';

function NewMerch() {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate('/merch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // continuous animation
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

            <button onClick={handleShopNowClick} className="new-merch-button">
              Shop Now
            </button>
          </div>
          
          <div className="new-merch-image">
            <img src={hoodieImage} alt="Orange Hoodie" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewMerch;
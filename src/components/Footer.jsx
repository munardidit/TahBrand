import { useState } from 'react';
import { 
  RiInstagramLine, 
  RiAppleLine, 
  RiYoutubeLine, 
  RiTwitterXLine, 
  RiTiktokLine 
} from 'react-icons/ri';
import './Footer.css';
import logo from '../assets/Footer.png';

function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe email:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Truly & Honestly with Yinka & Dicta" />
          </div>

          <div className="footer-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <RiInstagramLine />
            </a>

            <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" aria-label="Apple Podcast">
              <RiAppleLine />
            </a>

            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <RiYoutubeLine />
            </a>

            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
              <RiTwitterXLine />
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <RiTiktokLine />
            </a>
          </div>

          <div className="footer-newsletter">
            <p className="newsletter-label">Subscribe to our newsletter</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
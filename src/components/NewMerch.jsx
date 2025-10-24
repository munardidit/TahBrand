import './NewMerch.css';
import hoodieImage from '../assets/Sweater.png';

function NewMerch() {
  return (
    <section className="new-merch-section">
      <div className="new-merch-container">
        <div className="new-merch-content">
          <div className="new-merch-text">
            <h2 className="new-merch-title">
              New Merch<br />
              Collections<br />
              Now Available!
            </h2>
            <button className="new-merch-button">Shop Now</button>
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
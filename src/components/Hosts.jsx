import './Hosts.css';
import hostsImage from '../assets/hostimage.png';

function Hosts() {
  return (
    <section className="hosts-section">
      <div className="host-container">
        <h2 className="hosts-heading">Meet The Hosts</h2>

        <div className="hosts-content">
          <div className="hosts-text">
            <h3 className="hosts-title">Yinka & Dicta</h3>
            <p className="hosts-description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
              occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
              anim id est laborum.
            </p>
            <button className="hosts-button">Ask us anything</button>
          </div>

          <div className="hosts-image">
            <img src={hostsImage} alt="Hosts Yinka and Dicta" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hosts;

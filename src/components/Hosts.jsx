import { useEffect, useRef, useState } from 'react';
import './Hosts.css';
import hostsImage from '../assets/hostimage.png';

function Hosts() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className="hosts-section" ref={sectionRef}>
      <div className="host-container">
        <h2 className={`hosts-heading ${isVisible ? 'fade-in' : ''}`}>
          Meet The Hosts
        </h2>

        <div className="hosts-content">
          <div className={`hosts-text ${isVisible ? 'slide-in-left' : ''}`}>
            <h3 className="hosts-title">Yinka & Dicta</h3>
            <p className="hosts-description">
              Truly and Honestly with Yinka and Dicta is the perfect balance of calm and chaos, logic and laughter.
              Yinka is the steady voice of thought, warmth, and is quietly funny in a way that catches you off guard.
              Dicta is the fire - loud, unfiltered, side-eye ready, and never afraid to say what everyone else is thinking.
              Together, they bring two completely different energies that somehow fit perfectly.
              He listens first; she dives right in. He keeps things grounded; she keeps things lively.
              He's the "it's-not-that-deep" calm; she's the "let's talk about it" spark.
              They explore marriage, culture, friendship, work, and everyday life from angles that challenge and balance each other.
              One brings sense, the other brings spice - and listeners get the best of both.
              Off the mic, they're the friends who steady you, hype you, and make you laugh till you forget your stress.
              Truly and honestly? Together, they're the reason the podcast hits different.
            </p>
            <button className="hosts-button">Ask us anything</button>
          </div>

          <div className={`hosts-image ${isVisible ? 'scale-in' : ''}`}>
            <img src={hostsImage} alt="Hosts Yinka and Dicta" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hosts;
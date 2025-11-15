import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopularEpisodes.css';
import popular1 from '../assets/hostimage.png';
import popular2 from '../assets/hostimage.png';
import popular3 from '../assets/hostimage.png';

function PopularEpisodes() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const handleViewAllClick = () => {
    navigate('/allepisodes');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const popularEpisodes = [
    {
      id: 1,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: popular1,
    },
    {
      id: 2,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: popular2,
    },
    {
      id: 3,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: popular3,
    },
  ];

  return (
    <section className="popular-episodes-section" ref={sectionRef}>
      <div className="popular-episodes-container">
        <h2 className={`popular-episodes-heading ${isVisible ? 'fade-in' : ''}`}>
          Most Popular Episodes
        </h2>

        <div className="popular-episodes-grid">
          {popularEpisodes.map((episode, index) => (
            <div 
              key={episode.id} 
              className={`popular-episode-card ${isVisible ? 'scale-in' : ''}`}
              style={{ 
                transitionDelay: `${0.1 * index}s` 
              }}
            >
              <div className="popular-episode-thumbnail">
                <img src={episode.thumbnail} alt={episode.title} />
              </div>

              <div className="popular-episode-info">
                <div className="popular-episode-meta">
                  <span className="popular-episode-category">{episode.category}</span>
                  <span className="popular-episode-date">{episode.date}</span>
                </div>

                <h3 className="popular-episode-title">{episode.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-button-container">
          <button 
            onClick={handleViewAllClick} 
            className={`view-all-button ${isVisible ? 'fade-in' : ''}`}
            style={{ transitionDelay: '0.4s' }}
          >
            View All Episodes
          </button>
        </div>
      </div>
    </section>
  );
}

export default PopularEpisodes;
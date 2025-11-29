import { useState, useEffect, useRef } from 'react';
import './Episode.css';
// Import your images
import hostImage from '../assets/hostimage.png'; // Adjust the path based on your file structure

function Episode() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const episodes = [
    {
      id: 1,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: hostImage,
    },
    {
      id: 2,
      category: 'Relationship & Finance', 
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: hostImage,
    },
    {
      id: 3,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Building wealth as a couple',
      thumbnail: hostImage, 
    },
    {
      id: 4,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Investment strategies for families',
      thumbnail: hostImage, 
    },
  ];


  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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

  const displayedEpisodes = isMobile && !showAll ? episodes.slice(0, 2) : episodes;

  return (
    <div className="wrapper">
      <section className="episodes-section" ref={sectionRef}>
        <div className="episodes-container">
          <h2 className={`episodes-heading ${isVisible ? 'fade-in' : ''}`}>
            Latest Episodes
          </h2>

          <div className="stack-container">
            {displayedEpisodes.map((episode, index) => (
              <div
                key={episode.id}
                className={`episode-card ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="episode-thumbnail">
                  <img 
                    src={episode.thumbnail} 
                    alt={episode.title}
                    className="thumbnail-img"
                  />
                </div>

                <div className="episode-info">
                  <div className="episode-meta">
                    <span className="episode-category">{episode.category}</span>
                    <span className="episode-date">{episode.date}</span>
                  </div>
                  <h3 className="episode-title">{episode.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {isMobile && !showAll && episodes.length > 2 && (
            <div className="view-more-container">
              <button 
                className={`view-more-btn ${isVisible ? 'fade-in' : ''}`}
                onClick={() => setShowAll(true)}
              >
                View More Episodes
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Episode;
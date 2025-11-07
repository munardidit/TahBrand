import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Episode.css';
import hostImage from '../assets/hostimage.png';

function Episode() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
      title: 'Growing your household finance together.',
      thumbnail: hostImage,
    },
    {
      id: 4,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
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

  const displayedEpisodes = isMobile && !showAll ? episodes.slice(0, 2) : episodes;

  return (
    <section className="episodes-section">
      <div className="episodes-container">
        <h2 className="episodes-heading">Latest Episodes</h2>

        <div className="episodes-grid">
          {displayedEpisodes.map((episode) => (
            <Link
              to={`/episode/${episode.id}`}
              key={episode.id}
              className="episode-card-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="episode-card">
                <div className="episode-thumbnail">
                  <img src={episode.thumbnail} alt={episode.title} />
                </div>

                <div className="episode-info">
                  <div className="episode-meta">
                    <span className="episode-category">{episode.category}</span>
                    <span className="episode-date">{episode.date}</span>
                  </div>
                  <h3 className="episode-title">{episode.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {isMobile && !showAll && episodes.length > 2 && (
          <div className="view-more-container">
            <button 
              className="view-more-btn" 
              onClick={() => setShowAll(true)}
            >
              View More Episodes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Episode;
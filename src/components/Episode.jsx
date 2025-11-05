import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Episode.css';
import hostImage1 from '../assets/hostimage.png';
import hostImage2 from '../assets/hostimage.png';  
import hostImage3 from '../assets/hostimage.png';  
import hostImage4 from '../assets/hostimage.png'; 

function Episode() {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const episodes = [
    {
      id: 1,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: hostImage1,
    },
    {
      id: 2,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: hostImage2,
    },
    {
      id: 3,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: hostImage3,
    },
    {
      id: 4,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: hostImage4,
    },
  ];

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Determine which episodes to display
  const displayedEpisodes = isMobile && !showAll 
    ? episodes.slice(0, 2) 
    : episodes;

  const handleViewMore = () => {
    setShowAll(true);
  };

  return (
    <section className="episodes-section">
      <div className="episodes-container">
        <h2 className="episodes-heading">Latest Episodes</h2>

        <div className="episodes-grid">
          {displayedEpisodes.map(({ id, category, date, title, thumbnail }) => (
            <Link
              to={`/episode/${id}`}
              key={id}
              className="episode-card-link"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="episode-card">
                <div className="episode-thumbnail">
                  <img src={thumbnail} alt={title} />
                </div>

                <div className="episode-info">
                  <div className="episode-meta">
                    <span className="episode-category">{category}</span>
                    <span className="episode-date">{date}</span>
                  </div>

                  <h3 className="episode-title">{title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button - Only show on mobile when not all episodes are displayed */}
        {isMobile && !showAll && episodes.length > 2 && (
          <div className="view-more-container">
            <button className="view-more-btn" onClick={handleViewMore}>
              View More Episodes
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Episode;
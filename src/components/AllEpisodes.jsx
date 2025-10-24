import './AllEpisodes.css';
import { Link } from 'react-router-dom';

function AllEpisodes() {
  const episodes = [
    {
      id: 1,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode1.jpg'
    },
    {
      id: 2,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode2.jpg'
    },
    {
      id: 3,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode3.jpg'
    },
    {
      id: 4,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode4.jpg'
    },
    {
      id: 5,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode5.jpg'
    },
    {
      id: 6,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode6.jpg'
    },
    {
      id: 7,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode7.jpg'
    },
    {
      id: 8,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode8.jpg'
    },
    {
      id: 9,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode9.jpg'
    },
    {
      id: 10,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode10.jpg'
    },
    {
      id: 11,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode11.jpg'
    },
    {
      id: 12,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode12.jpg'
    }
  ];

   return (
    <section className="all-episodes-section">
      <div className="all-episodes-container">
        <div className="all-episodes-header">
          <h1 className="all-episodes-title">
            ALL EPISODES OF<br />
            TRULY AND HONESTLY<br />
            WITH YINKA & DICTA.
          </h1>
          <button className="filter-button">
            <span>Date - Newest First</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div className="all-episodes-grid">
          {episodes.map((episode) => (
            <Link to={`/episode/${episode.id}`} key={episode.id} className="all-episode-card-link">
              <div className="all-episode-card">
                <div className="all-episode-thumbnail">
                  <img src={episode.thumbnail} alt={episode.title} />
                </div>
                
                <div className="all-episode-info">
                  <div className="all-episode-meta">
                    <span className="all-episode-category">{episode.category}</span>
                    <span className="all-episode-date">{episode.date}</span>
                  </div>
                  
                  <h3 className="all-episode-title">{episode.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="pagination">
          <button className="pagination-button active">1</button>
          <button className="pagination-button">2</button>
        </div>
      </div>
    </section>
  );
}

export default AllEpisodes;
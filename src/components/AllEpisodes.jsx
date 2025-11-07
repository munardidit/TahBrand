import './AllEpisodes.css';
import { Link, useNavigate } from 'react-router-dom';

import episode1 from '../assets/hostimage.png';
import episode2 from '../assets/hostimage.png';
import episode3 from '../assets/hostimage.png';
import episode4 from '../assets/hostimage.png';
import episode5 from '../assets/hostimage.png';
import episode6 from '../assets/hostimage.png';
import episode7 from '../assets/hostimage.png';
import episode8 from '../assets/hostimage.png';
import episode9 from '../assets/hostimage.png';
import episode10 from '../assets/hostimage.png';
import episode11 from '../assets/hostimage.png';
import episode12 from '../assets/hostimage.png';

function AllEpisodes() {
  const navigate = useNavigate();
  
  const episodes = [
    {
      id: 1,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode1
    },
    {
      id: 2,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode2
    },
    {
      id: 3,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode3
    },
    {
      id: 4,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode4
    },
    {
      id: 5,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode5
    },
    {
      id: 6,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode6
    },
    {
      id: 7,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode7
    },
    {
      id: 8,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode8
    },
    {
      id: 9,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode9
    },
    {
      id: 10,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode10
    },
    {
      id: 11,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode11
    },
    {
      id: 12,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode12
    }
  ];

  return (
    <section className="all-episodes-section">
      <div className="all-episodes-container">
        <div className="all-episodes-header">
          <div className="all-episodes-title-section">
            <button className="back-arrow-btn" onClick={() => navigate(-1)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M19 12H5M12 19l-7-7 7-7" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="all-episodes-title">
              ALL EPISODES OF TRULY AND HONESTLY  WITH<br />
               YINKA & DICTA.
            </h1>
          </div>
          <button className="filter-button">
            <span>Date - Newest First</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="all-episodes-grid">
          {episodes.map((episode) => (
            <Link
              to={`/episode/${episode.id}`}
              key={episode.id}
              className="all-episode-card-link"
            >
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
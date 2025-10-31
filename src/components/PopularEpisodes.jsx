
import React from 'react';
import { Link } from 'react-router-dom';
import './PopularEpisodes.css';

function PopularEpisodes() {
  const popularEpisodes = [
    {
      id: 1,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/popular1.jpg'
    },
    {
      id: 2,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/popular2.jpg'
    },
    {
      id: 3,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/popular3.jpg'
    }
  ];

  return (
    <section className="popular-episodes-section">
      <div className="popular-episodes-container">
        <h2 className="popular-episodes-heading">Most Popular Episodes</h2>
        
        <div className="popular-episodes-grid">
          {popularEpisodes.map((episode) => (
            <div key={episode.id} className="popular-episode-card">
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
        <Link to="/allepisodes" className="view-all-button">
          View All Episodes
        </Link>
      </div>
      </div>
    </section>
  );
}

export default PopularEpisodes;
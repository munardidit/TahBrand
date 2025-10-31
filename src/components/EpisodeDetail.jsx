import { useParams, useNavigate } from 'react-router-dom';
import './EpisodeDetail.css';

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


function EpisodeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allEpisodes = [
    {
      id: 1,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode1,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...'
    },
    {
      id: 2,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode2,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 3,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode3,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 4,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode4,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 5,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode5,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 6,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode6,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 7,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode7,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 8,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode8,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 9,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode9,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 10,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode10,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 11,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: episode11,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    },
    {
      id: 12,
      category: 'Relationship & Finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: episode12,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...'
    }
  ];

  const episodeIndex = allEpisodes.findIndex((ep) => ep.id === parseInt(id));
  const episode = allEpisodes[episodeIndex];

  if (!episode) {
    return (
      <section className="episode-detail-section">
        <div className="episode-detail-container">
          <h1>Episode not found</h1>
        </div>
      </section>
    );
  }

  const handleNavigate = (direction) => {
    if (direction === 'prev' && episodeIndex > 0) {
      navigate(`/episodes/${allEpisodes[episodeIndex - 1].id}`);
    }
    if (direction === 'next' && episodeIndex < allEpisodes.length - 1) {
      navigate(`/episodes/${allEpisodes[episodeIndex + 1].id}`);
    }
  };

  return (
    <section className="episode-detail-section">
      <div className="episode-detail-container">
        {/* Header */}
        <div className="episode-detail-header">
          <h1 className="episode-detail-title">{episode.title}</h1>
          <p className="episode-detail-meta">
            <span className="episode-category">{episode.category}</span>
            <span className="episode-date">{episode.date}</span>
          </p>
        </div>

        {/* Thumbnail */}
        <div className="episode-video-container">
          <div className="episode-video-placeholder">
            <img
              src={episode.thumbnail}
              alt={episode.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit:'cover'
              }}
            />
          </div>
        </div>

        {/* Platforms */}
        <div className="episode-platforms">
          <p className="platforms-title">Listen or watch on your favorite platforms</p>
          <div className="platforms-buttons">
            <button className="platform-btn">YouTube</button>
            <button className="platform-btn">Spotify</button>
            <button className="platform-btn">Apple Podcast</button>
          </div>
        </div>

        {/* Description */}
        <div className="episode-description">
          <h2 className="description-title">Show summary</h2>
          <p className="description-text">{episode.description}</p>
        </div>

        {/* Pagination */}
        <div className="episode-pagination">
          <button
            className="pagination-arrow prev"
            onClick={() => handleNavigate('prev')}
            disabled={episodeIndex === 0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {allEpisodes.map((_, index) => (
            <button
              key={index}
              className={`pagination-dot ${index === episodeIndex ? 'active' : ''}`}
              onClick={() => navigate(`/episodes/${allEpisodes[index].id}`)}
            />
          ))}

          <button
            className="pagination-arrow next"
            onClick={() => handleNavigate('next')}
            disabled={episodeIndex === allEpisodes.length - 1}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default EpisodeDetail;

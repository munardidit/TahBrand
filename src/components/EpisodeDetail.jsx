import { useParams, useNavigate } from 'react-router-dom';
import './EpisodeDetail.css';

function EpisodeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allEpisodes = [
    {
      id: 1,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode1.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      id: 2,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode2.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    },
    {
      id: 3,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode3.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 4,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode4.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 5,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode5.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.'
    },
    {
      id: 6,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode6.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'
    },
    {
      id: 7,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode7.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.'
    },
    {
      id: 8,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode8.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.'
    },
    {
      id: 9,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode9.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
    },
    {
      id: 10,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode10.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.'
    },
    {
      id: 11,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode11.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.'
    },
    {
      id: 12,
      category: 'Relationship & finance',
      date: 'October 3rd, 2025',
      title: 'Growing your household finance together.',
      thumbnail: '/assets/episode12.jpg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
    }
  ];

  const episodeIndex = allEpisodes.findIndex(ep => ep.id === parseInt(id));
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
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
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

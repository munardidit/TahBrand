import './Episode.css';
import { Link } from 'react-router-dom';

function Episode() {
  const episode = [
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
      title: 'Finding the right person (PT1)',
      thumbnail: '/assets/episode4.jpg'
    }
  ];

 return (
    <section className="episodes-section">
      <div className="episodes-container">
        <h2 className="episodes-heading">Latest Episodes</h2>
        
        <div className="episodes-grid">
          {episode.map((episode) => (
            <a href={`/episode/${episode.id}`} key={episode.id} className="episode-card-link">
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
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Episode;
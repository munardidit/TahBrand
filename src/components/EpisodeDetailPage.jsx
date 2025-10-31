import { useEffect } from 'react';
import Navbar from './Navbar';
import EpisodeDetail from './EpisodeDetail';
import NewMerch from './NewMerch';
import Footer from './Footer';

function EpisodeDetailPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <>
      <Navbar />
      <EpisodeDetail />
      <NewMerch />
      <Footer />
    </>
  );
}

export default EpisodeDetailPage;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Episode from './components/Episode';
import PopularEpisodes from './components/PopularEpisodes';
import NewMerch from './components/NewMerch';
import Hosts from './components/Hosts';
import Testimonial from './components/Testimonial';
import Footer from './components/Footer';
import AllEpisodes from './components/AllEpisodes';
import ShopMerch from './components/ShopMerch';
import ShopMerch2 from './components/ShopMerch2';
import Payment from './components/Payment';
import EpisodeDetail from './components/EpisodeDetailPage';
import './App.css';

// Home Page Component
function HomePage() {
  return (
    <>
    <Navbar />
      <Header />
      <Episode />
      <PopularEpisodes />
      <NewMerch />
      <Hosts />
      <Testimonial />
      <Footer />
    </>
  );
}

// All Episodes Page Component
function AllEpisodesPage() {
  return (
    <>
      <Navbar />
      <AllEpisodes />
      <NewMerch />
      <Footer />
    </>
  );
}

// Shop Merch Page Component
function ShopMerchPage() {
  return (
    <>
      <Navbar />
      <ShopMerch />
      <Footer />
    </>
  );
}

// Shop Merch Product Detail Page Component
function ShopMerch2Page() {
  return (
    <>
      <Navbar />
      <ShopMerch2 />
      <Footer />
    </>
  );
}

// Episode Detail Page
function EpisodeDetailPage() {
  return (
    <>
      <Navbar />
      <EpisodeDetail />
      <NewMerch />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/episodes" element={<AllEpisodesPage />} />
        <Route path="/" element={<Header />} />
        <Route path="/shopmerch" element={<ShopMerch />} />
        <Route path="/merch" element={<ShopMerchPage />} />
        <Route path="/merch/product/:id" element={<ShopMerch2Page />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/episode/:id" element={<EpisodeDetailPage />} />
        <Route path="/episodes/:id" element={<EpisodeDetail />} />
        <Route path="/allepisodes" element={<AllEpisodesPage />} />
        <Route path="/episode/:id" element={<EpisodeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

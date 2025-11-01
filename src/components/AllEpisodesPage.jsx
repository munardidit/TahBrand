import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import AllEpisodes from "../components/AllEpisodes";
import NewMerch from "../components/NewMerch";
import Footer from "../components/Footer";
import "./AllEpisodesPage.css";

function AllEpisodesPage() {
  return (
    <motion.div
      className="all-episodes-page"
      initial={{ y: 50, opacity: 1 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
    >
      <Navbar />
      <AllEpisodes />
      <NewMerch />
      <Footer />
    </motion.div>
  );
}

export default AllEpisodesPage;

import { HashRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIntl } from "react-intl";
import { motion, MotionConfig } from "framer-motion";
import WelcomePage from "./pages/WelcomePage";
import { LanguageProvider } from "./context/i18n";
import TourPage from "./pages/TourPage";
import GalleryPage from "./pages/GalleryPage";
import NoviPage from "./pages/NoviPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import BackToTop from "./components/BackToTop";

const SkipLink = () => {
  const { formatMessage } = useIntl();
  return (
    <a className="skip-link" href="#main" onClick={(e) => {
      // A plain #main href would be treated as a route by the HashRouter.
      e.preventDefault();
      document.getElementById("main")?.focus();
    }}>
      {formatMessage({ id: "nav.skip" })}
    </a>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    // Keyed on the path so every page fades in when it is opened.
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Routes location={location}>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/tour" element={<TourPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/kastel-novi" element={<NoviPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </motion.div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <MotionConfig reducedMotion="user">
        <Router>
          <ScrollToTop />
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} style={{ outline: "none" }}>
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </Router>
        <ToastContainer position="top-right" autoClose={4000} />
      </MotionConfig>
    </LanguageProvider>
  );
}

export default App;

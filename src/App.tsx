import { HashRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useIntl } from "react-intl";
import WelcomePage from "./pages/WelcomePage";
import { LanguageProvider } from "./context/i18n";
import TourPage from "./pages/TourPage";
import GalleryPage from "./pages/GalleryPage";
import NoviPage from "./pages/NoviPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <SkipLink />
        <Header />
        <main id="main" tabIndex={-1} style={{ outline: "none" }}>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/tour" element={<TourPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/kastel-novi" element={<NoviPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <ToastContainer position="top-right" autoClose={4000} />
    </LanguageProvider>
  );
}

export default App;

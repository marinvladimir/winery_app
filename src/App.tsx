import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from "./pages/WelcomePage";
import { LanguageProvider } from "./context/i18n";
import TourPage from "./pages/TourPage";
import GalleryPage from "./pages/GalleryPage";
import NoviPage from "./pages/NoviPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/tour" element={<TourPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/kastel-novi" element={<NoviPage />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

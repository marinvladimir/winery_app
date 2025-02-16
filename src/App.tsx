import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import WelcomePage from "./pages/WelcomePage";
import { LanguageProvider } from "./context/i18n";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider>
        <Router>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            {/* 
          <Route path="/music" element={<MusicPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} /> */}
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

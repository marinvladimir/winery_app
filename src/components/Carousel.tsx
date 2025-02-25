import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { useLanguage } from "../context/i18n";
import { LanguageButton } from "../pages/AboutPage";

const Carousel = () => {
  const { formatMessage } = useIntl();
  const [index, setIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  const images = [
    { src: "assets/1-1.jpg", text: formatMessage({ id: "carousel.text1" }), extraText: formatMessage({ id: "carousel.text11" }) },
    { src: "assets/2.jpg", text: formatMessage({ id: "carousel.text2" }) }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const { switchLanguage } = useLanguage();
  const isActive = (path: string) => currentHash === path;

  const handleNavigation = (path: string) => {
    window.location.hash = path;
    setIsMenuOpen(false)
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src="assets/logo.png" />
        <BurgerMenu onClick={() => setIsMenuOpen((prev) => !prev)}>
        <img src="assets/wn_btn.png" alt="Menu" />
        </BurgerMenu>
        <DesktopNav>
          {[
            { label: formatMessage({ id: "welcome.title" }), path: "#/" },
            { label: formatMessage({ id: "header.link2" }), path: "#/tour" },
            { label: formatMessage({ id: "header.link3" }), path: "#/gallery" },
            // { label: "Kaštel Novi", path: "#/kastel-novi" }
          ].map((item, i) => (
            <NavItem key={i} onClick={() => handleNavigation(item.path)} className={isActive(item.path) ? "active" : ""}>
            {item.label}
          </NavItem>
          ))}
        </DesktopNav>
        <HeaderRight>
  <ContactInfo>
    098 9932 710
  </ContactInfo>
  <ContactEmail href="mailto:vinarija.kuzmanic@gmail.com">
  vinarija.kuzmanic@gmail.com
  </ContactEmail>
  <LanguageSwitcher>
    <LanguageButton onClick={() => switchLanguage("hr")}>
      <FormattedMessage id="language.hr" />
    </LanguageButton>
    |
    <LanguageButton onClick={() => switchLanguage("en")}>
      <FormattedMessage id="language.en" />
    </LanguageButton>
  </LanguageSwitcher>
</HeaderRight>

      </HeaderContent>
      <AnimatePresence>
        <ImageWrapper
          key={images[index].src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <img src={images[index].src} alt="Winery Image" />
        </ImageWrapper>
      </AnimatePresence>
      <TextOverlay>{images[index].text}</TextOverlay>
      <TextOverlaySmall>{images[index].extraText}</TextOverlaySmall>
      <AnimatePresence>
  {isMenuOpen && (
    <MobileNav
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: -100, opacity: 0 }}
  transition={{ duration: 0.5 }}
>
  <button onClick={()=> setIsMenuOpen(false)} style={{ position: "absolute", top: 10, right: 15, background: "none", border: "none", fontSize: "20px", color: "white", cursor: "pointer" }}>
    ✖
  </button>

  {[
    { label: formatMessage({ id: "welcome.title" }), path: "#/" },
    { label: formatMessage({ id: "header.link2" }), path: "#/tour" },
    { label: formatMessage({ id: "header.link3" }), path: "#/gallery" },
  ].map((item, i) => (
    <NavItem key={i} onClick={() => { handleNavigation(item.path); ()=> setIsMenuOpen(false); }} className={isActive(item.path) ? "active" : ""}>
      {item.label}
    </NavItem>
  ))}

<ContactInfo>
    098 9932 710
  </ContactInfo>
  <ContactEmail href="mailto:vinarija.kuzmanic@gmail.com">
  vinarija.kuzmanic@gmail.com
  </ContactEmail>
  <LanguageSwitcher>
    <LanguageButton onClick={() => switchLanguage("hr")}>
      <FormattedMessage id="language.hr" />
    </LanguageButton>
    |
    <LanguageButton onClick={() => switchLanguage("en")}>
      <FormattedMessage id="language.en" />
    </LanguageButton>
  </LanguageSwitcher>
</MobileNav>

  )}
</AnimatePresence>

    </HeaderContainer>
  );
};

export default Carousel;

// const ContactInfoMobile = styled.div`
//   font-size: 16px;
//   color: white;
//   margin-top: 20px; 
//   text-align: center;
//   padding: 10px;
//   border-top: 1px solid rgba(255, 255, 255, 0.3);
//   width: 100%;
// `;


// const LanguageSwitcherMobile = styled.div`
//   color: white;
//   margin-top: 15px;
//   display: flex;
//   gap: 15px; 
//   justify-content: center;
//   align-items: center;
//   padding: 10px;
// `;

const DesktopNav = styled.nav`
  display: flex;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.nav)`
  position: fixed;
  top: 204px;
  left: 0;
  width: 100%;
  // height: 100vh;
 background: url("assets/wooden.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center items */
  padding: 20px 0;
  gap: 20px; /* More spacing */
  z-index: 1000;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeaderContent = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1170px;
  margin: 0 auto;
  padding: 12px 20px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  z-index: 10;

  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;

const Logo = styled.img`
  max-width: 180px;
`;

const BurgerMenu = styled.div`
  display: none;
  cursor: pointer;

  img {
    width: 56px;
    height: auto;
  }

  @media (max-width: 768px) {
    display: flex;
    position: absolute;
    top: 8px;
    right: 28px;
  }
`;

// const Nav = styled(motion.nav)`
//   position: absolute;
//   top: 204px;
//   left: 0;
//   width: 100%;
//   background: url("assets/wooden.jpg") no-repeat center center;
//   background-size: cover;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 20px 0;
//   gap: 15px;
//   z-index: 100;
// `;

const NavItem = styled.a`
  text-decoration: none;
  color: #e1e1e1;
  font-size: 18px;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  transition: color 0.3s ease;

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: rgb(233, 218, 158);
    transition: width 0.3s ease, left 0.3s ease;
  }

  &:hover {
    color: rgb(233, 218, 158);
    cursor: pointer !important;

    &::after {
      width: 100%;
      left: 0;
    }
  }

  &.active {
    color: rgb(233, 218, 158);

    &::after {
      width: 100%;
      left: 0;
    }
  }
`;


const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactInfo = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #e1e1e1;
  display: flex;
  align-items: center;
  gap: 15px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  &::before {
    content: "📞";
    font-size: 20px;
    color: #ffcc66;
  }

  &:hover {
    color: #ffcc66;
    text-shadow: 1px 1px 12px rgba(255, 204, 102, 0.8);
  }
`;

const ContactEmail = styled.a`
  font-size: 18px;
  font-weight: 500;
  color: #e1e1e1;
  text-decoration: none;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "✉️";
    font-size: 20px;
    color: #ffcc66;
  }

  &:hover {
    color: #ffcc66;
    text-shadow: 1px 1px 12px rgba(255, 204, 102, 0.8);
  }
`;

const LanguageSwitcher = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  cursor: pointer;

  & > button {
    background: transparent;
    border: none;
    color: #e1e1e1;
    font-size: 16px;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ffcc66;
    }
  }
`;


const ImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TextOverlay = styled.div`
  position: absolute;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 1rem;
  bottom: 30%;
  left: 5%;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const TextOverlaySmall = styled.div`
  position: absolute;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
  text-align: center;
  padding: 1rem;
  bottom: 26%;
  left: 5%;

  @media (max-width: 768px) {
    font-size: 0.75rem;
  }
`;

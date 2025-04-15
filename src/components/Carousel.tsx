import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { FormattedMessage, useIntl } from "react-intl";
import { useLanguage } from "../context/i18n";
import { LanguageButton } from "./MotionBg";

const Carousel = () => {
  const { formatMessage } = useIntl();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

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
          <img src="assets/wn_btn.svg" alt="Menu" />
        </BurgerMenu>
        <DesktopNav>
          {[
            { label: formatMessage({ id: "welcome.title" }), path: "#/" },
            { label: formatMessage({ id: "header.link2" }), path: "#/tour" },
            { label: formatMessage({ id: "header.link3" }), path: "#/gallery" }
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
      {isMenuOpen && (
        <MobileNav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={() => setIsMenuOpen(false)} style={{ position: "absolute", top: 10, right: 15, background: "none", border: "none", fontSize: "20px", color: "white", cursor: "pointer" }}>
            ✖
          </button>

          {[
            { label: formatMessage({ id: "welcome.title" }), path: "#/" },
            { label: formatMessage({ id: "header.link2" }), path: "#/tour" },
            { label: formatMessage({ id: "header.link3" }), path: "#/gallery" },
          ].map((item, i) => (
            <NavItem key={i} onClick={() => { handleNavigation(item.path); () => setIsMenuOpen(false); }} className={isActive(item.path) ? "active" : ""}>
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
    </HeaderContainer>
  );
};

export default Carousel;

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
  top: 174px;
  left: 0;
  width: 100%;
  background: url("assets/wooden.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  padding: 20px 0;
  gap: 20px; 
  z-index: 1000;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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
     backdrop-filter: blur(0px);
       background: rgba(0, 0, 0, 0.3);
        padding: 12px 0;
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

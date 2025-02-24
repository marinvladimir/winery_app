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

  const { switchLanguage } = useLanguage();

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
            <NavItem key={i} href={item.path}>
              {item.label}
            </NavItem>
          ))}
        </DesktopNav>
        <HeaderRight>
          <ContactInfo>098 9932 710 &nbsp; | &nbsp; anita_kuzmanic@yahoo.com</ContactInfo>
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
      {[
        { label: formatMessage({ id: "welcome.title" }), path: "#/" },
        { label: formatMessage({ id: "header.link2" }), path: "#/tour" },
        { label: formatMessage({ id: "header.link3" }), path: "#/gallery" },
        // { label: "Kaštel Novi", path: "#/kastel-novi" }
      ].map((item, i) => (
        <NavItem key={i} href={item.path} onClick={() => setIsMenuOpen(false)}>
          {item.label}
        </NavItem>
      ))}
      <ContactInfoMobile>
        098 9932 710 &nbsp; | &nbsp; anita_kuzmanic@yahoo.com
      </ContactInfoMobile>
      <LanguageSwitcherMobile>
        <LanguageButton onClick={() => switchLanguage("hr")}>
          <FormattedMessage id="language.hr" />
        </LanguageButton>
        |
        <LanguageButton onClick={() => switchLanguage("en")}>
          <FormattedMessage id="language.en" />
        </LanguageButton>
      </LanguageSwitcherMobile>
    </MobileNav>
  )}
</AnimatePresence>

    </HeaderContainer>
  );
};

export default Carousel;

const ContactInfoMobile = styled.div`
  font-size: 16px;
  color: white;
  margin-top: 10px;
  text-align: center;
`;

const LanguageSwitcherMobile = styled.div`
  color: white;
  margin-top: 10px;
  display: flex;
  gap: 10px;
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 20px;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileNav = styled(motion.nav)`
  position: absolute;
  top: 204px;
  left: 0;
  width: 100%;
  background: url("assets/wooden.jpg") no-repeat center center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 15px;
  z-index: 100;
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
  transition: all 0.3s ease;

  &:hover {
    color: rgb(233, 218, 158);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ContactInfo = styled.div`
  font-size: 16px;
  color: #e1e1e1;
`;

const LanguageSwitcher = styled.div`
  color: white;
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

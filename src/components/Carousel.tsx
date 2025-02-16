import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useIntl } from "react-intl";

const Carousel = () => {
  const { formatMessage } = useIntl()
  const [index, setIndex] = useState(0);

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

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo src="assets/logo.png" />
        <ContactInfo>098 9932 710 &nbsp; | &nbsp; anita_kuzmanic@yahoo.com</ContactInfo>
        <Nav>
          {[formatMessage({ id: "welcome.title" }), formatMessage({ id: "header.link2" }), formatMessage({ id: "header.link3" }), 'Kaštel Novi'].map((item, i) => (
            <NavItem key={i} href="#">{item}</NavItem>
          ))}
          <NavIndicator layoutId="nav-indicator" />
        </Nav>
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
    </HeaderContainer>
  );
};

export default Carousel;

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
`;

const Logo = styled.img`
  max-width: 180px;
`;

const ContactInfo = styled.div`
  font-size: 16px;
  color: #e1e1e1;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  position: relative;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: #e1e1e1;
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 5px;
  transition: all 0.3s ease;

  &:hover {
    color: rgb(233, 218, 158);
  }

  &:hover::after {
    width: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -3px;
    width: 0;
    height: 2px;
    background: rgb(233, 218, 158);
    transition: width 0.3s ease, left 0.3s ease;
    transform: translateX(-50%);
  }
`;

const NavIndicator = styled(motion.div)`
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 0;
  background: rgb(233, 218, 158);
  transition: width 0.3s ease-in-out;
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
    padding: 0.5rem;
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
    padding: 0.5rem;
  }
`;

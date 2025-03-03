import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { HeroSection, HeroText } from "../components/TourContent";
import { useIntl } from "react-intl";

const images = [
  "assets/fb.jpg",
  "assets/4.jpg",
  "assets/w9.jpeg",
  "assets/w8.jpeg"
];

const GalleryPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImageIndex, setZoomedImageIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const openZoomedImage = (index: number) => {
    if (!isMobile) setZoomedImageIndex(index);
  };

  const closeZoomedImage = () => {
    setZoomedImageIndex(null);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroText>{formatMessage({ id: "gallery.heading" })}</HeroText>
      </HeroSection>
      <GalleryTitle>{formatMessage({ id: "gallery.subheading" })}</GalleryTitle>
      <GalleryContainer>
        {!isMobile ? (
          <DesktopGallery>
            <ArrowButton onClick={prevImage} $left>
              ⮜
            </ArrowButton>
            <ImageWrapper>
              {images.map((image, index) => {
                const offset = (index - currentIndex + images.length) % images.length;
                return (
                  <StyledImage
                  key={index}
                  src={image}
                  $cursor={index === currentIndex}
                  alt={`Gallery image ${index + 1}`}
                  style={{
                    transform: `translateX(${offset * 120}px) scale(${index === currentIndex ? 1 : 0.85})`,
                    zIndex: index === currentIndex ? 2 : 1
                  }}
                  onClick={() => index === currentIndex && openZoomedImage(index)}
                />
                );
              })}
            </ImageWrapper>
            <ArrowButton onClick={nextImage}>⮞</ArrowButton>
          </DesktopGallery>
        ) : (
          <MobileGallery>
            {images.map((image, index) => (
              <MobileImage key={index} src={image} alt={`Image ${index + 1}`} />
            ))}
          </MobileGallery>
        )}
      </GalleryContainer>
      {zoomedImageIndex !== null && (
        <ModalOverlay onClick={closeZoomedImage}>
          <ModalContent>
            <img
              src={images[zoomedImageIndex]}
              alt={`Zoomed-in image ${zoomedImageIndex + 1}`}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
            <CloseButton onClick={closeZoomedImage}>✖</CloseButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageWrapper>
  );
};

export default GalleryPage;

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
`;


const StyledImage = styled.img<{ $cursor?: boolean }>`
  position: absolute;
  transition: transform 0.3s ease, opacity 0.3s ease;
  position: absolute;
  transition: 
  transform 0.5s ease-out, 
  opacity 0.5s ease-out, 
  filter 0.5s ease-out, 
  box-shadow 0.5s ease-out;
    
  max-width: 100%;
  max-height: 100%;
  ${({ $cursor }) => ($cursor ? "cursor: pointer;" : "")}
  object-fit: cover;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);

  &:hover {
    // transform: scale(1.1);
    ${({ $cursor }) => ($cursor ? "scale(1.1);" : "")}
    //  filter: brightness(1.05) contrast(1.1) saturate(1.15) drop-shadow(0 0 6px rgba(150, 50, 75, 0.3));
    ${({ $cursor }) => ($cursor ? "filter: brightness(1.05) contrast(1.1) saturate(1.15) drop-shadow(0 0 6px rgba(150, 50, 75, 0.3));" : "")}
    //  border: 1px solid rgba(123, 30, 37, 0.3);
    ${({ $cursor }) => ($cursor ? "border: 1px solid rgba(123, 30, 37, 0.3);" : "")}
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-bottom: 50px;
  background: white;
`;

const GalleryTitle = styled.h2`
  margin-top: 20px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: rgb(123, 30, 37);
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const GalleryContainer = styled.div`
  width: 90%;
  max-width: 700px;
  margin-top: 20px;
  border-radius: 12px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
`;

const DesktopGallery = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 400px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const MobileImage = styled.img`
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ArrowButton = styled.button<{ $left?: boolean }>`
  position: absolute;
  ${({ $left }) => ($left ? "left: -60px;" : "right: -60px;")}
  top: 50%;
  transform: translateY(-50%);
  background: rgba(123, 30, 37, 0.9);
  color: white;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
  &:hover {
    background: rgb(160, 40, 45);
    transform: translateY(-50%) scale(1.1);
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease-in-out;
  z-index: 999;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 0, 0, 0.7);
  color: white;
  border: none;
  font-size: 20px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`;
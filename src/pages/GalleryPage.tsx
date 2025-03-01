import React, { useState } from "react";
import styled from "styled-components";
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

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <PageWrapper>
      <HeroSection>
        <HeroText>{formatMessage({ id: "gallery.heading" })}</HeroText>
      </HeroSection>
      <GalleryTitle>{formatMessage({ id: "gallery.subheading" })}</GalleryTitle>
      <GalleryContainer>
        <DesktopGallery>
          <ArrowButton onClick={prevImage} $left>
            ⮜
          </ArrowButton>
          <ImageWrapper>
            {images.map((image, index) => {
              const offset = (index - currentIndex + images.length) % images.length;
              return (
                <Image
                  key={index}
                  src={image}
                  style={{
                    transform: `translateX(${offset * 120}px) scale(${index === currentIndex ? 1 : 0.8})`,
                    opacity: index === currentIndex ? 1 : 0.5,
                    zIndex: index === currentIndex ? 2 : 1
                  }}
                />
              );
            })}
          </ImageWrapper>
          <ArrowButton onClick={nextImage}>
            ⮞
          </ArrowButton>
        </DesktopGallery>
        <MobileGallery>
          {images.map((image, index) => (
            <MobileImage key={index} src={image} alt={`Gallery image ${index + 1}`} />
          ))}
        </MobileGallery>
      </GalleryContainer>
    </PageWrapper>
  );
};

export default GalleryPage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-bottom: 50px;
`;

const GalleryTitle = styled.h2`
  margin-top: 20px;
  font-size: 24px;
  color: black;
  text-align: center;
`;

const GalleryContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin-top: 20px;
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
  display: none;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
  }
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

const Image = styled.img`
  position: absolute;
  transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const MobileImage = styled.img`
  width: 100%;
  border-radius: 10px;
  object-fit: contain;
`;

const ArrowButton = styled.button<{ $left?: boolean }>`
  background: rgb(123, 30, 37);
  border: none;
  font-size: 16px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${({ $left }) => ($left ? "left: -60px;" : "right: -60px;")}
  color: white;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, transform 0.2s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  
  &:hover {
    background: rgb(150, 40, 45);
    transform: translateY(-50%) scale(1.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
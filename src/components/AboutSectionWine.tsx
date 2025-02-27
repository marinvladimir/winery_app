import { useIntl } from "react-intl";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Section } from "./TourContent";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const blurLoad = keyframes`
  from { filter: blur(5px); opacity: 0; }
  to { filter: blur(0); opacity: 1; }
`;

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3rem 2rem;
  animation: ${fadeIn} 1s ease-in-out;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const MainImage = styled.img`
  flex: 1;
  max-width: 341px;
  height: 341px;
  border-radius: 2px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease-in-out;
  animation: ${blurLoad} 1s ease-out;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  @media (max-width: 768px) {
    width: auto;
    display: flex;
    flex-direction: column;
  }

  margin-top: 3rem;
  justify-items: center;
  position: relative;
`;

const GalleryItem = styled.div`
  position: relative;
  text-align: center;
  transition: transform 0.3s ease-in-out;

  &:nth-child(odd) {
    transform: translateY(20px);
      @media (max-width: 768px) {
    transform: none;
  }
  }

  &:hover {
    transform: scale(1.05);
  }
`;

const ReflectiveImage = styled.img`
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${blurLoad} 1s ease-out;
  transition: all 0.3s ease-in-out;
  
  &:hover {
    filter: brightness(1.3);
  }
`;



const GalleryTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Playfair Display", serif;
  color: #7b1e25;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

// const GalleryImage = styled.img`
//   width: 100%;
//   max-width: 500px;
//   border-radius: 8px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   transition: transform 0.3s ease-in-out;
//   animation: ${blurLoad} 1s ease-out;

//   @media (max-width: 768px) {
//     max-width: 100%;
//   }
// `;

// const ReflectiveImage = styled.img`
//   position: relative;
//   width: 100%;
//   max-width: 500px;
//   border-radius: 8px;
//   box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
//   animation: ${blurLoad} 1s ease-out;
//   transition: all 0.5s ease-in-out;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 50%;
//     height: 100%;
//     background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
//     transform: skewX(-20deg);
//     transition: left 0.8s ease-in-out;
//   }

//     @media (max-width: 768px) {
//     max-width: 100%;
//   }

//   &:hover::after {
//     left: 120%;
//   }

//   &:hover {
//     filter: brightness(1.5);
//   }
// `;

const AboutSection = () => {
  const { formatMessage } = useIntl();
  const [loaded, setLoaded] = useState(false);

  return (
    <Container>
       <Section>
      <h3 style={{borderBottom: "1px solid",
            padding: "1rem"}}>{formatMessage({ id: "carousel.text3" })}</h3>
            </Section>
      <ImageGallery>
        {[
          { name: "Crljenak", src: "assets/1.jpg" },
          { name: "Trbljan bijeli", src: "assets/2 (1).jpg" },
          { name: "Babica", src: "assets/3.jpg" },
          { name: "Plavac mali", src: "assets/4.jpg" },
        ].map((wine, index) => (
          <GalleryItem key={index}>
            <GalleryTitle>{wine.name}</GalleryTitle>
            <ReflectiveImage src={wine.src} alt={wine.name} />
          </GalleryItem>
        ))}
      </ImageGallery>

      <Content style={{ marginTop: "5rem" }}>
          <Section>
                  <p>{formatMessage({ id: "about.last.section.paragraph1" })}</p>
                  <p>{formatMessage({ id: "about.last.section.paragraph2" })}</p>
                </Section>
               
        <MainImage
          src="assets/fb.jpg"
          alt="Winery"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
      </Content>
    </Container>
  );
};

export default AboutSection;

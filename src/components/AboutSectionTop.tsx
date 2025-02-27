import { useIntl } from "react-intl";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { Section, Separator } from "./TourContent";

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

const Header = styled.h1`
  font-size: 2.5rem;
  font-family: "Playfair Display", serif;
  font-weight: bold;
  color: #7b1e25;
  text-align: center;
  margin-top: 0;
  margin-bottom: 2rem;
  border-bottom: 3px solid #c0a080; 
  display: inline-block;
  padding-bottom: 0.5rem;
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

const TextBlock = styled.div`
  flex: 1;
  font-family: "Cormorant Garamond", serif;
  color: #4a3b3b;
`;

const Para = styled.p`
  font-size: 1rem;
  line-height: 1.8;
  margin-bottom: 1rem;
  color: black;
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
    max-width: 100% !important;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  margin-top: 3rem;
  align-items: center;
`;

const GalleryItem = styled.div`
  text-align: center;
`;

const GalleryTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "Playfair Display", serif;
  color: #7b1e25;
  margin-bottom: 0.5rem;
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

const ReflectiveImage = styled.img`
  position: relative;
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  animation: ${blurLoad} 1s ease-out;
  transition: all 0.5s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    transform: skewX(-20deg);
    transition: left 0.8s ease-in-out;
  }

    @media (max-width: 768px) {
    max-width: 100%;
  }

  &:hover::after {
    left: 120%;
  }

  &:hover {
    filter: brightness(1.5);
  }
`;

const AboutSection = () => {
  const { formatMessage } = useIntl();
  const [loaded, setLoaded] = useState(false);

  return (
    <Container>
      {/* <Header>{formatMessage({ id: "welcome.title" })}</Header> */}
      <Content>
      <Section>
      {/* <Separator /> */}
          <h3 style={{borderBottom: "1px solid",
    padding: "1rem"}}>{formatMessage({ id: "tour.heading1" })}</h3>
          <p>{formatMessage({ id: "about.paragraph1" })}</p>
          <p>{formatMessage({ id: "about.paragraph2" })}</p>
        </Section>
       
        {/* <TextBlock>
          <Para>{formatMessage({ id: "about.paragraph1" })}</Para>
          <Para>{formatMessage({ id: "about.paragraph2" })}</Para>
        </TextBlock> */}
        <MainImage
          src="assets/f4.jpeg"
          alt="Winery"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
      </Content>        
      <Content  style={{marginTop: "32px"}}>
      <MainImage
          style={{maxWidth: "none"}}
          src="assets/f3.jpg"
          alt="Winery"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />

<Section>
      {/* <Separator /> */}
          <p>{formatMessage({ id: "about.paragraph3" })}</p>
        </Section>
 
      </Content>     
    </Container>
  );
};

export default AboutSection;

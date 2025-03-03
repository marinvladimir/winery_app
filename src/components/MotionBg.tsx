
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import AboutSectionWine from "./AboutSectionWine";
import AboutSectionTop from "./AboutSectionTop";
import { useIntl } from "react-intl";
import "leaflet/dist/leaflet.css";
import ContactData from "./ContactData";


export const LanguageButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #0073e6;
`;

gsap.registerPlugin(ScrollTrigger);

const MotionBg: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <PageWrapper>
      <div style={{ background: "black" }}>
        <ImageSection $bgImage="assets/2.jpg">
          <ContentWrapper>
            <Title style={{ color: "white" }}>{formatMessage({ id: "carousel.text2" })}</Title>
          </ContentWrapper>
        </ImageSection>
      </div>
      <ContentSection>
        <MiniContainer>
          <ContentWrapper2>
            <AboutSectionTop />
          </ContentWrapper2>
        </MiniContainer>
      </ContentSection>
      <div style={{ background: "black" }}>
        <ImageSection $bgImage="assets/f2.jpg">
          <ContentWrapper>
            <Title>{formatMessage({ id: "carousel.text1" })}</Title>
            <Description>{formatMessage({ id: "carousel.text11" })}</Description>
          </ContentWrapper>
        </ImageSection>
      </div>
      <ContentSection>
        <MiniContainer>
          <ContentWrapper2>
            <AboutSectionWine />
            <ContactData />
          </ContentWrapper2>
        </MiniContainer>
      </ContentSection>
    </PageWrapper>
  );
};

export default MotionBg;

const MiniContainer = styled.section`
  width: 90%;
  max-width: 1170px;
  margin: 4rem auto;
`;

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: rgb(251 199 45);
  line-height: 1.6;
`;


const ImageSection = styled.section<{ $bgImage: string }>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 4rem 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #040219 !important;
  background-image: url(${(props) => props.$bgImage});
  filter: brightness(0.75);
  transition: transform 0.5s ease-in-out, filter 0.5s ease-in-out;

  &:hover {
    filter: brightness(1.1);
    transform: scale(1.05);
        @media (max-width: 768px) {
 transform: scale(1.1);
  }
    }

  @media (max-width: 768px) {
    min-height: 50vh;
    background-position: top;
  }
`;

const ContentSection = styled.section`
  background: white;
  color: black;
  padding: 0;
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
  line-height: 1.6;
`;

const ContentWrapper2 = styled.div`
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 1rem;
  color: rgb(251 199 45);
  
  @media (max-width: 900px) {
    font-size: 1.75rem; 
  }

  @media (max-width: 480px) {
    font-size: 1.25rem; 
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  gap: 2rem;
  padding: 0 1rem; 

  @media (max-width: 900px) {
    text-align: center; 
    padding: 0 1rem; 
  }

  @media (max-width: 480px) {
    padding: 0 0.5rem; 
  }
`;
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
    max-width: 100% !important;
  }
`;

const AboutSection = () => {
  const { formatMessage } = useIntl();
  const [loaded, setLoaded] = useState(false);

  return (
    <Container>
      <Content>
        <Section>
          <h3 style={{
            borderBottom: "1px solid",
            padding: "1rem"
          }}>{formatMessage({ id: "welcome.title" })}</h3>
          <p>{formatMessage({ id: "about.paragraph1" })}</p>
          <p>{formatMessage({ id: "about.paragraph2" })}</p>
        </Section>
        <MainImage
          src="assets/f4.jpeg"
          alt="Winery"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
      </Content>
      <Content style={{ marginTop: "32px" }}>
        <MainImage
          style={{ maxWidth: "none" }}
          src="assets/f3.jpg"
          alt="Winery"
          className={loaded ? "loaded" : ""}
          onLoad={() => setLoaded(true)}
        />
        <Section>
          <p>{formatMessage({ id: "about.paragraph3" })}</p>
        </Section>

      </Content>
    </Container>
  );
};

export default AboutSection;

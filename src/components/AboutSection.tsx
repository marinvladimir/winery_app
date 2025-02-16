import { useIntl } from "react-intl";
import styled from "styled-components";

const Container = styled.section`
  width: 90%;
  max-width: 756px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextBlock = styled.div`
  flex: 1;
`;

const MainImage = styled.img`
  flex: 1;
  max-width: 341px;
  height: 341px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ImageGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;
  align-items: flex-start; 
`;


const GalleryImage = styled.img`
  width: 100%;
  max-width: 500px;
  align-self: flex-start; 

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;


const Header = styled.h1`
   font-size: 2.2rem;
   margin:0;
    margin-bottom: 2rem;
    font-weight: 100;
  `

const Para = styled.p`
  font-size: 0.75rem;
    line-height: 1.6;
`


const AboutSection = () => {
  const { formatMessage } = useIntl()

  return (
    <Container>
      <div style={{ width: '100%' }}>
        <Header>
          {formatMessage({ id: "welcome.title" })}</Header></div>
      <Content>
        <TextBlock>
          <Para style={{ margin: '0' }}>
            {formatMessage({ id: "about.paragraph1" })}
          </Para>
          <Para>
            {formatMessage({ id: "about.paragraph2" })}
          </Para>
          <Para>
            {formatMessage({ id: "about.paragraph3" })}
          </Para>
        </TextBlock>
        <MainImage src="assets/pk.jpg" alt="Winery" />
      </Content>

      <ImageGallery>
        <div>Crljenak</div>
        <GalleryImage src="assets/1.jpg" alt="Wine 1" />
        <div>Fabljan bijeli</div>
        <GalleryImage src="assets/2 (1).jpg" alt="Wine 2" />
        <div>Babica</div>
        <GalleryImage src="assets/3.jpg" alt="Wine 3" />
        <div>Plavac mali</div>
        <GalleryImage src="assets/4.jpg" alt="Wine 4" />
      </ImageGallery>

      <Content style={{ marginTop: '2rem' }}>
        <TextBlock>
          <Para style={{ margin: '0' }}>
            {formatMessage({ id: "about.last.section.paragraph1" })}</Para>
          <Para>
            {formatMessage({ id: "about.last.section.paragraph2" })}</Para>
        </TextBlock>
        <MainImage src="assets/fb.jpg" alt="Winery" />
      </Content>
    </Container>
  );
};

export default AboutSection;

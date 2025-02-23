import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { useIntl } from "react-intl";
import WineScene from "../components/WineScene";
import Carousel from "../components/Carousel";

const GalleryPage: React.FC = () => {
  const { formatMessage } = useIntl();

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    adaptiveHeight: false, 
  };

  return (
    <PageWrapper>
      <ContentWrapper>
        <Carousel />
        <SliderContainer>
          <StyledSlider {...settings}>
            {Array.from({ length: 9 }, (_, i) => (
              <Slide key={i}>
                <img src={`assets/w${i + 1}.jpeg`} alt={`Gallery ${i + 1}`} />
              </Slide>
            ))}
          </StyledSlider>
        </SliderContainer>
      </ContentWrapper>
      <Footer>
        <FooterContent>
          <div>
            <FooterText>
              Marina Studina 59
              <br />
              21217 Kaštel Novi
            </FooterText>

            <Spacer />

            <FooterText>
              Anita Kuzmanić
              <br />
              098 9932 710
              <br />
              anita_kuzmanic@yahoo.com
            </FooterText>

            <Separator />

            <FooterText>{formatMessage({ id: "footer.text" })}</FooterText>
          </div>
          <div>
            <WineScene />
          </div>
        </FooterContent>
      </Footer>
    </PageWrapper>
  );
};

export default GalleryPage;

const ContentWrapper = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
`;

const Separator = styled.div`
  width: 100px;
  height: 3px;
  background: #8a2c2c;
  margin: 10px auto;
  border-radius: 2px;
`;

const SliderContainer = styled.div`
  width: 90%;
  max-width: 900px;
  margin: 20px auto;
`;

const StyledSlider = styled(Slider)`
  .slick-prev,
  .slick-next {
    display: none !important;
  }
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 500px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    position: relative;
    z-index: 2; 
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    filter: blur(20px);
    opacity: 0.4; 
    z-index: 1;
  }
`;


const Footer = styled.footer`
  background-color: #1b1b1b;
  padding: 20px 0;
  width: 100%;
  position: relative;
  margin-top: auto;
`;

const FooterContent = styled.div`
  width: 90%;
  max-width: 1170px;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const FooterText = styled.p`
  margin: 10px 0;
  line-height: 1.5rem;
  color: #979797;
  text-align: left;
`;

const Spacer = styled.div`
  height: 20px;
`;

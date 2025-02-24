import React from "react";
import { useIntl } from "react-intl";
import Slider from "react-slick";
import styled from "styled-components";

const TourContent: React.FC = () => {
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
      <>
      <Header>{formatMessage({ id: "tour.start" })}</Header>
      <SliderContainer>
                <StyledSlider {...settings}>
            {Array.from({ length: 9 }, (_, i) => (
              <Slide key={i}>
                <img src={`assets/w${i + 1}.jpeg`} alt={`Gallery ${i + 1}`} />
              </Slide>
            ))}
          </StyledSlider>
          </SliderContainer>

        <TourWrapper>
            <Separator />
            <Section>
                <h3>{formatMessage({ id: "tour.heading1" })}</h3>
                <p>{formatMessage({ id: "tour.para1" })}</p>
            </Section>
            <Separator />
            <Section>
                <h3>{formatMessage({ id: "tour.heading2" })}</h3>
                <p>{formatMessage({ id: "tour.para2" })}</p>
            </Section>
            <Separator />
            <Section>
                <h3>{formatMessage({ id: "tour.heading3" })}</h3>
                <p>{formatMessage({ id: "tour.para3" })}</p>
            </Section>
            <Details>
                <DetailsContent>
                    <h3>{formatMessage({ id: "tour.label" })}</h3>
                    <p>
                        <strong>{formatMessage({ id: "tour.details1" })}</strong> {formatMessage({ id: "tour.details2" })}
                    </p>
                    <p>
                        <strong>{formatMessage({ id: "tour.details3" })}</strong>{formatMessage({ id: "tour.details4" })}
                    </p>
                    <p>
                        <strong>{formatMessage({ id: "tour.details11" })}</strong>{formatMessage({ id: "tour.details12" })}
                    </p>
                    <p>
                        <strong>{formatMessage({ id: "tour.details13" })}</strong>{formatMessage({ id: "tour.details14" })}
                    </p>
                </DetailsContent>

                <PriceTag>€50</PriceTag>
            </Details>
            <ClosingText>{formatMessage({ id: "tour.end" })}</ClosingText>
            <VisitCard>
                <h2>{formatMessage({ id: "tour.info" })}</h2>
                <p>Ulica Marina Studina 59, Kaštel Novi</p>
                <a href="mailto:anita_kuzmanic@yahoo.com">📧 anita_kuzmanic@yahoo.com</a>
                <p>{formatMessage({ id: "tour.info2" })}</p>
                <a href="tel:+385989932710">📞 +385 (0)98 993 2710</a>
                <a href="http://vinaantekuzmanic.com/" target="_blank" rel="noopener noreferrer">
                    🌍 vinaantekuzmanic.com
                </a>
            </VisitCard>
        </TourWrapper>      </>
    );
};

export default TourContent;


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


const VisitCard = styled.div`
  background: url(/assets/paper-texture.jpg) no-repeat center, #f5e8d9;
  border: 2px solid #5a1f1f;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 400px;
  margin: 40px auto 0;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  transform: rotate(-2deg);
  font-family: "Georgia", serif;
  margin-bottom: 32px;

  h2 {
    font-size: 22px;
    color: #5a1f1f;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 18px !important;
  }
  }

  p {
    font-size: 18px;
    color: #333;
    margin: 5px 0;

      @media (max-width: 768px) {
    font-size: 14px !important;
  }
  }

  a {
    display: block;
   font-size: 18px;
    color: #5a1f1f;
    font-weight: bold;
    text-decoration: none;
    margin-top: 5px;

      @media (max-width: 768px) {
    font-size: 14px !important;
  }

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = styled.h2`
  background-image: url(/assets/wooden.jpg);
  background-size: cover;
  background-position: center;
  color: #f5e8d9;
  margin: 0;
  margin-top: 16px;
  padding: 23px;
  text-align: center;
  font-family: "Playfair Display", serif;
  box-shadow: inset 0px -5px 8px rgba(0, 0, 0, 0.3);
`

const Separator = styled.div`
  width: 100px;
  height: 3px;
  background: #8a2c2c;
  margin: 10px auto;
  border-radius: 2px;
`;

const TourWrapper = styled.div`
  max-width: 800px;
  text-align: center;
  padding:  0 40px;
  line-height: 1.6;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 22px;
    color: #8a2c2c;
    font-family: "Georgia", serif;
  }

  p {
    font-size: 18px;
    color: #333;
    font-family: "Merriweather", serif;
  }
`;

const Details = styled.div`
  position: relative;
  background: linear-gradient(rgb(255 255 255 / 70%), rgba(0, 0, 0, 0.5)), url(/assets/wn2.png);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 40px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 3px solid #8a2c2c;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const DetailsContent = styled.div`
  background: rgb(255 255 255 / 79%);
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  max-width: 500px;

  h3 {
    font-size: 24px;
    color: #6e1b1b;
    font-family: "Georgia", serif;
    border-bottom: 2px solid #6e1b1b;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    color: #442222;
    font-family: "Merriweather", serif;
  }
`;

const PriceTag = styled.div`
  position: absolute;
  bottom: -15px;
  right: 20px;
  background: #8a2c2c;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  transform: rotate(-10deg);
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.3);
  font-family: "Georgia", serif;

  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: -10px;
    width: 15px;
    height: 15px;
    background: #fff;
    border-radius: 50%;
    transform: translateY(-50%);
  }
`;

const ClosingText = styled.p`
  margin-top: 30px;
  font-size: 18px;
  font-weight: 600;
  color: #8a2c2c;
  font-family: "Georgia", serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;


import React from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";

const TourContent: React.FC = () => {
    const { formatMessage } = useIntl();

    return (
        <TourWrapper>
            <Header>{formatMessage({ id: "tour.start" })}</Header>
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
        </TourWrapper>
    );
};

export default TourContent;

const Header = styled.h2`
  background-image: url(/assets/wooden.jpg);
  color: #bdbdbd;
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
  padding: 40px;
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

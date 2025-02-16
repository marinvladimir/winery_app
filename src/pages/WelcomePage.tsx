import React from "react";
import Carousel from "../components/Carousel";
import styled from "styled-components";
import AboutPage from "./AboutPage";
import { useIntl } from "react-intl";
import WineScene from "../components/WineScene";

const WelcomePage: React.FC = () => {
    const { formatMessage } = useIntl();
  return (
    <PageWrapper>
      <ContentWrapper>
        <Carousel />
        <AboutPage />
      </ContentWrapper>
      <Footer>
        <FooterContent>
          <div>
          <FooterText>
            {/* Apartman Kuzmanić
            <br /> */}
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
          <div>          <WineScene/></div>
        </FooterContent>
      </Footer>
    </PageWrapper>
  );
};

export default WelcomePage;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: hidden;
`;

const Footer = styled.footer`
  background-color: #1b1b1b;
  padding: 20px;
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

const Separator = styled.hr`
  border: 0;
  height: 1px;
  background: #4b4b4b;
  width: 100%;
  margin: 16px 0;
`;

import React from "react";
import styled from "styled-components";
import { useIntl } from "react-intl";
import WineScene from "./WineScene";

const Footer: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <FooterWrapper>
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
            vinarija.kuzmanic@gmail.com
          </FooterText>
          <Separator />
          <FooterText>{formatMessage({ id: "footer.text" })}</FooterText>
        </div>
        <div>
          <WineScene />
        </div>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
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
  align-items: center; 
  gap: 20px; 

  @media (max-width: 768px) {
    flex-direction: column; 
    text-align: center; 
    gap: 10px; 
  }
`;

const FooterText = styled.div`
  margin: 10px 0;
  line-height: 1.5rem;
  color: #979797;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center; 
    font-size: 14px; 
  }
`;

const Spacer = styled.div`
  height: 20px;

  @media (max-width: 768px) {
    height: 10px;
  }
`;

const Separator = styled.hr`
  border: 0;
  height: 1px;
  background: #4b4b4b;
  width: 100%;
  margin: 16px 0;

  @media (max-width: 768px) {
    margin: 10px 0; 
  }
`;

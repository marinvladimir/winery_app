import React from "react";
import styled from "styled-components";
import AboutPage from "./AboutPage";

const WelcomePage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <AboutPage />
      </ContentWrapper>
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
import React from "react";
import styled from "styled-components";
import TourContent from "../components/TourContent";

const TourPage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
        <TourContent />
      </ContentWrapper>
    </PageWrapper>
  );
};

export default TourPage;

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
import React from "react";
import styled from "styled-components";

const GalleryPage: React.FC = () => {



  return (
    <PageWrapper>
      <ContentWrapper>
      </ContentWrapper>
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

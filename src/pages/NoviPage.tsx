import React from "react";
import styled from "styled-components";

const NoviPage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentWrapper>
      </ContentWrapper>
    </PageWrapper>
  );
};

export default NoviPage;

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
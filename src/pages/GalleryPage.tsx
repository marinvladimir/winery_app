import React from "react";
import styled from "styled-components";
import { HeroSection, HeroText } from "../components/TourContent";
import { useIntl } from "react-intl";

const GalleryPage: React.FC = () => {
  const { formatMessage } = useIntl();

  return (
    <PageWrapper>
      <ContentWrapper>
        <HeroSection>
          <HeroText>{formatMessage({ id: "gallery.heading" })}</HeroText>
        </HeroSection>
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
  // overflow-x: hidden;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
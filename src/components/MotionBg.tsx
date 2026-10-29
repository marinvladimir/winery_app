import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useIntl } from "react-intl";
import AboutSectionTop from "./AboutSectionTop";
import AboutSectionWine from "./AboutSectionWine";
import ContactData from "./ContactData";
import PageHero from "./PageHero";
import { ArrowRightIcon } from "./Icons";
import { buttonGhostLight, buttonPrimary } from "./ui";

const MotionBg: React.FC = () => {
  const { formatMessage } = useIntl();

  const scrollToContact = () => {
    const contact = document.getElementById("contact");
    contact?.scrollIntoView({ behavior: "smooth", block: "start" });
    contact?.focus({ preventScroll: true });
  };

  return (
    <>
      <PageHero
        image="assets/2.jpg"
        eyebrow={formatMessage({ id: "home.hero.eyebrow" })}
        title={formatMessage({ id: "carousel.text2" })}
        subtitle={formatMessage({ id: "home.hero.subtitle" })}
      >
        <PrimaryLink to="/tour">
          {formatMessage({ id: "home.hero.cta.tour" })}
          <ArrowRightIcon size={18} />
        </PrimaryLink>
        <GhostButton type="button" onClick={scrollToContact}>
          {formatMessage({ id: "home.hero.cta.contact" })}
        </GhostButton>
      </PageHero>

      <AboutSectionTop />

      <PageHero
        image="assets/f2.jpg"
        headingLevel="h2"
        size="medium"
        eyebrow={formatMessage({ id: "home.band.eyebrow" })}
        title={formatMessage({ id: "carousel.text1" })}
        subtitle={formatMessage({ id: "carousel.text11" })}
      />

      <AboutSectionWine />
      <ContactData />
    </>
  );
};

export default MotionBg;

const PrimaryLink = styled(Link)`
  ${buttonPrimary};
`;

const GhostButton = styled.button`
  ${buttonGhostLight};
`;

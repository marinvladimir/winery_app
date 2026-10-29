import React, { lazy, useRef } from "react";
import { useIntl } from "react-intl";
import Slider, { Settings } from "react-slick";
import styled from "styled-components";
import { motion, useScroll, useSpring } from "framer-motion";
import Ornament from "./decor/Ornament";
import VineFlourish from "./decor/VineFlourish";
import WineDrip from "./decor/WineDrip";
import Reveal from "./Reveal";
import { fadeUp, fadeUpDelayed, inViewProps, staggerContainer } from "./motionVariants";
import { CONTACT } from "../data/contact";
import { TOUR_PHOTOS } from "../data/photos";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import DeferredScene from "./DeferredScene";
import PageHero from "./PageHero";
import { ClockIcon, GlobeIcon, MailIcon, PhoneIcon, TagIcon, UserIcon, UsersIcon } from "./Icons";
import {
  buttonOutline,
  buttonPrimary,
  Container,
  CornerFlourish,
  Eyebrow,
  Section,
  SectionHeader,
  SectionTitle,
} from "./ui";

const BarrelScene = lazy(() => import("./Barrel"));

const STEPS = [
  { headingId: "tour.heading1", textId: "tour.para1" },
  { headingId: "tour.heading2", textId: "tour.para2" },
  { headingId: "tour.heading3", textId: "tour.para3" },
];

const DETAILS = [
  { icon: UserIcon, labelId: "tour.details1", valueId: "tour.details2" },
  { icon: ClockIcon, labelId: "tour.details3", valueId: "tour.details4" },
  { icon: TagIcon, labelId: "tour.details11", valueId: "tour.details12" },
  { icon: UsersIcon, labelId: "tour.details13", valueId: "tour.details14" },
];

const TourContent: React.FC = () => {
  const { formatMessage } = useIntl();
  const reducedMotion = usePrefersReducedMotion();
  const stepsRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: stepsRef, offset: ["start 75%", "end 60%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const sliderSettings: Settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: !reducedMotion,
    autoplaySpeed: 4500,
    pauseOnHover: true,
    pauseOnFocus: true,
    pauseOnDotsHover: true,
    beforeChange: () => {
      // Slick hides inactive slides with aria-hidden; drop focus only if it sits on one.
      const active = document.activeElement;
      if (active instanceof HTMLElement && active.closest(".slick-slide")) active.blur();
    },
    customPaging: (i: number) => (
      <button type="button" aria-label={formatMessage({ id: "tour.slide" }, { n: i + 1, total: TOUR_PHOTOS.length })}>
        {i + 1}
      </button>
    ),
  };

  return (
    <>
      <PageHero
        image="assets/w4.jpeg"
        position="center 40%"
        eyebrow={formatMessage({ id: "tour.eyebrow" })}
        title={formatMessage({ id: "tour.start" })}
        subtitle={formatMessage({ id: "tour.subtitle" })}
        scrollCue
      />

      <Section aria-labelledby="tour-program-title">
        <CornerFlourish $side="left">
          <VineFlourish />
        </CornerFlourish>
        <Container $narrow>
          <SliderFrame
            aria-roledescription="carousel"
            aria-label={formatMessage({ id: "tour.photos" })}
            {...inViewProps}
            variants={fadeUp}
          >
            <Slider {...sliderSettings}>
              {TOUR_PHOTOS.map((photo) => (
                <Slide key={photo.src}>
                  <img
                    src={photo.src}
                    alt={formatMessage({ id: photo.altId })}
                    loading="lazy"
                    decoding="async"
                  />
                </Slide>
              ))}
            </Slider>
          </SliderFrame>

          <DeferredScene width={280} height={260}>
            <BarrelScene />
          </DeferredScene>

          <SectionHeader>
            <Reveal>
              <Eyebrow>{formatMessage({ id: "tour.program.eyebrow" })}</Eyebrow>
              <SectionTitle id="tour-program-title">{formatMessage({ id: "tour.program.title" })}</SectionTitle>
            </Reveal>
            <Ornament />
          </SectionHeader>

          <Steps ref={stepsRef}>
            <StepsLine style={{ scaleY: lineProgress }} aria-hidden="true" />
            {STEPS.map((step, index) => (
              <Step key={step.headingId} {...inViewProps} variants={fadeUp}>
                <StepNumber
                  aria-hidden="true"
                  initial={{ scale: 0.4, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "0px 0px -80px 0px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                >
                  {index + 1}
                </StepNumber>
                <div>
                  <h3>{formatMessage({ id: step.headingId })}</h3>
                  <p>{formatMessage({ id: step.textId })}</p>
                </div>
              </Step>
            ))}
          </Steps>
        </Container>
      </Section>

      <Section $tone="cream" aria-labelledby="tour-info-title">
        <Container $narrow>
          <DetailsCard {...inViewProps} variants={fadeUp}>
            <h2 id="tour-info-title">{formatMessage({ id: "tour.label" })}</h2>
            <DetailsList {...inViewProps} variants={staggerContainer(0.1, 0.2)}>
              {DETAILS.map(({ icon: Icon, labelId, valueId }) => (
                <motion.div key={labelId} variants={fadeUpDelayed(0, 16)}>
                  <DetailIcon>
                    <Icon size={22} />
                  </DetailIcon>
                  <dt>{formatMessage({ id: labelId })}</dt>
                  <dd>{formatMessage({ id: valueId })}</dd>
                </motion.div>
              ))}
            </DetailsList>
          </DetailsCard>

          <ClosingText {...inViewProps} variants={fadeUp}>
            {formatMessage({ id: "tour.end" })}
          </ClosingText>

          <VisitCard
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src="assets/logo.png" alt="" width={72} height={72} loading="lazy" />
            <h2>{formatMessage({ id: "tour.info" })}</h2>
            <p>
              {CONTACT.street}, {CONTACT.city}
              <br />
              {formatMessage({ id: "tour.info2" })}
            </p>
            <VisitActions>
              <PrimaryAnchor href={CONTACT.phoneHref}>
                <PhoneIcon size={18} />
                {CONTACT.phoneDisplay}
              </PrimaryAnchor>
              <OutlineAnchor href={`mailto:${CONTACT.email}`}>
                <MailIcon size={18} />
                {formatMessage({ id: "tour.email" })}
              </OutlineAnchor>
            </VisitActions>
            <WebsiteLink href={CONTACT.website} target="_blank" rel="noopener noreferrer">
              <GlobeIcon size={16} />
              {CONTACT.websiteDisplay}
            </WebsiteLink>
            <CardDrip />
          </VisitCard>
        </Container>
      </Section>
    </>
  );
};

export default TourContent;

const SliderFrame = styled(motion.div)`
  margin-bottom: 1rem;

  .slick-slide > div {
    line-height: 0;
  }

  .slick-list {
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
  }

  /* Gentle Ken Burns drift on the visible slide. */
  .slick-slide img {
    transition: transform 6s ease-out;
  }

  .slick-active img {
    transform: scale(1.06);
  }
`;

const Slide = styled.div`
  overflow: hidden;

  img {
    width: 100%;
    aspect-ratio: 16 / 10;
    object-fit: cover;
  }
`;

const Steps = styled.ol`
  position: relative;
  display: grid;
  gap: 2.5rem;
  margin: 0;
  padding: 0;
  list-style: none;

  &::before {
    content: "";
    position: absolute;
    top: 8px;
    bottom: 8px;
    left: 23px;
    width: 1px;
    background: var(--line);
  }
`;

const StepsLine = styled(motion.span)`
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: 22px;
  width: 3px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--gold), var(--wine-700));
  transform-origin: top;
`;

const Step = styled(motion.li)`
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 1.5rem;

  h3 {
    margin: 0.5rem 0 0.75rem;
    font-size: 1.5rem;
    color: var(--wine-700);
  }

  p {
    margin: 0;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const StepNumber = styled(motion.span)`
  position: relative;
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--wine-700);
  color: var(--white);
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  box-shadow: 0 0 0 6px var(--white);
`;

const DetailsCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  padding: clamp(1.75rem, 4vw, 3rem);
  border-radius: var(--radius);
  background: var(--white);
  border: 1px solid var(--line);
  box-shadow: var(--shadow-md);

  &::after {
    content: "";
    position: absolute;
    top: -24px;
    right: -24px;
    width: 150px;
    height: 150px;
    background: url("assets/wn2.png") no-repeat center / contain;
    opacity: 0.22;
    pointer-events: none;

    @media (max-width: 640px) {
      display: none;
    }
  }

  h2 {
    position: relative;
    font-size: clamp(1.625rem, 3vw, 2rem);
    margin-bottom: 2rem;
  }
`;

const DetailsList = styled(motion.dl)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.75rem 2rem;
  margin: 0;

  > div {
    display: grid;
    grid-template-columns: 44px 1fr;
    grid-template-rows: auto 1fr;
    column-gap: 1rem;
    align-items: start;
  }

  dt {
    grid-column: 2;
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--wine-600);
  }

  dd {
    grid-column: 2;
    margin: 0.25rem 0 0;
    color: var(--ink);
    line-height: 1.55;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const DetailIcon = styled.span`
  grid-row: span 2;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--cream);
  color: var(--wine-700);
`;

const ClosingText = styled(motion.p)`
  max-width: 640px;
  margin: clamp(3rem, 6vw, 4.5rem) auto;
  text-align: center;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-style: italic;
  line-height: 1.6;
  color: var(--wine-900);

  &::before,
  &::after {
    color: var(--gold);
  }

  &::before {
    content: "“";
  }

  &::after {
    content: "”";
  }
`;

// Overlaps the card so the liquid band blends into it instead of forming a ledge.
const CardDrip = styled(WineDrip)`
  top: calc(100% - 16px);
  left: 14px;
  right: 14px;
  height: clamp(60px, 7vw, 100px);
`;

const VisitCard = styled(motion.div)`
  position: relative;
  max-width: 520px;
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 2.75rem);
  border-radius: var(--radius);
  background: var(--wine-900);
  color: rgba(255, 255, 255, 0.85);
  text-align: center;
  box-shadow: var(--shadow-lg);

  img {
    margin: 0 auto 1.25rem;
    border-radius: 8px;
  }

  h2 {
    font-size: 1.625rem;
    color: var(--white);
  }

  p {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const VisitActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin: 1.5rem 0 1.25rem;
`;

const PrimaryAnchor = styled.a`
  ${buttonPrimary};
  background: var(--gold-light);
  color: var(--wine-950);

  &:hover {
    background: var(--white);
    color: var(--wine-950);
  }
`;

const OutlineAnchor = styled.a`
  ${buttonOutline};
  border-color: rgba(255, 255, 255, 0.6);
  color: var(--white);

  &:hover {
    background: var(--white);
    color: var(--wine-900);
  }
`;

const WebsiteLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  color: var(--gold-light);
  text-decoration: none;

  &:hover {
    color: var(--white);
    text-decoration: underline;
  }
`;

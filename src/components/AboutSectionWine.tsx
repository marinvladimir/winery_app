import { lazy } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { motion } from "framer-motion";
import DeferredScene from "./DeferredScene";
import Reveal, { RevealItem } from "./Reveal";
import RevealImage from "./RevealImage";
import { fadeUp, inViewProps, staggerContainer } from "./motionVariants";
import {
  Container,
  Divider,
  Eyebrow,
  MediaFrame,
  Section,
  SectionHeader,
  SectionTitle,
} from "./ui";

const WineAndWood = lazy(() => import("./WineAndWood"));

// Quality classes as printed on the labels.
const WINES = [
  { name: "Crljenak", src: "assets/1.jpg", typeId: "wine.type.red", classId: "wine.class.premium" },
  { name: "Trbljan bijeli", src: "assets/2 (1).jpg", typeId: "wine.type.white", classId: "wine.class.quality" },
  { name: "Babica", src: "assets/3.jpg", typeId: "wine.type.red", classId: "wine.class.quality" },
  { name: "Plavac mali", src: "assets/4.jpg", typeId: "wine.type.red", classId: "wine.class.quality" },
];

const AboutSectionWine = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Section $tone="cream" aria-labelledby="wines-title">
        <Container>
          <SectionHeader>
            <Reveal>
              <Eyebrow>{formatMessage({ id: "wine.eyebrow" })}</Eyebrow>
              <SectionTitle id="wines-title">{formatMessage({ id: "carousel.text3" })}</SectionTitle>
            </Reveal>
            <Divider />
            <Reveal delay={0.15}>
              <p>{formatMessage({ id: "wine.intro" })}</p>
            </Reveal>
          </SectionHeader>

          <WineGrid {...inViewProps} variants={staggerContainer(0.12)}>
            {WINES.map((wine) => (
              <WineCard key={wine.name} variants={fadeUp}>
                <WineImage>
                  <Badge $premium={wine.classId === "wine.class.premium"}>
                    {formatMessage({ id: wine.classId })}
                  </Badge>
                  <img
                    src={wine.src}
                    alt={formatMessage({ id: "wine.alt" }, { name: wine.name })}
                    width={500}
                    height={750}
                    loading="lazy"
                    decoding="async"
                  />
                </WineImage>
                <WineInfo>
                  <h3>{wine.name}</h3>
                  <span>{formatMessage({ id: wine.typeId })}</span>
                </WineInfo>
              </WineCard>
            ))}
          </WineGrid>
        </Container>
      </Section>

      <Section aria-labelledby="stay-title">
        <Container>
          <StayRow>
            <Reveal stagger={0.1}>
              <DeferredScene width={280} height={220} align="start">
                <WineAndWood />
              </DeferredScene>
              <RevealItem>
                <Eyebrow>{formatMessage({ id: "stay.eyebrow" })}</Eyebrow>
                <SectionTitle id="stay-title">{formatMessage({ id: "stay.title" })}</SectionTitle>
              </RevealItem>
              <Divider />
              <RevealItem>
                <p>{formatMessage({ id: "about.last.section.paragraph1" })}</p>
              </RevealItem>
              <RevealItem>
                <p>{formatMessage({ id: "about.last.section.paragraph2" })}</p>
              </RevealItem>
            </Reveal>
            <MediaFrame $ratio="3 / 2">
              <RevealImage src="assets/fb.jpg" alt={formatMessage({ id: "photo.fb" })} />
            </MediaFrame>
          </StayRow>
        </Container>
      </Section>
    </>
  );
};

export default AboutSectionWine;

const WineGrid = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const WineCard = styled(motion.li)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.4s ease, translate 0.4s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    translate: 0 -8px;
    box-shadow: var(--shadow-lg);
  }
`;

const WineImage = styled.div`
  position: relative;
  overflow: hidden;
  background: #121018;

  /* Light sweep across the bottle on hover. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 35%,
      rgba(255, 255, 255, 0.16) 50%,
      transparent 65%
    );
    transform: translateX(-100%);
    transition: transform 0.9s ease;
    pointer-events: none;
  }

  ${WineCard}:hover &::after {
    transform: translateX(100%);
  }

  img {
    width: 100%;
    height: auto;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  ${WineCard}:hover & img {
    transform: scale(1.04);
  }
`;

const Badge = styled.span<{ $premium: boolean }>`
  position: absolute;
  z-index: 1;
  top: 12px;
  left: 12px;
  padding: 0.3rem 0.65rem;
  border-radius: 999px;
  background: ${({ $premium }) => ($premium ? "var(--gold-light)" : "rgba(255, 255, 255, 0.14)")};
  color: ${({ $premium }) => ($premium ? "var(--wine-950)" : "rgba(255, 255, 255, 0.9)")};
  border: 1px solid ${({ $premium }) => ($premium ? "transparent" : "rgba(255, 255, 255, 0.25)")};
  backdrop-filter: blur(6px);
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  @media (max-width: 480px) {
    top: 8px;
    left: 8px;
    font-size: 0.625rem;
    letter-spacing: 0.04em;
  }
`;

const WineInfo = styled.div`
  padding: 1rem 1.25rem 1.25rem;
  text-align: center;

  h3 {
    margin: 0 0 0.25rem;
    font-size: clamp(1.0625rem, 2vw, 1.375rem);
    color: var(--wine-700);
  }

  span {
    font-family: var(--font-ui);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--muted);
  }
`;

const StayRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

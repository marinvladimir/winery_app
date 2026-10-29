import { lazy } from "react";
import { useIntl } from "react-intl";
import styled from "styled-components";
import DeferredScene from "./DeferredScene";
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

const WINES = [
  { name: "Crljenak", src: "assets/1.jpg", typeId: "wine.type.red" },
  { name: "Trbljan bijeli", src: "assets/2 (1).jpg", typeId: "wine.type.white" },
  { name: "Babica", src: "assets/3.jpg", typeId: "wine.type.red" },
  { name: "Plavac mali", src: "assets/4.jpg", typeId: "wine.type.red" },
];

const AboutSectionWine = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <Section $tone="cream" aria-labelledby="wines-title">
        <Container>
          <SectionHeader>
            <Eyebrow>{formatMessage({ id: "wine.eyebrow" })}</Eyebrow>
            <SectionTitle id="wines-title">{formatMessage({ id: "carousel.text3" })}</SectionTitle>
            <Divider />
            <p>{formatMessage({ id: "wine.intro" })}</p>
          </SectionHeader>

          <WineGrid>
            {WINES.map((wine) => (
              <WineCard key={wine.name}>
                <WineImage>
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
            <div>
              <DeferredScene width={280} height={220} align="start">
                <WineAndWood />
              </DeferredScene>
              <Eyebrow>{formatMessage({ id: "stay.eyebrow" })}</Eyebrow>
              <SectionTitle id="stay-title">{formatMessage({ id: "stay.title" })}</SectionTitle>
              <Divider />
              <p>{formatMessage({ id: "about.last.section.paragraph1" })}</p>
              <p>{formatMessage({ id: "about.last.section.paragraph2" })}</p>
            </div>
            <MediaFrame $ratio="3 / 2">
              <img
                src="assets/fb.jpg"
                alt={formatMessage({ id: "photo.fb" })}
                loading="lazy"
                decoding="async"
              />
            </MediaFrame>
          </StayRow>
        </Container>
      </Section>
    </>
  );
};

export default AboutSectionWine;

const WineGrid = styled.ul`
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

const WineCard = styled.li`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow-sm);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);
  }
`;

const WineImage = styled.div`
  overflow: hidden;
  background: #121018;

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

import { useIntl } from "react-intl";
import styled from "styled-components";
import Reveal, { RevealItem } from "./Reveal";
import RevealImage from "./RevealImage";
import VineFlourish from "./decor/VineFlourish";
import { Container, Divider, Eyebrow, Lead, MediaFrame, Section, SectionTitle } from "./ui";

const AboutSectionTop = () => {
  const { formatMessage } = useIntl();

  return (
    <Section aria-labelledby="about-title">
      <Container>
        <Row>
          <Text stagger={0.1}>
            <RevealItem>
              <Eyebrow>{formatMessage({ id: "about.eyebrow" })}</Eyebrow>
              <SectionTitle id="about-title">{formatMessage({ id: "welcome.title" })}</SectionTitle>
            </RevealItem>
            <Divider />
            <RevealItem>
              <Lead>{formatMessage({ id: "about.paragraph1" })}</Lead>
            </RevealItem>
            <RevealItem>
              <p>{formatMessage({ id: "about.paragraph2" })}</p>
            </RevealItem>
          </Text>
          <MediaFrame $ratio="4 / 3">
            <RevealImage src="assets/f4.jpeg" alt={formatMessage({ id: "photo.f4" })} />
          </MediaFrame>
        </Row>

        <Row $reverse>
          <Text>
            <Quote>{formatMessage({ id: "about.paragraph3" })}</Quote>
            <QuoteVine>
              <VineFlourish />
            </QuoteVine>
          </Text>
          <MediaFrame $ratio="3 / 2" $offset="left">
            <RevealImage src="assets/f3.jpg" alt={formatMessage({ id: "photo.f3" })} />
          </MediaFrame>
        </Row>
      </Container>
    </Section>
  );
};

export default AboutSectionTop;

const Row = styled.div<{ $reverse?: boolean }>`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);

  & + & {
    margin-top: clamp(4rem, 8vw, 6rem);
  }

  ${({ $reverse }) =>
    $reverse &&
    `
    grid-template-columns: 1fr 1.1fr;
    & > :first-child { order: 2; }
  `}

  @media (max-width: 860px) {
    grid-template-columns: 1fr;

    & > :first-child {
      order: 0;
    }
  }
`;

const Text = styled(Reveal)`
  max-width: 60ch;
`;

const QuoteVine = styled.div`
  margin: 2rem 0 0 1.5rem;
  max-width: 200px;

  svg {
    width: 100%;
  }
`;

const Quote = styled.p`
  position: relative;
  margin: 0;
  padding-left: 1.5rem;
  border-left: 2px solid var(--gold);
  font-size: clamp(1.125rem, 2vw, 1.3125rem);
  font-style: italic;
  line-height: 1.75;
  color: var(--ink);
`;

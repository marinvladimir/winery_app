import React from "react";
import styled, { keyframes } from "styled-components";

interface PageHeroProps {
  image: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  headingLevel?: "h1" | "h2";
  size?: "full" | "medium";
  position?: string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  image,
  title,
  eyebrow,
  subtitle,
  headingLevel = "h1",
  size = "full",
  position = "center",
  children,
}) => (
  <Hero $size={size}>
    <Backdrop style={{ backgroundImage: `url("${image}")`, backgroundPosition: position }} aria-hidden="true" />
    <Inner>
      {eyebrow && <HeroEyebrow>{eyebrow}</HeroEyebrow>}
      <HeroTitle as={headingLevel}>{title}</HeroTitle>
      {subtitle && <HeroSubtitle>{subtitle}</HeroSubtitle>}
      {children && <Actions>{children}</Actions>}
    </Inner>
  </Hero>
);

export default PageHero;

const slowZoom = keyframes`
  from { transform: scale(1.08); }
  to { transform: scale(1); }
`;

const rise = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Hero = styled.section<{ $size: "full" | "medium" }>`
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  min-height: ${({ $size }) => ($size === "full" ? "min(100svh, 900px)" : "70svh")};
  padding: calc(var(--header-h) + 3rem) 20px 4rem;
  background: var(--wine-950);
  color: var(--white);
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(20, 6, 8, 0.55) 0%, rgba(20, 6, 8, 0.25) 40%, rgba(20, 6, 8, 0.7) 100%);
  }

  @media (max-width: 768px) {
    min-height: ${({ $size }) => ($size === "full" ? "80svh" : "60svh")};
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  animation: ${slowZoom} 12s ease-out both;
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 900px;
  animation: ${rise} 0.9s ease-out both;
`;

const HeroEyebrow = styled.p`
  margin: 0 0 1rem;
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-light);
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4.25rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--white);
  text-wrap: balance;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
`;

const HeroSubtitle = styled.p`
  max-width: 620px;
  margin: 1.25rem auto 0;
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.25rem;
`;

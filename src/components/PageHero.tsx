import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useIntl } from "react-intl";
import { EASE_OUT } from "./motionVariants";
import Ambient, { AmbientKind } from "./decor/Ambient";

interface PageHeroProps {
  image: string;
  title: string;
  eyebrow?: string;
  subtitle?: string;
  headingLevel?: "h1" | "h2";
  size?: "full" | "medium";
  position?: string;
  /** Show the animated "scroll down" cue (full-size heroes only). */
  scrollCue?: boolean;
  /** Decorative atmosphere: drifting fireflies or falling vine leaves. */
  ambient?: AmbientKind;
  children?: React.ReactNode;
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
};

const word = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE_OUT } },
};

const PageHero: React.FC<PageHeroProps> = ({
  image,
  title,
  eyebrow,
  subtitle,
  headingLevel = "h1",
  size = "full",
  position = "center",
  scrollCue = false,
  ambient,
  children,
}) => {
  const { formatMessage } = useIntl();
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const backdropY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // Banners lower on the page should animate when they arrive, not on page load.
  const isTopHero = headingLevel === "h1";
  const animateProps = isTopHero
    ? { initial: "hidden", animate: "visible" }
    : { initial: "hidden", whileInView: "visible", viewport: { once: true, amount: 0.4 } };

  const scrollToNext = () => {
    const next = ref.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <Hero ref={ref} $size={size}>
      <BackdropMotion style={reducedMotion ? undefined : { y: backdropY }} aria-hidden="true">
        <Backdrop style={{ backgroundImage: `url("${image}")`, backgroundPosition: position }} />
      </BackdropMotion>
      {ambient && <Ambient kind={ambient} />}

      <Inner
        style={reducedMotion || !isTopHero ? undefined : { y: contentY, opacity: contentOpacity }}
        variants={container}
        {...animateProps}
      >
        {eyebrow && (
          <HeroEyebrow variants={item}>
            <span aria-hidden="true" />
            {eyebrow}
            <span aria-hidden="true" />
          </HeroEyebrow>
        )}
        <HeroTitle as={headingLevel} aria-label={title}>
          {title.split(" ").map((w, i) => (
            <React.Fragment key={i}>
              {i > 0 && " "}
              <WordMask aria-hidden="true">
                <motion.span variants={word}>{w}</motion.span>
              </WordMask>
            </React.Fragment>
          ))}
        </HeroTitle>
        {subtitle && <HeroSubtitle variants={item}>{subtitle}</HeroSubtitle>}
        {children && <Actions variants={item}>{children}</Actions>}
      </Inner>

      {scrollCue && (
        <ScrollCue
          type="button"
          onClick={scrollToNext}
          aria-label={formatMessage({ id: "hero.scroll" })}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 1.4, duration: 0.8 } }}
        >
          <span />
        </ScrollCue>
      )}
    </Hero>
  );
};

export default PageHero;

const slowZoom = keyframes`
  from { transform: scale(1.12); }
  to { transform: scale(1.02); }
`;

const wheel = keyframes`
  0% { opacity: 0; transform: translate(-50%, 0); }
  30% { opacity: 1; }
  100% { opacity: 0; transform: translate(-50%, 14px); }
`;

const Hero = styled.section<{ $size: "full" | "medium" }>`
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  min-height: ${({ $size }) => ($size === "full" ? "min(100svh, 920px)" : "72svh")};
  padding: calc(var(--header-h) + 3rem) 20px 5rem;
  background: var(--wine-950);
  color: var(--white);
  text-align: center;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at center, rgba(20, 6, 8, 0.15) 0%, rgba(20, 6, 8, 0.55) 100%),
      linear-gradient(180deg, rgba(20, 6, 8, 0.55) 0%, rgba(20, 6, 8, 0.2) 40%, rgba(20, 6, 8, 0.75) 100%);
  }

  @media (max-width: 768px) {
    min-height: ${({ $size }) => ($size === "full" ? "88svh" : "62svh")};
  }
`;

const BackdropMotion = styled(motion.div)`
  position: absolute;
  inset: -2% 0 -30%;
  will-change: transform;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-size: cover;
  animation: ${slowZoom} 14s ease-out both;
`;

const Inner = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 920px;
`;

const HeroEyebrow = styled(motion.p)`
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  margin: 0 0 1.25rem;
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold-light);

  span {
    width: 28px;
    height: 1px;
    background: currentColor;
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    font-size: 0.6875rem;
    letter-spacing: 0.18em;

    span {
      width: 16px;
    }
  }
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  font-weight: 600;
  line-height: 1.1;
  color: var(--white);
  text-wrap: balance;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.35);
`;

const WordMask = styled.span`
  display: inline-block;
  overflow: hidden;
  /* Room for descenders and diacritics inside the mask. */
  padding: 0.08em 0 0.14em;
  margin: -0.08em 0 -0.14em;
  vertical-align: top;

  span {
    display: inline-block;
  }
`;

const HeroSubtitle = styled(motion.p)`
  max-width: 640px;
  margin: 1.5rem auto 0;
  font-size: clamp(1.0625rem, 2vw, 1.25rem);
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2.5rem;
`;

const ScrollCue = styled(motion.button)`
  position: absolute;
  z-index: 2;
  bottom: 28px;
  left: 50%;
  width: 28px;
  height: 46px;
  margin-left: -14px;
  padding: 0;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: var(--white);
  }

  span {
    position: absolute;
    top: 8px;
    left: 50%;
    width: 4px;
    height: 8px;
    border-radius: 2px;
    background: var(--white);
    animation: ${wheel} 1.8s ease-in-out infinite;
  }

  @media (max-height: 640px) {
    display: none;
  }
`;

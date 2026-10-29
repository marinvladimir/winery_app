import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useIntl } from "react-intl";
import styled from "styled-components";
import { Container } from "./ui";
import { fadeUp, inViewProps, staggerContainer } from "./motionVariants";

const STATS = [
  { value: 4, suffix: "", labelId: "stats.wines" },
  { value: 100, suffix: "%", labelId: "stats.handmade" },
  { value: 15, suffix: "", labelId: "stats.guests" },
];

const CountUp = ({ to, suffix }: { to: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, to]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">
        {value}
        {suffix}
      </span>
      <span className="visually-hidden">
        {to}
        {suffix}
      </span>
    </span>
  );
};

const StatsStrip = () => {
  const { formatMessage, locale } = useIntl();
  // Croatian typesets a space before the percent sign, English does not.
  const formatSuffix = (suffix: string) => (suffix === "%" && locale === "hr" ? "\u00a0%" : suffix);

  return (
    <Strip aria-label={formatMessage({ id: "stats.label" })}>
      <Container>
        <List {...inViewProps} variants={staggerContainer(0.15)}>
          {STATS.map((stat) => (
            <motion.li key={stat.labelId} variants={fadeUp}>
              <Value>
                <CountUp to={stat.value} suffix={formatSuffix(stat.suffix)} />
              </Value>
              <Label>{formatMessage({ id: stat.labelId })}</Label>
            </motion.li>
          ))}
        </List>
      </Container>
    </Strip>
  );
};

export default StatsStrip;

const Strip = styled.section`
  position: relative;
  overflow: hidden;
  padding-block: clamp(3rem, 6vw, 4.5rem);
  background:
    radial-gradient(circle at 15% 50%, rgba(201, 164, 92, 0.12), transparent 45%),
    radial-gradient(circle at 85% 50%, rgba(201, 164, 92, 0.1), transparent 45%),
    var(--wine-900);
  color: var(--white);
`;

const List = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: center;

  li + li {
    border-left: 1px solid rgba(233, 218, 158, 0.2);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2rem;

    li + li {
      border-left: 0;
      border-top: 1px solid rgba(233, 218, 158, 0.2);
      padding-top: 2rem;
    }
  }
`;

const Value = styled.span`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 6vw, 3.75rem);
  font-weight: 600;
  line-height: 1;
  color: var(--gold-light);
  font-variant-numeric: tabular-nums;
`;

const Label = styled.span`
  display: block;
  max-width: 22ch;
  margin: 0.75rem auto 0;
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.6;
`;

import { motion } from "framer-motion";
import styled from "styled-components";
import { EASE_OUT } from "../motionVariants";

const GRAPES: [number, number][] = [
  [7, 9], [13, 9], [19, 9],
  [10, 14.5], [16, 14.5],
  [13, 20],
];

/** Centered section ornament: two gold lines growing out of a small grape cluster. */
const Ornament = () => (
  <Wrap aria-hidden="true" initial="hidden" whileInView="visible" viewport={{ once: true }}>
    <Line $side="left" variants={line} />
    <motion.svg width="26" height="28" viewBox="0 0 26 26" variants={pop} focusable="false">
      <path d="M13 5 C13 3 14 1 16 0.5" stroke="var(--gold)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M14 3.5 C17 0.5 22 1 23 3 C20 4.5 17 4.8 14 3.5Z" fill="var(--gold)" opacity="0.85" />
      {GRAPES.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.9" fill="var(--wine-700)" stroke="var(--gold)" strokeWidth="0.8" />
      ))}
    </motion.svg>
    <Line $side="right" variants={line} />
  </Wrap>
);

export default Ornament;

const line = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT, delay: 0.25 } },
};

const pop = {
  hidden: { scale: 0, rotate: -30, opacity: 0 },
  visible: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 14 },
  },
};

const Wrap = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto 1.75rem;
`;

const Line = styled(motion.span)<{ $side: "left" | "right" }>`
  display: block;
  width: 56px;
  height: 1px;
  background: ${({ $side }) =>
    $side === "left"
      ? "linear-gradient(90deg, transparent, var(--gold))"
      : "linear-gradient(90deg, var(--gold), transparent)"};
  transform-origin: ${({ $side }) => ($side === "left" ? "right" : "left")};
`;

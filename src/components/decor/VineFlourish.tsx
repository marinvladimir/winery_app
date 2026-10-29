import { motion } from "framer-motion";
import styled from "styled-components";

const draw = (delay: number, duration = 1.6) => ({
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration, ease: [0.65, 0, 0.35, 1], delay },
      opacity: { duration: 0.2, delay },
    },
  },
});

const grape = (delay: number) => ({
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 15, delay },
  },
});

const GRAPES: [number, number][] = [
  [146, 52], [159, 52], [172, 53],
  [152, 64], [165, 64],
  [158, 76],
  [164, 87],
];

interface VineFlourishProps {
  className?: string;
  flip?: boolean;
}

/** Hand-drawn vine branch that sketches itself in when scrolled into view. */
const VineFlourish: React.FC<VineFlourishProps> = ({ className, flip }) => (
  <Svg
    className={className}
    viewBox="0 0 230 110"
    $flip={flip}
    aria-hidden="true"
    focusable="false"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
  >
    <g fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* Main cane */}
      <motion.path variants={draw(0, 2)} d="M2 26 C40 12 74 44 112 30 S178 6 228 34" />
      {/* Tendrils */}
      <motion.path variants={draw(1.1, 1)} d="M112 30 C116 14 132 10 136 20 C139 28 129 31 128 24" />
      <motion.path variants={draw(1.5, 0.9)} d="M206 22 C210 10 222 10 222 18 C222 24 214 24 215 19" />
      {/* Leaves */}
      <motion.path
        variants={draw(0.5, 1.2)}
        d="M52 24 C38 32 36 52 50 62 C52 56 58 54 62 56 C60 50 66 44 72 44 C66 40 66 32 70 28 C62 30 56 28 52 24 Z"
      />
      <motion.path variants={draw(1, 0.8)} d="M52 24 L56 54 M55 40 L66 36 M54 48 L44 46" />
      <motion.path
        variants={draw(0.9, 1.2)}
        d="M190 18 C186 4 196 -2 208 2 C206 6 210 10 214 12 C206 14 202 18 202 24 C198 20 194 20 190 18 Z"
      />
      {/* Cluster stem */}
      <motion.path variants={draw(1.2, 0.6)} d="M156 24 C158 32 158 38 158 44" />
    </g>
    {GRAPES.map(([cx, cy], i) => (
      <motion.circle
        key={i}
        cx={cx}
        cy={cy}
        r="6"
        fill="rgba(110, 26, 36, 0.12)"
        stroke="currentColor"
        strokeWidth="1.3"
        variants={grape(1.5 + i * 0.08)}
      />
    ))}
  </Svg>
);

export default VineFlourish;

const Svg = styled(motion.svg)<{ $flip?: boolean }>`
  display: block;
  ${({ $flip }) => $flip && "scale: -1 1;"}
  width: 230px;
  height: auto;
  color: var(--gold);
  overflow: visible;
`;

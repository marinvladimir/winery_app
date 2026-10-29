import React, { useId } from "react";
import styled, { keyframes } from "styled-components";

/** [center x, half width, length] of each drip in a 1440 × 120 viewBox. */
const DRIPS: [number, number, number][] = [
  [70, 9, 48], [190, 6, 30], [300, 12, 78], [430, 7, 40], [540, 10, 96],
  [655, 6, 34], [760, 11, 62], [880, 8, 104], [990, 6, 38], [1100, 12, 70],
  [1215, 7, 46], [1320, 10, 88], [1405, 6, 32],
];

const BAND = 18;

const dripPath = ([cx, w, len]: [number, number, number]) =>
  `M${cx - w * 2.2},${BAND - 2} C${cx - w},${BAND - 2} ${cx - w},${BAND + 4} ${cx - w},${BAND + 12}` +
  ` L${cx - w},${len - w} A${w},${w} 0 0 0 ${cx + w},${len - w}` +
  ` L${cx + w},${BAND + 12} C${cx + w},${BAND + 4} ${cx + w},${BAND - 2} ${cx + w * 2.2},${BAND - 2} Z`;

// Only some drips shed falling drops, at staggered moments.
const FALLING = [2, 4, 7, 9, 11];

interface WineDripProps {
  color?: string;
  className?: string;
}

/** A liquid edge that hangs below a dark section, with drops that slowly fall. */
const WineDrip: React.FC<WineDripProps> = ({ color = "var(--wine-900)", className }) => {
  const shineId = `drip-shine-${useId().replace(/:/g, "")}`;
  return (
  <Wrap className={className} style={{ color }} aria-hidden="true">
    <svg viewBox="0 0 1440 120" preserveAspectRatio="xMidYMin slice" focusable="false">
      <defs>
        <linearGradient id={shineId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height={BAND} fill="currentColor" />
      {DRIPS.map((drip, i) => (
        <Drip key={i} style={{ animationDelay: `${(i * 0.7) % 5}s`, animationDuration: `${5 + (i % 4)}s` }}>
          <path d={dripPath(drip)} fill="currentColor" />
          <ellipse
            cx={drip[0] - drip[1] * 0.35}
            cy={drip[2] - drip[1] * 1.3}
            rx={drip[1] * 0.25}
            ry={drip[1] * 0.6}
            fill={`url(#${shineId})`}
          />
        </Drip>
      ))}
      {FALLING.map((index, i) => {
        const [cx, w, len] = DRIPS[index];
        const r = Math.max(4, w * 0.55);
        return (
          <Drop
            key={index}
            d={`M${cx},${len - r * 1.6} C${cx + r * 0.6},${len - r * 0.6} ${cx + r},${len} ${cx},${len + r * 0.9} C${cx - r},${len} ${cx - r * 0.6},${len - r * 0.6} ${cx},${len - r * 1.6} Z`}
            fill="currentColor"
            style={{ animationDelay: `${i * 1.9 + 0.5}s` }}
          />
        );
      })}
    </svg>
  </Wrap>
  );
};

export default WineDrip;

const stretch = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.12); }
`;

const fall = keyframes`
  0%, 55% { transform: translateY(0) scale(0.2); opacity: 0; }
  62% { transform: translateY(0) scale(1); opacity: 1; }
  72% { transform: translateY(6px) scale(1); opacity: 1; }
  100% { transform: translateY(150px) scale(0.85, 1.15); opacity: 0; }
`;

const Wrap = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% - 1px);
  z-index: 2;
  height: clamp(70px, 8.33vw, 140px);
  pointer-events: none;

  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    /* Crop the sliced sides, but let falling drops leave the box downwards. */
    clip-path: inset(0 0 -240px 0);
  }

  @media (prefers-reduced-motion: reduce) {
    path,
    g {
      animation: none !important;
    }
  }
`;

const Drip = styled.g`
  transform-box: fill-box;
  transform-origin: top;
  animation: ${stretch} 6s ease-in-out infinite;
`;

const Drop = styled.path`
  transform-box: fill-box;
  transform-origin: center top;
  opacity: 0;
  animation: ${fall} 9.5s cubic-bezier(0.55, 0, 0.9, 0.6) infinite;
`;

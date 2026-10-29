import React from "react";
import styled, { keyframes } from "styled-components";

export type AmbientKind = "fireflies" | "leaves";

// Fixed pseudo-random layouts so the effect is stable between renders.
const FIREFLIES = Array.from({ length: 16 }, (_, i) => ({
  left: (i * 37 + 11) % 100,
  top: 35 + ((i * 53) % 60),
  size: 4 + (i % 4),
  delay: (i * 0.9) % 8,
  duration: 9 + (i % 5) * 2,
}));

const LEAVES = Array.from({ length: 8 }, (_, i) => ({
  left: (i * 29 + 7) % 96,
  size: 18 + (i % 3) * 8,
  delay: i * 2.1,
  duration: 13 + (i % 4) * 3,
  tint: i % 3 === 0 ? "var(--wine-600)" : "var(--gold)",
}));

const Leaf = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" width="100%" height="100%" focusable="false">
    <path
      d="M12 2 C9 5 4 5 3 9 C5 10 6 12 5 14 C8 14 10 16 11 20 L12 22 L13 20 C14 16 16 14 19 14 C18 12 19 10 21 9 C20 5 15 5 12 2 Z"
      fill={color}
    />
    <path d="M12 4 V21 M12 11 L7 8 M12 11 L17 8 M12 15 L8 13 M12 15 L16 13" stroke="rgba(0,0,0,0.25)" strokeWidth="0.7" fill="none" />
  </svg>
);

/** Decorative atmosphere layer for hero sections. */
const Ambient: React.FC<{ kind: AmbientKind }> = ({ kind }) => (
  <Layer aria-hidden="true">
    {kind === "fireflies"
      ? FIREFLIES.map((f, i) => (
          <Firefly
            key={i}
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: f.size,
              height: f.size,
              animationDelay: `${f.delay}s, ${f.delay / 2}s`,
              animationDuration: `${f.duration}s, ${2 + (i % 3)}s`,
            }}
          />
        ))
      : LEAVES.map((l, i) => (
          <FallingLeaf
            key={i}
            style={{
              left: `${l.left}%`,
              width: l.size,
              height: l.size,
              animationDelay: `${l.delay}s`,
              animationDuration: `${l.duration}s`,
            }}
          >
            <Sway style={{ animationDuration: `${3 + (i % 3)}s` }}>
              <Leaf color={l.tint} />
            </Sway>
          </FallingLeaf>
        ))}
  </Layer>
);

export default Ambient;

const drift = keyframes`
  0% { transform: translate(0, 0); opacity: 0; }
  15% { opacity: 1; }
  50% { transform: translate(24px, -60px); }
  85% { opacity: 1; }
  100% { transform: translate(-12px, -130px); opacity: 0; }
`;

const twinkle = keyframes`
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.8); }
`;

const fallDown = keyframes`
  0% { transform: translateY(-8vh) rotate(0deg); opacity: 0; }
  10% { opacity: 0.75; }
  85% { opacity: 0.75; }
  100% { transform: translateY(105vh) rotate(320deg); opacity: 0; }
`;

const sway = keyframes`
  0%, 100% { transform: translateX(-18px) rotate(-12deg); }
  50% { transform: translateX(18px) rotate(12deg); }
`;

const Layer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Firefly = styled.span`
  position: absolute;
  border-radius: 50%;
  background: var(--gold-light);
  box-shadow: 0 0 8px 3px rgba(233, 218, 158, 0.55), 0 0 20px 6px rgba(201, 164, 92, 0.25);
  opacity: 0;
  animation-name: ${drift}, ${twinkle};
  animation-timing-function: ease-in-out, ease-in-out;
  animation-iteration-count: infinite, infinite;
`;

const FallingLeaf = styled.span`
  position: absolute;
  top: 0;
  opacity: 0;
  animation-name: ${fallDown};
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const Sway = styled.span`
  display: block;
  width: 100%;
  height: 100%;
  animation: ${sway} 4s ease-in-out infinite;
`;

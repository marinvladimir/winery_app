import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import styled from "styled-components";

interface Splash {
  id: number;
  x: number;
  y: number;
}

const DROPS = [
  { angle: -155, dist: 44, size: 10, color: "var(--wine-700)" },
  { angle: -120, dist: 54, size: 13, color: "var(--wine-600)" },
  { angle: -88, dist: 48, size: 8, color: "var(--gold)" },
  { angle: -55, dist: 56, size: 12, color: "var(--wine-700)" },
  { angle: -20, dist: 42, size: 9, color: "var(--wine-600)" },
  { angle: 15, dist: 30, size: 7, color: "var(--wine-900)" },
  { angle: 165, dist: 30, size: 7, color: "var(--gold)" },
];

let nextId = 0;

/** A tiny burst of wine drops wherever the mouse clicks (desktop only). */
const ClickSplash = () => {
  const reducedMotion = useReducedMotion();
  const [splashes, setSplashes] = useState<Splash[]>([]);

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      const id = nextId++;
      setSplashes((list) => [...list.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => setSplashes((list) => list.filter((s) => s.id !== id)), 900);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [reducedMotion]);

  return (
    <Layer aria-hidden="true">
      <AnimatePresence>
        {splashes.map((s) => (
          <span key={s.id} style={{ position: "absolute", left: s.x, top: s.y }}>
            {DROPS.map((d, i) => {
              const rad = (d.angle * Math.PI) / 180;
              const dx = Math.cos(rad) * d.dist;
              const dy = Math.sin(rad) * d.dist;
              return (
                <Drop
                  key={i}
                  style={{ width: d.size, height: d.size * 1.25, background: d.color }}
                  initial={{ x: 0, y: 0, scale: 0.4, opacity: 1 }}
                  animate={{
                    x: [0, dx, dx * 1.1],
                    y: [0, dy, dy + 38],
                    scale: [0.4, 1, 0.7],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.8, times: [0, 0.4, 1], ease: "easeOut" }}
                />
              );
            })}
          </span>
        ))}
      </AnimatePresence>
    </Layer>
  );
};

export default ClickSplash;

const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2000;
  pointer-events: none;
`;

const Drop = styled(motion.span)`
  position: absolute;
  margin: -6px 0 0 -6px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: inset -2px -2px 0 rgba(0, 0, 0, 0.15), inset 2px 2px 0 rgba(255, 255, 255, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.35);
`;

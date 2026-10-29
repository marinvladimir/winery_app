import { useEffect, useId, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useIntl } from "react-intl";
import styled from "styled-components";

// Wine glass bowl in a 32 × 40 viewBox; the wine level follows scroll progress.
const BOWL = "M7 4 H25 C25.5 14 22.5 21 16 22 C9.5 21 6.5 14 7 4 Z";
const BOWL_TOP = 6;
const BOWL_BOTTOM = 22;

const BackToTop = () => {
  const { formatMessage } = useIntl();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const clipId = `glass-${useId().replace(/:/g, "")}`;
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const level = useTransform(smooth, [0, 1], [BOWL_BOTTOM - 2, BOWL_TOP - 1]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Button
          type="button"
          aria-label={formatMessage({ id: "nav.top" })}
          title={formatMessage({ id: "nav.top" })}
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3, rotate: -8 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
        >
          <svg width="30" height="38" viewBox="0 0 32 40" aria-hidden="true" focusable="false">
            <defs>
              <clipPath id={clipId}>
                <path d={BOWL} />
              </clipPath>
            </defs>
            <g clipPath={`url(#${clipId})`}>
              <motion.g style={{ y: level }}>
                <motion.path
                  d="M-16 2 Q-12 0 -8 2 T0 2 T8 2 T16 2 T24 2 T32 2 T40 2 T48 2 V40 H-16 Z"
                  fill="var(--wine-600)"
                  animate={reducedMotion ? undefined : { x: [0, 16] }}
                  transition={{ duration: 1.6, ease: "linear", repeat: Infinity }}
                />
              </motion.g>
            </g>
            <path d={BOWL} fill="none" stroke="var(--gold-light)" strokeWidth="1.4" />
            <path d="M16 22 V33 M10.5 35 H21.5" stroke="var(--gold-light)" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M10 7 C10 11 11 14 12.5 16" stroke="rgba(255,255,255,0.45)" strokeWidth="1" fill="none" strokeLinecap="round" />
          </svg>
        </Button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;

const Button = styled(motion.button)`
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  padding: 0;
  border: 1px solid rgba(233, 218, 158, 0.25);
  border-radius: 50%;
  background: radial-gradient(circle at 30% 25%, var(--wine-700), var(--wine-900) 70%);
  box-shadow: var(--shadow-md);
  cursor: pointer;
`;

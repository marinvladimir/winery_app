import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntl } from "react-intl";
import styled from "styled-components";

const ArrowUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
    strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);

const BackToTop = () => {
  const { formatMessage } = useIntl();
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 1.2);
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
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        >
          <ArrowUp />
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
  width: 48px;
  height: 48px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  background: var(--wine-900);
  color: var(--gold-light);
  box-shadow: var(--shadow-md);
  cursor: pointer;

  &:hover {
    background: var(--wine-700);
  }
`;

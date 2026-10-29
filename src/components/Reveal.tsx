import React from "react";
import { motion } from "framer-motion";
import { fadeUp, fadeUpDelayed, inViewProps, staggerContainer } from "./motionVariants";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Animate direct children one after another instead of as one block. */
  stagger?: number;
}

/** Fades content up the first time it scrolls into view. */
const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0, stagger }) => (
  <motion.div
    className={className}
    {...inViewProps}
    variants={stagger ? staggerContainer(stagger, delay) : fadeUpDelayed(delay)}
  >
    {children}
  </motion.div>
);

/** A child of a staggered `Reveal`. */
export const RevealItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <motion.div className={className} variants={fadeUp}>
    {children}
  </motion.div>
);

export default Reveal;

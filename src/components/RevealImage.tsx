import React from "react";
import { motion } from "framer-motion";
import { inViewProps, maskReveal, zoomOut } from "./motionVariants";

type RevealImageProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart" | "style">;

/** Image that wipes in from the bottom and settles from a slight zoom. */
const RevealImage: React.FC<RevealImageProps> = (props) => (
  <motion.div className="reveal-mask" {...inViewProps} variants={maskReveal}>
    <motion.img loading="lazy" decoding="async" {...props} variants={zoomOut} />
  </motion.div>
);

export default RevealImage;

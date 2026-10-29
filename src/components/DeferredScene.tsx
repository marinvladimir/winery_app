import React, { Suspense } from "react";
import styled from "styled-components";
import { useInView } from "../hooks/useInView";
import { useMediaQuery } from "../hooks/useMediaQuery";

interface DeferredSceneProps {
  width: number;
  height: number;
  align?: "start" | "center";
  children: React.ReactNode;
}

/**
 * Decorative 3D models are large downloads, so they only mount once scrolled
 * near and are skipped on small screens altogether.
 */
const DeferredScene: React.FC<DeferredSceneProps> = ({ width, height, align = "center", children }) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");

  if (isSmallScreen) return null;

  return (
    <Slot ref={ref} style={{ width, height, marginInline: align === "center" ? "auto" : 0 }} aria-hidden="true">
      {inView && <Suspense fallback={null}>{children}</Suspense>}
    </Slot>
  );
};

export default DeferredScene;

const Slot = styled.div`
  flex-shrink: 0;
  max-width: 100%;
`;

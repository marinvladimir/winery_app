import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT } from "../components/motionVariants";
import { useIntl } from "react-intl";
import PageHero from "../components/PageHero";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "../components/Icons";
import { Container, Section } from "../components/ui";
import { GALLERY_PHOTOS } from "../data/photos";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const GalleryPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useDocumentTitle(formatMessage({ id: "header.link3" }));

  const close = useCallback(() => {
    if (openIndex !== null) triggerRefs.current[openIndex]?.focus();
    setOpenIndex(null);
  }, [openIndex]);

  return (
    <>
      <PageHero
        image="assets/1-1.jpg"
        size="medium"
        eyebrow={formatMessage({ id: "gallery.eyebrow" })}
        title={formatMessage({ id: "gallery.heading" })}
        subtitle={formatMessage({ id: "gallery.subheading" })}
      />

      <Section aria-label={formatMessage({ id: "gallery.heading" })}>
        <Container>
          <Grid>
            {GALLERY_PHOTOS.map((photo, index) => {
              const alt = formatMessage({ id: photo.altId });
              return (
                <motion.li
                  key={photo.src}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.7, ease: EASE_OUT, delay: (index % 3) * 0.08 }}
                >
                  <Thumb
                    ref={(el) => {
                      triggerRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => setOpenIndex(index)}
                    aria-label={formatMessage({ id: "gallery.open" }, { alt })}
                  >
                    <img src={photo.src} alt="" loading="lazy" decoding="async" />
                    <ThumbOverlay aria-hidden="true">
                      <ExpandIcon size={22} />
                    </ThumbOverlay>
                  </Thumb>
                </motion.li>
              );
            })}
          </Grid>
        </Container>
      </Section>

      <AnimatePresence>
        {openIndex !== null && (
          <Lightbox
            key="lightbox"
            index={openIndex}
            direction={direction}
            onChange={(next, dir) => {
              setDirection(dir);
              setOpenIndex(next);
            }}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;

interface LightboxProps {
  index: number;
  direction: number;
  onChange: (index: number, direction: number) => void;
  onClose: () => void;
}

const slideVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 80, scale: 0.98 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
  exit: (dir: number) => ({ opacity: 0, x: dir * -80, scale: 0.98, transition: { duration: 0.3 } }),
};

const Lightbox: React.FC<LightboxProps> = ({ index, direction, onChange, onClose }) => {
  const { formatMessage } = useIntl();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = GALLERY_PHOTOS.length;
  const photo = GALLERY_PHOTOS[index];
  const alt = formatMessage({ id: photo.altId });

  const prev = useCallback(() => onChange((index - 1 + count) % count, -1), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count, 1), [index, count, onChange]);

  useEffect(() => {
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialogRef.current) {
        // Keep keyboard focus inside the dialog.
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose, prev, next]);

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev : next)();
    touchStartX.current = null;
  };

  return (
    <Overlay
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={formatMessage({ id: "gallery.heading" })}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, pointerEvents: "none" }}
      transition={{ duration: 0.3 }}
      onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
      onTouchEnd={onTouchEnd}
    >
      <CloseButton ref={closeRef} type="button" onClick={onClose} aria-label={formatMessage({ id: "gallery.close" })}>
        <CloseIcon size={26} />
      </CloseButton>

      <NavButton
        type="button"
        $side="left"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label={formatMessage({ id: "gallery.prev" })}
      >
        <ChevronLeftIcon size={28} />
      </NavButton>

      <Figure
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.94, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, y: 10 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
      >
        <ImageStage>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={alt}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
            />
          </AnimatePresence>
        </ImageStage>
        <figcaption>
          <span>{alt}</span>
          <span aria-live="polite">
            {index + 1} / {count}
          </span>
        </figcaption>
      </Figure>

      <NavButton
        type="button"
        $side="right"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label={formatMessage({ id: "gallery.next" })}
      >
        <ChevronRightIcon size={28} />
      </NavButton>
    </Overlay>
  );
};

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(0.75rem, 1.5vw, 1.25rem);
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ThumbOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(36, 8, 12, 0.45);
  color: var(--white);
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const Thumb = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 0;
  border-radius: var(--radius);
  overflow: hidden;
  background: var(--cream-200);
  cursor: zoom-in;
  box-shadow: var(--shadow-sm);

  img {
    width: 100%;
    aspect-ratio: 4 / 3;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.05);
  }

  &:hover ${ThumbOverlay}, &:focus-visible ${ThumbOverlay} {
    opacity: 1;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 72px 24px;
  background: rgba(16, 6, 8, 0.94);
  backdrop-filter: blur(6px);

  @media (max-width: 640px) {
    padding: 64px 12px 80px;
  }
`;

const Figure = styled(motion.figure)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  margin: 0;

  figcaption {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
    margin-top: 0.875rem;
    font-family: var(--font-ui);
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.8);
  }
`;

const ImageStage = styled.div`
  display: grid;
  place-items: center;
  max-width: 100%;

  img {
    grid-area: 1 / 1;
    max-width: 100%;
    max-height: calc(100svh - 160px);
    object-fit: contain;
    border-radius: var(--radius-sm);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
`;

const iconButton = `
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const CloseButton = styled.button`
  ${iconButton};
  position: absolute;
  top: 12px;
  right: 12px;
`;

const NavButton = styled.button<{ $side: "left" | "right" }>`
  ${iconButton};
  position: absolute;
  top: 50%;
  ${({ $side }) => $side}: 12px;
  transform: translateY(-50%);
  z-index: 1;

  @media (max-width: 640px) {
    top: auto;
    bottom: 12px;
    transform: none;
    width: 44px;
    height: 44px;
  }
`;

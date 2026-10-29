import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useIntl } from "react-intl";
import PageHero from "../components/PageHero";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ExpandIcon } from "../components/Icons";
import { Container, Section } from "../components/ui";
import { GALLERY_PHOTOS } from "../data/photos";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const GalleryPage: React.FC = () => {
  const { formatMessage } = useIntl();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
                <li key={photo.src}>
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
                </li>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {openIndex !== null && (
        <Lightbox index={openIndex} onChange={setOpenIndex} onClose={close} />
      )}
    </>
  );
};

export default GalleryPage;

interface LightboxProps {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ index, onChange, onClose }) => {
  const { formatMessage } = useIntl();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);
  const count = GALLERY_PHOTOS.length;
  const photo = GALLERY_PHOTOS[index];
  const alt = formatMessage({ id: photo.altId });

  const prev = useCallback(() => onChange((index - 1 + count) % count), [index, count, onChange]);
  const next = useCallback(() => onChange((index + 1) % count), [index, count, onChange]);

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

      <Figure onClick={(e) => e.stopPropagation()}>
        <img key={photo.src} src={photo.src} alt={alt} />
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

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.97); }
  to { opacity: 1; transform: scale(1); }
`;

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

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 72px 24px;
  background: rgba(16, 6, 8, 0.94);
  animation: ${fadeIn} 0.25s ease-out;

  @media (max-width: 640px) {
    padding: 64px 12px 80px;
  }
`;

const Figure = styled.figure`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  margin: 0;

  img {
    max-width: 100%;
    max-height: calc(100svh - 160px);
    object-fit: contain;
    border-radius: var(--radius-sm);
    animation: ${zoomIn} 0.3s ease-out;
  }

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

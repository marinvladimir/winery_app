import styled, { css } from "styled-components";

export const Container = styled.div<{ $narrow?: boolean }>`
  width: 100%;
  max-width: ${({ $narrow }) => ($narrow ? "860px" : "1180px")};
  margin-inline: auto;
  padding-inline: 20px;

  @media (min-width: 768px) {
    padding-inline: 32px;
  }
`;

export const Section = styled.section<{ $tone?: "white" | "cream" }>`
  padding-block: clamp(4rem, 9vw, 7rem);
  background: ${({ $tone }) => ($tone === "cream" ? "var(--cream)" : "var(--white)")};
  scroll-margin-top: var(--header-h);
`;

export const Eyebrow = styled.p`
  margin: 0 0 0.75rem;
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--wine-600);
`;

export const SectionTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 2.75rem);
  margin-bottom: 1.25rem;
`;

export const Divider = styled.span<{ $center?: boolean }>`
  display: block;
  width: 64px;
  height: 2px;
  margin: 0 ${({ $center }) => ($center ? "auto" : "0")} 1.75rem;
  background: var(--gold);
`;

export const SectionHeader = styled.header`
  text-align: center;
  max-width: 680px;
  margin: 0 auto clamp(2.5rem, 5vw, 3.5rem);

  ${Divider} {
    margin-inline: auto;
  }
`;

export const Lead = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
`;

const buttonBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 48px;
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease,
    transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

export const buttonPrimary = css`
  ${buttonBase};
  background: var(--wine-700);
  color: var(--white);

  &:hover {
    background: var(--wine-900);
    color: var(--white);
    box-shadow: var(--shadow-md);
  }
`;

export const buttonGhostLight = css`
  ${buttonBase};
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.7);
  color: var(--white);
  backdrop-filter: blur(4px);

  &:hover {
    background: var(--white);
    color: var(--wine-900);
  }
`;

export const buttonOutline = css`
  ${buttonBase};
  background: transparent;
  border-color: var(--wine-700);
  color: var(--wine-700);

  &:hover {
    background: var(--wine-700);
    color: var(--white);
  }
`;

export const MediaFrame = styled.figure<{ $ratio?: string; $offset?: "left" | "right" }>`
  position: relative;
  margin: 0;
  isolation: isolate;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    border: 1px solid var(--gold);
    border-radius: var(--radius);
    transform: ${({ $offset }) =>
      $offset === "left" ? "translate(-14px, 14px)" : "translate(14px, 14px)"};
  }

  img {
    width: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio ?? "4 / 3"};
    object-fit: cover;
    border-radius: var(--radius);
    box-shadow: var(--shadow-md);
  }
`;

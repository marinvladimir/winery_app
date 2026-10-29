import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useIntl } from "react-intl";
import { LOCALES, useLanguage } from "../context/languageContext";
import { CONTACT } from "../data/contact";
import { NAV_ITEMS } from "../data/navigation";
import { CloseIcon, MailIcon, MenuIcon, PhoneIcon } from "./Icons";

const Header = () => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 24);
      // Tuck the header away while reading down the page, bring it back on scroll up.
      if (Math.abs(y - lastY) > 6) {
        setIsHidden(y > lastY && y > 480);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  const navLinks = NAV_ITEMS.map((item) => (
    <StyledNavLink key={item.to} to={item.to} end>
      {formatMessage({ id: item.labelId })}
    </StyledNavLink>
  ));

  return (
    <>
      <ProgressBar style={{ scaleX: progress }} aria-hidden="true" />
      <HeaderBar
        $solid={isScrolled || isMenuOpen}
        animate={{ y: isHidden && !isMenuOpen ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        // Keyboard users must always be able to reach the navigation.
        onFocusCapture={() => setIsHidden(false)}
      >
        <HeaderInner>
          <Brand to="/" aria-label={formatMessage({ id: "nav.homeLabel" })}>
            <img src="assets/logo.png" alt="" width={52} height={52} />
            <BrandText>
              <strong>Kuzmanić</strong>
              <span>{formatMessage({ id: "brand.tagline" })}</span>
            </BrandText>
          </Brand>

          <DesktopNav aria-label={formatMessage({ id: "nav.label" })}>{navLinks}</DesktopNav>

          <HeaderRight>
            <PhoneLink href={CONTACT.phoneHref}>
              <PhoneIcon size={16} />
              {CONTACT.phoneDisplay}
            </PhoneLink>
            <LanguageSwitcher />
          </HeaderRight>

          <MenuButton
            ref={menuButtonRef}
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={formatMessage({ id: isMenuOpen ? "nav.close" : "nav.open" })}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <CloseIcon size={26} /> : <MenuIcon size={26} />}
          </MenuButton>
        </HeaderInner>

        <AnimatePresence>
          {isMenuOpen && (
            <MobileMenu
              id="mobile-menu"
              aria-label={formatMessage({ id: "nav.label" })}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              {navLinks.map((link) => (
                <motion.div key={link.key} variants={mobileItemVariants}>
                  {link}
                </motion.div>
              ))}
              <MobileContact variants={mobileItemVariants}>
                <a href={CONTACT.phoneHref}>
                  <PhoneIcon size={18} />
                  {CONTACT.phoneDisplay}
                </a>
                <a href={`mailto:${CONTACT.email}`}>
                  <MailIcon size={18} />
                  {CONTACT.email}
                </a>
              </MobileContact>
              <motion.div variants={mobileItemVariants}>
                <LanguageSwitcher />
              </motion.div>
            </MobileMenu>
          )}
        </AnimatePresence>
      </HeaderBar>
    </>
  );
};

export default Header;

const LanguageSwitcher = () => {
  const { locale, switchLanguage } = useLanguage();
  const { formatMessage } = useIntl();

  return (
    <LangGroup role="group" aria-label={formatMessage({ id: "language.label" })}>
      {LOCALES.map((lang) => (
        <LangButton
          key={lang}
          type="button"
          lang={lang}
          aria-pressed={locale === lang}
          aria-label={formatMessage({ id: `language.${lang}.name` })}
          onClick={() => switchLanguage(lang)}
        >
          {formatMessage({ id: `language.${lang}` })}
        </LangButton>
      ))}
    </LangGroup>
  );
};

const mobileMenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25 } },
};

const mobileItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const HeaderBar = styled(motion.header)<{ $solid: boolean }>`
  position: fixed;
  inset: 0 0 auto;
  z-index: 1100;
  color: var(--white);
  background: ${({ $solid }) =>
    $solid
      ? "rgba(36, 8, 12, 0.94)"
      : "linear-gradient(180deg, rgba(20, 6, 8, 0.7) 0%, rgba(20, 6, 8, 0) 100%)"};
  box-shadow: ${({ $solid }) => ($solid ? "0 6px 24px rgba(0, 0, 0, 0.25)" : "none")};
  backdrop-filter: ${({ $solid }) => ($solid ? "blur(10px)" : "none")};
  transition:
    background 0.3s ease,
    box-shadow 0.3s ease;
`;

const ProgressBar = styled(motion.div)`
  position: fixed;
  z-index: 1200;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
  transform-origin: 0 50%;
`;

const HeaderInner = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  max-width: 1180px;
  height: var(--header-h);
  margin: 0 auto;
  padding-inline: 20px;

  @media (min-width: 768px) {
    padding-inline: 32px;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--white);
  text-decoration: none;

  &:hover {
    color: var(--white);
  }

  img {
    width: 52px;
    height: 52px;
    border-radius: 6px;
  }
`;

const BrandText = styled.span`
  display: flex;
  flex-direction: column;
  line-height: 1.15;

  strong {
    font-family: var(--font-display);
    font-size: 1.375rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  span {
    font-family: var(--font-ui);
    font-size: 0.6875rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-light);
  }
`;

const DesktopNav = styled.nav`
  display: flex;
  gap: 2rem;
  margin-inline: auto;

  @media (max-width: 899px) {
    display: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  padding-block: 0.375rem;
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;
  transition: color 0.2s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.25s ease;
  }

  &:hover,
  &.active {
    color: var(--white);
  }

  &:hover::after,
  &.active::after {
    transform: scaleX(1);
  }
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  @media (max-width: 899px) {
    display: none;
  }
`;

const PhoneLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.88);
  text-decoration: none;

  &:hover {
    color: var(--gold-light);
  }

  @media (max-width: 1099px) {
    display: none;
  }
`;

const LangGroup = styled.div`
  display: inline-flex;
  padding: 3px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
`;

const LangButton = styled.button`
  min-width: 40px;
  min-height: 32px;
  padding: 0 0.625rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.85);
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    color: var(--white);
  }

  &[aria-pressed="true"] {
    background: var(--gold-light);
    color: var(--wine-950);
  }
`;

const MenuButton = styled.button`
  display: none;
  margin-left: auto;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--white);
  cursor: pointer;

  @media (max-width: 899px) {
    display: inline-flex;
  }
`;

const MobileMenu = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  max-height: calc(100svh - var(--header-h));
  overflow-y: auto;
  padding: 0 20px;

  &::before,
  &::after {
    content: "";
    flex: 0 0 0.5rem;
  }
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  ${StyledNavLink} {
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0;
  }

  @media (min-width: 900px) {
    display: none;
  }
`;

const MobileContact = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.12);

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
    font-family: var(--font-ui);
    font-size: 0.9375rem;
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
  }
`;

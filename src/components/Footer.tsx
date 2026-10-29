import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { fadeUp, inViewProps, staggerContainer } from "./motionVariants";
import { useIntl } from "react-intl";
import { CONTACT } from "../data/contact";
import { NAV_ITEMS } from "../data/navigation";
import { MailIcon, MapPinIcon, PhoneIcon } from "./Icons";

const Footer: React.FC = () => {
  const { formatMessage } = useIntl();
  const year = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterGrid {...inViewProps} variants={staggerContainer(0.12)}>
        <motion.div variants={fadeUp}>
          <FooterBrand>
            <img src="assets/logo.png" alt="" width={56} height={56} loading="lazy" />
            <span>{formatMessage({ id: "carousel.text1" })}</span>
          </FooterBrand>
          <FooterText>{formatMessage({ id: "footer.tagline" })}</FooterText>
        </motion.div>

        <motion.div variants={fadeUp}>
          <FooterHeading>{formatMessage({ id: "footer.contact" })}</FooterHeading>
          <FooterList>
            <li>
              <MapPinIcon size={18} />
              <span>
                {CONTACT.street}
                <br />
                {CONTACT.city}
              </span>
            </li>
            <li>
              <PhoneIcon size={18} />
              <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
            </li>
            <li>
              <MailIcon size={18} />
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </li>
          </FooterList>
        </motion.div>

        <motion.nav variants={fadeUp} aria-label={formatMessage({ id: "footer.explore" })}>
          <FooterHeading>{formatMessage({ id: "footer.explore" })}</FooterHeading>
          <FooterList>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{formatMessage({ id: item.labelId })}</Link>
              </li>
            ))}
          </FooterList>
        </motion.nav>
      </FooterGrid>

      <FooterBottom>
        <p>
          © {year} {formatMessage({ id: "footer.text" })}
        </p>
      </FooterBottom>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  position: relative;
  background: var(--wine-950);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    width: min(1180px, calc(100% - 40px));
    height: 1px;
    transform: translateX(-50%);
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
    opacity: 0.6;
  }
  color: rgba(255, 255, 255, 0.78);
  font-family: var(--font-ui);
  font-size: 0.9375rem;
`;

const FooterGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.4fr 1fr 0.8fr;
  gap: 3rem;
  max-width: 1180px;
  margin: 0 auto;
  padding: 4.5rem 20px 3rem;

  @media (min-width: 768px) {
    padding-inline: 32px;
  }

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }
`;

const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin-bottom: 1rem;

  img {
    border-radius: 6px;
  }

  span {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--white);
  }
`;

const FooterText = styled.p`
  max-width: 34ch;
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-body);
  line-height: 1.7;
`;

const FooterHeading = styled.h2`
  margin-bottom: 1.125rem;
  font-family: var(--font-ui);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-light);
`;

const FooterList = styled.ul`
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: var(--gold);
  }

  a {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    word-break: break-word;

    &:hover {
      color: var(--white);
      text-decoration: underline;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 20px;
  text-align: center;

  p {
    margin: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
  }
`;

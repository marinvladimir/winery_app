import { useIntl } from "react-intl";
import styled, { keyframes } from "styled-components";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { getVisitorCount, incrementVisitorCount, isVisitorCounterEnabled } from "../utils/redisClient";
import { EMAIL_SERVICE_PUBLIC_KEY, EMAIL_SERVICE_SERVICE_ID, EMAIL_SERVICE_TEMPLATE_ID } from "../config";
import { CONTACT } from "../data/contact";
import { motion } from "framer-motion";
import { CheckIcon, MailIcon, MapPinIcon, PhoneIcon, UserIcon } from "./Icons";
import Ornament from "./decor/Ornament";
import VineFlourish from "./decor/VineFlourish";
import Reveal from "./Reveal";
import { fadeUp, inViewProps, staggerContainer } from "./motionVariants";
import { buttonPrimary, Container, CornerFlourish, Eyebrow, Section, SectionHeader, SectionTitle } from "./ui";

const markerIcon = new L.Icon({
  iconUrl: "leaflet/marker.png",
  iconSize: [41, 41],
  iconAnchor: [21, 41],
  popupAnchor: [0, -36],
});

const VERIFICATION_ANSWER = "557";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  from_name: string;
  reply_to: string;
  verification: string;
  message: string;
}

type FieldName = keyof FormData;

const EMPTY_FORM: FormData = { from_name: "", reply_to: "", verification: "", message: "" };
const FIELD_ORDER: FieldName[] = ["from_name", "reply_to", "message", "verification"];

const ContactData: React.FC = () => {
  const { formatMessage } = useIntl();
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!isVisitorCounterEnabled) return;
    let cancelled = false;

    const loadCount = async () => {
      try {
        let firstVisit = false;
        try {
          firstVisit = !sessionStorage.getItem("visited");
          // Mark before the request so a re-run of this effect can't count twice.
          sessionStorage.setItem("visited", "true");
        } catch {
          // Storage unavailable – just show the count.
        }
        const count = firstVisit ? await incrementVisitorCount() : await getVisitorCount();
        if (!cancelled) setVisitorCount(count);
      } catch {
        // The counter is a nice-to-have; hide it if the service is unreachable.
      }
    };

    loadCount();
    return () => {
      cancelled = true;
    };
  }, []);

  const validate = (data: FormData) => {
    const newErrors: Partial<Record<FieldName, string>> = {};
    if (!data.from_name.trim()) newErrors.from_name = formatMessage({ id: "contact.name.error" });
    if (!data.reply_to.trim()) newErrors.reply_to = formatMessage({ id: "contact.email.error" });
    else if (!EMAIL_PATTERN.test(data.reply_to.trim()))
      newErrors.reply_to = formatMessage({ id: "contact.email.invalid" });
    if (data.verification.trim() !== VERIFICATION_ANSWER)
      newErrors.verification = formatMessage({ id: "contact.verification.error" });
    if (!data.message.trim()) newErrors.message = formatMessage({ id: "contact.message.error" });
    return newErrors;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as FieldName;
    setFormData((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validate(formData);
    setErrors(newErrors);

    const firstInvalid = FIELD_ORDER.find((field) => newErrors[field]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        EMAIL_SERVICE_SERVICE_ID,
        EMAIL_SERVICE_TEMPLATE_ID,
        { ...formData },
        EMAIL_SERVICE_PUBLIC_KEY
      );
      toast.success(formatMessage({ id: "contact.success" }));
      setFormData(EMPTY_FORM);
      setSent(true);
      window.setTimeout(() => setSent(false), 4000);
    } catch {
      toast.error(formatMessage({ id: "contact.error" }));
    } finally {
      setLoading(false);
    }
  };

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    value: formData[name],
    onChange: handleChange,
    required: true,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  const renderError = (name: FieldName) =>
    errors[name] && <ErrorText id={`contact-${name}-error`}>{errors[name]}</ErrorText>;

  return (
    <Section id="contact" $tone="cream" tabIndex={-1} aria-labelledby="contact-title">
      <CornerFlourish $side="right">
        <VineFlourish flip />
      </CornerFlourish>
      <Container>
        <SectionHeader>
          <Reveal>
            <Eyebrow>{formatMessage({ id: "contact.eyebrow" })}</Eyebrow>
            <SectionTitle id="contact-title">{formatMessage({ id: "contact.heading" })}</SectionTitle>
          </Reveal>
          <Ornament />
          <Reveal delay={0.15}>
            <p>{formatMessage({ id: "contact.intro" })}</p>
          </Reveal>
        </SectionHeader>

        <ContactGrid {...inViewProps} variants={staggerContainer(0.15)}>
          <ContactLeftSide variants={fadeUp}>
            <InfoCard>
              <h3>{formatMessage({ id: "contact.info.title" })}</h3>
              <InfoList>
                <li>
                  <MapPinIcon />
                  <span>
                    {CONTACT.street}
                    <br />
                    {CONTACT.city}
                  </span>
                </li>
                <li>
                  <UserIcon />
                  <span>{CONTACT.person}</span>
                </li>
                <li>
                  <PhoneIcon />
                  <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
                </li>
                <li>
                  <MailIcon />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                </li>
              </InfoList>
            </InfoCard>
            <MapFrame>
              <MapContainer
                center={CONTACT.mapPosition}
                zoom={16}
                scrollWheelZoom={false}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={CONTACT.mapPosition} icon={markerIcon} alt={formatMessage({ id: "carousel.text1" })}>
                  <Popup>
                    <strong>{formatMessage({ id: "carousel.text1" })}</strong>
                    <br />
                    {CONTACT.street}, {CONTACT.city}
                  </Popup>
                </Marker>
              </MapContainer>
            </MapFrame>
          </ContactLeftSide>

          <ContactForm ref={formRef} onSubmit={handleSubmit} noValidate variants={fadeUp}>
            <h3>{formatMessage({ id: "contact.title" })}</h3>

            <Field>
              <label htmlFor="contact-from_name">{formatMessage({ id: "contact.name" })}</label>
              <input type="text" autoComplete="name" {...fieldProps("from_name")} />
              {renderError("from_name")}
            </Field>

            <Field>
              <label htmlFor="contact-reply_to">{formatMessage({ id: "contact.email" })}</label>
              <input type="email" autoComplete="email" {...fieldProps("reply_to")} />
              {renderError("reply_to")}
            </Field>

            <Field>
              <label htmlFor="contact-message">{formatMessage({ id: "contact.message" })}</label>
              <textarea rows={5} {...fieldProps("message")} />
              {renderError("message")}
            </Field>

            <Field>
              <label htmlFor="contact-verification">
                {formatMessage({ id: "contact.verification" }, { number: VERIFICATION_ANSWER })}
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                {...fieldProps("verification")}
              />
              {renderError("verification")}
            </Field>

            <SubmitButton type="submit" disabled={loading} aria-busy={loading} $sent={sent}>
              {loading && <Spinner aria-hidden="true" />}
              {sent && !loading && <CheckIcon size={18} />}
              {formatMessage({
                id: loading ? "contact.sending" : sent ? "contact.sent" : "contact.send",
              })}
            </SubmitButton>
          </ContactForm>
        </ContactGrid>

        {visitorCount !== null && (
          <VisitorCounter>
            {formatMessage({ id: "visitor.count" })} <strong>{visitorCount.toLocaleString()}</strong>
          </VisitorCounter>
        )}
      </Container>
    </Section>
  );
};

export default ContactData;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1.15fr;
  gap: clamp(1.5rem, 4vw, 2.5rem);
  align-items: stretch;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const ContactLeftSide = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const cardStyles = `
  border-radius: var(--radius);
  background: var(--white);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--line);
`;

const InfoCard = styled.div`
  ${cardStyles};
  padding: clamp(1.5rem, 3vw, 2rem);

  h3 {
    font-size: 1.375rem;
    margin-bottom: 1.25rem;
  }
`;

const InfoList = styled.ul`
  display: grid;
  gap: 0.875rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  color: var(--ink);

  li {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    line-height: 1.5;
  }

  svg {
    flex-shrink: 0;
    color: var(--wine-700);
  }

  a {
    color: var(--wine-700);
    font-weight: 500;
    text-decoration: none;
    word-break: break-word;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const MapFrame = styled.div`
  ${cardStyles};
  flex: 1;
  min-height: 280px;
  overflow: hidden;
  /* Keep Leaflet's high z-index panes below the fixed header. */
  isolation: isolate;
  position: relative;
  z-index: 0;
`;

const ContactForm = styled(motion.form)`
  ${cardStyles};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: clamp(1.5rem, 3vw, 2.5rem);

  h3 {
    font-size: 1.375rem;
    margin: 0;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  label {
    font-family: var(--font-ui);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ink);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem 0.875rem;
    border: 1px solid #cdbfab;
    border-radius: var(--radius-sm);
    background: var(--white);
    color: var(--ink);
    font-family: var(--font-ui);
    font-size: 1rem;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
      outline: none;
      border-color: var(--wine-700);
      box-shadow: 0 0 0 3px rgba(110, 26, 36, 0.18);
    }

    &[aria-invalid="true"] {
      border-color: var(--error);
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
`;

const ErrorText = styled.span`
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--error);
`;

const SubmitButton = styled.button<{ $sent: boolean }>`
  ${buttonPrimary};
  ${({ $sent }) => $sent && "background: #2f6b3a; &:hover { background: #2f6b3a; }"}
  align-self: flex-start;
  min-width: 160px;
  margin-top: 0.25rem;

  @media (max-width: 480px) {
    align-self: stretch;
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Spinner = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: var(--white);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const VisitorCounter = styled.p`
  margin: 2.5rem 0 0;
  text-align: center;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  color: var(--muted);

  strong {
    color: var(--wine-700);
  }
`;

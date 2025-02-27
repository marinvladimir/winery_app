import { FormattedMessage, useIntl } from "react-intl";
import styled from "styled-components";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";
import { getVisitorCount, incrementVisitorCount } from "../utils/redisClient";
import { EMAIL_SERVICE_PUBLIC_KEY, EMAIL_SERVICE_SERVICE_ID, EMAIL_SERVICE_TEMPLATE_ID } from "../config";

const customIcon = new L.Icon({
    iconUrl: "/leaflet/marker.png",
    iconSize: [41, 41],
    iconAnchor: [21, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface ButtonProps {
    $isDisabled: boolean;
}

export const LanguageButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #0073e6;
  transition: color 0.3s;
  
  &:hover {
    color: #005bb5;
  }
`;

interface FormData {
    from_name: string;
    reply_to: string;
    verification: string;
    message: string;
}

const ContactData: React.FC = () => {
    const { formatMessage } = useIntl();
    const [visitorCount, setVisitorCount] = useState<number>(0);

    useEffect(() => {
        async function fetchAndIncrement() {
            const count = await getVisitorCount();
            setVisitorCount(count);
            if (!sessionStorage.getItem("visited")) {
                const newCount = await incrementVisitorCount();
                setVisitorCount(newCount);
                sessionStorage.setItem("visited", "true");
            }
        }
        fetchAndIncrement();
    }, []);

    const [formData, setFormData] = useState<FormData>({
        from_name: "",
        reply_to: "",
        verification: "",
        message: "",
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loading, setLoading] = useState<boolean>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = (): boolean => {
        let newErrors: Partial<FormData> = {};

        if (!formData.from_name.trim()) newErrors.from_name = formatMessage({ id: "contact.name.error" })
        if (!formData.reply_to.trim()) newErrors.reply_to = formatMessage({ id: "contact.email.error" })
        if (formData.verification !== "557") newErrors.verification = formatMessage({ id: "contact.verification.error" })
        if (!formData.message.trim()) newErrors.message = formatMessage({ id: "contact.message.error" })

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        setLoading(true);
        try {
            await emailjs.send(
                EMAIL_SERVICE_SERVICE_ID,
                EMAIL_SERVICE_TEMPLATE_ID,
                { ...formData } as Record<string, unknown>,
                EMAIL_SERVICE_PUBLIC_KEY
            );
            toast.success("Poruka uspješno poslana!");
            setFormData({ from_name: "", reply_to: "", verification: "", message: "" });
        } catch (error) {
            toast.error("Došlo je do greške. Pokušajte ponovo.");
        } finally {
            setLoading(false);
        }
    };

    const position: [number, number] = [43.55579933989852, 16.336398404284003];

    return (
        <BottomSection>
            <ContactContainer>
                <ContactLeftSide>
                    <ContactInfo>
                        <h3>Contact Info</h3>
                        <p>Marina Studina 59</p>
                        <p>21217 Kaštel Novi</p>
                        <p><strong>Anita Kuzmanić</strong></p>
                        <p>📞 098 9932 710</p>
                        <p>✉️ <a href="mailto:vinarija.kuzmanic@gmail.com">vinarija.kuzmanic@gmail.com</a></p>
                    </ContactInfo>
                    <MyMap position={position} />
                </ContactLeftSide>
                <ContactForm onSubmit={handleSubmit}>
                    <h3>{formatMessage({ id: "contact.title" })}</h3>

                    <label>{formatMessage({ id: "contact.name" })}</label>
                    <input type="text" name="from_name" value={formData.from_name} onChange={handleChange} />
                    {errors.from_name && <ErrorText>{errors.from_name}</ErrorText>}

                    <label>{formatMessage({ id: "contact.email" })}</label>
                    <input type="email" name="reply_to" value={formData.reply_to} onChange={handleChange} />
                    {errors.reply_to && <ErrorText>{errors.reply_to}</ErrorText>}

                    <label>{formatMessage({ id: "contact.verification" })}</label>
                    <input type="text" name="verification" value={formData.verification} onChange={handleChange} />
                    {errors.verification && <ErrorText>{errors.verification}</ErrorText>}

                    <label>{formatMessage({ id: "contact.message" })}</label>
                    <textarea name="message" rows={4} value={formData.message} onChange={handleChange}></textarea>
                    {errors.message && <ErrorText>{errors.message}</ErrorText>}

                    <SubmitButton type="submit" $isDisabled={loading} disabled={loading}>
                        {loading ? formatMessage({ id: "contact.sending" }) : formatMessage({ id: "contact.send" })}
                    </SubmitButton>
                </ContactForm>
            </ContactContainer>
            <VisitorCounter>
                <FormattedMessage id="visitor.count" /> {visitorCount}
            </VisitorCounter>
        </BottomSection>
    );
};

export default ContactData;

const ContactContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 3rem;
  width: 100%;
  max-width: 1200px; 
  margin: 0 auto; 
  
  @media (max-width: 1024px) {
    gap: 2rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ContactLeftSide = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1; 
  max-width: 450px;
  justify-content: space-evenly;
  gap: inherit;

    @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const ContactInfo = styled.div`
  background: #fff;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 1.6rem;
    margin-bottom: 1.2rem;
    color: #7b1e25;
    text-transform: uppercase;
    text-align: center;
  }

  p {
    margin: 0.6rem 0;
    font-size: 1rem;
    color: #000000 !important;
  }

  a {
    color: #7b1e25;
    text-decoration: none;
    font-weight: bold;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
  width: 100%;
  max-width: 500px;

  @media (max-width: 768px) {
    width: auto;
    max-width: 100%;
    padding: 1.5rem;
  }

  h3 {
    font-size: 1.7rem;
    margin-bottom: 1rem;
    color: #7b1e25;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
  }

  label {
    font-size: 1rem;
    color: #7b1e25;
    font-weight: 600;
    align-self: flex-start;
  }

  input,
  textarea {
    padding: 0.5rem;
    border: 1px solid #ddd;
    background: #f8f8f8;
    color: #7b1e25;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;

    &:focus {
      outline: none;
      border-color: #7b1e25;
      box-shadow: 0 0 8px rgba(123, 30, 37, 0.4);
      background: #ffffff;
    }
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }
`;

const SubmitButton = styled.button<ButtonProps>`
  background: linear-gradient(135deg, #7b1e25, #ff9f43);
  background-size: 200% 200%;
  color: white;
  padding: 1rem;
  border: none;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-position 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background-position: right center;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(123, 30, 37, 0.3);
  }

  &:disabled {
    background: #d6d6d6;
    cursor: not-allowed;
  }
`;


const ErrorText = styled.span`
  font-size: 0.9rem;
  color: #ff4d4d;
  margin-top: 0.3rem;
  font-weight: bold;
`;

const BottomSection = styled.section`
  width: 100%;
  background: linear-gradient(to bottom, #ffffff, #f7f7f7);
  padding: 4rem 2rem;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const VisitorCounter = styled.div`
  background: #fff;
  color: #7b1e25;
  padding: 1rem 0;
  text-align: center;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);

  @media (max-width: 768px) {
    max-width: none;
  }
`;

const SetView = ({ center }: { center: [number, number] }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 17);
    }, [map, center]);
    return null;
};

const StyledMap = styled(MapContainer)`
  width: 100%;
  height: 350px; 

  @media (max-width: 768px) {
    height: 250px;
  }

  @media (max-width: 480px) {
    height: 200px;
  }
`;


const MyMap: React.FC<{ position: [number, number] }> = ({ position }) => {
    return (
        <StyledMap>
            <SetView center={position} />
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customIcon}>
                <Popup>Apartman Kuzmanić, Marina Studina 59, 21217 Kaštel Novi</Popup>
            </Marker>
        </StyledMap>
    );
};

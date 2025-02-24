import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styled from "styled-components";
import AboutSection from "../components/AboutSection";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useIntl, FormattedMessage } from "react-intl";
// import { useLanguage } from "../context/i18n";
import "leaflet/dist/leaflet.css";
import emailjs from "emailjs-com";
import {
  EMAIL_SERVICE_PUBLIC_KEY,
  EMAIL_SERVICE_SERVICE_ID,
  EMAIL_SERVICE_TEMPLATE_ID,
} from "../config";
import { toast } from "react-toastify";
import { getVisitorCount, incrementVisitorCount } from "../utils/redisClient";

const Container = styled.section`
  width: 90%;
  max-width: 1170px;
  margin: 4rem auto;
`;

const ContentWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactInfo = styled.div`
  background: white;
  padding: 1.5rem;
  font-family: tahoma;
  font-size: 15px;
  font-weight: bold;
  color: #5c5c5c;

  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem 0;
  }

  a {
    color: #0073e6;
    text-decoration: none;
  }

      padding: 25px;
    box-shadow: 0 0 31px #efefef;
`;

interface ButtonProps {
  $isDisabled: boolean;
}

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  background: white;
  transition: all 0.3s ease-in-out;

  background-image: url("/assets/wooden.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  h3 {
  color: white;
  font-family: 'Assistant', sans-serif;
  margin: 0rem;
  font-size: 1.2rem;
  padding-bottom: 0.75rem;
  position: relative; 
}

h3::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #feca00 20%, #ccc 25%); 
  position: absolute;
  bottom: 0;
  left: 0;
}

  label {
    color: white;
    font-family: 'Assistant', sans-serif;
  }

  input, textarea {
    padding: 0.6rem;
    border: 1px solid #ccc;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      border-color: #0073e6;
      box-shadow: 0 0 8px rgba(0, 115, 230, 0.2);
    }
  }
`;

export const LanguageButton = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: #0073e6;
`;

const SubmitButton = styled.button<ButtonProps>`
    background: #855f5f;
    color: white;
    padding: 0.8rem;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease-in-out;

    &:hover {
       background: ${({ $isDisabled }) => ($isDisabled ? "#855f5f" : "#c5c5c5")};
    transform: ${({ $isDisabled }) => ($isDisabled ? "none" : "scale(1.05)")};
    box-shadow: ${({ $isDisabled }) => ($isDisabled ? "none" : "0 4px 10px rgba(0, 91, 181, 0.3)")};
    }

  &:active {
    transform: ${({ $isDisabled }) => ($isDisabled ? "none" : "scale(0.98)")};
  }
`;


const VisitorCounter = styled.div`
  background: white;
  padding: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: #5c5c5c;
  font-family: 'Assistant', sans-serif;
  padding: 25px;
  box-shadow: 0 0 31px #efefef;

  h5{
    margin: 0; 
    font-weight: normal;
    color: #5c5c5c;
    font-family: 'Assistant', sans-serif;
    margin: 0rem;
    font-size: 1.2rem;
    padding-bottom: 0.75rem;
    position: relative; 
    }

    h5::after {
  content: "";
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #feca00 20%, #ccc 25%); 
  position: absolute;
  bottom: 0;
  left: 0;
}
`;

interface FormData {
  name: string;
  email: string;
  verification: string;
  message: string;
}

const AboutPage = () => {
  const { formatMessage } = useIntl();
  // const { switchLanguage } = useLanguage();
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
    name: "",
    email: "",
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

    if (!formData.name.trim()) newErrors.name = formatMessage({ id: "contact.name.error" })
    if (!formData.email.trim()) newErrors.email = formatMessage({ id: "contact.email.error" })
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
      setFormData({ name: "", email: "", verification: "", message: "" });
    } catch (error) {
      toast.error("Došlo je do greške. Pokušajte ponovo.");
    } finally {
      setLoading(false);
    }
  };

  const position: [number, number] = [43.55579933989852, 16.336398404284003];

  return (
    <Container>
      <ContentWrapper>
        <AboutSection />
        <RightSection>
        {/* <ContactInfo> */}
            {/* <div>
              <LanguageButton onClick={() => switchLanguage("hr")}>
                <FormattedMessage id="language.hr" />
              </LanguageButton> 
              | 
              <LanguageButton onClick={() => switchLanguage("en")}>
                <FormattedMessage id="language.en" />
              </LanguageButton>
            </div> */}
          {/* </ContactInfo> */}
          <ContactInfo>
            <div style={{ backgroundColor: "#f5f5f4", padding: "20px" }}>
              <div>
                {/* <p>Apartman Kuzmanić</p> */}
                <p>Marina Studina 59</p>
                <p>21217 Kaštel Novi</p>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <p><strong>Anita Kuzmanić</strong></p>
                <p>098 9932 710</p>
                <p>anita_kuzmanic@yahoo.com
                </p>
              </div>
            </div>
          </ContactInfo>
          <ContactForm onSubmit={handleSubmit}>
  <h3 style={{ marginTop: 0 }}>{formatMessage({ id: "contact.title" })}</h3>

  <label>{formatMessage({ id: "contact.name" })}</label>
  <input type="text" name="name" value={formData.name} onChange={handleChange} />
  {errors.name && <span className="error" style={{color: "#c33737"}}>{errors.name}</span>}

  <label>{formatMessage({ id: "contact.email" })}</label>
  <input type="email" name="email" value={formData.email} onChange={handleChange} />
  {errors.email && <span className="error" style={{color: "#c33737"}}>{errors.email}</span>}

  <label>{formatMessage({ id: "contact.verification" })}</label>
  <input type="text" name="verification" value={formData.verification} onChange={handleChange} />
  {errors.verification && <span className="error" style={{color: "#c33737"}}>{errors.verification}</span>}

  <label>{formatMessage({ id: "contact.message" })}</label>
  <textarea name="message" rows={4} value={formData.message} onChange={handleChange}></textarea>
  {errors.message && <span className="error" style={{color: "#c33737"}}>{errors.message}</span>}

  <SubmitButton type="submit" $isDisabled={loading} disabled={loading}>
    {loading ? formatMessage({ id: "contact.sending" }) : formatMessage({ id: "contact.send" })}
  </SubmitButton>
</ContactForm>
          <MyMap position={position} />
          <VisitorCounter>
            <FormattedMessage id="visitor.count" /> {visitorCount}
          </VisitorCounter>
        </RightSection>
      </ContentWrapper>
    </Container>
  );
};

export default AboutPage;

const SetView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 17);
  }, [map, center]);
  return null;
};

const MyMap: React.FC<{ position: [number, number] }> = ({ position }) => {
  return (
    <MapContainer style={{ height: "250px", width: "100%" }}>
      <SetView center={position} />
      <TileLayer
  url="https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"
/>
      <Marker position={position}>
        <Popup>Apartman Kuzmanić, Marina Studina 59, 21217 Kaštel Novi</Popup>
      </Marker>
    </MapContainer>
  );
};

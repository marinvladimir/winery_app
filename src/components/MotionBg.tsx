import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "assets/1-1.jpg",
  "assets/2.jpg",
  "assets/1-1.jpg",
  "assets/2.jpg",
];

const MotionBg: React.FC = () => {
  const [bgImage, setBgImage] = useState(images[0]);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section, index) => {
      if (section) {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setBgImage(images[index]),
          onEnterBack: () => setBgImage(images[index]),
        });
      }
    });
  }, []);

  return (
    <PageWrapper bgImage={bgImage}>
      <ContentWrapper>
        {["Vineyards", "Barrels & Aging", "Cellar", "Harvesting Grapes"].map(
          (title, index) => (
            <Section
              key={index}
              ref={(el: any) => (sectionsRef.current[index] = el)}
            >
              <h2>{title}</h2>
              <p>Some description about {title.toLowerCase()}...</p>
            </Section>
          )
        )}
      </ContentWrapper>
    </PageWrapper>
  );
};

export default MotionBg;

const PageWrapper = styled.div<{ bgImage: string }>`
  min-height: 100vh;
  width: 100%;
  background: url(${(props) => props.bgImage}) no-repeat center center;
  background-size: cover;
  transition: background 0.8s ease-in-out;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  width: 80%;
  max-width: 900px;
  padding: 20px;
`;

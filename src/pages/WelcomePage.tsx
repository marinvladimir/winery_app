import React from "react";
import MotionBg from "../components/MotionBg";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const WelcomePage: React.FC = () => {
  useDocumentTitle();
  return <MotionBg />;
};

export default WelcomePage;

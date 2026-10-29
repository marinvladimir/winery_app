import React from "react";
import { useIntl } from "react-intl";
import TourContent from "../components/TourContent";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const TourPage: React.FC = () => {
  const { formatMessage } = useIntl();
  useDocumentTitle(formatMessage({ id: "header.link2" }));
  return <TourContent />;
};

export default TourPage;

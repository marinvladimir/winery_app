import { useEffect } from "react";
import { useIntl } from "react-intl";

export function useDocumentTitle(title?: string) {
  const { formatMessage } = useIntl();
  const brand = formatMessage({ id: "carousel.text1" });
  const homeTitle = formatMessage({ id: "footer.text" });

  useEffect(() => {
    document.title = title ? `${title} · ${brand}` : homeTitle;
  }, [title, brand, homeTitle]);
}

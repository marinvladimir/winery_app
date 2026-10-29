export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const EMAIL_SERVICE_TEMPLATE_ID =
  import.meta.env.VITE_JS_TEMPLATE_ID || "";
export const EMAIL_SERVICE_SERVICE_ID =
  import.meta.env.VITE_JS_SERVICE_ID || "";
export const EMAIL_SERVICE_PUBLIC_KEY =
  import.meta.env.VITE_JS_PUBLIC_KEY || "";
export const VISITOR_COUNTER_ENABLED =
  import.meta.env.VITE_VISITOR_COUNTER_ENABLED !== "false";

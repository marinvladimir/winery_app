/// <reference types="@react-three/fiber" />

interface ImportMetaEnv {
  VITE_API_BASE_URL: string;
  VITE_VISITOR_COUNTER_ENABLED?: string;
  VITE_JS_PUBLIC_KEY: string;
  VITE_JS_TEMPLATE_ID: string;
  VITE_JS_SERVICE_ID: string;
}
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
import { VISITOR_COUNTER_ENABLED } from "../config";

const VISITORS_ENDPOINT = "/.netlify/functions/visitors";

export function isVisitorCounterEnabled(): boolean {
  return VISITOR_COUNTER_ENABLED;
}

async function requestCount(method: "GET" | "POST"): Promise<number> {
  const response = await fetch(VISITORS_ENDPOINT, { method });
  if (!response.ok) {
    throw new Error(`Visitor counter request failed: ${response.status}`);
  }
  const data = await response.json();
  return Number(data.count) || 0;
}

export function getVisitorCount(): Promise<number> {
  return requestCount("GET");
}

export function incrementVisitorCount(): Promise<number> {
  return requestCount("POST");
}

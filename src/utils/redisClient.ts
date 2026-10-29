import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "../config";

export const isVisitorCounterEnabled = Boolean(UPSTASH_REDIS_REST_URL && UPSTASH_REDIS_REST_TOKEN);

async function request(command: "get" | "incr"): Promise<number> {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/${command}/visitorCount`, {
    headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
  });
  if (!response.ok) throw new Error(`Visitor counter request failed: ${response.status}`);
  const data = await response.json();
  return data.result ? Number(data.result) : 0;
}

export const getVisitorCount = () => request("get");
export const incrementVisitorCount = () => request("incr");

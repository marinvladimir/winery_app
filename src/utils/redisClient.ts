import { UPSTASH_REDIS_REST_TOKEN, UPSTASH_REDIS_REST_URL } from "../config";

export async function getVisitorCount(): Promise<number> {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/get/visitorCount`, {
    headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
  });
  const data = await response.json();
  return data.result ? Number(data.result) : 0;
}

export async function incrementVisitorCount(): Promise<number> {
  const response = await fetch(`${UPSTASH_REDIS_REST_URL}/incr/visitorCount`, {
    headers: { Authorization: `Bearer ${UPSTASH_REDIS_REST_TOKEN}` },
  });
  const data = await response.json();
  return data.result ? Number(data.result) : 0;
}

// Server-side proxy for the visitor counter. Keeps the Upstash token out of
// the browser bundle: the client only talks to /.netlify/functions/visitors.
//
//   GET  -> { count } (current value)
//   POST -> { count } (value after incrementing)

const COUNTER_KEY = "visitorCount";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export default async (req: Request): Promise<Response> => {
  let command: "get" | "incr";
  if (req.method === "GET") {
    command = "get";
  } else if (req.method === "POST") {
    command = "incr";
  } else {
    return new Response(null, { status: 405, headers: { Allow: "GET, POST" } });
  }

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    return json({ error: "Visitor counter is not configured" }, 503);
  }

  try {
    const response = await fetch(`${url}/${command}/${COUNTER_KEY}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      return json({ error: "Upstream request failed" }, 502);
    }
    const data = await response.json();
    return json({ count: data.result ? Number(data.result) : 0 });
  } catch {
    return json({ error: "Upstream request failed" }, 502);
  }
};

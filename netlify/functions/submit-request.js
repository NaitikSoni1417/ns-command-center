const BACKEND_URL = "https://ns-command-center.onrender.com";

async function callBackend(path, body, timeout = 50000) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeout),
  });
  return { status: res.status, data: await res.json().catch(() => ({})) };
}

exports.handler = async (event) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ success: false, message: "Invalid JSON" }),
    };
  }

  const backendPaths = ["/api/requests", "/api/contact"];
  const path = event.path.includes("contact") ? "/api/contact" : "/api/requests";

  // Retry up to 2 times (Render cold start can be slow)
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { status, data } = await callBackend(path, payload, attempt === 1 ? 50000 : 25000);

      if (status === 429) {
        return {
          statusCode: 429,
          headers: corsHeaders,
          body: JSON.stringify({ success: false, message: "Too many requests. Please try again in a few minutes." }),
        };
      }

      return {
        statusCode: status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
    } catch (err) {
      if (attempt === 2) {
        return {
          statusCode: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          body: JSON.stringify({
            success: false,
            message: "Service temporarily unavailable. Please try again in a minute.",
          }),
        };
      }
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
};

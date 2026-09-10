const BACKEND_URL = "https://ns-command-center.onrender.com";

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: false, message: "Method not allowed" }),
    };
  }

  try {
    const backendRes = await fetch(`${BACKEND_URL}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body,
      signal: AbortSignal.timeout(30000),
    });

    const data = await backendRes.text();

    return {
      statusCode: backendRes.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": backendRes.headers.get("content-type") || "application/json",
      },
      body: data,
    };
  } catch (err) {
    return {
      statusCode: 502,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify({
        success: false,
        message: "Backend unreachable. Please try again later.",
        error: err.message,
      }),
    };
  }
};

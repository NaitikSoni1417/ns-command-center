const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitContact(payload) {
  const url = API_BASE
    ? `${API_BASE}/api/contact`
    : "/.netlify/functions/submit-request";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Failed to send message. Please try again.");
  }

  return data;
}

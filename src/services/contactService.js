const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitContact(payload) {
  const res = await fetch(`${API_BASE}/api/contact`, {
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

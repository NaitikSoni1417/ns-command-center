const API_BASE = import.meta.env.VITE_API_URL || "";

export async function submitRequest(payload) {
  const res = await fetch(`${API_BASE}/api/requests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request submission failed. Please try again.");
  }

  return data;
}

import { useTheme } from "../hooks/useTheme";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer style={{
      padding: "20px 0",
      borderTop: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
      background: theme === "light" ? "rgba(245,245,247,0.8)" : "rgba(8,8,12,0.6)",
    }}>
      <div className="container text-center" style={{ maxWidth: 1100 }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "center" }}>
          <div style={{ textAlign: "center", flex: "1 1 300px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>NS Command Center</span>
              <span style={{ padding: "3px 8px", borderRadius: 999, background: theme === "light" ? "rgba(56,189,248,0.1)" : "rgba(56,189,248,0.15)", color: "#38bdf8", fontSize: "0.64rem", fontWeight: 700 }}>PROPRIETARY</span>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--text-dim)", margin: 0 }}>
              Engineered by Naitik Soni — Cybersecurity Specialist & Full-Stack Architect
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, fontSize: "0.82rem", fontWeight: 600 }}>
            <a href="https://naitiksoni1417.netlify.app" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Portfolio Home</a>
            <a href="request-access.html" style={{ color: "#38bdf8", textDecoration: "none" }}>Request Demo</a>
            <a href="mailto:naitik.infosec@gmail.com" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

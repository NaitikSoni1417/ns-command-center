import { motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Hero() {
  const { theme } = useTheme();

  return (
    <section id="hero" style={{ position: "relative", padding: "clamp(100px, 15vw, 160px) 0 clamp(60px, 10vw, 120px)", overflow: "hidden" }}>

      {/* CTA — hackbaroda.in style */}
      <motion.a
        href="request-access.html"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: "absolute", bottom: "clamp(30px, 6vw, 70px)", right: "clamp(16px, 4vw, 50px)",
          zIndex: 10, display: "flex", alignItems: "flex-end", gap: 8,
          textDecoration: "none",
        }}
      >
        <svg width="60" height="60" viewBox="0 0 120 120" fill="none" style={{ marginBottom: 4 }}>
          <path d="M25 20 C 30 10, 75 8, 85 45 C 90 65, 70 80, 78 98"
            style={{ stroke: theme === "light" ? "#1d1d1f" : "#fff", strokeWidth: 3.5, strokeLinecap: "round", fill: "none" }} />
          <path d="M68 90 L78 98 L66 103"
            style={{ stroke: theme === "light" ? "#1d1d1f" : "#fff", strokeWidth: 3.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }} />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: theme === "light" ? "rgba(255,255,255,0.9)" : "rgba(20,24,34,0.85)",
            border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.18)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: theme === "light" ? "#1d1d1f" : "#38bdf8", fontSize: "1rem",
            boxShadow: theme === "light" ? "0 4px 16px rgba(0,0,0,0.1)" : "0 4px 16px rgba(0,0,0,0.4)",
          }}>
            <i className="bi bi-shield-lock-fill" />
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "12px 22px", borderRadius: 999,
            background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%)",
            color: "#fff", fontWeight: 800, fontSize: "0.88rem",
            boxShadow: "0 8px 28px rgba(99,102,241,0.4)",
          }}>
            Request Now!
            <i className="bi bi-arrow-right" style={{ fontSize: "0.85rem" }} />
          </div>
        </div>
      </motion.a>

      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "7px 16px", borderRadius: 999,
            background: theme === "light" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.12)",
            border: `1px solid ${theme === "light" ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.25)"}`,
            fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8", letterSpacing: "0.04em",
            marginBottom: 24,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#38bdf8", animation: "pulse 2s infinite" }} />
            ENTERPRISE TELEMETRY &bull; LIVE SOC DEPLOYMENT
          </motion.div>

          <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible" style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.2rem)", fontWeight: 900, lineHeight: 1.05,
            letterSpacing: "-0.035em", marginBottom: 20,
          }}>
            Command Center
            <span style={{
              display: "block",
              background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Intelligence.
            </span>
          </motion.h1>

          <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible" style={{
            fontSize: "clamp(0.95rem, 1.2vw, 1.1rem)", color: "var(--text-secondary)",
            fontWeight: 400, lineHeight: 1.65, maxWidth: 600, margin: "0 auto 32px",
          }}>
            Behind Naitik Soni's portfolio operates a private, military-grade administrative platform.
            Explore all 15 operational modules — from real-time visitor forensics to autonomous SOC defenses.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" style={{
            display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 40,
          }}>
            <Link to="/modules" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 999,
              background: "linear-gradient(135deg, #4f46e5, #2563eb)",
              color: "#fff", fontWeight: 700, fontSize: "0.9rem",
              boxShadow: "0 6px 20px rgba(37,99,235,0.35)",
              transition: "all 0.25s",
              textDecoration: "none",
            }}>
              <i className="bi bi-layers-fill" /> Explore 15 Modules
            </Link>
            <a href="request-access.html" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: 999,
              background: theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
              border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.12)"}`,
              color: "var(--text-secondary)", fontWeight: 600, fontSize: "0.9rem",
              transition: "all 0.25s",
            }}>
              <i className="bi bi-envelope-check" /> Request Live Demo
            </a>
          </motion.div>

          {/* KPI Stat Cards */}
          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12,
          }}>
            {[
              { label: "Active Modules", value: "15 Real", sub: "100% Verified", subColor: "#38bdf8" },
              { label: "Geo Telemetry", value: "City & ASN", sub: "Global Accuracy", subColor: "#34d399" },
              { label: "SIEM Auditing", value: "Zero-Trust", sub: "Tamper-Proof", subColor: "#c084fc" },
              { label: "Autonomous AI", value: "NS.ai Pro", sub: "LLM Briefings", subColor: "#fbbf24" },
            ].map((s, i) => (
              <div key={i} style={{
                padding: "clamp(14px, 2vw, 20px)", borderRadius: 16,
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                textAlign: "center",
              }}>
                <div style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                <div style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", fontWeight: 800, color: "var(--text-primary)", marginTop: 4 }}>{s.value}</div>
                <div style={{ fontSize: "0.72rem", color: s.subColor, fontWeight: 600, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

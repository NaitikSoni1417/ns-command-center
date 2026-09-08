import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { securityFeatures, pipelineSteps, recruiterMetrics } from "../data/siteData";

export function Recruiter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  const steps = [
    { num: "01", color: "#38bdf8", title: "Portfolio Visit Detected", desc: "IP address resolved to corporate network (Google, Microsoft, Amazon). City, ISP, and ASN identified." },
    { num: "02", color: "#34d399", title: "Section Engagement Tracked", desc: "Dwell time on Projects, Experience, and Skills sections measured with scroll depth analytics." },
    { num: "03", color: "#c084fc", title: "Resume Downloaded", desc: "Highest-intent signal logged. Admin receives instant notification with full visitor forensics." },
    { num: "04", color: "#fbbf24", title: "Contact Form Submitted", desc: "Message saved to CRM with IP enrichment. Professional email notification dispatched instantly." },
  ];

  return (
    <section id="recruiters" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(192,132,252,0.08)" : "rgba(192,132,252,0.12)", border: `1px solid ${theme === "light" ? "rgba(192,132,252,0.2)" : "rgba(192,132,252,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.04em", marginBottom: 12 }}>RECRUITER INTELLIGENCE</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>What Enterprise Recruiters See</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>Every recruiter interaction is tracked, analyzed, and logged with full forensic context.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="recruiter-grid">
          {/* Left: Steps */}
          <div>
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
                style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: i < steps.length - 1 ? `1px solid var(--border-glass-subtle)` : "none" }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: s.color + "15", color: s.color, fontSize: "0.82rem", fontWeight: 900, flexShrink: 0 }}>{s.num}</div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 800, marginBottom: 4 }}>{s.title}</h4>
                  <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Metrics */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              padding: "clamp(24px, 4vw, 40px)", borderRadius: 20,
              background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
              border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
            }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#34d399" }} />
              <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "#34d399", textTransform: "uppercase" }}>Live Recruiter Metrics</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {recruiterMetrics.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", borderRadius: 12, background: theme === "light" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.03)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}` }}>
                  <div>
                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase" }}>{m.label}</div>
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginTop: 2 }}>{m.value}</div>
                  </div>
                  <div style={{ fontSize: "0.73rem", color: m.color, fontWeight: 700 }}>{m.change}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .recruiter-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

export function Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  return (
    <section id="architecture" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.12)", border: `1px solid ${theme === "light" ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8", letterSpacing: "0.04em", marginBottom: 12 }}>SYSTEM BLUEPRINT</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>The Telemetry Ingestion Pipeline</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 650, margin: "0 auto" }}>How raw visitor interaction streams transform into structured forensic telemetry.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="pipeline-grid">
          {pipelineSteps.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.6 }}
              style={{
                padding: "clamp(18px, 3vw, 24px)", borderRadius: 18,
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.3s",
              }}
              whileHover={{ y: -2 }}
            >
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: s.color, marginBottom: 10 }}>{s.num}</div>
              <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 8 }}>{s.title}</h4>
              <p style={{ fontSize: "0.83rem", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: 14 }}>{s.desc}</p>
              <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: "0.68rem", fontWeight: 700, background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`, color: "var(--text-muted)" }}>{s.badge}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .pipeline-grid { grid-template-columns: 1fr !important; } } @media (min-width: 769px) and (max-width: 992px) { .pipeline-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
    </section>
  );
}

export function Security() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  return (
    <section id="security" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={ref} style={{
          padding: "clamp(24px, 4vw, 40px)", borderRadius: 24,
          background: theme === "light" ? "rgba(255,255,255,0.82)" : "linear-gradient(180deg, rgba(56,189,248,0.04) 0%, rgba(0,0,0,0.65) 100%)",
          border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(56,189,248,0.15)"}`,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
            <div>
              <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.12)", border: `1px solid rgba(56,189,248,0.25)`, fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8", marginBottom: 12 }}><i className="bi bi-shield-check" style={{ marginRight: 6 }} />DEFENSIVE SECURITY ARCHITECTURE</div>
              <h3 style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>Engineered by a Cybersecurity Specialist.</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: 0 }}>Enterprise-grade defensive controls designed to protect portfolio telemetry.</p>
            </div>
            <a href="mailto:naitik.infosec@gmail.com" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 999,
              background: "linear-gradient(135deg, #4f46e5, #2563eb)", color: "#fff",
              fontWeight: 700, fontSize: "0.88rem", textDecoration: "none",
            }}><i className="bi bi-envelope" />Contact Developer</a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="security-grid">
            {securityFeatures.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                style={{
                  padding: "clamp(16px, 2.5vw, 22px)", borderRadius: 16,
                  background: theme === "light" ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
                }}>
                <i className={`bi ${s.icon}`} style={{ fontSize: "1.3rem", color: s.color }} />
                <h5 style={{ fontSize: "0.9rem", fontWeight: 700, marginTop: 12, marginBottom: 6 }}>{s.title}</h5>
                <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, lineHeight: 1.5 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 768px) { .security-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 576px) { .security-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

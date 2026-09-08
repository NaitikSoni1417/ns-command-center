import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../hooks/useTheme";
import { features } from "../data/siteData";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();

  return (
    <section id="features" style={{ padding: "clamp(40px, 6vw, 80px) 0 clamp(60px, 8vw, 100px)", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999,
            background: theme === "light" ? "rgba(52,211,153,0.08)" : "rgba(52,211,153,0.12)",
            border: `1px solid ${theme === "light" ? "rgba(52,211,153,0.2)" : "rgba(52,211,153,0.25)"}`,
            fontSize: "0.7rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.04em", marginBottom: 16,
          }}>WHY THIS PLATFORM EXISTS</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>Built for Situational Awareness.</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 650, margin: "0 auto" }}>
            A proprietary telemetry platform engineered to deliver real-time portfolio intelligence, recruiter forensics, and autonomous threat defense.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} style={{
              padding: "clamp(20px, 3vw, 28px)", borderRadius: 18,
              background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.3s", cursor: "default",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = f.color + "40"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: f.color + "15", border: `1px solid ${f.color}30`,
                color: f.color, fontSize: "1.15rem", marginBottom: 16,
              }}>
                <i className={`bi ${f.icon}`} />
              </div>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 800, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.55, margin: 0 }}>{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { techStack } from "../data/siteData";

export default function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  return (
    <section id="tech-stack" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(52,211,153,0.08)" : "rgba(52,211,153,0.12)", border: `1px solid ${theme === "light" ? "rgba(52,211,153,0.2)" : "rgba(52,211,153,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#34d399", letterSpacing: "0.04em", marginBottom: 12 }}>ENGINEERING EXCELLENCE</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>Built with Modern Infrastructure</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>Every layer of the stack is production-grade, battle-tested, and designed for zero-downtime telemetry.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="tech-grid">
          {techStack.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "clamp(20px, 3vw, 28px)", borderRadius: 18,
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                height: "100%", transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}
              whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(0,0,0,0.3)" }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: t.color + "12", border: `1px solid ${t.color}25`,
                color: t.color, fontSize: "1.2rem", marginBottom: 16,
              }}>
                <i className={`bi ${t.icon}`} />
              </div>
              <h4 style={{ fontSize: "1rem", fontWeight: 800, marginBottom: 6 }}>{t.name}</h4>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.55, marginBottom: 14 }}>{t.desc}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {t.tags.map((tag, j) => (
                  <span key={j} style={{ padding: "3px 8px", borderRadius: 6, fontSize: "0.66rem", fontWeight: 700, background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`, color: "var(--text-muted)" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`@media (max-width: 992px) { .tech-grid { grid-template-columns: repeat(2, 1fr) !important; } } @media (max-width: 576px) { .tech-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

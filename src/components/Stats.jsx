import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { stats } from "../data/siteData";

function AnimatedNumber({ value, suffix, inView }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const isFloat = value % 1 !== 0;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(isFloat ? parseFloat((value * eased).toFixed(1)) : Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value]);

  return <span>{display}{suffix}</span>;
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { theme } = useTheme();

  return (
    <section id="stats" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999,
            background: theme === "light" ? "rgba(251,191,36,0.08)" : "rgba(251,191,36,0.12)",
            border: `1px solid ${theme === "light" ? "rgba(251,191,36,0.2)" : "rgba(251,191,36,0.25)"}`,
            fontSize: "0.7rem", fontWeight: 700, color: "#fbbf24", letterSpacing: "0.04em", marginBottom: 12,
          }}>BY THE NUMBERS</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>Platform at a Glance</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", maxWidth: 600, margin: "0 auto" }}>
            Real operational metrics from Naitik Soni's proprietary command center infrastructure.
          </p>
        </div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "clamp(20px, 3vw, 32px)", borderRadius: 18,
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: s.color, lineHeight: 1 }}>
                <AnimatedNumber value={s.value} suffix={s.suffix} inView={inView} />
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 700, textTransform: "uppercase", marginTop: 10, letterSpacing: "0.04em" }}>{s.label}</div>
              <div style={{ fontSize: "0.7rem", color: s.color, fontWeight: 600, marginTop: 4 }}>{s.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

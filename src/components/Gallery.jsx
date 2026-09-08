import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { modules } from "../data/siteData";

export default function Gallery() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  return (
    <section id="gallery" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        <div ref={ref} style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(192,132,252,0.08)" : "rgba(192,132,252,0.12)", border: `1px solid ${theme === "light" ? "rgba(192,132,252,0.2)" : "rgba(192,132,252,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.04em", marginBottom: 12 }}>HIGH-RESOLUTION REPOSITORY</div>
            <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 6 }}>The Complete Visual Archive</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Click any module card to view details.</p>
          </div>
          <div style={{ padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.12)", border: `1px solid ${theme === "light" ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8" }}><i className="bi bi-images" style={{ marginRight: 6 }} />{modules.length} Screenshots</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
          {modules.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              onClick={() => setSelected(m)}
              style={{
                borderRadius: 16, overflow: "hidden", cursor: "pointer",
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}`,
                transition: "all 0.3s",
              }}
              whileHover={{ y: -4, borderColor: m.color + "40" }}
            >
              <div style={{
                height: 140, display: "flex", alignItems: "center", justifyContent: "center",
                background: `linear-gradient(135deg, ${m.color}15, ${m.color}05)`,
              }}>
                <i className={`bi ${m.icon}`} style={{ fontSize: "2.5rem", color: m.color, opacity: 0.7 }} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: "0.88rem", fontWeight: 800, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: "0.72rem", color: m.color, fontWeight: 600 }}>{m.category}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              style={{
                position: "fixed", inset: 0, zIndex: 200,
                background: "rgba(0,0,0,0.88)", backdropFilter: "blur(20px)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                padding: 24, cursor: "pointer",
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: "100%", maxWidth: 900, borderRadius: 20, overflow: "hidden",
                  background: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.95)",
                  border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.1)"}`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: `1px solid var(--border-glass-subtle)` }}>
                  <div>
                    <span style={{ padding: "4px 10px", borderRadius: 999, background: selected.color + "20", color: selected.color, fontSize: "0.68rem", fontWeight: 700 }}>{selected.category}</span>
                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginTop: 8, marginBottom: 0 }}>{selected.name}</h3>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ width: 36, height: 36, borderRadius: "50%", border: "none", background: theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)", color: "var(--text-primary)", cursor: "pointer", fontSize: "1rem" }}>
                    <i className="bi bi-x-lg" />
                  </button>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{
                    width: "100%", height: 350, borderRadius: 14,
                    background: `linear-gradient(135deg, ${selected.color}12, ${selected.color}05)`,
                    border: `1px solid ${selected.color}20`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
                  }}>
                    <i className={`bi ${selected.icon}`} style={{ fontSize: "4rem", color: selected.color, opacity: 0.5 }} />
                    <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>{selected.name}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", maxWidth: 400 }}>{selected.description}</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

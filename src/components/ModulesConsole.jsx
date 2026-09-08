import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { modules } from "../data/siteData";

const categories = ["All", ...new Set(modules.map((m) => m.category))];

export default function ModulesConsole() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeCat, setActiveCat] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  const filtered = activeCat === "All" ? modules : modules.filter((m) => m.category === activeCat);
  const mod = filtered[activeIdx] || filtered[0];

  return (
    <section id="console" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1200 }}>
        {/* Header */}
        <div ref={ref} style={{ textAlign: "center", maxWidth: 750, margin: "0 auto 40px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} style={{
            display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 16px", borderRadius: 999,
            background: theme === "light" ? "rgba(56,189,248,0.08)" : "rgba(56,189,248,0.12)",
            border: `1px solid ${theme === "light" ? "rgba(56,189,248,0.2)" : "rgba(56,189,248,0.25)"}`,
            fontSize: "0.7rem", fontWeight: 700, color: "#38bdf8", letterSpacing: "0.04em", marginBottom: 16,
          }}><i className="bi bi-terminal-fill" /> INTERACTIVE HUD CONSOLE</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1, duration: 0.6 }} style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Detailed Breakdown of All 15 Modules
          </motion.h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.6 }}>Each module is a fully functional administrative interface — not a mockup.</p>
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 20 }}>
          {categories.map((cat) => (
            <button key={cat} onClick={() => { setActiveCat(cat); setActiveIdx(0); }} style={{
              padding: "6px 16px", borderRadius: 999, border: "none", fontSize: "0.78rem", fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
              background: activeCat === cat ? "#38bdf8" : theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
              color: activeCat === cat ? "#fff" : "var(--text-muted)",
            }}>{cat}</button>
          ))}
        </div>

        {/* Module Tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: 24, scrollbarWidth: "thin" }}>
          {filtered.map((m, i) => (
            <button key={m.id} onClick={() => setActiveIdx(i)} style={{
              padding: "8px 16px", borderRadius: 12, border: "none", whiteSpace: "nowrap",
              fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              background: activeIdx === i ? m.color + "20" : theme === "light" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.04)",
              color: activeIdx === i ? m.color : "var(--text-muted)",
              border: activeIdx === i ? `1px solid ${m.color}40` : `1px solid transparent`,
            }}>
              <i className={`bi ${m.icon}`} style={{ marginRight: 6 }} />{m.name}
            </button>
          ))}
        </div>

        {/* Split View */}
        <div style={{
          borderRadius: 20, overflow: "hidden",
          background: theme === "light" ? "rgba(255,255,255,0.88)" : "rgba(0,0,0,0.65)",
          border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}`,
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 2fr) minmax(0, 3fr)" }} className="console-grid">
            {/* Left: Details */}
            <div style={{ padding: "clamp(20px, 3vw, 32px)", borderRight: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
              <AnimatePresence mode="wait">
                <motion.div key={mod.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.3 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: mod.color + "15", border: `1px solid ${mod.color}30`, color: mod.color, fontSize: "1.1rem" }}>
                      <i className={`bi ${mod.icon}`} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>{mod.name}</h3>
                      <span style={{ fontSize: "0.72rem", color: mod.color, fontWeight: 700 }}>{mod.category}</span>
                    </div>
                  </div>

                  {/* Overview */}
                  <div style={{ padding: "14px 16px", borderRadius: 14, background: theme === "light" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.03)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}`, marginBottom: 12 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 6 }}>Overview</div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>{mod.description}</p>
                  </div>

                  {/* Value */}
                  <div style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.15)", marginBottom: 16 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#34d399", marginBottom: 6 }}>Strategic Value</div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.55, margin: 0 }}>{mod.value}</p>
                  </div>

                  {/* Capabilities */}
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)", marginBottom: 8 }}>Capabilities</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {mod.capabilities.map((c, j) => (
                        <span key={j} style={{ padding: "5px 12px", borderRadius: 8, fontSize: "0.75rem", fontWeight: 600, background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)", color: "var(--text-muted)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>{c}</span>
                      ))}
                    </div>
                  </div>

                  {/* Pipeline */}
                  <div style={{ padding: "12px 14px", borderRadius: 12, background: theme === "light" ? "rgba(0,0,0,0.025)" : "rgba(0,0,0,0.35)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.04)"}`, marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap", fontSize: "0.78rem" }}>
                      {mod.pipeline.map((step, j) => (
                        <span key={j} style={{ color: "var(--text-muted)" }}>{step}{j < mod.pipeline.length - 1 && <span style={{ margin: "0 4px", color: "var(--text-dim)" }}>&rarr;</span>}</span>
                      ))}
                    </div>
                  </div>

                  {/* Specs */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 6 }}>
                    {Object.entries(mod.specs).map(([k, v]) => (
                      <div key={k} style={{ padding: "8px 10px", borderRadius: 8, background: theme === "light" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)", border: `1px solid ${theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)"}`, textAlign: "center" }}>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", fontWeight: 700, textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)", marginTop: 2 }}>{v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)"}` }}>
                    <button style={{
                      padding: "10px 22px", borderRadius: 999, border: "none", cursor: "pointer",
                      background: "linear-gradient(135deg, #4f46e5, #2563eb)", color: "#fff",
                      fontWeight: 700, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6,
                    }}><i className="bi bi-arrows-fullscreen" /> Inspect Mockup</button>
                    <a href="request-access.html" style={{
                      padding: "10px 20px", borderRadius: 999,
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed, #2563eb)", color: "#fff",
                      fontWeight: 700, fontSize: "0.82rem", display: "flex", alignItems: "center", gap: 6,
                      textDecoration: "none",
                    }}><i className="bi bi-envelope-check-fill" /> Request Demo</a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right: Preview */}
            <div style={{ background: theme === "light" ? "rgba(0,0,0,0.02)" : "rgba(0,0,0,0.3)", display: "flex", flexDirection: "column" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, padding: "10px 14px",
                borderBottom: `1px solid ${theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.04)"}`,
              }}>
                <div style={{ display: "flex", gap: 5 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#eab308" }} />
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
                </div>
                <div style={{
                  flex: 1, padding: "5px 12px", borderRadius: 8,
                  background: theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.05)",
                  fontSize: "0.7rem", color: "var(--text-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                }}>https://naitiksoni.netlify.app/admin#{mod.id}</div>
                <span style={{ fontSize: "0.68rem", color: "#34d399", fontWeight: 700, whiteSpace: "nowrap" }}><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#34d399", marginRight: 4 }} />LIVE</span>
              </div>
              <div style={{ flex: 1, minHeight: 350, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, position: "relative" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={mod.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} style={{
                    width: "100%", height: "100%", minHeight: 300, borderRadius: 12,
                    background: `linear-gradient(135deg, ${mod.color}10, ${mod.color}05)`,
                    border: `1px solid ${mod.color}20`,
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16,
                  }}>
                    <i className={`bi ${mod.icon}`} style={{ fontSize: "3rem", color: mod.color, opacity: 0.6 }} />
                    <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)" }}>{mod.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", maxWidth: 300 }}>{mod.description}</div>
                    <div style={{ padding: "6px 14px", borderRadius: 999, background: mod.color + "20", color: mod.color, fontSize: "0.72rem", fontWeight: 700 }}>Live Module Preview</div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div style={{
                padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between",
                borderTop: `1px solid ${theme === "light" ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.03)"}`,
                fontSize: "0.7rem", color: "var(--text-dim)",
              }}>
                <span><span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#34d399", marginRight: 4 }} />Telemetry Stream: Active</span>
                <span>Click to Enlarge</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .console-grid { grid-template-columns: 1fr !important; }
          .console-grid > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border-glass-subtle); }
        }
      `}</style>
    </section>
  );
}

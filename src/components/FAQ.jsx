import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { faqData } from "../data/siteData";

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { theme } = useTheme();

  return (
    <section id="faq" style={{ padding: "clamp(60px, 8vw, 100px) 0", position: "relative" }}>
      <div className="container" style={{ maxWidth: 1100 }}>
        <div ref={ref} style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", padding: "7px 16px", borderRadius: 999, background: theme === "light" ? "rgba(192,132,252,0.08)" : "rgba(192,132,252,0.12)", border: `1px solid ${theme === "light" ? "rgba(192,132,252,0.2)" : "rgba(192,132,252,0.25)"}`, fontSize: "0.7rem", fontWeight: 700, color: "#c084fc", letterSpacing: "0.04em", marginBottom: 12 }}>SYSTEM FAQS</div>
          <h2 style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", fontWeight: 900, letterSpacing: "-0.03em" }}>Frequently Asked Questions</h2>
        </div>

        <div style={{ maxWidth: 750, margin: "0 auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {faqData.map((faq, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }}
              style={{
                borderRadius: 16, overflow: "hidden",
                background: theme === "light" ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.65)",
                border: `1px solid ${openIdx === i ? (theme === "light" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.15)") : (theme === "light" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.06)")}`,
                transition: "border-color 0.3s",
              }}>
              <button onClick={() => setOpenIdx(openIdx === i ? null : i)} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "18px 22px", border: "none", background: "transparent",
                color: "var(--text-primary)", fontSize: "0.92rem", fontWeight: 700, cursor: "pointer", textAlign: "left",
              }}>
                <span>{faq.q}</span>
                <i className={`bi ${openIdx === i ? "bi-chevron-up" : "bi-chevron-down"}`} style={{ fontSize: "0.85rem", color: "var(--text-muted)", transition: "transform 0.3s", flexShrink: 0, marginLeft: 12 }} />
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                    <div style={{ padding: "0 22px 18px", fontSize: "0.87rem", color: "var(--text-muted)", lineHeight: 1.65 }}>{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

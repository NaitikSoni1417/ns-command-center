import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { MODULES } from "../data/modules";
import ModuleVisual from "./ModuleVisuals";

function HeroVisual() {
  const modules = MODULES.slice(0, 8);
  const angleStep = (2 * Math.PI) / modules.length;
  const cx = 140, cy = 140, r = 95;

  return (
    <svg viewBox="0 0 280 280" width="100%" height="100%" fill="none" style={{ maxWidth: 280 }}>
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 20} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={r} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
      <circle cx={cx} cy={cy} r={r - 30} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />

      {/* Connection lines from center to nodes */}
      {modules.map((_, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return <line key={`l${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />;
      })}

      {/* Inter-node connections */}
      {modules.map((_, i) => {
        const a1 = angleStep * i - Math.PI / 2;
        const a2 = angleStep * ((i + 1) % modules.length) - Math.PI / 2;
        return (
          <line key={`c${i}`}
            x1={cx + r * Math.cos(a1)} y1={cy + r * Math.sin(a1)}
            x2={cx + r * Math.cos(a2)} y2={cy + r * Math.sin(a2)}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"
          />
        );
      })}

      {/* Center mark */}
      <circle cx={cx} cy={cy} r="4" fill="rgba(255,255,255,0.12)" />
      <circle cx={cx} cy={cy} r="1.5" fill="rgba(255,255,255,0.4)" />

      {/* Module nodes */}
      {modules.map((mod, i) => {
        const angle = angleStep * i - Math.PI / 2;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        return (
          <g key={mod.id}>
            <circle cx={x} cy={y} r="3" fill="rgba(255,255,255,0.2)" />
            <circle cx={x} cy={y} r="1.2" fill="rgba(255,255,255,0.6)" />
          </g>
        );
      })}
    </svg>
  );
}

function ModuleSection({ mod, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const reverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      id={`module-${mod.num}`}
      className="module-section"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
        gap: "clamp(32px, 5vw, 72px)",
        alignItems: "center",
        padding: "clamp(40px, 5vw, 64px) 0",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ order: reverse ? 1 : 0 }}
      >
        {/* Number */}
        <div style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 200, color: "rgba(255,255,255,0.1)", letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 12, fontVariantNumeric: "tabular-nums" }}>
          {mod.num}
        </div>

        {/* Category */}
        <div style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
          {mod.category}
        </div>

        {/* Name */}
        <h3 style={{ fontSize: "clamp(1.2rem, 2vw, 1.6rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 16, lineHeight: 1.15 }}>
          {mod.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: "clamp(0.88rem, 1.1vw, 0.95rem)", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 440, marginBottom: 28 }}>
          {mod.desc}
        </p>

        {/* What it does */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
            What it does
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {mod.does.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.15)", marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
          {mod.caps.map((cap, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
              style={{
                padding: "5px 12px",
                borderRadius: 4,
                border: "1px solid rgba(255,255,255,0.06)",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.01em",
              }}
            >
              {cap}
            </motion.span>
          ))}
        </div>

        {/* Read More */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.35, delay: 0.4 }}
        >
          <Link
            to={mod.route}
            className="read-more-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.6)",
              fontWeight: 600,
              fontSize: "0.82rem",
              textDecoration: "none",
              transition: "border-color 0.25s, color 0.25s, background 0.25s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            Read More
            <svg className="read-more-arrow" width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ transition: "transform 0.25s" }}>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </motion.div>

      {/* Visual */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          order: reverse ? 0 : 1,
        }}
      >
        <ModuleVisual moduleId={mod.id} />
      </motion.div>
    </div>
  );
}

export default function OverviewSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef([]);

  const handleScroll = useCallback(() => {
    const center = window.innerHeight / 2;
    let closest = 0;
    let minDist = Infinity;
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(rect.top + rect.height / 2 - center);
      if (dist < minDist) { minDist = dist; closest = i; }
    });
    setActiveIdx(closest);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (i) => {
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section id="overview" style={{ position: "relative", background: "#0a0a0a" }}>
      {/* Hero */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", gap: "clamp(32px, 5vw, 80px)", alignItems: "center", maxWidth: 1100, margin: "0 auto", padding: "clamp(80px, 14vh, 160px) clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)" }}>
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 20 }}>
            Command Center
          </motion.div>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: "#fff", marginBottom: 20 }}>
            Inside the<br />Command Center
          </motion.h2>

          <motion.p initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            style={{ fontSize: "clamp(0.92rem, 1.2vw, 1.05rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 440 }}>
            15 intelligent modules. One unified digital command center.
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            style={{ fontSize: "clamp(0.82rem, 1vw, 0.9rem)", color: "rgba(255,255,255,0.28)", lineHeight: 1.65, maxWidth: 400, marginTop: 14 }}>
            Designed to bring visibility, intelligence, security, and control into one connected workspace.
          </motion.p>
        </div>

        {/* Hero visual — abstract system architecture */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="overview-hero-visual"
          style={{ width: "clamp(180px, 22vw, 280px)", height: "clamp(180px, 22vw, 280px)" }}>
          <HeroVisual />
        </motion.div>
      </div>

      {/* System intro */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 clamp(24px, 6vw, 80px) clamp(48px, 8vh, 80px)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          style={{ fontSize: "0.68rem", fontWeight: 600, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 16 }}>
          The System
        </motion.div>
        <motion.h3 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.05 }}
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em", marginBottom: 14 }}>
          15 modules. One connected ecosystem.
        </motion.h3>
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          style={{ fontSize: "clamp(0.85rem, 1vw, 0.92rem)", color: "rgba(255,255,255,0.35)", lineHeight: 1.65 }}>
          Each module has a focused purpose, while the entire platform works as a single operational system.
        </motion.p>
      </div>

      {/* Chapter rail + Modules */}
      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", padding: "0 clamp(16px, 4vw, 40px) clamp(60px, 8vh, 100px)", gap: 0, position: "relative" }}>
        {/* Chapter rail — desktop only */}
        <div className="overview-rail" style={{
          position: "sticky",
          top: "clamp(80px, 10vh, 120px)",
          alignSelf: "flex-start",
          width: 56,
          flexShrink: 0,
          marginRight: 24,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          maxHeight: "calc(100vh - 160px)",
        }}>
          {/* Progress line */}
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: "rgba(255,255,255,0.04)", transform: "translateX(-50%)" }} />
          <div style={{ position: "absolute", left: "50%", top: 0, width: 1, background: "rgba(255,255,255,0.12)", transform: "translateX(-50%)", height: `${((activeIdx + 1) / MODULES.length) * 100}%`, transition: "height 0.4s ease" }} />

          {MODULES.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => scrollTo(i)}
              style={{
                position: "relative",
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                zIndex: 1,
              }}
              title={mod.label}
            >
              <span style={{
                fontSize: "0.6rem",
                fontWeight: 700,
                fontVariantNumeric: "tabular-nums",
                color: activeIdx === i ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.15)",
                transition: "color 0.3s",
              }}>
                {mod.num}
              </span>
            </button>
          ))}
        </div>

        {/* Modules */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {MODULES.map((mod, i) => (
            <div key={mod.id} ref={(el) => { sectionRefs.current[i] = el; }}>
              <ModuleSection mod={mod} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* Closing */}
      <div style={{ maxWidth: 600, margin: "0 auto", padding: "clamp(60px, 10vh, 100px) clamp(24px, 6vw, 80px) clamp(80px, 12vh, 140px)", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff", marginBottom: 16 }}>
            15 modules.<br />One command center.
          </h2>
          <p style={{ fontSize: "clamp(0.85rem, 1.1vw, 0.95rem)", color: "rgba(255,255,255,0.35)", lineHeight: 1.65, maxWidth: 400, margin: "0 auto 32px" }}>
            Connected tools. Shared intelligence. One operational layer.
          </p>
          <Link
            to="/modules"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              fontWeight: 600,
              fontSize: "0.85rem",
              cursor: "pointer",
              textDecoration: "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            Explore NS Control Hub
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Styles */}
      <style>{`
        @media (max-width: 900px) {
          .overview-rail { display: none !important; }
          .overview-hero-visual { display: none !important; }
          #overview .module-section { grid-template-columns: 1fr !important; }
          #overview .module-section > div { order: 0 !important; }
        }
        .read-more-link:hover .read-more-arrow {
          transform: translateX(3px);
        }
        .module-screenshot {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .module-screenshot:hover {
          transform: translateY(-2px) scale(1.01);
          filter: brightness(1.05);
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
          .module-screenshot:hover { transform: none; filter: none; }
        }
      `}</style>
    </section>
  );
}

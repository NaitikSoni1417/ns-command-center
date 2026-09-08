import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { MODULES } from "../data/modules";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function BackLink() {
  return (
    <Link
      to="/modules"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: "rgba(255,255,255,0.35)",
        textDecoration: "none",
        fontSize: "0.8rem",
        fontWeight: 500,
        marginBottom: 40,
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Back to Overview
    </Link>
  );
}

function OpenModuleButton({ moduleRoute, name, detailRoute }) {
  const target = detailRoute || moduleRoute;
  if (!target || target === "/") return null;
  return (
    <Link
      to={target}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "16px 36px",
        borderRadius: 8,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        color: "rgba(255,255,255,0.85)",
        fontWeight: 600,
        fontSize: "0.92rem",
        textDecoration: "none",
        transition: "all 0.25s ease",
        backdropFilter: "blur(12px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.1)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      Explore {name}
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

function RelatedModules({ related }) {
  const relatedModules = related
    .map((id) => MODULES.find((m) => m.id === id))
    .filter(Boolean);

  if (relatedModules.length === 0) return null;

  return (
    <div>
      <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
        Related Modules
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {relatedModules.map((mod) => (
          <Link
            key={mod.id}
            to={mod.route}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: 6,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.55)",
              textDecoration: "none",
              fontSize: "0.82rem",
              fontWeight: 500,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.85)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.55)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
          >
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)", fontVariantNumeric: "tabular-nums" }}>{mod.num}</span>
            {mod.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function Lightbox({ src, alt, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(48px, 8vh, 80px) clamp(24px, 5vw, 60px)",
        cursor: "zoom-out",
      }}
    >
      {/* Close button — ChatGPT style X top-right */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "none",
          background: "rgba(255,255,255,0.1)",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          zIndex: 10,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.2)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Image */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "contain",
          borderRadius: 6,
          boxShadow: "0 16px 64px rgba(0,0,0,0.5)",
          cursor: "default",
        }}
      />

      {/* Bottom label */}
      <div style={{
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: "0.72rem",
        color: "rgba(255,255,255,0.35)",
        letterSpacing: "0.01em",
      }}>
        {alt}
      </div>
    </motion.div>
  );
}

export default function ModuleDetailPage() {
  const { slug } = useParams();
  const mod = MODULES.find((m) => m.route === `/overview/${slug}`);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!mod) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700, marginBottom: 16 }}>Module Not Found</h1>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>The requested module does not exist.</p>
          <Link to="/" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "underline" }}>Return to Overview</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "clamp(50px, 8vh, 80px) clamp(24px, 5vw, 60px) clamp(80px, 12vh, 140px)",
      }}>
        <BackLink />

        {/* ─── 2-COLUMN HERO: Screenshot + Detail ─── */}
        <div className="module-detail-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(32px, 4vw, 60px)",
          alignItems: "start",
          marginBottom: "clamp(60px, 8vw, 100px)",
        }}>
          {/* LEFT: Real Screenshot */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6 }}
            style={{
              position: "relative",
              borderRadius: 12,
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#111",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
          >
            {/* macOS title bar */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 14px",
              background: "#1a1a1a",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
              <span style={{ flex: 1, textAlign: "center", fontSize: "0.68rem", color: "rgba(255,255,255,0.3)", fontWeight: 500, letterSpacing: "0.02em" }}>
                NS Command Center — {mod.label}
              </span>
            </div>
            {/* Screenshot — clickable */}
            <div
              onClick={() => setLightbox({ src: mod.screenshot, alt: `${mod.name} — Admin Panel Screenshot` })}
              style={{ cursor: "zoom-in" }}
            >
              <img
                src={mod.screenshot}
                alt={`${mod.name} — Admin Panel Screenshot`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              />
            </div>
          </motion.div>

          {/* RIGHT: Detail Content */}
          <motion.div
            {...fadeUp}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{ paddingTop: "clamp(8px, 2vw, 16px)" }}
          >
            {/* Category */}
            <div style={{
              display: "inline-block",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.3)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 16,
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.03)",
            }}>
              {mod.category}
            </div>

            {/* Module Number */}
            <div style={{
              fontSize: "clamp(3rem, 6vw, 5rem)",
              fontWeight: 200,
              color: "rgba(255,255,255,0.06)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 8,
              fontVariantNumeric: "tabular-nums",
            }}>
              {mod.num}
            </div>

            {/* Module Name */}
            <h1 style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              marginBottom: 20,
            }}>
              {mod.name}
            </h1>

            {/* Summary */}
            <p style={{
              fontSize: "clamp(0.88rem, 1.1vw, 1rem)",
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.7,
              marginBottom: 28,
            }}>
              {mod.summary}
            </p>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 28 }} />

            {/* What It Is */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                What It Is
              </div>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>
                {mod.whatItIs.length > 280 ? mod.whatItIs.slice(0, 280) + "..." : mod.whatItIs}
              </p>
            </div>

            {/* Key Capabilities */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>
                Key Capabilities
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {mod.caps.map((cap, i) => (
                  <span
                    key={i}
                    style={{
                      padding: "6px 14px",
                      borderRadius: 5,
                      border: "1px solid rgba(255,255,255,0.06)",
                      fontSize: "0.78rem",
                      fontWeight: 500,
                      color: "rgba(255,255,255,0.45)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {cap}
                  </span>
                ))}
              </div>
            </div>

            {/* Open Module Button */}
            <OpenModuleButton moduleRoute={mod.moduleRoute} detailRoute={mod.route} name={mod.name} />
          </motion.div>
        </div>

        {/* ─── FULL-WIDTH SECTIONS ─── */}

        {/* What It Does */}
        <motion.div {...fadeUp} transition={{ delay: 0.2, duration: 0.5 }} style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16 }}>
            What It Does
          </div>
          <p style={{ fontSize: "clamp(0.92rem, 1.1vw, 1rem)", color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 800 }}>
            {mod.whatItDoesDetail}
          </p>
        </motion.div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginBottom: "clamp(48px, 6vw, 72px)" }} />

        {/* How It Works */}
        <motion.div {...fadeUp} transition={{ delay: 0.25, duration: 0.5 }} style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
            How It Works
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {mod.howItWorks.map((step, i) => (
              <div key={i} style={{
                padding: "20px 24px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
              }}>
                <div style={{
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.15)",
                  fontVariantNumeric: "tabular-nums",
                  marginBottom: 8,
                }}>
                  Step {String(i + 1).padStart(2, "0")}
                </div>
                <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginBottom: "clamp(48px, 6vw, 72px)" }} />

        {/* What You Can See */}
        <motion.div {...fadeUp} transition={{ delay: 0.3, duration: 0.5 }} style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <div style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
            What You Can See
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            {mod.whatYouCanSee.map((item, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "14px 18px",
                borderRadius: 6,
                border: "1px solid rgba(255,255,255,0.04)",
                background: "rgba(255,255,255,0.015)",
              }}>
                <span style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  marginTop: 7,
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ height: 1, background: "rgba(255,255,255,0.04)", marginBottom: "clamp(48px, 6vw, 72px)" }} />

        {/* Related Modules */}
        <motion.div {...fadeUp} transition={{ delay: 0.35, duration: 0.5 }} style={{ marginBottom: "clamp(48px, 6vw, 72px)" }}>
          <RelatedModules related={mod.relatedModules || []} />
        </motion.div>

        {/* Bottom Back */}
        <BackLink />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @media (max-width: 860px) {
          .module-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <AnimatePresence>
        {lightbox && (
          <Lightbox
            src={lightbox.src}
            alt={lightbox.alt}
            onClose={() => setLightbox(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

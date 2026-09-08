import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { MODULES } from "../data/modules";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };

function ModuleCard({ mod, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * index, duration: 0.5 }}
    >
      <Link
        to={mod.route}
        style={{
          display: "block",
          borderRadius: 12,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "#111",
          textDecoration: "none",
          transition: "all 0.3s ease",
          boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px) scale(1.01)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.boxShadow = "0 12px 48px rgba(0,0,0,0.5)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0) scale(1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
          e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)";
        }}
      >
        {/* macOS title bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "8px 12px",
          background: "#1a1a1a",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
          <span style={{
            flex: 1,
            textAlign: "center",
            fontSize: "0.6rem",
            color: "rgba(255,255,255,0.25)",
            fontWeight: 500,
            letterSpacing: "0.02em",
          }}>
            {mod.label}
          </span>
        </div>

        {/* Screenshot */}
        <div style={{
          width: "100%",
          aspectRatio: "16/10",
          overflow: "hidden",
          background: "#0a0a0a",
        }}>
          <img
            src={mod.screenshot}
            alt={mod.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Info */}
        <div style={{
          padding: "14px 16px 16px",
          background: "#111",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}>
            <span style={{
              fontSize: "0.6rem",
              fontWeight: 700,
              color: "rgba(255,255,255,0.2)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              {mod.category}
            </span>
            <span style={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.15)",
              fontVariantNumeric: "tabular-nums",
            }}>
              {mod.num}
            </span>
          </div>
          <h3 style={{
            fontSize: "0.95rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            marginBottom: 4,
          }}>
            {mod.name}
          </h3>
          <p style={{
            fontSize: "0.78rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {mod.desc}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function AllModulesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "clamp(50px, 8vh, 80px) clamp(20px, 4vw, 60px) clamp(80px, 12vh, 140px)",
      }}>
        {/* Back */}
        <Link
          to="/"
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
          Back to Home
        </Link>

        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} style={{ marginBottom: "clamp(40px, 6vw, 64px)" }}>
          <div style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: 12,
          }}>
            All Modules
          </div>
          <h1 style={{
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            marginBottom: 12,
          }}>
            15 modules. One command center.
          </h1>
          <p style={{
            fontSize: "clamp(0.9rem, 1.2vw, 1rem)",
            color: "rgba(255,255,255,0.45)",
            lineHeight: 1.6,
            maxWidth: 560,
          }}>
            Every module shown with its real admin panel interface. Click any module to see full details.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "clamp(16px, 2vw, 24px)",
        }}>
          {MODULES.map((mod, i) => (
            <ModuleCard key={mod.id} mod={mod} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </div>
  );
}

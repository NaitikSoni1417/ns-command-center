import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.15 + i * 0.12,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function HomeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);

  return (
    <section
      id="home"
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#0b1a2e",
      }}
    >
      {/* Background Image — parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-15% 0",
          backgroundImage: "url(/hero-bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center 45%",
          y: bgY,
          willChange: "transform",
          zIndex: 0,
        }}
      />

      {/* Gradient Overlay — cinematic, preserves sky */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            linear-gradient(
              to top,
              rgba(0, 0, 0, 0.82) 0%,
              rgba(0, 0, 0, 0.55) 25%,
              rgba(0, 0, 0, 0.20) 50%,
              rgba(0, 0, 0, 0.05) 70%,
              transparent 100%
            )
          `,
          zIndex: 1,
        }}
      />

      {/* Subtle side vignette for depth */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.15) 100%)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          opacity: contentOpacity,
          y: contentY,
          width: "100%",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px)",
          paddingTop: "clamp(100px, 14vh, 160px)",
          paddingBottom: "clamp(60px, 10vh, 120px)",
        }}
      >
        <div style={{ maxWidth: 680 }}>
          {/* Eyebrow tag */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 14px 6px 10px",
              borderRadius: 999,
              background: "rgba(255, 255, 255, 0.07)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              marginBottom: "clamp(20px, 3vw, 32px)",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 8px rgba(56, 189, 248, 0.6)",
                animation: "pulse-dot 2.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.78rem",
                fontWeight: 600,
                color: "rgba(255, 255, 255, 0.7)",
                letterSpacing: "0.03em",
              }}
            >
              Active Threat Monitoring
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            style={{
              fontSize: "clamp(2.6rem, 6.5vw, 5.6rem)",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
              color: "#fff",
              marginBottom: "clamp(16px, 2vw, 24px)",
            }}
          >
            Digital Intelligence,
            <br />
            <span style={{ color: "rgba(255, 255, 255, 0.55)" }}>
              Simplified.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            style={{
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              color: "rgba(255, 255, 255, 0.55)",
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: 540,
              marginBottom: "clamp(28px, 4vw, 44px)",
            }}
          >
            Real-time visibility, security intelligence, and complete
            control — unified in one command center.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(12px, 2vw, 20px)",
              flexWrap: "wrap",
            }}
          >
            {/* Primary CTA */}
            <Link
              to="/modules"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 30px",
                borderRadius: 999,
                background: "linear-gradient(135deg, rgba(99, 102, 241, 0.85) 0%, rgba(79, 70, 229, 0.9) 100%)",
                color: "#fff",
                fontWeight: 600,
                fontSize: "0.92rem",
                letterSpacing: "0.01em",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)",
                cursor: "pointer",
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(99, 102, 241, 0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)";
              }}
            >
              Explore Command Center
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 1 }}>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>


          </motion.div>
        </div>
      </motion.div>

      {/* Floating Request Now CTA — lower right */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          bottom: "clamp(32px, 6vh, 64px)",
          right: "clamp(20px, 4vw, 48px)",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        {/* Curved arrow */}
        <motion.svg
          width="clamp(60px, 8vw, 100px)"
          height="clamp(44px, 6vw, 72px)"
          viewBox="0 0 100 72"
          fill="none"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 2.0 }}
          style={{
            marginBottom: "clamp(-2px, 0.3vw, 0px)",
          }}
        >
          <motion.path
            d="M12 8 C18 6, 70 10, 82 48"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 2.1, ease: "easeOut" }}
          />
          <motion.path
            d="M76 44 L84 50 L75 53"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 2.7 }}
          />
        </motion.svg>

        {/* Request Now! button */}
        <motion.a
          href="#request"
          whileHover={{
            y: -2,
            boxShadow: "0 8px 30px rgba(56, 189, 248, 0.2), 0 0 16px rgba(56, 189, 248, 0.1)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "clamp(6px, 0.8vw, 10px)",
            padding: "clamp(12px, 1.4vw, 16px) clamp(20px, 2.5vw, 30px)",
            borderRadius: 999,
            background: "linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(99, 102, 241, 0.12) 100%)",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            color: "#fff",
            fontWeight: 600,
            fontSize: "clamp(0.82rem, 1.1vw, 0.92rem)",
            letterSpacing: "0.01em",
            cursor: "pointer",
            textDecoration: "none",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)",
            transition: "box-shadow 0.3s ease",
            whiteSpace: "nowrap",
          }}
        >
          Request Now!
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            style={{ marginTop: 1 }}
            animate={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.a>
      </motion.div>

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: "linear-gradient(to top, #0b1a2e 0%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Pulse animation for the dot */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse-dot { 0%, 100% { opacity: 1; transform: scale(1); } }
        }
      `}</style>
    </section>
  );
}

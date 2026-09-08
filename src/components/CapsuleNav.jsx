import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Overview", href: "#overview" },
  { label: "Request", href: "#request" },
  { label: "Contact Us", href: "#contact" },
];

const DELAYS = [0.05, 0.11, 0.17, 0.23];
const ITEM_DUR = 0.3;
const CLOSE_DELAY = 150;
const EASE = [0.22, 1, 0.36, 1];
const ROLLOVER_MS = 320;

/* ─── Menu Item with Staggered Entry + Track-Based Text Rollover ─── */
function MenuItem({ item, index, close }) {
  const [hovered, setHovered] = useState(false);
  const delay = DELAYS[index] || 0;

  const TEXT_H = 20;

  const textStyle = {
    fontSize: "0.95rem",
    fontWeight: 500,
    fontFamily: "inherit",
    whiteSpace: "nowrap",
    lineHeight: `${TEXT_H}px`,
    height: `${TEXT_H}px`,
    display: "flex",
    alignItems: "center",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ delay, duration: ITEM_DUR, ease: EASE }}
      style={{ padding: "2px 0" }}
    >
      <a
        href={item.href}
        role="menuitem"
        tabIndex={-1}
        onClick={close}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
          height: 50,
          borderRadius: 14,
          color: hovered ? "#fff" : "rgba(255, 255, 255, 0.75)",
          textDecoration: "none",
          position: "relative",
          background: hovered ? "rgba(56, 189, 248, 0.1)" : "transparent",
          boxShadow: hovered
            ? "0 4px 20px rgba(56, 189, 248, 0.06), inset 0 1px 0 rgba(255,255,255,0.05)"
            : "none",
          transition: "background 0.22s ease, box-shadow 0.22s ease, color 0.22s ease",
        }}
      >
        {/* ── Text Window ── */}
        <div
          style={{
            position: "relative",
            height: `${TEXT_H}px`,
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* ── Text Track — slides up on hover ── */}
          <div
            style={{
              transform: hovered ? `translateY(-${TEXT_H}px)` : "translateY(0)",
              transition: `transform ${ROLLOVER_MS}ms ${EASE.join(",")}`,
              willChange: "transform",
            }}
          >
            {/* Copy 1 — original */}
            <span style={{ ...textStyle, color: "inherit" }}>
              {item.label}
            </span>

            {/* Copy 2 — duplicate below */}
            <span style={{ ...textStyle, color: "#fff" }}>
              {item.label}
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}

/* ─── Main Navbar ─── */
export default function CapsuleNav() {
  const [expanded, setExpanded] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [navHovered, setNavHovered] = useState(false);
  const lastY = useRef(0);
  const navRef = useRef(null);
  const panelRef = useRef(null);
  const regionRef = useRef(null);
  const closeTimer = useRef(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY.current;
    if (latest < 60) {
      setHidden(false);
    } else if (diff > 10) {
      setHidden(true);
      setExpanded(false);
    } else if (diff < -10) {
      setHidden(false);
    }
    lastY.current = latest;
  });

  const close = useCallback(() => setExpanded(false), []);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(close, CLOSE_DELAY);
  }, [close]);

  const cancelClose = useCallback(() => {
    clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (regionRef.current && !regionRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        paddingTop: "clamp(20px, 3.5vh, 32px)",
        pointerEvents: "none",
      }}
    >
      <div
        ref={regionRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pointerEvents: "auto",
          width: "100%",
          maxWidth: 600,
          padding: "0 12px",
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        {/* ─── Main Pill ─── */}
        <motion.nav
          ref={navRef}
          id="capsule-nav"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          role="navigation"
          aria-label="Main navigation"
          onMouseEnter={() => setNavHovered(true)}
          onMouseLeave={() => setNavHovered(false)}
          style={{
            position: "relative",
            width: "fit-content",
            height: 62,
            background: navHovered || expanded ? "rgba(10, 25, 50, 0.6)" : "rgba(10, 25, 50, 0.45)",
            backdropFilter: "blur(40px) saturate(1.8)",
            WebkitBackdropFilter: "blur(40px) saturate(1.8)",
            border: "0.5px solid rgba(100, 200, 255, 0.12)",
            borderRadius: 9999,
            padding: "8px 8px 8px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            boxShadow: navHovered || expanded
              ? "0 8px 36px rgba(0,0,0,0.25), 0 2px 12px rgba(56,189,248,0.06), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(255,255,255,0.04)"
              : "0 8px 32px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.04)",
            transition: "background 0.3s ease, box-shadow 0.3s ease",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "10%",
              right: "10%",
              height: "0.5px",
              background: "linear-gradient(90deg, transparent, rgba(100,200,255,0.3) 30%, rgba(100,200,255,0.4) 50%, rgba(100,200,255,0.3) 70%, transparent)",
              borderRadius: 9999,
              pointerEvents: "none",
            }}
          />

          <a
            href="#home"
            onClick={close}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "#fff",
              whiteSpace: "nowrap",
              position: "relative",
              zIndex: 1,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                borderRadius: 11,
                background: "rgba(56, 189, 248, 0.1)",
                border: "0.5px solid rgba(100, 200, 255, 0.12)",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: "rgba(200, 230, 255, 0.95)",
                flexShrink: 0,
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(255,255,255,0.04)",
              }}
            >
              NS
            </span>
            <span
              style={{
                fontSize: "0.98rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "rgba(220, 240, 255, 0.92)",
              }}
            >
              Command Center
            </span>
          </a>

          <span
            style={{
              width: 0.5,
              height: 26,
              background: "rgba(100, 200, 255, 0.12)",
              flexShrink: 0,
              position: "relative",
              zIndex: 1,
            }}
          />

          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="capsule-dropdown"
            aria-label={expanded ? "Close menu" : "Open menu"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "10px 22px",
              borderRadius: 9999,
              border: "0.5px solid rgba(100, 200, 255, 0.12)",
              background: expanded ? "rgba(56, 189, 248, 0.12)" : "rgba(255, 255, 255, 0.06)",
              color: "rgba(220, 240, 255, 0.9)",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: "pointer",
              whiteSpace: "nowrap",
              lineHeight: 1,
              transition: "background 0.25s ease, border-color 0.25s ease, transform 0.15s ease",
              position: "relative",
              zIndex: 1,
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)",
            }}
            onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.96)"; }}
            onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = expanded ? "rgba(56,189,248,0.16)" : "rgba(255,255,255,0.1)";
              e.currentTarget.style.borderColor = "rgba(100, 200, 255, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              if (!expanded) {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                e.currentTarget.style.borderColor = "rgba(100, 200, 255, 0.12)";
              }
            }}
          >
            <span>Menu</span>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 20, height: 20 }}>
              <AnimatePresence mode="wait" initial={false}>
                {expanded ? (
                  <motion.svg key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.18 }} width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </motion.svg>
                ) : (
                  <motion.svg key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.18 }} width="16" height="16" viewBox="0 0 14 14" fill="none">
                    <path d="M2 4h10M2 7h10M2 10h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </motion.svg>
                )}
              </AnimatePresence>
            </span>
          </button>
        </motion.nav>

        {/* ─── Dropdown Panel ─── */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              ref={panelRef}
              id="capsule-dropdown"
              role="menu"
              initial={{ opacity: 0, y: -10, scale: 0.97, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, scale: 0.98, filter: "blur(4px)" }}
              transition={{ duration: 0.28, ease: EASE }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 400,
                marginTop: 10,
                background: "rgba(8, 20, 42, 0.7)",
                backdropFilter: "blur(44px) saturate(1.8)",
                WebkitBackdropFilter: "blur(44px) saturate(1.8)",
                border: "0.5px solid rgba(100, 200, 255, 0.1)",
                borderRadius: 28,
                padding: "10px 10px",
                boxShadow: "0 24px 80px rgba(0,0,0,0.4), 0 8px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.03)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: "8%",
                  right: "8%",
                  height: "0.5px",
                  background: "linear-gradient(90deg, transparent, rgba(100,200,255,0.25) 30%, rgba(100,200,255,0.35) 50%, rgba(100,200,255,0.25) 70%, transparent)",
                  borderRadius: 9999,
                  pointerEvents: "none",
                }}
              />

              {navItems.map((item, i) => (
                <MenuItem key={item.href} item={item} index={i} close={close} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

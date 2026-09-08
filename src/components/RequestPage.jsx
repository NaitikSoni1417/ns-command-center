import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { submitRequest } from "../services/requestService";

const fadeUp = { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

const REQUEST_TYPES = ["Project Inquiry", "Collaboration", "Security / Technical", "Website / Development", "Other"];
const INITIAL_FORM = { name: "", email: "", organization: "", requestType: "", project: "", details: "" };
const LIMITS = { name: 80, email: 254, organization: 120, project: 2000, details: 3000 };

function validate(form) {
  const e = {};
  const n = form.name.trim(), em = form.email.trim(), p = form.project.trim();
  if (!n || n.length < 2) e.name = "Please enter your name.";
  else if (n.length > LIMITS.name) e.name = `Max ${LIMITS.name} characters.`;
  if (!em) e.email = "Please enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) e.email = "Invalid email address.";
  if (!form.requestType) e.requestType = "Please select a type.";
  if (!p || p.length < 20) e.project = "Please describe your project (min 20 characters).";
  else if (p.length > LIMITS.project) e.project = `Max ${LIMITS.project} characters.`;
  if (form.organization.length > LIMITS.organization) e.organization = `Max ${LIMITS.organization} characters.`;
  if (form.details.length > LIMITS.details) e.details = `Max ${LIMITS.details} characters.`;
  return e;
}

/* ─── ICONS (inline SVG) ─── */
const IconUser = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconMail = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
const IconBuilding = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>;
const IconGrid = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>;
const IconFile = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>;
const IconFileText = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>;

/* ─── GLOBE VISUAL ─── */
function GlobeVisual() {
  return (
    <div style={{ position: "relative", width: 280, height: 280, margin: "32px 0 0 -20px", opacity: 0.4 }}>
      <svg viewBox="0 0 300 300" width="100%" height="100%">
        <defs>
          <radialGradient id="gGlowW" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="150" cy="150" r="110" fill="url(#gGlowW)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <ellipse cx="150" cy="150" rx="110" ry="40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4" />
        <ellipse cx="150" cy="150" rx="110" ry="70" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />
        <ellipse cx="150" cy="150" rx="40" ry="110" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="0.4" />
        <ellipse cx="150" cy="150" rx="75" ry="110" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
        {[[80,100,150,80],[150,80,220,110],[220,110,200,180],[200,180,120,200],[120,200,80,100]].map(([x1,y1,x2,y2],i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        ))}
        {[[80,100],[150,80],[220,110],[200,180],[120,200],[160,150],[100,140],[190,140]].map(([x,y],i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="8" fill="rgba(255,255,255,0.04)" />
            <circle cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.25)" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── FLOW STEPS ─── */
function FlowSteps() {
  const steps = [
    { icon: <IconUser />, title: "Your Request", sub: "Share your details", active: true },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, title: "Review", sub: "We analyze & prepare", active: false },
    { icon: <IconMail />, title: "Response", sub: "Get in touch soon", active: false },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative", zIndex: 2 }}>
      {steps.map((s, i) => (
        <div key={s.title} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              border: `1px solid ${s.active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)"}`,
              background: s.active ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.02)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: s.active ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)",
              boxShadow: s.active ? "0 0 20px rgba(255,255,255,0.06)" : "none",
              flexShrink: 0,
            }}>
              {s.icon}
            </div>
            {i < steps.length - 1 && (
              <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.05)" }} />
            )}
          </div>
          <div style={{ paddingTop: 10 }}>
            <div style={{ fontSize: "0.88rem", fontWeight: 600, color: s.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", marginBottom: 2 }}>
              {s.title}
            </div>
            <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>
              {s.sub}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── TRUST BADGES ─── */
function TrustBadges() {
  const badges = [
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Fast Response", sub: "We review every request" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Secure", sub: "Your data is protected" },
    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Trusted", sub: "Used by professionals worldwide" },
  ];
  return (
    <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 36, position: "relative", zIndex: 2 }}>
      {badges.map((b) => (
        <div key={b.title} style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 140 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "rgba(255,255,255,0.28)", flexShrink: 0, marginTop: 2,
          }}>
            {b.icon}
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 1 }}>{b.title}</div>
            <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>{b.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── FORM FIELD ─── */
function FF({ label, htmlFor, error, children, required }) {
  return (
    <div>
      <label htmlFor={htmlFor} style={{
        display: "block", fontSize: "0.68rem", fontWeight: 600,
        color: "rgba(255,255,255,0.38)", marginBottom: 8,
        letterSpacing: "0.06em", textTransform: "uppercase",
      }}>
        {label}{required && <span style={{ color: "rgba(255,255,255,0.5)", marginLeft: 4 }}>*</span>}
      </label>
      {children}
      {error && <p id={`${htmlFor}-error`} role="alert" style={{ fontSize: "0.7rem", color: "#f87171", marginTop: 5 }}>{error}</p>}
    </div>
  );
}

/* ─── SENDING OVERLAY ─── */
function SendingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", borderRadius: 16,
      }}
    >
      {/* Pulsing rings */}
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: 28 }}>
        <div className="send-ring send-ring-1" style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.1)",
        }} />
        <div className="send-ring send-ring-2" style={{
          position: "absolute", inset: 8, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.15)",
        }} />
        <div className="send-ring send-ring-3" style={{
          position: "absolute", inset: 16, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
        }} />
        {/* Center paper plane */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: "sendFloat 1.5s ease-in-out infinite" }}>
            <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ fontSize: "0.95rem", fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6, letterSpacing: "-0.01em" }}
      >
        Sending your message
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}
      >
        Please wait a moment…
      </motion.p>
    </motion.div>
  );
}

/* ─── SUCCESS OVERLAY ─── */
function SuccessOverlay({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        background: "rgba(0,0,0,0.9)", backdropFilter: "blur(10px)", borderRadius: 16,
        padding: "clamp(28px, 4vw, 48px)",
      }}
    >
      {/* Green checkmark circle */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        style={{
          width: 72, height: 72, borderRadius: "50%", marginBottom: 24,
          background: "rgba(34,197,94,0.1)",
          border: "2px solid rgba(34,197,94,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 40px rgba(34,197,94,0.12), 0 0 80px rgba(34,197,94,0.06)",
        }}
      >
        <motion.svg
          width="32" height="32" viewBox="0 0 24 24" fill="none"
          stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        >
          <motion.path
            d="M20 6L9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          />
        </motion.svg>
      </motion.div>

      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)", fontWeight: 700, color: "#fff", marginBottom: 8, letterSpacing: "-0.02em" }}
      >
        Message Sent Successfully
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, textAlign: "center", maxWidth: 320, marginBottom: 28 }}
      >
        Your request has been received. I'll review the details and follow up through the provided contact address.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}
      >
        <button onClick={onReset} style={{
          padding: "11px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.65)",
          fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>Send Another</button>
        <Link to="/" style={{
          padding: "11px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
          background: "#fff", color: "#000",
          fontWeight: 600, fontSize: "0.82rem", textDecoration: "none", fontFamily: "Inter, sans-serif", transition: "all 0.2s",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}>Back to Home</Link>
      </motion.div>
    </motion.div>
  );
}

/* ─── FORM ─── */
export function RequestForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [serverError, setServerError] = useState("");
  const [focused, setFocused] = useState(null);

  const set = useCallback((f, v) => {
    setForm((p) => ({ ...p, [f]: v }));
    if (errors[f]) setErrors((p) => { const n = { ...p }; delete n[f]; return n; });
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("submitting"); setServerError("");
    try {
      await submitRequest({
        name: form.name.trim(), email: form.email.trim(),
        organization: form.organization.trim() || undefined,
        requestType: form.requestType, project: form.project.trim(),
        details: form.details.trim() || undefined,
      });
      setStatus("sending");
      setTimeout(() => { setStatus("success"); onSuccess?.(); }, 1800);
    } catch { setStatus("idle"); setServerError("Something went wrong. Please try again."); }
  };

  const base = {
    width: "100%", padding: "12px 14px 12px 40px", borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)",
    color: "#fff", fontFamily: "Inter, sans-serif", fontSize: "0.85rem",
    outline: "none", transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
    boxSizing: "border-box", height: 46,
  };
  const foc = { borderColor: "rgba(255,255,255,0.2)", boxShadow: "0 0 0 3px rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.05)" };
  const s = (f) => focused === f ? { ...base, ...foc } : base;

  const taBase = { ...base, height: "auto", minHeight: 120, resize: "vertical", lineHeight: 1.6, padding: "12px 14px 28px 40px" };
  const taFoc = { ...taBase, ...foc };
  const st = (f) => focused === f ? taFoc : taBase;

  const taSm = { ...base, height: "auto", minHeight: 80, resize: "vertical", lineHeight: 1.6, padding: "12px 14px 28px 40px" };
  const taSmFoc = { ...taSm, ...foc };
  const ss = (f) => focused === f ? taSmFoc : taSm;

  return (
    <div style={{ position: "relative" }}>
      {/* Sending overlay */}
      <AnimatePresence>
        {status === "sending" && <SendingOverlay />}
      </AnimatePresence>

      {/* Success overlay */}
      <AnimatePresence>
        {status === "success" && <SuccessOverlay onReset={() => { setStatus("idle"); setForm(INITIAL_FORM); }} />}
      </AnimatePresence>

      <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Request Form
          </span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        {/* Row 1 */}
        <div className="req-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <motion.div {...fadeUp} transition={{ delay: 0, duration: 0.4 }}>
            <FF label="Full Name" htmlFor="name" error={errors.name} required>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconUser /></div>
                <input id="name" type="text" placeholder="Enter your full name" required maxLength={LIMITS.name}
                  value={form.name} onChange={(e) => set("name", e.target.value)}
                  onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                  aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined}
                  style={s("name")} autoComplete="name" />
              </div>
            </FF>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.04, duration: 0.4 }}>
            <FF label="Email Address" htmlFor="email" error={errors.email} required>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconMail /></div>
                <input id="email" type="email" placeholder="you@example.com" required maxLength={LIMITS.email}
                  value={form.email} onChange={(e) => set("email", e.target.value)}
                  onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined}
                  style={s("email")} autoComplete="email" />
              </div>
            </FF>
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="req-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <motion.div {...fadeUp} transition={{ delay: 0.08, duration: 0.4 }}>
            <FF label="Company / Organization" htmlFor="organization" error={errors.organization}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconBuilding /></div>
                <input id="organization" type="text" placeholder="Your company (optional)" maxLength={LIMITS.organization}
                  value={form.organization} onChange={(e) => set("organization", e.target.value)}
                  onFocus={() => setFocused("organization")} onBlur={() => setFocused(null)}
                  style={s("organization")} autoComplete="organization" />
              </div>
            </FF>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.12, duration: 0.4 }}>
            <FF label="Request Type" htmlFor="requestType" error={errors.requestType} required>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconGrid /></div>
                <select id="requestType" value={form.requestType} required
                  onChange={(e) => set("requestType", e.target.value)}
                  onFocus={() => setFocused("requestType")} onBlur={() => setFocused(null)}
                  aria-invalid={!!errors.requestType} aria-describedby={errors.requestType ? "requestType-error" : undefined}
                  style={{
                    ...(focused === "requestType" ? { ...base, ...foc } : base),
                    appearance: "none", cursor: "pointer",
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M2 4l4 4 4-4' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: 36,
                    color: form.requestType ? "#fff" : "rgba(255,255,255,0.3)",
                  }}>
                  <option value="" disabled>Select a request type</option>
                  {REQUEST_TYPES.map((t) => <option key={t} value={t} style={{ background: "#111", color: "#fff" }}>{t}</option>)}
                </select>
              </div>
            </FF>
          </motion.div>
        </div>

        {/* Project */}
        <motion.div {...fadeUp} transition={{ delay: 0.16, duration: 0.4 }}>
          <FF label="Project / Requirement" htmlFor="project" error={errors.project} required>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 13, top: 14, color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconFile /></div>
              <textarea id="project" rows={4} required maxLength={LIMITS.project}
                placeholder="Tell me about your project, what you need, and how I can help..."
                value={form.project} onChange={(e) => set("project", e.target.value)}
                onFocus={() => setFocused("project")} onBlur={() => setFocused(null)}
                aria-invalid={!!errors.project} aria-describedby={errors.project ? "project-error" : undefined}
                style={st("project")} />
              <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: "0.62rem", color: "rgba(255,255,255,0.12)", fontVariantNumeric: "tabular-nums" }}>
                {form.project.length} / {LIMITS.project}
              </span>
            </div>
          </FF>
        </motion.div>

        {/* Details */}
        <motion.div {...fadeUp} transition={{ delay: 0.20, duration: 0.4 }}>
          <FF label="Additional Details" htmlFor="details" error={errors.details}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", left: 13, top: 14, color: "rgba(255,255,255,0.18)", pointerEvents: "none" }}><IconFileText /></div>
              <textarea id="details" rows={3} maxLength={LIMITS.details}
                placeholder="Any extra context — timeline, budget, references..."
                value={form.details} onChange={(e) => set("details", e.target.value)}
                onFocus={() => setFocused("details")} onBlur={() => setFocused(null)}
                aria-describedby={errors.details ? "details-error" : undefined}
                style={ss("details")} />
              <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: "0.62rem", color: "rgba(255,255,255,0.12)", fontVariantNumeric: "tabular-nums" }}>
                {form.details.length} / {LIMITS.details}
              </span>
            </div>
          </FF>
        </motion.div>

        {serverError && (
          <div role="alert" style={{
            padding: "10px 14px", borderRadius: 8,
            background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.12)",
            fontSize: "0.78rem", color: "#fca5a5",
          }}>
            {serverError}
          </div>
        )}

        {/* Submit */}
        <motion.div {...fadeUp} transition={{ delay: 0.24, duration: 0.4 }}>
          <button type="submit" disabled={status === "submitting" || status === "sending"} className="req-submit"
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              padding: "14px 24px", borderRadius: 10, border: "none",
              background: (status === "submitting" || status === "sending") ? "rgba(255,255,255,0.08)" : "#fff",
              color: "#000", fontWeight: 600, fontSize: "0.9rem",
              cursor: (status === "submitting" || status === "sending") ? "not-allowed" : "pointer",
              transition: "all 0.25s", fontFamily: "Inter, sans-serif",
              boxShadow: "0 4px 16px rgba(255,255,255,0.08)",
            }}>
            {status === "submitting" ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: "spin 1s linear infinite" }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
                Sending Request…
              </>
            ) : (
              <>Submit Request <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="req-arrow"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></>
            )}
          </button>
        </motion.div>

        {/* Security note */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.2)" }}>Your information is safe and secure.</span>
        </div>
      </form>
    </div>
  );
}

/* ─── SUCCESS (page-level) ─── */
function RequestSuccess({ onReset }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
      style={{ textAlign: "center", padding: "clamp(40px, 6vw, 72px) 24px" }}>
      {/* Green checkmark circle */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
        style={{
          width: 72, height: 72, borderRadius: "50%", margin: "0 auto 24px",
          background: "rgba(34,197,94,0.1)", border: "2px solid rgba(34,197,94,0.3)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 0 40px rgba(34,197,94,0.12), 0 0 80px rgba(34,197,94,0.06)",
        }}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </motion.div>
      <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.02em" }}>Message Sent Successfully</h2>
      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, maxWidth: 380, margin: "0 auto 32px" }}>
        Your request has been received. I'll review the details and follow up through the provided contact address.
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
        <button onClick={onReset} style={{
          padding: "11px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.65)",
          fontWeight: 600, fontSize: "0.82rem", cursor: "pointer", fontFamily: "Inter, sans-serif", transition: "all 0.2s",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>Send Another Request</button>
        <Link to="/" style={{
          padding: "11px 22px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)",
          background: "#fff", color: "#000",
          fontWeight: 600, fontSize: "0.82rem", textDecoration: "none", fontFamily: "Inter, sans-serif", transition: "all 0.2s",
        }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; }}>Back to Home</Link>
      </div>
    </motion.div>
  );
}

/* ─── PAGE ─── */
export default function RequestPage() {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <RequestSuccess onReset={() => setSubmitted(false)} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#000" }}>
      <div style={{
        maxWidth: 1260, margin: "0 auto",
        padding: "clamp(60px, 10vh, 100px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 140px)",
      }}>
        <div className="req-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr",
          gap: "clamp(48px, 7vw, 100px)", alignItems: "start",
        }}>
          {/* ─── LEFT ─── */}
          <motion.div {...fadeUp} transition={{ duration: 0.5 }}>
            <div style={{
              fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20,
            }}>
              Request Access
            </div>

            <h1 style={{
              fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 700, color: "#fff",
              letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 24,
            }}>
              Let's Build<br />
              <span style={{ color: "rgba(255,255,255,0.85)" }}>
                Something Great.
              </span>
            </h1>

            <p style={{
              fontSize: "clamp(0.92rem, 1.1vw, 1.02rem)", color: "rgba(255,255,255,0.4)",
              lineHeight: 1.7, maxWidth: 400, marginBottom: 28,
            }}>
              Tell me what you're building, what you need, and how I can help.
            </p>

            {/* Divider + tagline */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Every request is reviewed with context, clarity, and purpose.
              </span>
            </div>

            {/* Globe behind flow */}
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", top: -20, left: -40, width: 320, height: 320, pointerEvents: "none" }}>
                <GlobeVisual />
              </div>
              <FlowSteps />
            </div>

            <TrustBadges />
          </motion.div>

          {/* ─── RIGHT: FORM ─── */}
          <motion.div {...fadeUp} transition={{ delay: 0.1, duration: 0.5 }}>
            <div style={{
              padding: "clamp(28px, 3.5vw, 40px)", borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.3)",
            }}>
              <RequestForm onSuccess={() => setSubmitted(true)} />
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes sendFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(2deg); }
        }
        @keyframes sendPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.15); opacity: 0.6; }
        }
        .send-ring { animation: sendPulse 2s ease-in-out infinite; }
        .send-ring-1 { animation-delay: 0s; }
        .send-ring-2 { animation-delay: 0.3s; }
        .send-ring-3 { animation-delay: 0.6s; }
        .req-submit:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,255,255,0.12) !important; }
        .req-submit:active { transform: scale(0.98) translateY(0); }
        .req-submit:hover .req-arrow { transform: translateX(3px); }
        .req-arrow { transition: transform 0.2s; }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @media (max-width: 900px) {
          .req-grid { grid-template-columns: 1fr !important; }
          .req-row { grid-template-columns: 1fr !important; }
        }
        select option { background: #111; color: #fff; }
      `}</style>
    </div>
  );
}

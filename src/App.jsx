import { ThemeProvider, useTheme } from "./hooks/useTheme";
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import CapsuleNav from "./components/CapsuleNav";
import HomeSection from "./components/HomeSection";
import OverviewSection from "./components/OverviewSection";
import ModuleDetailPage from "./components/ModuleDetailPage";
import AllModulesPage from "./components/AllModulesPage";
import RequestPage, { RequestForm } from "./components/RequestPage";
import Scrollbar from "./components/Scrollbar";

const sectionStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "clamp(60px, 8vw, 100px) 24px",
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RequestSection() {
  return (
    <section id="request" style={{
      background: "#000",
      padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)",
    }}>
      <div style={{ maxWidth: 1260, margin: "0 auto" }}>
        <div className="req-home-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.2fr",
          gap: "clamp(48px, 7vw, 100px)", alignItems: "start",
        }}>
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20,
            }}>
              Request Access
            </div>

            <h2 style={{
              fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#fff",
              letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 20,
            }}>
              Let's Build<br />
              <span style={{ color: "rgba(255,255,255,0.85)" }}>
                Something Great.
              </span>
            </h2>

            <p style={{
              fontSize: "clamp(0.88rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6, maxWidth: 380, marginBottom: 24,
            }}>
              Tell me what you're building, what you need, and how I can help.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 24, height: 1, background: "rgba(255,255,255,0.12)" }} />
              <span style={{ fontSize: "0.62rem", fontWeight: 600, color: "rgba(255,255,255,0.22)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                Every request is reviewed with context, clarity, and purpose.
              </span>
            </div>

            {/* Flow steps */}
            {[
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title: "Your Request", sub: "Share your details", active: true },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>, title: "Review", sub: "We analyze & prepare", active: false },
              { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, title: "Response", sub: "Get in touch soon", active: false },
            ].map((s, i, arr) => (
              <div key={s.title} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    border: `1px solid ${s.active ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.06)"}`,
                    background: s.active ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: s.active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.2)",
                    boxShadow: s.active ? "0 0 20px rgba(255,255,255,0.05)" : "none",
                    flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, height: 36, background: "rgba(255,255,255,0.05)" }} />
                  )}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <div style={{ fontSize: "0.88rem", fontWeight: 600, color: s.active ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)", marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.22)" }}>{s.sub}</div>
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", marginTop: 36 }}>
              {[
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Fast Response", sub: "We review every request" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Secure", sub: "Your data is protected" },
                { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Trusted", sub: "Used by professionals worldwide" },
              ].map((b) => (
                <div key={b.title} style={{ display: "flex", alignItems: "flex-start", gap: 10, minWidth: 140 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "rgba(255,255,255,0.25)", flexShrink: 0, marginTop: 2,
                  }}>
                    {b.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 1 }}>{b.title}</div>
                    <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.22)" }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: FORM */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.15, duration: 0.6 }}
            style={{
              padding: "clamp(28px, 3.5vw, 40px)", borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.3)",
            }}
          >
            <RequestForm />
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .req-home-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactSection() {
  const socialLinks = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>, label: "GitHub", href: "https://github.com/NaitikSoni1417", sub: "@NaitikSoni1417" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, label: "LinkedIn", href: "https://www.linkedin.com/in/naitiksoni1417/", sub: "Naitik Soni" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>, label: "Email", href: "mailto:naitik.infosec@gmail.com", sub: "naitik.infosec@gmail.com" },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>, label: "Portfolio", href: "https://naitiksoni1417.netlify.app", sub: "naitiksoni1417.netlify.app" },
  ];

  return (
    <section id="contact" style={{ background: "#000", padding: "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.4)",
            textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 20,
          }}
        >
          Get In Touch
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 700, color: "#fff",
            letterSpacing: "-0.035em", lineHeight: 1.08, marginBottom: 12,
          }}
        >
          Let's Work<br />
          <span style={{ color: "rgba(255,255,255,0.85)" }}>Together.</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: 0.08, duration: 0.5 }}
          style={{
            fontSize: "clamp(0.88rem, 1vw, 0.95rem)", color: "rgba(255,255,255,0.4)",
            lineHeight: 1.6, maxWidth: 460, margin: "0 auto 40px",
          }}
        >
          Have a project in mind, a security concern, or just want to connect? I'd love to hear from you.
        </motion.p>

        {/* Name + Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.12, duration: 0.5 }}
          style={{ marginBottom: 36 }}
        >
          <div style={{ fontSize: "1.15rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>Naitik Soni</div>
          <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.5 }}>
            Infosec Ethical Hacker &nbsp;·&nbsp; Full Stack Web Developer
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.16, duration: 0.5 }}
          style={{ width: 48, height: 1, background: "rgba(255,255,255,0.1)", margin: "0 auto 36px" }}
        />

        {/* Social Links */}
        <div className="contact-links" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 12, maxWidth: 540, margin: "0 auto",
        }}>
          {socialLinks.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.18 + i * 0.06, duration: 0.4 }}
              className="contact-social"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "16px 18px", borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
                color: "#fff", textDecoration: "none",
                transition: "all 0.25s", textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.4)", flexShrink: 0,
              }}>
                {s.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 1 }}>{s.label}</div>
                <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.3)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.sub}</div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: "auto", flexShrink: 0 }}>
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          maxWidth: 1260, margin: "80px auto 0", paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)" }}>
          Engineered by <span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>Naitik Soni</span> — Cybersecurity Specialist & Full-Stack Architect
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          {socialLinks.map((s) => (
            <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
              style={{ color: "rgba(255,255,255,0.2)", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.2)"; }}
              title={s.label}>
              {s.icon}
            </a>
          ))}
        </div>
      </motion.div>

      <style>{`
        .contact-social:hover { transform: translateY(-2px); }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @media (max-width: 600px) {
          .contact-links { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <HomeSection />
      <OverviewSection />
      <RequestSection />
      <ContactSection />
    </>
  );
}

function AppInner() {
  const { theme } = useTheme();
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/overview/");
  const isModulesPage = location.pathname === "/modules";
  const isRequestPage = location.pathname === "/request";
  const hideNav = isDetailPage || isModulesPage || isRequestPage;

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "#0b1a2e" }}>
      {!hideNav && <Scrollbar />}
      {!hideNav && <CapsuleNav />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/modules" element={<AllModulesPage />} />
        <Route path="/overview/:slug" element={<ModuleDetailPage />} />
        <Route path="/request" element={<RequestPage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppInner />
      </BrowserRouter>
    </ThemeProvider>
  );
}

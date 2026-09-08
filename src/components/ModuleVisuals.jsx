import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const S = {
  bg: "#0d1117",
  card: "#161b22",
  border: "rgba(255,255,255,0.06)",
  borderLight: "rgba(255,255,255,0.1)",
  text: "rgba(255,255,255,0.85)",
  textMuted: "rgba(255,255,255,0.45)",
  textDim: "rgba(255,255,255,0.25)",
  accent: "#58a6ff",
  green: "#3fb950",
  red: "#f85149",
  yellow: "#d29922",
  purple: "#bc8cff",
  cyan: "#39d353",
  orange: "#f0883e",
};

function Frame({ children, label, aspect = "16/10" }) {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{
        position: "relative",
        width: "100%",
        aspectRatio: aspect,
        borderRadius: 10,
        overflow: "hidden",
        background: S.bg,
        border: `1px solid ${S.borderLight}`,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)",
      }}>
        {children}
      </div>
      {label && (
        <div style={{
          position: "absolute",
          bottom: 8,
          right: 10,
          fontSize: "0.55rem",
          fontWeight: 600,
          color: "rgba(255,255,255,0.15)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          {label}
        </div>
      )}
    </div>
  );
}

function TitleBar({ title, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", background: "#0d1117", borderBottom: `1px solid ${S.border}` }}>
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#f85149" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#d29922" }} />
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3fb950" }} />
      </div>
      <div style={{ flex: 1, textAlign: "center", fontSize: "0.6rem", color: S.textDim, fontWeight: 500 }}>
        {title}
      </div>
      <div style={{ width: 28 }} />
    </div>
  );
}

function StatCard({ label, value, color, small }) {
  return (
    <div style={{
      flex: 1,
      padding: small ? "6px 8px" : "8px 10px",
      borderRadius: 6,
      background: S.card,
      border: `1px solid ${S.border}`,
    }}>
      <div style={{ fontSize: small ? "0.5rem" : "0.55rem", color: S.textMuted, marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: small ? "0.85rem" : "1rem", fontWeight: 700, color: color || S.text, fontVariantNumeric: "tabular-nums" }}>{value}</div>
    </div>
  );
}

function TableRow({ cells, highlight, dim }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: cells.map(() => "1fr").join(" "),
      gap: 1,
      padding: "4px 8px",
      fontSize: "0.55rem",
      color: dim ? S.textDim : S.textMuted,
      borderBottom: `1px solid ${S.border}`,
      background: highlight ? "rgba(88,166,255,0.04)" : "transparent",
    }}>
      {cells.map((c, i) => <div key={i} style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c}</div>)}
    </div>
  );
}

function BarChart({ data, height = 60, color }) {
  const max = Math.max(...data);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height, padding: "0 4px" }}>
      {data.map((v, i) => (
        <div key={i} style={{
          flex: 1,
          height: `${(v / max) * 100}%`,
          borderRadius: 2,
          background: color || S.accent,
          opacity: 0.4 + (v / max) * 0.6,
        }} />
      ))}
    </div>
  );
}

function LineChart({ points, color, height = 50 }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = 100 / (points.length - 1);
  const d = points.map((v, i) => {
    const x = i * step;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${i === 0 ? "M" : "L"}${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 100 ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <defs>
        <linearGradient id={`lg-${color?.replace("#", "") || "a"}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color || S.accent} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color || S.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L100,${height} L0,${height} Z`} fill={`url(#lg-${color?.replace("#", "") || "a"})`} />
      <path d={d} fill="none" stroke={color || S.accent} strokeWidth="1.5" />
    </svg>
  );
}

function PieChart({ segments, size = 60 }) {
  let cumulative = 0;
  const total = segments.reduce((a, s) => a + s.value, 0);
  return (
    <svg viewBox="0 0 36 36" width={size} height={size}>
      {segments.map((seg, i) => {
        const pct = (seg.value / total) * 100;
        const dasharray = `${pct} ${100 - pct}`;
        const dashoffset = 25 - cumulative;
        cumulative += pct;
        return (
          <circle key={i} cx="18" cy="18" r="15.915" fill="none"
            stroke={seg.color} strokeWidth="4"
            strokeDasharray={dasharray} strokeDashoffset={dashoffset} />
        );
      })}
    </svg>
  );
}

// ─── MODULE 01: OVERVIEW ────────────────────────────────────
function OverviewVisual() {
  return (
    <Frame label="NS Command Center">
      <TitleBar title="NS Command Center — Overview" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Total Visitors" value="2,847" color={S.accent} small />
          <StatCard label="Today Views" value="142" color={S.green} small />
          <StatCard label="Active Sessions" value="23" color={S.yellow} small />
          <StatCard label="Mails" value="18" color={S.purple} small />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Weekly Traffic</div>
            <LineChart points={[30, 45, 38, 62, 55, 70, 48, 65, 58, 72, 80, 68]} color={S.accent} height={55} />
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Device Split</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
              <PieChart segments={[{ value: 58, color: S.accent }, { value: 32, color: S.green }, { value: 10, color: S.purple }]} size={52} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, fontSize: "0.45rem", color: S.textDim }}>
              <span>● Desktop 58%</span><span>● Mobile 32%</span><span>● Tablet 10%</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 6, background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
          <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Recent Visitors</div>
          <TableRow cells={["IP", "Location", "ISP", "Device", "Browser"]} highlight />
          <TableRow cells={["192.168.1.45", "Ahmedabad, IN", "Jio Fiber", "Desktop", "Chrome 125"]} />
          <TableRow cells={["10.0.0.123", "Mumbai, IN", "Airtel", "Mobile", "Safari 17"]} />
          <TableRow cells={["172.16.0.89", "Bangalore, IN", "BSNL", "Desktop", "Firefox 128"]} dim />
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 02: VISITORS ────────────────────────────────────
function VisitorsVisual() {
  return (
    <Frame label="Visitor Intelligence">
      <TitleBar title="Visitors — Intelligence Dashboard" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
          <div style={{ flex: 2, background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ fontSize: "0.55rem", color: S.text, fontWeight: 600 }}>Visitor Records</div>
              <div style={{ display: "flex", gap: 4 }}>
                <div style={{ padding: "2px 6px", borderRadius: 3, background: "rgba(88,166,255,0.1)", fontSize: "0.45rem", color: S.accent }}>Export CSV</div>
                <div style={{ padding: "2px 6px", borderRadius: 3, background: "rgba(63,185,80,0.1)", fontSize: "0.45rem", color: S.green }}>Search</div>
              </div>
            </div>
            <TableRow cells={["Visitor", "Location", "ISP", "Device", "Browser", "Page"]} highlight />
            <TableRow cells={["192.168.1.45", "Ahmedabad", "Jio Fiber", "Desktop", "Chrome", "/projects"]} />
            <TableRow cells={["10.0.0.123", "Mumbai", "Airtel", "Mobile", "Safari", "/about"]} />
            <TableRow cells={["172.16.0.89", "Bangalore", "BSNL", "Desktop", "Firefox", "/"]} />
            <TableRow cells={["10.10.5.200", "Delhi", "Vi India", "Tablet", "Edge", "/contact"]} dim />
            <TableRow cells={["192.168.2.15", "Pune", "Jio Fiber", "Mobile", "Chrome", "/projects"]} dim />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px", flex: 1 }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Top Countries</div>
              {["🇮🇳 India", "🇺🇸 USA", "🇬🇧 UK", "🇩🇪 Germany", "🇯🇵 Japan"].map((c, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.5rem", color: S.textMuted, padding: "2px 0", borderBottom: `1px solid ${S.border}` }}>
                  <span>{c}</span><span style={{ color: S.accent }}>{[2100, 320, 180, 95, 72][i]}</span>
                </div>
              ))}
            </div>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Active Now</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: S.green }}>23</div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 03: MAILS ───────────────────────────────────────
function MailsVisual() {
  const messages = [
    { from: "Recruiter Corp", subject: "Job Opportunity — Senior Developer", time: "2m ago", unread: true },
    { from: "Tech Conference", subject: "Speaker Invitation 2026", time: "1h ago", unread: true },
    { from: "Client Inquiry", subject: "Project Collaboration", time: "3h ago", unread: false },
    { from: "Newsletter", subject: "Weekly Security Digest", time: "5h ago", unread: false },
    { from: "Feedback", subject: "Portfolio Review Comments", time: "1d ago", unread: false },
  ];
  return (
    <Frame label="Contact Intelligence">
      <TitleBar title="Mails — Contact Intelligence" />
      <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", height: "calc(100% - 26px)" }}>
        <div style={{ borderRight: `1px solid ${S.border}`, padding: "6px 0" }}>
          {["Inbox", "Unread", "Replied", "Trash"].map((item, i) => (
            <div key={i} style={{
              padding: "5px 10px", fontSize: "0.55rem", color: i === 0 ? S.text : S.textMuted,
              background: i === 0 ? "rgba(88,166,255,0.06)" : "transparent",
              borderLeft: i === 0 ? `2px solid ${S.accent}` : "2px solid transparent",
            }}>
              {item} {i === 1 && <span style={{ color: S.accent, fontSize: "0.5rem" }}>2</span>}
            </div>
          ))}
          <div style={{ margin: "8px 10px", padding: "5px", borderRadius: 4, background: "rgba(88,166,255,0.08)", textAlign: "center", fontSize: "0.5rem", color: S.accent, cursor: "pointer" }}>
            Compose
          </div>
        </div>
        <div style={{ padding: "6px 8px", overflow: "hidden" }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 2fr 60px",
              padding: "6px 8px", borderBottom: `1px solid ${S.border}`,
              background: msg.unread ? "rgba(88,166,255,0.03)" : "transparent",
              fontSize: "0.55rem",
            }}>
              <div style={{ color: msg.unread ? S.text : S.textMuted, fontWeight: msg.unread ? 600 : 400 }}>{msg.from}</div>
              <div style={{ color: S.textMuted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{msg.subject}</div>
              <div style={{ color: S.textDim, textAlign: "right" }}>{msg.time}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 04: RESUME DOWNLOADS ────────────────────────────
function ResumeVisual() {
  return (
    <Frame label="Resume Tracker">
      <TitleBar title="Resume Downloads — Tracker" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Total Downloads" value="186" color={S.accent} small />
          <StatCard label="Today" value="12" color={S.green} small />
          <StatCard label="Top Country" value="India" color={S.purple} small />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Recent Downloads</div>
            <TableRow cells={["Visitor", "Location", "Device", "Browser"]} highlight />
            <TableRow cells={["192.168.1.45", "Ahmedabad", "Desktop", "Chrome"]} />
            <TableRow cells={["10.0.0.123", "Mumbai", "Mobile", "Safari"]} />
            <TableRow cells={["172.16.0.89", "Bangalore", "Desktop", "Firefox"]} dim />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Top Browsers</div>
              <BarChart data={[85, 52, 30, 18]} color={S.accent} height={40} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.42rem", color: S.textDim, marginTop: 2 }}>
                <span>Chrome</span><span>Safari</span><span>Firefox</span><span>Edge</span>
              </div>
            </div>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>PDF Status</div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 32, height: 40, borderRadius: 3, background: "rgba(88,166,255,0.1)", border: `1px solid ${S.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: S.accent }}>PDF</div>
                <div>
                  <div style={{ fontSize: "0.5rem", color: S.green }}>● Active</div>
                  <div style={{ fontSize: "0.45rem", color: S.textDim }}>Telemetry OK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 05: ANALYTICS ───────────────────────────────────
function AnalyticsVisual() {
  return (
    <Frame label="Analytics Dashboard">
      <TitleBar title="Analytics — Performance Dashboard" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
          {["7D", "30D", "90D"].map((r, i) => (
            <div key={i} style={{
              padding: "3px 10px", borderRadius: 4, fontSize: "0.5rem",
              background: i === 1 ? "rgba(88,166,255,0.12)" : S.card,
              color: i === 1 ? S.accent : S.textDim,
              border: `1px solid ${i === 1 ? "rgba(88,166,255,0.2)" : S.border}`,
            }}>{r}</div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 6, marginBottom: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Traffic Timeline</div>
            <LineChart points={[45, 52, 38, 65, 58, 72, 68, 80, 75, 88, 82, 90, 85, 95]} color={S.accent} height={60} />
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Page Performance</div>
            <BarChart data={[90, 72, 55, 48, 35, 28]} color={S.green} height={60} />
            <div style={{ fontSize: "0.42rem", color: S.textDim, marginTop: 2, textAlign: "center" }}>/ &nbsp;/about &nbsp;/projects &nbsp;/contact</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Top Countries</div>
            {["🇮🇳 India", "🇺🇸 USA", "🇬🇧 UK"].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.5rem", color: S.textMuted, padding: "2px 0" }}>
                <span>{c}</span><span style={{ color: S.accent }}>{[2100, 320, 180][i]}</span>
              </div>
            ))}
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Top Cities</div>
            {["Ahmedabad", "Mumbai", "Bangalore"].map((c, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.5rem", color: S.textMuted, padding: "2px 0" }}>
                <span>{c}</span><span style={{ color: S.green }}>{[580, 420, 310][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 06: SECURITY LOGS ───────────────────────────────
function SecurityLogsVisual() {
  return (
    <Frame label="SIEM Audit Trail">
      <TitleBar title="Security Logs — SIEM Audit Trail" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Failed Logins" value="7" color={S.red} small />
          <StatCard label="Blocked IPs" value="12" color={S.yellow} small />
          <StatCard label="Events Today" value="43" color={S.accent} small />
        </div>
        <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim }}>Security Events</div>
            <div style={{ padding: "2px 6px", borderRadius: 3, background: "rgba(248,81,73,0.1)", fontSize: "0.45rem", color: S.red }}>Reload</div>
          </div>
          {[
            { time: "09:32:15", type: "LOGIN_FAIL", detail: "Failed admin login from 45.33.32.156", severity: "HIGH" },
            { time: "09:28:03", type: "IP_BLOCKED", detail: "Auto-blocked 185.220.101.34 — 24h", severity: "CRITICAL" },
            { time: "09:15:44", type: "RATE_LIMIT", detail: "Rate limit hit from 103.21.244.0", severity: "MEDIUM" },
            { time: "09:02:11", type: "LOGIN_OK", detail: "Successful admin login from 192.168.1.1", severity: "LOW" },
            { time: "08:45:30", type: "HONEYPOT", detail: "Honeypot trap triggered by 91.189.89.0", severity: "HIGH" },
          ].map((ev, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "70px 80px 1fr 60px",
              padding: "4px 0", borderBottom: `1px solid ${S.border}`,
              fontSize: "0.5rem", color: S.textMuted,
            }}>
              <span style={{ fontVariantNumeric: "tabular-nums", color: S.textDim }}>{ev.time}</span>
              <span style={{ color: ev.severity === "CRITICAL" ? S.red : ev.severity === "HIGH" ? S.orange : ev.severity === "MEDIUM" ? S.yellow : S.green, fontWeight: 600 }}>{ev.type}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.detail}</span>
              <span style={{ textAlign: "right", color: ev.severity === "CRITICAL" ? S.red : ev.severity === "HIGH" ? S.orange : S.textDim }}>{ev.severity}</span>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 07: SOC PANEL ───────────────────────────────────
function SOCPanelVisual() {
  return (
    <Frame label="SOC Panel">
      <TitleBar title="SOC Panel — Security Operations" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 6, marginBottom: 6 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Threat Level</div>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: S.green, lineHeight: 1 }}>24</div>
              <div style={{ fontSize: "0.5rem", color: S.green, marginTop: 2 }}>● LOW</div>
            </div>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Quick Actions</div>
              {["Emergency Lockdown", "Block IP", "Clear Logs"].map((a, i) => (
                <div key={i} style={{
                  padding: "4px 6px", marginBottom: 3, borderRadius: 4, fontSize: "0.5rem",
                  background: i === 0 ? "rgba(248,81,73,0.1)" : "rgba(88,166,255,0.06)",
                  color: i === 0 ? S.red : S.accent,
                  border: `1px solid ${i === 0 ? "rgba(248,81,73,0.15)" : S.border}`,
                }}>{a}</div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Live Attack Feed</div>
              {[
                { ip: "185.220.101.34", type: "Port Scan", country: "🇩🇪 DE", risk: "CRITICAL" },
                { ip: "91.189.89.0", type: "Honeypot Hit", country: "🇷🇺 RU", risk: "HIGH" },
                { ip: "103.21.244.0", type: "Rate Limit", country: "🇮🇳 IN", risk: "MEDIUM" },
              ].map((a, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "1fr 80px 40px 60px",
                  padding: "3px 0", borderBottom: `1px solid ${S.border}`,
                  fontSize: "0.5rem", color: S.textMuted,
                }}>
                  <span style={{ fontFamily: "monospace", color: S.text }}>{a.ip}</span>
                  <span>{a.type}</span>
                  <span>{a.country}</span>
                  <span style={{ textAlign: "right", color: a.risk === "CRITICAL" ? S.red : a.risk === "HIGH" ? S.orange : S.yellow, fontWeight: 600 }}>{a.risk}</span>
                </div>
              ))}
            </div>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Blocked IPs (Auto-Firewall)</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {["185.220.101.34", "91.189.89.0", "45.33.32.156", "103.21.244.0"].map((ip, i) => (
                  <span key={i} style={{ padding: "2px 6px", borderRadius: 3, background: "rgba(248,81,73,0.08)", fontSize: "0.45rem", color: S.red, border: `1px solid rgba(248,81,73,0.15)` }}>{ip}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 08: DIGITAL TWIN LAB ────────────────────────────
function DigitalTwinVisual() {
  return (
    <Frame label="Digital Twin Lab">
      <TitleBar title="Digital Twin Lab — AI Profiling" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Recruiters" value="43" color={S.accent} small />
          <StatCard label="Hot Leads" value="18" color={S.red} small />
          <StatCard label="Clients" value="67" color={S.green} small />
          <StatCard label="Suspicious" value="5" color={S.yellow} small />
        </div>
        <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
          <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Visitor Classifications</div>
          <TableRow cells={["Visitor", "Classification", "Heat", "Engagement", "AI Score"]} highlight />
          {[
            { ip: "192.168.1.45", cls: "Recruiter", heat: "Hot", eng: "92%", score: "0.94" },
            { ip: "10.0.0.123", cls: "Potential Client", heat: "Warm", eng: "78%", score: "0.81" },
            { ip: "172.16.0.89", cls: "Hot Lead", heat: "Hot", eng: "88%", score: "0.91" },
            { ip: "10.10.5.200", cls: "Suspicious", heat: "Risk", eng: "15%", score: "0.23" },
          ].map((r, i) => (
            <TableRow key={i} cells={[r.ip, r.cls, r.heat, r.eng, r.score]} dim={i > 1} />
          ))}
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 09: DEVICES ─────────────────────────────────────
function DevicesVisual() {
  return (
    <Frame label="Device Intelligence">
      <TitleBar title="Devices — Intelligence Dashboard" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Desktop" value="58%" color={S.accent} small />
          <StatCard label="Mobile" value="32%" color={S.green} small />
          <StatCard label="Tablet" value="10%" color={S.purple} small />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Browser Distribution</div>
            {["Chrome 52%", "Safari 24%", "Firefox 14%", "Edge 10%"].map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                <div style={{ flex: 1, height: 5, borderRadius: 2, background: S.border }}>
                  <div style={{ height: "100%", borderRadius: 2, background: [S.accent, S.green, S.orange, S.purple][i], width: [52, 24, 14, 10][i] + "%" }} />
                </div>
                <div style={{ fontSize: "0.45rem", color: S.textMuted, width: 70 }}>{b}</div>
              </div>
            ))}
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>OS Breakdown</div>
            {["Windows 45%", "iOS 22%", "Android 18%", "macOS 12%", "Linux 3%"].map((o, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.5rem", color: S.textMuted, padding: "2px 0", borderBottom: `1px solid ${S.border}` }}>
                <span>{o.split(" ")[0]}</span><span style={{ color: S.accent }}>{o.split(" ")[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 10: EARTH VIEW ──────────────────────────────────
function EarthViewVisual() {
  return (
    <Frame label="Earth View" aspect="16/10">
      <div style={{ position: "relative", width: "100%", height: "100%", background: "#030810", overflow: "hidden" }}>
        {/* Deep space background with stars */}
        <svg viewBox="0 0 600 380" width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            {/* Globe atmosphere glow */}
            <radialGradient id="earth-atmo" cx="42%" cy="42%" r="42%">
              <stop offset="0%" stopColor="rgba(30,120,220,0.12)" />
              <stop offset="50%" stopColor="rgba(30,120,220,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            {/* Ocean gradient */}
            <radialGradient id="earth-ocean" cx="42%" cy="42%" r="38%">
              <stop offset="0%" stopColor="#0c2a52" />
              <stop offset="100%" stopColor="#061428" />
            </radialGradient>
            {/* Land gradient */}
            <linearGradient id="earth-land" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a6b4a" />
              <stop offset="100%" stopColor="#0f4a32" />
            </linearGradient>
            {/* City glow filter */}
            <filter id="city-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Stars */}
          {[
            [45,22],[120,45],[280,18],[350,55],[500,30],[550,68],[80,310],[460,320],[180,340],
            [520,200],[560,140],[40,180],[90,90],[400,25],[310,350],[540,280],[25,250],[570,340]
          ].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={0.4 + (i%3)*0.3} fill={`rgba(255,255,255,${0.15 + (i%4)*0.1})`} />
          ))}

          {/* Globe atmosphere */}
          <circle cx="250" cy="175" r="145" fill="url(#earth-atmo)" />
          
          {/* Ocean sphere */}
          <circle cx="250" cy="175" r="130" fill="url(#earth-ocean)" stroke="rgba(30,120,220,0.15)" strokeWidth="0.8" />

          {/* Continents — realistic outlines */}
          {/* Africa */}
          <path d="M215 125 Q220 118, 230 115 T242 118 Q248 122, 250 130 T252 148 Q250 160, 245 170 T232 185 Q225 188, 218 183 T210 168 Q208 155, 212 140 T215 125"
            fill="rgba(30,120,74,0.25)" stroke="rgba(30,120,74,0.4)" strokeWidth="0.6" />
          {/* Europe */}
          <path d="M225 95 Q232 88, 245 90 T260 95 Q265 100, 262 108 T250 115 Q240 112, 232 108 T225 95"
            fill="rgba(30,120,74,0.2)" stroke="rgba(30,120,74,0.35)" strokeWidth="0.5" />
          {/* Middle East / Arabia */}
          <path d="M260 115 Q268 110, 278 112 T290 120 Q295 128, 288 135 T275 138 Q265 132, 260 125 T260 115"
            fill="rgba(30,120,74,0.18)" stroke="rgba(30,120,74,0.3)" strokeWidth="0.5" />
          {/* India — prominent and recognizable */}
          <path d="M295 118 Q300 110, 310 108 T322 112 Q330 118, 335 130 T338 148 Q336 158, 330 168 T318 180 Q310 185, 302 182 T292 172 Q286 162, 284 148 T288 132 Q290 125, 295 118"
            fill="rgba(40,160,90,0.35)" stroke="rgba(40,160,90,0.55)" strokeWidth="0.8" />
          {/* Sri Lanka */}
          <circle cx="322" cy="192" r="4" fill="rgba(40,160,90,0.2)" stroke="rgba(40,160,90,0.35)" strokeWidth="0.4" />
          {/* Southeast Asia */}
          <path d="M340 120 Q348 115, 358 118 T370 128 Q375 135, 370 145 T355 152 Q345 148, 340 140 T340 120"
            fill="rgba(30,120,74,0.15)" stroke="rgba(30,120,74,0.25)" strokeWidth="0.4" />
          {/* Russia / Central Asia */}
          <path d="M230 72 Q260 65, 300 68 T350 75 Q370 80, 380 88 T390 100"
            fill="none" stroke="rgba(30,120,74,0.2)" strokeWidth="0.5" />
          <path d="M240 78 Q270 72, 310 74 T360 82 Q375 88, 380 96 T370 105 Q355 100, 330 95 T280 88 Q255 85, 240 78"
            fill="rgba(30,120,74,0.12)" stroke="rgba(30,120,74,0.2)" strokeWidth="0.4" />
          {/* South America edge (left side of globe) */}
          <path d="M140 170 Q145 155, 155 148 T170 145 Q178 150, 180 160 T175 178 Q168 188, 158 192 T145 185 Q140 178, 140 170"
            fill="rgba(30,120,74,0.1)" stroke="rgba(30,120,74,0.15)" strokeWidth="0.3" />

          {/* Grid lines — latitude/longitude */}
          <ellipse cx="250" cy="175" rx="130" ry="20" fill="none" stroke="rgba(30,120,220,0.06)" strokeWidth="0.3" />
          <ellipse cx="250" cy="175" rx="130" ry="50" fill="none" stroke="rgba(30,120,220,0.05)" strokeWidth="0.3" />
          <ellipse cx="250" cy="175" rx="130" ry="90" fill="none" stroke="rgba(30,120,220,0.04)" strokeWidth="0.3" />
          <ellipse cx="250" cy="175" rx="30" ry="130" fill="none" stroke="rgba(30,120,220,0.04)" strokeWidth="0.3" />
          <ellipse cx="250" cy="175" rx="70" ry="130" fill="none" stroke="rgba(30,120,220,0.04)" strokeWidth="0.3" />
          <ellipse cx="250" cy="175" rx="110" ry="130" fill="none" stroke="rgba(30,120,220,0.03)" strokeWidth="0.3" />

          {/* City markers with connections */}
          {[
            { x: 310, y: 148, label: "India", visitors: "1,247", pulse: true },
            { x: 175, y: 115, label: "USA", visitors: "892" },
            { x: 245, y: 100, label: "UK", visitors: "312" },
            { x: 265, y: 102, label: "Germany", visitors: "245" },
            { x: 355, y: 130, label: "Japan", visitors: "187" },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="10" fill="rgba(56,189,248,0.06)" />
              <circle cx={p.x} cy={p.y} r="5" fill="rgba(56,189,248,0.12)" />
              <circle cx={p.x} cy={p.y} r="2" fill="rgba(56,189,248,0.8)" filter="url(#city-glow)" />
              <text x={p.x} y={p.y - 12} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontWeight="600" fontFamily="Inter, sans-serif">{p.label}</text>
              <text x={p.x} y={p.y + 14} textAnchor="middle" fill="rgba(56,189,248,0.5)" fontSize="5.5" fontFamily="Inter, sans-serif">{p.visitors}</text>
            </g>
          ))}

          {/* Connection lines from India to other countries */}
          <path d="M310 148 Q290 130, 250 110 T175 115" stroke="rgba(56,189,248,0.12)" strokeWidth="0.6" fill="none" strokeDasharray="3,3" />
          <path d="M310 148 Q300 130, 270 110 T245 100" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
          <path d="M310 148 Q320 135, 340 128 T355 130" stroke="rgba(56,189,248,0.1)" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />

          {/* Globe shadow / edge fade */}
          <circle cx="250" cy="175" r="130" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="15" opacity="0.4" />
        </svg>

        {/* Title */}
        <div style={{ position: "absolute", top: 8, left: 12, fontSize: "0.6rem", color: "rgba(56,189,248,0.5)", fontWeight: 600, letterSpacing: "0.05em" }}>
          🌐 EARTH VIEW — LIVE VISITOR TRACKING
        </div>

        {/* Stats panel */}
        <div style={{
          position: "absolute", bottom: 10, left: 12, right: 12,
          display: "flex", gap: 12, fontSize: "0.5rem"
        }}>
          <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(56,189,248,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>2,847</span> live visitors
          </div>
          <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(56,189,248,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>23</span> countries
          </div>
          <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(56,189,248,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>56</span> cities
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 11: INDIA MAP ───────────────────────────────────
function IndiaMapVisual() {
  return (
    <Frame label="India Map" aspect="16/10">
      <div style={{ position: "relative", width: "100%", height: "100%", background: "#05080f", overflow: "hidden" }}>
        <svg viewBox="0 0 600 400" width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <radialGradient id="india-glow" cx="50%" cy="45%" r="45%">
              <stop offset="0%" stopColor="rgba(188,140,252,0.06)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <filter id="marker-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background glow */}
          <circle cx="300" cy="195" r="180" fill="url(#india-glow)" />

          {/* Grid / graticule lines */}
          {[80,120,160,200,240,280,320,360].map((y, i) => (
            <line key={`h${i}`} x1="80" y1={y} x2="520" y2={y} stroke="rgba(188,140,252,0.03)" strokeWidth="0.3" />
          ))}
          {[120,180,240,300,360,420,480].map((x, i) => (
            <line key={`v${i}`} x1={x} y1="30" x2={x} y2="380" stroke="rgba(188,140,252,0.03)" strokeWidth="0.3" />
          ))}

          {/* India outline — realistic shape */}
          {/* Main body - Jammu & Kashmir to Kanyakumari */}
          <path d={`
            M268 48 Q272 42, 282 38 T298 42 Q305 48, 308 58 T312 75
            Q315 68, 322 62 T335 58 Q342 60, 348 68 T352 80
            Q356 75, 362 78 T365 88
            Q358 92, 352 98 T345 108
            Q348 112, 350 118 T348 128
            Q345 132, 340 138 T335 148
            Q338 152, 342 158 T340 168
            Q336 172, 330 178 T322 185
            Q325 192, 320 198 T312 208
            Q308 215, 302 222 T295 232
            Q290 240, 285 248 T278 258
            Q274 262, 268 268 T260 272
            Q255 268, 250 260 T245 250
            Q242 242, 238 235 T235 225
            Q232 218, 228 212 T222 205
            Q218 198, 215 192 T210 185
            Q208 178, 205 170 T202 162
            Q200 155, 198 148 T195 140
            Q192 132, 190 125 T188 118
            Q185 112, 182 105 T178 98
            Q175 92, 172 85 T168 78
            Q165 72, 162 65 T158 58
            Q155 52, 152 48 T148 42
            Q152 38, 160 35 T175 38
            Q185 35, 198 32 T218 35
            Q232 32, 245 35 T258 42
            Q262 45, 268 48 Z
          `} fill="rgba(188,140,252,0.05)" stroke="rgba(188,140,252,0.25)" strokeWidth="1" />

          {/* Jammu & Kashmir region */}
          <path d="M228 55 Q240 48, 258 52 T282 58 Q290 62, 295 70 T298 82 Q295 88, 288 92 T275 95 Q265 92, 258 88 T248 82 Q242 78, 238 72 T232 65 Q228 60, 228 55"
            fill="rgba(188,140,252,0.04)" stroke="rgba(188,140,252,0.08)" strokeWidth="0.4" />

          {/* Rajasthan */}
          <path d="M178 105 Q192 98, 210 102 T235 108 Q242 112, 245 120 T242 130 Q235 135, 225 138 T210 140 Q198 138, 190 132 T182 122 Q178 115, 178 105"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Gujarat */}
          <path d="M152 128 Q162 122, 175 125 T190 132 Q195 138, 192 145 T185 152 Q178 155, 168 152 T158 145 Q152 140, 150 135 T152 128"
            fill="rgba(188,140,252,0.04)" stroke="rgba(188,140,252,0.08)" strokeWidth="0.3" />

          {/* Madhya Pradesh */}
          <path d="M210 140 Q225 138, 245 142 T270 148 Q278 152, 280 160 T275 168 Q268 172, 258 175 T242 176 Q228 174, 218 170 T210 162 Q208 155, 210 148 T210 140"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Maharashtra */}
          <path d="M185 175 Q200 170, 218 172 T242 178 Q250 182, 248 190 T240 198 Q232 202, 220 205 T205 206 Q195 204, 188 198 T182 190 Q180 182, 185 175"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Karnataka */}
          <path d="M218 208 Q230 205, 245 210 T258 218 Q262 225, 258 232 T248 238 Q240 240, 230 238 T220 232 Q215 225, 215 218 T218 208"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Tamil Nadu */}
          <path d="M268 268 Q278 262, 290 265 T305 272 Q312 280, 308 290 T298 298 Q288 302, 278 298 T270 290 Q265 282, 268 268"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* West Bengal */}
          <path d="M305 128 Q315 125, 325 128 T335 135 Q338 142, 335 148 T328 155 Q320 158, 312 155 T305 148 Q302 140, 305 132 T305 128"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Kerala */}
          <path d="M235 245 Q242 240, 250 242 T258 248 Q262 255, 258 265 T250 272 Q245 275, 240 272 T235 265 Q232 258, 235 250 T235 245"
            fill="rgba(188,140,252,0.04)" stroke="rgba(188,140,252,0.08)" strokeWidth="0.3" />

          {/* Andhra Pradesh */}
          <path d="M262 188 Q275 182, 290 185 T308 192 Q315 198, 312 208 T302 215 Q292 220, 280 218 T268 212 Q262 205, 260 198 T262 188"
            fill="rgba(188,140,252,0.03)" stroke="rgba(188,140,252,0.06)" strokeWidth="0.3" />

          {/* Northeast states */}
          <path d="M345 108 Q355 105, 365 108 T378 115 Q382 120, 380 128 T372 132 Q365 130, 358 126 T350 120 Q345 115, 345 108"
            fill="rgba(188,140,252,0.04)" stroke="rgba(188,140,252,0.08)" strokeWidth="0.3" />

          {/* Lakshadweep */}
          {[[155,210],[152,218],[148,225]].map(([x,y], i) => (
            <circle key={`lw${i}`} cx={x} cy={y} r="1.5" fill="rgba(188,140,252,0.15)" stroke="rgba(188,140,252,0.25)" strokeWidth="0.3" />
          ))}

          {/* Andaman & Nicobar */}
          {[[420,248],[425,258],[428,268],[432,278]].map(([x,y], i) => (
            <circle key={`an${i}`} cx={x} cy={y} r="1.2" fill="rgba(188,140,252,0.12)" stroke="rgba(188,140,252,0.2)" strokeWidth="0.3" />
          ))}

          {/* City markers with count */}
          {[
            { x: 195, y: 142, name: "Ahmedabad", visitors: 580, major: true },
            { x: 178, y: 180, name: "Mumbai", visitors: 420, major: true },
            { x: 245, y: 225, name: "Bengaluru", visitors: 310, major: true },
            { x: 282, y: 85, name: "Delhi", visitors: 280, major: true },
            { x: 295, y: 200, name: "Hyderabad", visitors: 180, major: false },
            { x: 288, y: 272, name: "Chennai", visitors: 150, major: false },
            { x: 315, y: 135, name: "Kolkata", visitors: 120, major: false },
            { x: 235, y: 185, name: "Pune", visitors: 95, major: false },
            { x: 248, y: 260, name: "Kochi", visitors: 72, major: false },
          ].map((city, i) => (
            <g key={i}>
              {/* Pulse ring for major cities */}
              {city.major && (
                <circle cx={city.x} cy={city.y} r="16" fill="none" stroke="rgba(188,140,252,0.08)" strokeWidth="0.5">
                  <animate attributeName="r" from="10" to="22" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
                </circle>
              )}
              {/* Glow */}
              <circle cx={city.x} cy={city.y} r={city.major ? 8 : 5} fill="rgba(188,140,252,0.1)" filter="url(#marker-glow)" />
              {/* Dot */}
              <circle cx={city.x} cy={city.y} r={city.major ? 3.5 : 2.5} fill="rgba(188,140,252,0.7)" />
              {/* Label */}
              <text x={city.x} y={city.y - (city.major ? 12 : 9)} textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">{city.name}</text>
              {/* Visitor count */}
              <text x={city.x} y={city.y + (city.major ? 16 : 13)} textAnchor="middle" fill="rgba(188,140,252,0.45)" fontSize="5.5" fontFamily="Inter, sans-serif">{city.visitors}</text>
            </g>
          ))}

          {/* Connection lines between major cities */}
          <path d="M195 142 Q210 160, 178 180" stroke="rgba(188,140,252,0.08)" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
          <path d="M178 180 Q210 200, 245 225" stroke="rgba(188,140,252,0.08)" strokeWidth="0.5" fill="none" strokeDasharray="3,3" />
          <path d="M282 85 Q290 110, 295 200" stroke="rgba(188,140,252,0.06)" strokeWidth="0.4" fill="none" strokeDasharray="3,3" />
        </svg>

        {/* Title */}
        <div style={{ position: "absolute", top: 8, left: 12, fontSize: "0.6rem", color: "rgba(188,140,252,0.5)", fontWeight: 600, letterSpacing: "0.05em" }}>
          📍 INDIA MAP — GEOGRAPHIC INTELLIGENCE
        </div>

        {/* Stats panel */}
        <div style={{
          position: "absolute", bottom: 10, left: 12, right: 12,
          display: "flex", gap: 12, fontSize: "0.5rem"
        }}>
          <div style={{ background: "rgba(188,140,252,0.06)", border: "1px solid rgba(188,140,252,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(188,140,252,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>2,100</span> visitors
          </div>
          <div style={{ background: "rgba(188,140,252,0.06)", border: "1px solid rgba(188,140,252,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(188,140,252,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>18</span> states
          </div>
          <div style={{ background: "rgba(188,140,252,0.06)", border: "1px solid rgba(188,140,252,0.12)", borderRadius: 6, padding: "4px 8px", color: "rgba(188,140,252,0.6)" }}>
            <span style={{ fontSize: "0.6rem", color: S.text }}>24</span> cities
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 12: NS.AI PRO ───────────────────────────────────
function NSAIProVisual() {
  return (
    <Frame label="NS.ai Pro">
      <TitleBar title="NS.ai Pro — AI Assistant" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "8px", marginBottom: 6 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: S.yellow, flexShrink: 0 }}>AI</div>
            <div style={{ fontSize: "0.5rem", color: S.textMuted, lineHeight: 1.5 }}>
              <div style={{ color: S.textDim, fontSize: "0.45rem", marginBottom: 2 }}>NS.ai Pro</div>
              Hello! I can help you analyze visitor patterns, review security events, or generate insights about your portfolio performance.
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ flex: 1 }} />
            <div style={{ background: "rgba(88,166,255,0.08)", borderRadius: 6, padding: "6px 8px", maxWidth: "70%" }}>
              <div style={{ fontSize: "0.5rem", color: S.text, lineHeight: 1.5 }}>
                Show me today's visitor summary
              </div>
            </div>
          </div>
        </div>
        <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "8px" }}>
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.5rem", color: S.yellow, flexShrink: 0 }}>AI</div>
            <div style={{ fontSize: "0.5rem", color: S.textMuted, lineHeight: 1.6 }}>
              <div style={{ color: S.textDim, fontSize: "0.45rem", marginBottom: 2 }}>NS.ai Pro — Response</div>
              <strong style={{ color: S.text }}>Today's Summary:</strong><br />
              • 142 visitors from 12 countries<br />
              • 3 new recruiter detections<br />
              • Threat level: <span style={{ color: S.green }}>LOW (24/100)</span><br />
              • 5 resume downloads<br />
              • Top source: Ahmedabad, India
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 13: MUSIC STUDIO ────────────────────────────────
function MusicStudioVisual() {
  return (
    <Frame label="Music Studio">
      <TitleBar title="Music Studio — Audio CMS" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 8 }}>
          <StatCard label="Total Tracks" value="24" color={S.accent} small />
          <StatCard label="Total Plays" value="1,847" color={S.green} small />
          <StatCard label="Listeners" value="312" color={S.purple} small />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
            <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Playlist</div>
            {["Midnight Protocol", "Binary Sunset", "Neon Cascade", "Pulse Width", "Echo Chamber"].map((t, i) => (
              <div key={i} style={{
                display: "grid", gridTemplateColumns: "16px 1fr 50px 30px",
                padding: "4px 0", borderBottom: `1px solid ${S.border}`,
                fontSize: "0.5rem", color: S.textMuted,
                background: i === 0 ? "rgba(88,166,255,0.04)" : "transparent",
              }}>
                <span style={{ color: i === 0 ? S.accent : S.textDim }}>{i === 0 ? "▶" : "♪"}</span>
                <span style={{ color: i === 0 ? S.text : S.textMuted }}>{t}</span>
                <span style={{ color: S.textDim }}>{[342, 287, 256, 198, 175][i]}</span>
                <span style={{ color: S.textDim, textAlign: "right" }}>{["3:42", "4:15", "3:28", "5:01", "3:55"][i]}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 4 }}>Listening Activity</div>
              <LineChart points={[20, 35, 28, 45, 38, 55, 42, 60, 50, 68]} color={S.accent} height={45} />
            </div>
            <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px" }}>
              <div style={{ fontSize: "0.5rem", color: S.textDim, marginBottom: 3 }}>Now Playing</div>
              <div style={{ fontSize: "0.55rem", color: S.text, fontWeight: 600 }}>Midnight Protocol</div>
              <div style={{ fontSize: "0.45rem", color: S.textDim }}>3:42 / 4:15</div>
              <div style={{ marginTop: 4, height: 3, borderRadius: 2, background: S.border }}>
                <div style={{ width: "72%", height: "100%", borderRadius: 2, background: S.accent }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 14: NS CONTROL HUB ──────────────────────────────
function NSControlHubVisual() {
  return (
    <Frame label="NS Control Hub" aspect="16/10">
      <TitleBar title="NS Control Hub — Unified Platform" />
      <div style={{ padding: "8px 10px" }}>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 700, color: S.text }}>NS Control Hub</div>
          <div style={{ fontSize: "0.45rem", color: S.textDim }}>All 15 modules — One command layer</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, marginBottom: 8 }}>
          {[
            { name: "Overview", icon: "◉", color: S.accent },
            { name: "Visitors", icon: "◎", color: S.green },
            { name: "Mails", icon: "✉", color: S.purple },
            { name: "Resume", icon: "📄", color: S.yellow },
            { name: "Analytics", icon: "📊", color: S.accent },
            { name: "Security", icon: "🛡", color: S.red },
            { name: "SOC", icon: "⬡", color: S.orange },
            { name: "Twin Lab", icon: "◇", color: S.purple },
            { name: "Devices", icon: "📱", color: S.green },
            { name: "Earth", icon: "🌐", color: S.accent },
            { name: "India", icon: "📍", color: S.purple },
            { name: "NS.ai", icon: "⚡", color: S.yellow },
            { name: "Music", icon: "♫", color: S.cyan },
            { name: "Control", icon: "⬢", color: S.accent },
            { name: "Settings", icon: "⚙", color: S.textMuted },
          ].map((m, i) => (
            <div key={i} style={{
              padding: "5px 4px", borderRadius: 5, background: S.card,
              border: `1px solid ${i === 13 ? "rgba(88,166,255,0.2)" : S.border}`,
              textAlign: "center", cursor: "pointer",
              boxShadow: i === 13 ? "0 0 12px rgba(88,166,255,0.1)" : "none",
            }}>
              <div style={{ fontSize: "0.7rem", marginBottom: 2 }}>{m.icon}</div>
              <div style={{ fontSize: "0.42rem", color: i === 13 ? S.accent : S.textMuted, fontWeight: i === 13 ? 600 : 400 }}>{m.name}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "0.45rem", color: S.textDim }}>System Health</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: S.green }}>● Online</div>
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "0.45rem", color: S.textDim }}>Active Modules</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: S.accent }}>15/15</div>
          </div>
          <div style={{ background: S.card, border: `1px solid ${S.border}`, borderRadius: 6, padding: "6px 8px", textAlign: "center" }}>
            <div style={{ fontSize: "0.45rem", color: S.textDim }}>Uptime</div>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: S.yellow }}>99.9%</div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MODULE 15: SETTINGS ────────────────────────────────────
function SettingsVisual() {
  return (
    <Frame label="Settings">
      <TitleBar title="Settings — System Configuration" />
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", height: "calc(100% - 26px)" }}>
        <div style={{ borderRight: `1px solid ${S.border}`, padding: "6px 0" }}>
          {["General & Account", "Reports & Alerts", "NS.ai Config", "Appearance", "Privacy & Data"].map((item, i) => (
            <div key={i} style={{
              padding: "5px 8px", fontSize: "0.5rem",
              color: i === 0 ? S.text : S.textMuted,
              background: i === 0 ? "rgba(88,166,255,0.06)" : "transparent",
              borderLeft: i === 0 ? `2px solid ${S.accent}` : "2px solid transparent",
            }}>{item}</div>
          ))}
        </div>
        <div style={{ padding: "8px 10px" }}>
          <div style={{ fontSize: "0.6rem", fontWeight: 600, color: S.text, marginBottom: 8 }}>General & Account</div>
          {[
            { label: "Admin Name", value: "Naitik Soni" },
            { label: "Email", value: "naitik.infosec@gmail.com" },
            { label: "Role", value: "Administrator" },
          ].map((f, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ fontSize: "0.45rem", color: S.textDim, marginBottom: 2 }}>{f.label}</div>
              <div style={{ padding: "5px 8px", borderRadius: 4, background: S.card, border: `1px solid ${S.border}`, fontSize: "0.55rem", color: S.textMuted }}>{f.value}</div>
            </div>
          ))}
          <div style={{ marginTop: 8, padding: "5px 10px", borderRadius: 4, background: "rgba(88,166,255,0.08)", textAlign: "center", fontSize: "0.5rem", color: S.accent, border: `1px solid rgba(88,166,255,0.15)` }}>
            Save Changes
          </div>
        </div>
      </div>
    </Frame>
  );
}

// ─── MAIN EXPORT ────────────────────────────────────────────
const VISUAL_MAP = {
  overview: OverviewVisual,
  visitors: VisitorsVisual,
  contact: MailsVisual,
  resume: ResumeVisual,
  analytics: AnalyticsVisual,
  siem: SecurityLogsVisual,
  threat: SOCPanelVisual,
  "geo-3d": DigitalTwinVisual,
  auth: DevicesVisual,
  earth: EarthViewVisual,
  recruiter: IndiaMapVisual,
  "ai-agent": NSAIProVisual,
  "audio-cms": MusicStudioVisual,
  notification: NSControlHubVisual,
  settings: SettingsVisual,
};

export default function ModuleVisual({ moduleId, isInView }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const Visual = VISUAL_MAP[moduleId];

  if (!Visual) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: "100%" }}
      className="module-screenshot"
    >
      <Visual />
    </motion.div>
  );
}

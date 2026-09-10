require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3001;

// ─── CORS ───
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://naitiksoni1417.netlify.app",
  "https://admin-analytics-showcase.netlify.app",
  "https://ns-analytics.netlify.app",
  "https://dancing-kangaroo-e8c314.netlify.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: "10kb" }));

// ─── Rate Limiting ───
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: "Too many requests. Please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api/", limiter);

// ─── SMTP Transporter ───
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// ─── Validation ───
function validate(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push("Name is required (min 2 chars).");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required.");
  if (!data.requestType) errors.push("Request type is required.");
  if (!data.project || data.project.trim().length < 20) errors.push("Project description is required (min 20 chars).");
  if (data.name && data.name.length > 80) errors.push("Name too long (max 80 chars).");
  if (data.project && data.project.length > 2000) errors.push("Project description too long (max 2000 chars).");
  if (data.details && data.details.length > 3000) errors.push("Details too long (max 3000 chars).");
  return errors;
}

// ─── Email Template ───
function buildEmailHTML(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
      <div style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">NS Command Center</div>
      <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;">New Inquiry Received</div>
      <div style="width:40px;height:2px;background:#333;margin:16px auto 0;border-radius:1px;"></div>
    </div>

    <!-- Body -->
    <div style="background:#fff;border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;padding:32px 40px;">

      <!-- Badge -->
      <div style="display:inline-block;background:#f0fdf4;border:1px solid #bbf7d0;color:#16a34a;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:5px 12px;border-radius:20px;margin-bottom:24px;">
        ${data.requestType}
      </div>

      <!-- Name & Email -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding-right:12px;">
            <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">From</div>
            <div style="font-size:15px;font-weight:600;color:#111;">${escapeHTML(data.name)}</div>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:12px;">
            <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Email</div>
            <div style="font-size:15px;color:#111;"><a href="mailto:${escapeHTML(data.email)}" style="color:#2563eb;text-decoration:none;">${escapeHTML(data.email)}</a></div>
          </td>
        </tr>
      </table>

      ${data.organization ? `
      <!-- Organization -->
      <div style="margin-bottom:20px;">
        <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Organization</div>
        <div style="font-size:15px;color:#111;">${escapeHTML(data.organization)}</div>
      </div>
      ` : ""}

      <!-- Divider -->
      <div style="border-top:1px solid #f0f0f0;margin:24px 0;"></div>

      <!-- Project -->
      <div style="margin-bottom:20px;">
        <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Project / Requirement</div>
        <div style="font-size:14px;color:#333;line-height:1.7;background:#fafafa;border:1px solid #f0f0f0;border-radius:8px;padding:16px;">
          ${escapeHTML(data.project).replace(/\n/g, "<br>")}
        </div>
      </div>

      ${data.details ? `
      <!-- Additional Details -->
      <div style="margin-bottom:20px;">
        <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Additional Details</div>
        <div style="font-size:14px;color:#333;line-height:1.7;background:#fafafa;border:1px solid #f0f0f0;border-radius:8px;padding:16px;">
          ${escapeHTML(data.details).replace(/\n/g, "<br>")}
        </div>
      </div>
      ` : ""}

      <!-- Quick Actions -->
      <div style="text-align:center;margin-top:28px;">
        <a href="mailto:${escapeHTML(data.email)}?subject=Re: Your Inquiry — NS Command Center&body=Hi ${escapeHTML(data.name).split(" ")[0]},%0A%0AThank you for reaching out. I've received your inquiry and will get back to you shortly.%0A%0ABest,%0ANaitik Soni"
           style="display:inline-block;background:#111;color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">
          Reply to ${escapeHTML(data.name).split(" ")[0]}
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
      <div style="font-size:11px;color:#999;line-height:1.6;">
        Submitted on ${now}<br>
        <span style="color:#bbb;">This inquiry was sent via the NS Command Center request form.</span>
      </div>
    </div>

  </div>
</body>
</html>`;
}

function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function buildEmailText(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NS COMMAND CENTER — NEW INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Type:       ${data.requestType}
Name:       ${data.name}
Email:      ${data.email}
${data.organization ? `Organization: ${data.organization}` : ""}

━━━ Project / Requirement ━━━
${data.project}

${data.details ? `━━━ Additional Details ━━━\n${data.details}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${now}
Source:    NS Command Center Request Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}

// ─── Contact Form Validation ───
function validateContact(data) {
  const errors = [];
  if (!data.name || data.name.trim().length < 2) errors.push("Name is required.");
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.push("Valid email is required.");
  if (!data.message || data.message.trim().length < 10) errors.push("Message is required (min 10 characters).");
  if (data.name && data.name.length > 80) errors.push("Name too long.");
  if (data.message && data.message.length > 2000) errors.push("Message too long.");
  return errors;
}

// ─── Contact Email Template ───
function buildContactEmailHTML(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#0a0a0a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
      <div style="font-size:11px;font-weight:700;color:#555;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:8px;">NS Command Center</div>
      <div style="font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.02em;">New Contact Message</div>
      <div style="width:40px;height:2px;background:#333;margin:16px auto 0;border-radius:1px;"></div>
    </div>
    <div style="background:#fff;border-left:1px solid #e5e5e5;border-right:1px solid #e5e5e5;padding:32px 40px;">
      <div style="display:inline-block;background:#f0f4ff;border:1px solid #c7d7fe;color:#4f46e5;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;padding:5px 12px;border-radius:20px;margin-bottom:24px;">Contact Form</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
          <td style="width:50%;vertical-align:top;padding-right:12px;">
            <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">From</div>
            <div style="font-size:15px;font-weight:600;color:#111;">${escapeHTML(data.name)}</div>
          </td>
          <td style="width:50%;vertical-align:top;padding-left:12px;">
            <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:4px;">Email</div>
            <div style="font-size:15px;color:#111;"><a href="mailto:${escapeHTML(data.email)}" style="color:#2563eb;text-decoration:none;">${escapeHTML(data.email)}</a></div>
          </td>
        </tr>
      </table>
      <div style="border-top:1px solid #f0f0f0;margin:24px 0;"></div>
      <div style="margin-bottom:20px;">
        <div style="font-size:10px;font-weight:700;color:#999;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Message</div>
        <div style="font-size:14px;color:#333;line-height:1.7;background:#fafafa;border:1px solid #f0f0f0;border-radius:8px;padding:16px;">
          ${escapeHTML(data.message).replace(/\n/g, "<br>")}
        </div>
      </div>
      <div style="text-align:center;margin-top:28px;">
        <a href="mailto:${escapeHTML(data.email)}?subject=Re: Your Message — NS Command Center&body=Hi ${escapeHTML(data.name).split(" ")[0]},%0A%0AThank you for reaching out. I've received your message and will get back to you shortly.%0A%0ABest,%0ANaitik Soni"
           style="display:inline-block;background:#111;color:#fff;font-size:13px;font-weight:600;text-decoration:none;padding:12px 28px;border-radius:8px;">
          Reply to ${escapeHTML(data.name).split(" ")[0]}
        </a>
      </div>
    </div>
    <div style="background:#fafafa;border:1px solid #e5e5e5;border-top:none;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
      <div style="font-size:11px;color:#999;line-height:1.6;">
        Submitted on ${now}<br>
        <span style="color:#bbb;">This message was sent via the NS Command Center contact form.</span>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function buildContactEmailText(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NS COMMAND CENTER — CONTACT MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name:    ${data.name}
Email:   ${data.email}

━━━ Message ━━━
${data.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${now}
Source:    NS Command Center Contact Form
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;
}

// ─── API Routes ───
app.post("/api/requests", async (req, res) => {
  try {
    const { name, email, organization, requestType, project, details } = req.body;

    // Validate
    const errors = validate(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(" ") });
    }

    // Send email
    const mailOptions = {
      from: `"NS Command Center" <${process.env.SMTP_USER}>`,
      to: "naitik.infosec@gmail.com",
      replyTo: email,
      subject: `[${requestType}] New Inquiry from ${name} — NS Command Center`,
      text: buildEmailText({ name, email, organization, requestType, project, details }),
      html: buildEmailHTML({ name, email, organization, requestType, project, details }),
    };

    await transporter.sendMail(mailOptions);

    console.log(`✓ Inquiry received from ${name} <${email}> [${requestType}]`);
    res.json({ success: true, message: "Your request has been sent successfully." });

  } catch (err) {
    console.error("✗ Email send failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to send request. Please try again later." });
  }
});

// ─── Contact Form Route ───
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const errors = validateContact(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ success: false, message: errors.join(" ") });
    }

    const mailOptions = {
      from: `"NS Command Center" <${process.env.SMTP_USER}>`,
      to: "naitik.infosec@gmail.com",
      replyTo: email,
      subject: `[Contact] Message from ${name} — NS Command Center`,
      text: buildContactEmailText({ name, email, message }),
      html: buildContactEmailHTML({ name, email, message }),
    };

    await transporter.sendMail(mailOptions);

    console.log(`✓ Contact message from ${name} <${email}>`);
    res.json({ success: true, message: "Message sent successfully." });

  } catch (err) {
    console.error("✗ Contact email failed:", err.message);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again later." });
  }
});

// ─── Health Check ───
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    smtpConfigured: !!(process.env.SMTP_USER && process.env.SMTP_PASS),
  });
});

// ─── Start ───
app.listen(PORT, async () => {
  console.log(`\n  NS Command Center Backend`);
  console.log(`  ─────────────────────────`);
  console.log(`  Port:      ${PORT}`);
  console.log(`  SMTP User: ${process.env.SMTP_USER || "NOT SET"}`);
  console.log(`  SMTP Pass: ${process.env.SMTP_PASS ? "****" : "NOT SET"}`);
  console.log(`  Status:    starting...\n`);

  try {
    await transporter.verify();
    console.log(`  SMTP:      ✓ verified and ready\n`);
  } catch (err) {
    console.error(`  SMTP:      ✗ verification failed: ${err.message}`);
    console.error(`  ⚠  Emails will fail to send. Check SMTP_USER and SMTP_PASS.\n`);
  }
});

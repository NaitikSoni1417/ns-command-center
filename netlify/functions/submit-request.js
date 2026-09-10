const nodemailer = require("nodemailer");

const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

function buildEmailHTML(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
<div style="max-width:640px;margin:0 auto;padding:24px;">
  <div style="background:#111;color:#fff;padding:32px;border-radius:12px 12px 0 0;text-align:center;">
    <h1 style="margin:0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">NS Command Center</h1>
    <p style="margin:8px 0 0;font-size:13px;color:#999;">New Inquiry Received</p>
  </div>
  <div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5;border-top:none;">
    <div style="display:inline-block;background:#16a34a;color:#fff;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;margin-bottom:20px;">
      ${data.requestType}
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;color:#333;">
      <tr><td style="padding:8px 0;color:#666;width:120px;">From</td><td style="padding:8px 0;font-weight:600;">${data.name}</td></tr>
      <tr><td style="padding:8px 0;color:#666;">Email</td><td style="padding:8px 0;"><a href="mailto:${data.email}" style="color:#111;">${data.email}</a></td></tr>
      ${data.organization ? `<tr><td style="padding:8px 0;color:#666;">Organization</td><td style="padding:8px 0;">${data.organization}</td></tr>` : ""}
      <tr><td style="padding:8px 0;color:#666;">Type</td><td style="padding:8px 0;">${data.requestType}</td></tr>
    </table>
    <div style="margin-top:24px;padding:20px;background:#f9f9f9;border:1px solid #e5e5e5;border-radius:8px;">
      <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;color:#999;font-weight:600;letter-spacing:0.5px;">Project Description</p>
      <p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${data.project}</p>
    </div>
    ${data.details ? `<div style="margin-top:16px;padding:20px;background:#f9f9f9;border:1px solid #e5e5e5;border-radius:8px;"><p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;color:#999;font-weight:600;letter-spacing:0.5px;">Additional Details</p><p style="margin:0;font-size:14px;color:#333;line-height:1.6;">${data.details}</p></div>` : ""}
    <div style="margin-top:28px;text-align:center;">
      <a href="mailto:${data.email}?subject=Re: ${data.requestType} Inquiry — NS Command Center" style="display:inline-block;background:#111;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">Reply to ${data.name}</a>
    </div>
  </div>
  <p style="text-align:center;font-size:11px;color:#999;margin-top:16px;">${now} IST</p>
</div>
</body>
</html>`;
}

function buildEmailText(data) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "full", timeStyle: "short" });
  return [
    `NS Command Center — New Inquiry`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `Type: ${data.requestType}`,
    `From: ${data.name} <${data.email}>`,
    data.organization ? `Organization: ${data.organization}` : null,
    ``,
    `Project:`,
    data.project,
    data.details ? `\nDetails:\n${data.details}` : null,
    ``,
    `───`,
    `${now} IST`,
  ].filter(Boolean).join("\n");
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Method not allowed" }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Invalid JSON" }) };
  }

  const { name, email, organization, requestType, project, details } = payload;

  if (!name || name.trim().length < 2) return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Name is required (min 2 chars)." }) };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Valid email is required." }) };
  if (!requestType) return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Request type is required." }) };
  if (!project || project.trim().length < 20) return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ success: false, message: "Project description is required (min 20 chars)." }) };

  try {
    await transporter.sendMail({
      from: `"NS Command Center" <${SMTP_USER}>`,
      to: "naitik.infosec@gmail.com",
      replyTo: email,
      subject: `[${requestType}] New Inquiry from ${name} — NS Command Center`,
      text: buildEmailText(payload),
      html: buildEmailHTML(payload),
    });

    return { statusCode: 200, headers: { ...corsHeaders, "Content-Type": "application/json" }, body: JSON.stringify({ success: true, message: "Your request has been sent successfully." }) };
  } catch (err) {
    return { statusCode: 500, headers: { ...corsHeaders, "Content-Type": "application/json" }, body: JSON.stringify({ success: false, message: "Failed to send. Please try again.", error: err.message }) };
  }
};

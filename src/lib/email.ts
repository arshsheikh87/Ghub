import nodemailer from "nodemailer";
import type { Booking } from "@/types";

// ─────────────────────────────────────────────
// Nodemailer transporter (singleton)
// ─────────────────────────────────────────────

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const from = process.env.SMTP_FROM ?? "NexusPlay <noreply@nexusplay.com>";
const adminEmail = process.env.ADMIN_EMAIL ?? "admin@nexusplay.com";

// ─────────────────────────────────────────────
// Booking confirmation email to customer
// ─────────────────────────────────────────────
export async function sendBookingConfirmation(
  booking: Booking & { game: { name: string } }
) {
  const transporter = createTransporter();

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Booking Confirmation</title>
  </head>
  <body style="margin:0;padding:0;background:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#ffffff;">
    <div style="max-width:600px;margin:40px auto;padding:0 20px;">
      <div style="background:linear-gradient(135deg,#8b5cf6,#00d4ff);padding:2px;border-radius:16px;">
        <div style="background:#0f0f1a;border-radius:14px;padding:40px;">
          <div style="text-align:center;margin-bottom:32px;">
            <h1 style="background:linear-gradient(135deg,#8b5cf6,#00d4ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:28px;font-weight:900;margin:0 0 8px;">NexusPlay</h1>
            <p style="color:rgba(255,255,255,0.5);margin:0;font-size:14px;">Gaming Cafe</p>
          </div>

          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;margin-bottom:16px;">✓</div>
            <h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:0 0 8px;">Booking Confirmed!</h2>
            <p style="color:rgba(255,255,255,0.6);margin:0;font-size:15px;">Your gaming session has been reserved.</p>
          </div>

          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:24px;margin-bottom:24px;">
            <h3 style="color:#a78bfa;font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 16px;">Booking Details</h3>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Booking ID</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">#${booking.bookingId.slice(0, 8).toUpperCase()}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Name</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">${booking.name}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Game</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">${booking.game.name}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Date</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">${new Date(booking.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Time</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">${booking.startTime} – ${booking.endTime}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">Duration</td><td style="color:#ffffff;font-size:14px;font-weight:600;text-align:right;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.06);">${booking.duration} ${booking.duration === 1 ? "hour" : "hours"}</td></tr>
              <tr><td style="color:rgba(255,255,255,0.5);font-size:14px;padding:8px 0;">Total Amount</td><td style="color:#a78bfa;font-size:16px;font-weight:700;text-align:right;padding:8px 0;">Rs ${Number(booking.totalAmount).toLocaleString()}</td></tr>
            </table>
          </div>

          <div style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:16px;margin-bottom:24px;">
            <p style="color:rgba(255,255,255,0.7);font-size:13px;margin:0;line-height:1.6;">
              📍 <strong style="color:#ffffff;">123 Gaming Street, Sector F-7, Islamabad, Pakistan</strong><br>
              📞 Please arrive 10 minutes before your session. Bring this email as confirmation.
            </p>
          </div>

          <p style="color:rgba(255,255,255,0.4);font-size:12px;text-align:center;margin:0;">
            Questions? Contact us at <a href="mailto:hello@nexusplay.com" style="color:#8b5cf6;">hello@nexusplay.com</a> or call <a href="tel:+923001234567" style="color:#8b5cf6;">+92 300 1234567</a>
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from,
    to: booking.email,
    subject: `Booking Confirmed — #${booking.bookingId.slice(0, 8).toUpperCase()} | NexusPlay`,
    html,
  });
}

// ─────────────────────────────────────────────
// Admin notification email
// ─────────────────────────────────────────────
export async function sendAdminBookingNotification(
  booking: Booking & { game: { name: string } }
) {
  const transporter = createTransporter();

  const html = `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:20px;background:#0a0a0f;font-family:sans-serif;color:#fff;">
    <div style="max-width:500px;margin:0 auto;background:#0f0f1a;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:32px;">
      <h2 style="color:#8b5cf6;margin:0 0 24px;">🎮 New Booking Received</h2>
      <p><strong>ID:</strong> #${booking.bookingId.slice(0, 8).toUpperCase()}</p>
      <p><strong>Customer:</strong> ${booking.name} (${booking.email})</p>
      <p><strong>Phone:</strong> ${booking.phone}</p>
      <p><strong>Game:</strong> ${booking.game.name}</p>
      <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
      <p><strong>Time:</strong> ${booking.startTime} – ${booking.endTime}</p>
      <p><strong>Duration:</strong> ${booking.duration}h</p>
      <p><strong>Total:</strong> Rs ${Number(booking.totalAmount).toLocaleString()}</p>
      ${booking.specialRequest ? `<p><strong>Special Request:</strong> ${booking.specialRequest}</p>` : ""}
    </div>
  </body>
  </html>
  `;

  await transporter.sendMail({
    from,
    to: adminEmail,
    subject: `New Booking #${booking.bookingId.slice(0, 8).toUpperCase()} — ${booking.name}`,
    html,
  });
}

// ─────────────────────────────────────────────
// Contact form notification to admin
// ─────────────────────────────────────────────
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const transporter = createTransporter();

  await transporter.sendMail({
    from,
    to: adminEmail,
    subject: `New Contact Message: ${data.subject}`,
    html: `
    <div style="font-family:sans-serif;padding:20px;max-width:500px;">
      <h2 style="color:#8b5cf6;">New Contact Message</h2>
      <p><strong>From:</strong> ${data.name} (${data.email})</p>
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
      <p><strong>Subject:</strong> ${data.subject}</p>
      <p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>
    </div>
    `,
  });
}

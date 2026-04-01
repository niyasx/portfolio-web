import nodemailer from "nodemailer";

export async function sendContactEmail(payload: { email: string; phone: string; message: string }) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.CONTACT_TO_EMAIL ?? process.env.SMTP_USER;

  if (!host || !user || !pass || !to) {
    return { delivered: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `Portfolio Contact <${user}>`,
    to,
    subject: `New portfolio inquiry from ${payload.email}`,
    text: `Email: ${payload.email}\nPhone: ${payload.phone}\n\n${payload.message}`,
  });

  return { delivered: true };
}

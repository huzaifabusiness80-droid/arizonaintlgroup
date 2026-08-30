import nodemailer from "nodemailer";

export interface InquiryEmailPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  message?: string;
  country?: string;
}

// Create reusable transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER || "zarrantravelsandmoters@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD || "umwokhjkmqrqqggv",
  },
});

export async function sendInquiryEmail(data: InquiryEmailPayload) {
  const recipient =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    process.env.GMAIL_USER ||
    "zarrantravelsandmoters@gmail.com";

  const senderEmail = process.env.GMAIL_USER || "zarrantravelsandmoters@gmail.com";

  // Clean formatted phone for WhatsApp quick link
  const cleanPhone = (data.phone || "").replace(/[^0-9]/g, "");
  const waLink = cleanPhone.length > 6 ? `https://wa.me/${cleanPhone}` : null;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Lead Inquiry - Arizona International Group</title>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
          .header { background: #0f172a; padding: 30px; text-align: center; border-bottom: 3px solid #2563eb; }
          .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { color: #38bdf8; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
          .badge { display: inline-block; padding: 4px 12px; background: #eff6ff; color: #1d4ed8; font-size: 12px; font-weight: 700; border-radius: 20px; margin-bottom: 20px; }
          .content { padding: 32px; }
          .field-group { margin-bottom: 18px; border-bottom: 1px solid #f1f5f9; padding-bottom: 14px; }
          .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.8px; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #0f172a; font-weight: 600; }
          .message-box { background: #f8fafc; border-left: 4px solid #2563eb; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #334155; margin-top: 8px; }
          .actions { margin-top: 28px; text-align: center; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 8px; font-size: 13px; font-weight: 700; text-decoration: none; margin: 6px; }
          .btn-wa { background: #16a34a; color: #ffffff; }
          .btn-mail { background: #09090b; color: #ffffff; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Arizona International Group</h1>
            <p>New Client Inquiry Notification</p>
          </div>

          <div class="content">
            <div class="badge">🔥 Fresh Lead Received</div>

            <div class="field-group">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${data.name || "N/A"}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone / WhatsApp</div>
              <div class="field-value">${data.phone || "N/A"}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value">${data.email || "Not Provided"}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Requested Service / Division</div>
              <div class="field-value" style="color: #b45309;">${data.service || "General Inquiry"}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Origin / Country</div>
              <div class="field-value">${data.country || "General"}</div>
            </div>

            <div class="field-group" style="border-bottom: none;">
              <div class="field-label">Detailed Message / Specifications</div>
              <div class="message-box">
                ${(data.message || "No additional message provided.").replace(/\n/g, "<br />")}
              </div>
            </div>

            <div class="actions">
              ${
                data.email
                  ? `<a href="mailto:${data.email}?subject=Re: Your Inquiry on Arizona International Group" class="btn btn-mail">✉️ Reply via Email</a>`
                  : ""
              }
              ${
                waLink
                  ? `<a href="${waLink}" target="_blank" class="btn btn-wa">💬 Chat on WhatsApp</a>`
                  : ""
              }
            </div>
          </div>

          <div class="footer">
            Received automatically via Arizona International Group portal at ${new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" })} PKT<br />
            This inquiry is also logged into your Neon Database & Admin Portal.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"Arizona International Inquiries" <${senderEmail}>`,
      to: recipient,
      replyTo: data.email || senderEmail,
      subject: `🛎️ New Lead: ${data.name} - ${data.service || "Inquiry"} (${data.country || "General"})`,
      text: `New Lead on Arizona International Group:\n\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "N/A"}\nService: ${data.service || "General"}\nCountry: ${data.country || "N/A"}\n\nMessage:\n${data.message || "N/A"}`,
      html: htmlContent,
    });

    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("Nodemailer send error:", error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

import nodemailer from "nodemailer";

export interface MailInquiry {
  name: string;
  company: string;
  email: string;
  phone: string;
  crop: string;
  qty: string;
  msg: string;
}

export async function sendInquiryEmail(inquiry: MailInquiry) {
  // Destination email: configured in environment variables, or fallback to default
  const toEmail = process.env.NOTIFICATION_EMAIL || "supply@meenakrishifarm.com";
  
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = parseInt(process.env.SMTP_PORT || "587");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || `"Meena Krishi Farm" <inquiries@meenakrishifarm.com>`;

  let transporter;
  let previewUrl = null;

  if (smtpHost && smtpUser && smtpPass) {
    console.log(`Sending email using custom SMTP server: ${smtpHost}:${smtpPort}`);
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for port 465, false for 587/other
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  } else {
    console.log("No SMTP credentials configured. Creating a temporary test email account on Ethereal...");
    try {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } catch (e) {
      console.error("Failed to create temporary Ethereal email account. Logging to console instead.", e);
      // Fallback if Ethereal or network call fails
      console.log("=========================================");
      console.log(`[EMAIL SEND SIMULATION]`);
      console.log(`To: ${toEmail}`);
      console.log(`Subject: 🌱 New Inquiry: ${inquiry.crop} - ${inquiry.name} (${inquiry.qty})`);
      console.log(`Body:`, inquiry);
      console.log("=========================================");
      return {
        success: true,
        mocked: true,
        previewUrl: null,
      };
    }
  }

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
      <div style="text-align: center; margin-bottom: 24px;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 8px;">🌱</span>
        <h2 style="color: #059669; font-weight: 800; margin: 0; font-size: 1.5rem; letter-spacing: -0.025em;">New Supply Desk Inquiry</h2>
        <p style="color: #64748b; font-size: 0.875rem; margin: 4px 0 0 0;">Received from Meena Krishi Farm website</p>
      </div>

      <div style="border: 1px solid #f1f5f9; border-radius: 8px; padding: 16px; background-color: #fafafa; margin-bottom: 24px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; width: 140px; font-size: 0.9rem;">Customer Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-size: 0.9rem;">${inquiry.name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; font-size: 0.9rem;">Company:</td>
            <td style="padding: 6px 0; color: #0f172a; font-size: 0.9rem;">${inquiry.company || "Not Specified"}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; font-size: 0.9rem;">Email Address:</td>
            <td style="padding: 6px 0; font-size: 0.9rem;"><a href="mailto:${inquiry.email}" style="color: #059669; text-decoration: none; font-weight: 500;">${inquiry.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; font-size: 0.9rem;">Phone Number:</td>
            <td style="padding: 6px 0; font-size: 0.9rem;"><a href="tel:${inquiry.phone}" style="color: #059669; text-decoration: none; font-weight: 500;">${inquiry.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; font-size: 0.9rem;">Crop of Interest:</td>
            <td style="padding: 6px 0; font-size: 0.9rem;"><span style="background-color: #d1fae5; color: #065f46; padding: 3px 8px; border-radius: 6px; font-weight: 600; font-size: 0.8rem;">${inquiry.crop}</span></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: 600; color: #475569; font-size: 0.9rem;">Required Qty:</td>
            <td style="padding: 6px 0; color: #0f172a; font-size: 0.9rem; font-weight: 600;">${inquiry.qty}</td>
          </tr>
        </table>
      </div>

      <div style="margin-bottom: 24px;">
        <h4 style="margin: 0 0 8px 0; color: #334155; font-size: 0.9rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Specifications / Requirements:</h4>
        <div style="padding: 16px; background-color: #f8fafc; border-left: 4px solid #10b981; border-radius: 6px; font-size: 0.9rem; line-height: 1.5; color: #334155; white-space: pre-wrap;">${inquiry.msg || "No additional specifications provided."}</div>
      </div>

      <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; text-align: center; font-size: 0.75rem; color: #94a3b8;">
        <p style="margin: 0;">This inquiry has been logged in the permanent database.</p>
        <p style="margin: 4px 0 0 0;">Timestamp: ${new Date().toLocaleString()}</p>
      </div>
    </div>
  `;

  const fromEmail = smtpHost && smtpUser ? smtpUser : "inquiries@meenakrishifarm.com";
  const mailOptions = {
    from: smtpHost ? smtpFrom : `"Meena Krishi Farm Inquiries" <${fromEmail}>`,
    to: toEmail,
    subject: `🌱 New Inquiry: ${inquiry.crop} - ${inquiry.name} (${inquiry.qty})`,
    text: `New inquiry from ${inquiry.name} (${inquiry.company || "No Company"}).\nEmail: ${inquiry.email}\nPhone: ${inquiry.phone}\nCrop: ${inquiry.crop}\nQuantity: ${inquiry.qty}\nMessage: ${inquiry.msg}`,
    html: emailHtml,
  };

  const info = await transporter.sendMail(mailOptions);
  
  if (!smtpHost) {
    previewUrl = nodemailer.getTestMessageUrl(info);
    console.log("=========================================");
    console.log("📩 Test email sent successfully!");
    console.log("Message ID: %s", info.messageId);
    console.log("Preview/View details online: %s", previewUrl);
    console.log("=========================================");
  } else {
    console.log("📩 Email sent successfully. Message ID: %s", info.messageId);
  }

  return {
    success: true,
    messageId: info.messageId,
    previewUrl,
  };
}

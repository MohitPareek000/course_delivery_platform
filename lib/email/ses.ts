import nodemailer from 'nodemailer';

interface SendOTPEmailParams {
  to: string;
  otp: string;
}

// Create email transporter using AWS SES SMTP
function getSESTransporter() {
  return nodemailer.createTransport({
    host: process.env.SES_SMTP_HOST || 'email-smtp.us-east-1.amazonaws.com',
    port: parseInt(process.env.SES_SMTP_PORT || '587'),
    secure: false, // Use STARTTLS
    auth: {
      user: process.env.SES_SMTP_USER,
      pass: process.env.SES_SMTP_PASSWORD,
    },
  });
}

export async function sendOTPEmail({ to, otp }: SendOTPEmailParams) {
  try {
    const transporter = getSESTransporter();

    const info = await transporter.sendMail({
      from: `"${process.env.SES_FROM_NAME || 'Scaler Career Day'}" <${process.env.SES_FROM_EMAIL || 'hello@scaler.com'}>`,
      to: to,
      subject: 'Your OTP Code',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background-color: #4F46E5;
                color: white;
                padding: 20px;
                text-align: center;
                border-radius: 8px 8px 0 0;
              }
              .content {
                background-color: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 8px 8px;
              }
              .otp-code {
                background-color: #4F46E5;
                color: white;
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                padding: 20px;
                text-align: center;
                border-radius: 8px;
                margin: 20px 0;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Email Verification</h1>
              </div>
              <div class="content">
                <p>Hello,</p>
                <p>You have requested to verify your email address. Please use the following OTP code to complete your verification:</p>
                <div class="otp-code">${otp}</div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email.</p>
              </div>
              <div class="footer">
                <p>This is an automated email. Please do not reply.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `Your OTP code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`,
    });

    console.log('OTP email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending OTP email via AWS SES SMTP:', error);
    throw new Error(`Failed to send OTP email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

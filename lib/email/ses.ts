import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

interface SendOTPEmailParams {
  to: string;
  otp: string;
}

// Create AWS SES client
function getSESClient() {
  return new SESClient({
    region: process.env.AWS_REGION || 'ap-south-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
  });
}

export async function sendOTPEmail({ to, otp }: SendOTPEmailParams) {
  try {
    const sesClient = getSESClient();

    const htmlContent = `
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
    `;

    const textContent = `Your OTP code is: ${otp}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`;

    const command = new SendEmailCommand({
      Source: `"${process.env.SENDER_NAME || 'Team Scaler'}" <${process.env.SENDER_EMAIL || 'hello@scaler.com'}>`,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: 'Your OTP Code',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlContent,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textContent,
            Charset: 'UTF-8',
          },
        },
      },
    });

    const response = await sesClient.send(command);

    console.log('OTP email sent successfully via AWS SDK:', response.MessageId);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error('Error sending OTP email via AWS SES SDK:', error);
    throw new Error(`Failed to send OTP email: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

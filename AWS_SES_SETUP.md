# AWS SES SMTP Integration for OTP Emails

This document explains how to complete the AWS SES SMTP setup for sending OTP emails.

## What Was Done

1. **Updated Email Service**: Modified [lib/email/ses.ts](lib/email/ses.ts) to use AWS SES SMTP with nodemailer
2. **Updated OTP API**: Modified [app/api/auth/send-otp/route.ts](app/api/auth/send-otp/route.ts) to use AWS SES
3. **Added Environment Variables**: Added AWS SES SMTP credentials placeholder to [.env](.env)
4. **Changed OTP Length**: Updated OTP generation to 4 digits instead of 6 digits

## What You Need to Do

### Step 1: Set Up AWS SES

1. **Log in to AWS Console**: Go to https://aws.amazon.com/console/
2. **Navigate to SES**: Search for "Simple Email Service" (SES)
3. **Verify Your Email Address/Domain**:
   - Go to "Verified identities"
   - Click "Create identity"
   - Choose "Email address" or "Domain" (domain is recommended for production)
   - Follow the verification process (check your email for verification link)

4. **Get SMTP Credentials**:
   - In AWS SES Console, go to "SMTP Settings"
   - Click "Create SMTP Credentials"
   - Give it a name (e.g., "course-platform-smtp")
   - Click "Create"
   - **IMPORTANT**: Download and save the SMTP username and password (you'll only see them once!)
   - Note the SMTP endpoint for your region (e.g., `email-smtp.us-east-1.amazonaws.com`)

### Step 2: Update Environment Variables

Open your [.env](.env) file and replace the placeholder values:

```bash
# AWS SES SMTP Configuration (for OTP email delivery)
SES_SMTP_HOST="email-smtp.us-east-1.amazonaws.com"  # Your region's SMTP endpoint
SES_SMTP_PORT=587
SES_SMTP_USER="your_smtp_username"  # From Step 1.4
SES_SMTP_PASSWORD="your_smtp_password"  # From Step 1.4
SES_FROM_EMAIL="hello@scaler.com"  # Must be verified in SES
SES_FROM_NAME="Scaler Career Day"  # Display name in emails
```

**Important**:
- The `SES_FROM_EMAIL` must be a verified email address or domain in AWS SES
- For testing, you can use a personal email address (must be verified)
- For production, use your company domain (hello@scaler.com)
- Change the SMTP host to match your AWS region

### Step 3: Move Out of SES Sandbox (Production Only)

By default, AWS SES starts in "sandbox mode" where you can only:
- Send to verified email addresses
- Send up to 200 emails per day
- Send 1 email per second

To send to any email address (required for production):
1. Go to AWS SES Console
2. Click "Account dashboard"
3. Click "Request production access"
4. Fill out the form explaining your use case
5. Wait for AWS approval (usually 24-48 hours)

### Step 4: Test the Integration

1. **Start your development server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Test OTP sending**:
   - Go to your login page: http://localhost:3000/login
   - Click "Login with Email"
   - Enter an email address (must be verified in SES if still in sandbox)
   - Check if you receive the OTP email

3. **Check server logs** for any errors:
   - Look for "OTP email sent successfully" message
   - If errors occur, check your AWS credentials and SES configuration

## Email Template

The OTP email includes:
- Professional HTML template with your branding colors
- Large, easy-to-read OTP code
- 10-minute expiration notice
- Plain text fallback for email clients that don't support HTML

You can customize the email template in [lib/email/ses.ts](lib/email/ses.ts).

## Costs

AWS SES Pricing (as of 2024):
- **First 62,000 emails per month**: $0 (if sent from EC2)
- **Beyond that**: $0.10 per 1,000 emails
- **Very affordable for OTP emails**

## Troubleshooting

### Error: "Email address is not verified"
- Make sure the `AWS_SES_FROM_EMAIL` is verified in AWS SES
- If in sandbox mode, the recipient email must also be verified

### Error: "The security token included in the request is invalid"
- Check your AWS credentials in `.env`
- Make sure there are no extra spaces or quotes

### Error: "Missing credentials in config"
- Restart your development server after updating `.env`
- Make sure all AWS environment variables are set

### Emails not arriving
- Check your spam folder
- Verify your email address in AWS SES
- Check AWS SES sending statistics in the console
- Look for bounce or complaint notifications

## Production Checklist

- [ ] Request production access for AWS SES
- [ ] Verify your company domain (not just email)
- [ ] Set up SPF and DKIM records for better deliverability
- [ ] Monitor bounce and complaint rates
- [ ] Set up SNS notifications for bounces/complaints
- [ ] Remove the development OTP return in [app/api/auth/send-otp/route.ts](app/api/auth/send-otp/route.ts)

## Security Notes

- **Never commit** your AWS credentials to Git
- Keep your `.env` file in `.gitignore`
- Use IAM roles with minimal permissions (only SES access)
- Rotate your AWS credentials periodically
- Monitor AWS CloudWatch for unusual sending patterns

## Next Steps

Once AWS SES is configured and working:
1. Remove the old nodemailer email configuration
2. Test with multiple email addresses
3. Monitor delivery rates in AWS SES Console
4. Set up bounce and complaint handling (recommended for production)

## Support

If you need help:
- AWS SES Documentation: https://docs.aws.amazon.com/ses/
- AWS SES FAQ: https://aws.amazon.com/ses/faqs/
- Check AWS CloudWatch Logs for detailed error messages

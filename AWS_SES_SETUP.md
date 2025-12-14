# AWS SES SDK Integration for OTP Emails

This document explains how to complete the AWS SES setup for sending OTP emails using the AWS SDK.

## What Was Done

1. **Installed AWS SDK**: Added `@aws-sdk/client-ses` package
2. **Updated Email Service**: Modified [lib/email/ses.ts](lib/email/ses.ts) to use AWS SES SDK
3. **Updated OTP API**: Modified [app/api/auth/send-otp/route.ts](app/api/auth/send-otp/route.ts) to use AWS SES
4. **Added Environment Variables**: Added AWS SDK credentials placeholders to [.env](.env)
5. **Changed OTP Length**: Updated OTP generation to 4 digits instead of 6 digits

## What You Need to Do

### Step 1: Set Up AWS SES

1. **Log in to AWS Console**: Go to https://aws.amazon.com/console/
2. **Navigate to SES**: Search for "Simple Email Service" (SES)
3. **Select Your Region**: Choose your region (e.g., `ap-south-1` for Mumbai)
4. **Verify Your Email Address/Domain**:
   - Go to "Verified identities"
   - Click "Create identity"
   - Choose "Email address" or "Domain" (domain is recommended for production)
   - Follow the verification process (check your email for verification link)

### Step 2: Create IAM User for SES

1. **Navigate to IAM**: Go to AWS IAM Console
2. **Create User**:
   - Click "Users" → "Create user"
   - Give it a name (e.g., "ses-course-platform-user")
   - Click "Next"
3. **Attach Permissions**:
   - Choose "Attach policies directly"
   - Search for and select "AmazonSESFullAccess" (or create a custom policy with only SendEmail permission)
   - Click "Next" → "Create user"
4. **Create Access Key**:
   - Click on the created user
   - Go to "Security credentials" tab
   - Click "Create access key"
   - Choose "Application running outside AWS"
   - Click "Next" → "Create access key"
   - **IMPORTANT**: Download and save the Access Key ID and Secret Access Key (you'll only see them once!)

### Step 3: Update Environment Variables

Open your [.env](.env) file and replace the placeholder values:

```bash
# AWS SES Configuration (for OTP email delivery via AWS SDK)
AWS_REGION="ap-south-1"                          # Your AWS region
AWS_ACCESS_KEY_ID="AKIA..."                      # From Step 2.4
AWS_SECRET_ACCESS_KEY="abc123..."                # From Step 2.4
SENDER_EMAIL="hello@scaler.com"                  # Must be verified in SES
SENDER_NAME="Team Scaler"                        # Display name in emails
```

**Important**:
- The `SENDER_EMAIL` must be a verified email address or domain in AWS SES
- For testing, you can use a personal email address (must be verified)
- For production, use your company domain (hello@scaler.com)
- Make sure `AWS_REGION` matches where you verified your email/domain

### Step 4: Move Out of SES Sandbox (Production Only)

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

### Step 5: Test the Integration

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
   - Look for "OTP email sent successfully via AWS SDK" message
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
- Make sure the `SENDER_EMAIL` is verified in AWS SES
- If in sandbox mode, the recipient email must also be verified

### Error: "The security token included in the request is invalid"
- Check your AWS credentials in `.env`
- Make sure there are no extra spaces or quotes
- Verify the IAM user has SES permissions

### Error: "Missing credentials in config"
- Restart your development server after updating `.env`
- Make sure all AWS environment variables are set

### Emails not arriving
- Check your spam folder
- Verify your email address in AWS SES
- Check AWS SES sending statistics in the console
- Look for bounce or complaint notifications

## Differences: AWS SDK vs SMTP

| Feature | AWS SDK (Current) | SMTP (Alternative) |
|---------|-------------------|---------------------|
| **Setup** | IAM User with Access Keys | SMTP Credentials |
| **Credentials** | Access Key ID + Secret Key | SMTP Username + Password |
| **Package** | `@aws-sdk/client-ses` | `nodemailer` |
| **Region** | Configurable via env | Fixed in SMTP endpoint |
| **Use Case** | Better for AWS-native apps | Better for generic email |

We're using the **AWS SDK approach** which is recommended for applications already using AWS services.

## Production Checklist

- [ ] Request production access for AWS SES
- [ ] Verify your company domain (not just email)
- [ ] Set up SPF and DKIM records for better deliverability
- [ ] Monitor bounce and complaint rates
- [ ] Set up SNS notifications for bounces/complaints
- [ ] Remove the development OTP return in [app/api/auth/send-otp/route.ts](app/api/auth/send-otp/route.ts)
- [ ] Use IAM role with minimal permissions (only SES:SendEmail)
- [ ] Rotate AWS credentials periodically

## Security Notes

- **Never commit** your AWS credentials to Git
- Keep your `.env` file in `.gitignore`
- Use IAM roles with minimal permissions (only SES access)
- Consider using AWS Secrets Manager for production
- Rotate your AWS credentials periodically
- Monitor AWS CloudWatch for unusual sending patterns

## Next Steps

Once AWS SES is configured and working:
1. Test with multiple email addresses
2. Monitor delivery rates in AWS SES Console
3. Set up bounce and complaint handling (recommended for production)
4. Consider implementing rate limiting on OTP requests
5. Set up CloudWatch alarms for SES metrics

## Support

If you need help:
- AWS SES Documentation: https://docs.aws.amazon.com/ses/
- AWS SES FAQ: https://aws.amazon.com/ses/faqs/
- Check AWS CloudWatch Logs for detailed error messages
- AWS IAM Documentation: https://docs.aws.amazon.com/iam/

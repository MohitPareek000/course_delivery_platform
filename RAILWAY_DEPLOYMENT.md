# Railway Deployment Guide

## Prerequisites
- GitHub account connected to Railway
- Railway account (https://railway.app)
- Your code pushed to GitHub

## Step 1: Prepare Your Code

✅ **Already done!**
- `railway.toml` configuration file created
- `package.json` updated with build scripts
- Database connection string already in `.env`

## Step 2: Deploy to Railway

### Option A: Deploy from Railway Dashboard (Recommended)

1. **Go to Railway Dashboard**
   - Visit https://railway.app
   - Click "New Project"

2. **Deploy from GitHub**
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect Next.js

3. **Add Environment Variables**
   Click on your service → Variables → Add variables:

   ```
   DATABASE_URL=postgresql://postgres:WAVyQaVrvePCcISHkrGvNRZVFTJZPQBD@gondola.proxy.rlwy.net:21027/railway
   NODE_ENV=production
   NEXTAUTH_URL=https://your-app.up.railway.app
   NEXTAUTH_SECRET=your-production-secret-key-min-32-chars

   # AWS SES (for OTP emails)
   AWS_REGION=ap-south-1
   AWS_ACCESS_KEY_ID=your_aws_access_key
   AWS_SECRET_ACCESS_KEY=your_aws_secret_key
   SENDER_EMAIL=hello@scaler.com
   SENDER_NAME=Scaler

   # OTP Configuration
   OTP_EXPIRY_MINUTES=10
   OTP_RESEND_THROTTLE_SECONDS=60
   ```

4. **Deploy**
   - Railway will automatically build and deploy
   - You'll get a URL like: `https://your-app.up.railway.app`

### Option B: Deploy via Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project (or create new)
railway link

# Add environment variables
railway variables set DATABASE_URL="postgresql://..."
railway variables set NODE_ENV="production"
railway variables set NEXTAUTH_URL="https://your-app.up.railway.app"
railway variables set NEXTAUTH_SECRET="your-secret-key"

# Deploy
railway up
```

## Step 3: Update NEXTAUTH_URL After First Deploy

1. After first deployment, Railway will give you a URL
2. Copy that URL (e.g., `https://courseplatform.up.railway.app`)
3. Update the `NEXTAUTH_URL` environment variable with this URL
4. Redeploy if needed

## Step 4: Run Database Migrations

If you need to run Prisma migrations on Railway:

```bash
# Using Railway CLI
railway run npx prisma migrate deploy

# Or add as a build command in railway.toml
```

## Step 5: Verify Deployment

1. Visit your Railway URL
2. Test login functionality
3. Check database connectivity
4. Verify OTP email sending (if AWS SES is configured)

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Already set from Railway DB |
| `NEXTAUTH_URL` | Your production URL | `https://your-app.up.railway.app` |
| `NEXTAUTH_SECRET` | Secret for auth (min 32 chars) | Generate with: `openssl rand -base64 32` |
| `NODE_ENV` | Environment | `production` |

### Optional (for OTP emails)

| Variable | Description |
|----------|-------------|
| `AWS_REGION` | AWS region |
| `AWS_ACCESS_KEY_ID` | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | AWS secret key |
| `SENDER_EMAIL` | From email address |
| `SENDER_NAME` | From name |

## Troubleshooting

### Build Fails

- **Check build logs** in Railway dashboard
- **Verify** all environment variables are set
- **Ensure** DATABASE_URL is correct

### Database Connection Error

- Verify DATABASE_URL is correct
- Check Railway database is running
- Ensure Prisma schema is synced

### OTP Emails Not Sending

- In production, verify AWS SES credentials
- Check AWS SES is out of sandbox mode
- Verify sender email is verified in AWS SES

### NextAuth Errors

- Ensure NEXTAUTH_URL matches your Railway URL (include https://)
- Verify NEXTAUTH_SECRET is set and at least 32 characters
- Check cookies are not blocked

## Production Checklist

- [ ] All environment variables set
- [ ] NEXTAUTH_SECRET generated (min 32 chars)
- [ ] NEXTAUTH_URL updated with Railway URL
- [ ] AWS SES configured (if using OTP emails)
- [ ] Database migrations run
- [ ] Test login flow
- [ ] Test course access
- [ ] Test video playback
- [ ] Monitor Railway logs

## Automatic Deployments

Railway automatically deploys when you push to your main branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Railway will detect the push and automatically redeploy!

## Custom Domain (Optional)

1. In Railway dashboard → Settings → Domains
2. Click "Add Custom Domain"
3. Enter your domain (e.g., `app.yourdomain.com`)
4. Update DNS records as instructed
5. Update NEXTAUTH_URL to your custom domain

## Monitoring

- **Logs**: Railway Dashboard → Your Service → View Logs
- **Metrics**: Check CPU, Memory, Network usage
- **Deployments**: View deployment history and status

## Support

- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- Prisma Deployment: https://www.prisma.io/docs/guides/deployment

# Deployment Guide - Zuply8

## Prerequisites

Before deploying to Vercel, ensure you have:

1. A Vercel account
2. The Vercel CLI installed (optional): `pnpm install -g vercel`
3. Environment variables configured

## Environment Variables

### Required for Production

Create these environment variables in your Vercel dashboard:

#### Google Analytics (Optional)
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
Get your Measurement ID from Google Analytics 4 (GA4) dashboard.

#### HubSpot Integration (Required if using contact form)
```
HUBSPOT_API_TOKEN=your_hubspot_private_app_token
```
Create a private app in HubSpot to get this token.

### Local Development

For local development, create a `.env.local` file (this file is gitignored):

```bash
# Copy this template and fill in your values
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
HUBSPOT_API_TOKEN=your_hubspot_private_app_token
```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Select the `zupply8` directory as the root directory

2. **Configure Build Settings**
   - Framework Preset: Next.js
   - Root Directory: `zupply8`
   - Build Command: `pnpm build`
   - Install Command: `pnpm install`

3. **Set Environment Variables**
   - Add the required environment variables listed above
   - Environment: Production (and Preview if needed)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Option 2: Deploy via CLI

```bash
# Navigate to the project directory
cd /Users/victorsoplat/Documents/2025/zuply08_Buldford/zupply8

# Login to Vercel (first time only)
vercel login

# Deploy to production
vercel --prod

# Set environment variables (one-time setup)
vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
vercel env add HUBSPOT_API_TOKEN
```

## Post-Deployment Checklist

After deployment, verify the following:

- [ ] Home page loads correctly in all supported languages (en, es, de)
- [ ] Cookie consent banner appears for new visitors
- [ ] Google Analytics tracking works (if configured)
- [ ] Contact form submits successfully to HubSpot (if configured)
- [ ] Language switcher works correctly
- [ ] All translations load properly
- [ ] Cookie preferences can be saved and persist
- [ ] Page metadata is correct for SEO

## Troubleshooting

### Build Fails

1. **TypeScript errors**: Run `pnpm build` locally to catch errors before deploying
2. **Missing dependencies**: Ensure all dependencies are in `package.json`
3. **Environment variables**: Check that all required env vars are set in Vercel

### Runtime Issues

1. **Translations not loading**: Check that translation files are in `public/locale/[lang]/translation.json`
2. **Analytics not working**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set and cookie consent is granted
3. **HubSpot errors**: Check `HUBSPOT_API_TOKEN` is valid and has correct permissions

## Performance Optimization

The application is optimized for production with:

- ✅ Static page generation for language routes
- ✅ Server-side rendering where needed
- ✅ Automatic code splitting
- ✅ Image optimization (if using Next.js Image component)
- ✅ Font optimization with next/font

## Security

Security measures in place:

- ✅ Input validation and sanitization on HubSpot API route
- ✅ CSRF protection via Next.js
- ✅ Secure cookie handling for consent and language preferences
- ✅ Environment variables for sensitive data
- ✅ XSS protection through React's automatic escaping

## Monitoring

After deployment, monitor:

- **Vercel Analytics**: Check performance metrics in Vercel dashboard
- **Google Analytics**: Monitor user behavior and conversions
- **Error Tracking**: Check Vercel logs for runtime errors
- **Build Logs**: Review build logs for warnings

## Continuous Deployment

Vercel automatically deploys when you push to your Git repository:

- **Production**: Deploys from `main` or `master` branch
- **Preview**: Creates preview deployments for pull requests
- **Instant Rollback**: Easily rollback to previous deployments via dashboard

## Support

For issues or questions:
- Check Vercel documentation: https://vercel.com/docs
- Next.js documentation: https://nextjs.org/docs
- Project-specific issues: Check the repository issues


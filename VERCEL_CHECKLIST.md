# Vercel Deployment Checklist

Use this checklist before and after deploying to Vercel.

## Pre-Deployment Checklist

### Code Quality
- [x] ✅ Build passes locally (`pnpm build`)
- [x] ✅ No TypeScript errors
- [x] ✅ All dependencies are in `package.json`
- [x] ✅ Debug console.log statements removed
- [x] ✅ Production error logging in place (console.error)

### Configuration
- [ ] Environment variables documented in `.env.local.example`
- [ ] `next.config.ts` is production-ready
- [ ] Supported languages configured in `i18n.ts`
- [ ] Translation files exist for all languages (en, es, de)

### Security
- [x] ✅ API routes have input validation
- [x] ✅ No sensitive data hardcoded
- [x] ✅ Cookie consent implementation working
- [x] ✅ CORS and security headers configured

### Testing
- [ ] Home page works in all languages
- [ ] Cookie banner appears for new users
- [ ] Language switcher works
- [ ] Contact form submits (if HubSpot configured)
- [ ] Analytics loads (if GA configured)

## Vercel Configuration

### 1. Project Settings

When creating/configuring your project in Vercel:

```
Framework Preset: Next.js
Root Directory: zupply8/
Build Command: pnpm build
Install Command: pnpm install
Output Directory: .next (default)
Node.js Version: 20.x (recommended)
```

### 2. Environment Variables

Add these in Vercel Dashboard → Project Settings → Environment Variables:

#### Production + Preview Environments

```bash
# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# HubSpot Integration (Required for contact form)
HUBSPOT_API_TOKEN=your_private_app_token_here
```

**Important**: 
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Other variables are only available server-side
- Set environment variables BEFORE deploying

### 3. Domain Configuration

- [ ] Custom domain added (if applicable)
- [ ] SSL certificate active
- [ ] DNS records configured
- [ ] Redirects configured (if needed)

## Post-Deployment Checklist

### Functional Testing

Test these on your production URL:

- [ ] **Homepage** loads at `/` (redirects to default language)
- [ ] **Language routes** work:
  - [ ] `/en` - English
  - [ ] `/es` - Spanish
  - [ ] `/de` - German
- [ ] **Cookie banner** appears for first-time visitors
- [ ] **Cookie preferences** can be:
  - [ ] Accepted all
  - [ ] Rejected all
  - [ ] Customized via settings
- [ ] **Language switcher** changes language correctly
- [ ] **Translations** load properly (no missing translation keys)
- [ ] **Contact form**:
  - [ ] Validates input correctly
  - [ ] Submits to HubSpot successfully
  - [ ] Shows success/error messages
  - [ ] Handles network errors gracefully
- [ ] **Google Analytics** (if configured):
  - [ ] Only loads with analytics consent
  - [ ] Tracks page views
  - [ ] Uses anonymized IP

### Performance Testing

- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Time to Interactive < 3s
- [ ] No console errors in production

### SEO Verification

- [ ] Meta titles are correct per language
- [ ] Meta descriptions are present
- [ ] Language alternates are set correctly
- [ ] Open Graph tags are present
- [ ] Sitemap accessible (if implemented)
- [ ] robots.txt configured (if needed)

### Browser Testing

Test on:
- [ ] Chrome (desktop)
- [ ] Firefox (desktop)
- [ ] Safari (desktop)
- [ ] Safari (mobile)
- [ ] Chrome (mobile)

## Monitoring

### Set Up Monitoring

- [ ] Vercel Analytics enabled
- [ ] Google Analytics configured and working
- [ ] Error tracking set up (Sentry, etc.) - if applicable
- [ ] Uptime monitoring - if applicable

### Regular Checks

Check these regularly after deployment:

- [ ] **Vercel Dashboard** - Build logs and deployment status
- [ ] **Analytics** - Traffic and user behavior
- [ ] **Console** - Check for JavaScript errors
- [ ] **Network tab** - Check for failed requests
- [ ] **Performance** - Monitor Core Web Vitals

## Troubleshooting Common Issues

### Build Failures

**Issue**: TypeScript errors during build
- **Solution**: Run `pnpm build` locally to identify the exact error
- **Check**: TypeScript version compatibility with Next.js

**Issue**: Missing dependencies
- **Solution**: Ensure all imports have corresponding entries in `package.json`
- **Check**: Run `pnpm install` to verify lockfile integrity

### Runtime Issues

**Issue**: Translations not loading
- **Solution**: Check that files exist in `public/locale/[lang]/translation.json`
- **Check**: Verify i18n configuration in `i18n.ts`

**Issue**: Analytics not tracking
- **Solution**: Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- **Check**: Ensure user has granted analytics cookie consent
- **Check**: Look for blocked requests in browser console

**Issue**: Cookie consent not persisting
- **Solution**: Check localStorage is not blocked
- **Check**: Verify cookie consent code in client components

**Issue**: Contact form errors
- **Solution**: Verify `HUBSPOT_API_TOKEN` is valid
- **Check**: HubSpot API token has correct permissions
- **Check**: Network tab for API error responses

### Performance Issues

**Issue**: Slow page loads
- **Solution**: Check Vercel Analytics for bottlenecks
- **Check**: Enable Edge caching if applicable
- **Check**: Optimize images and fonts

## Rollback Procedure

If something goes wrong:

1. Go to Vercel Dashboard
2. Navigate to your project
3. Click on "Deployments"
4. Find the last working deployment
5. Click "..." → "Promote to Production"

## Next Steps

After successful deployment:

- [ ] Share production URL with team
- [ ] Set up custom domain (if applicable)
- [ ] Configure email alerts for deployment failures
- [ ] Document any deployment-specific configurations
- [ ] Plan for staging environment (if needed)

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Environment Variables in Vercel](https://vercel.com/docs/environment-variables)
- [Troubleshooting Builds](https://vercel.com/docs/deployments/troubleshoot-a-build)


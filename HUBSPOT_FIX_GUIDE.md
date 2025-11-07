# HubSpot Form 500 Error - Fix Guide

## What Was Changed

I've enhanced the HubSpot API route (`/app/api/hubspot/route.ts`) with:

✅ **Detailed logging** - Every step of the request is now logged with a unique request ID
✅ **Better error messages** - More specific error information for debugging
✅ **Environment variable checks** - Explicit verification that `HUBSPOT_API_TOKEN` exists
✅ **Request tracking** - Each request gets a unique ID for easy tracking in logs

## Next Steps to Fix Production Error

### Step 1: Check Environment Variables in Vercel

1. **Go to Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select your project (zuply8)

2. **Open Environment Variables**
   - Click on "Settings" tab
   - Click on "Environment Variables" in the left sidebar

3. **Verify HUBSPOT_API_TOKEN**
   - Check if `HUBSPOT_API_TOKEN` exists
   - Verify it's enabled for "Production" environment
   - **Important**: Check that it's not empty or corrupted

4. **If Missing or Incorrect:**
   ```
   Variable Name: HUBSPOT_API_TOKEN
   Value: [Your HubSpot Private App Token]
   Environment: ☑ Production ☑ Preview ☐ Development
   ```

### Step 2: Verify HubSpot Token Validity

Your HubSpot token might be expired or have insufficient permissions.

1. **Get Your Token**
   - Go to: https://app.hubspot.com/
   - Navigate to: Settings (⚙️) → Integrations → Private Apps
   - Find your app or create a new one

2. **Required Permissions** (Scopes):
   ```
   ☑ crm.objects.contacts.write
   ☑ crm.objects.contacts.read
   ```

3. **Copy the Token**
   - Copy the full token (starts with `pat-na1-...` or similar)
   - Update it in Vercel if it changed

### Step 3: Deploy the Updated Code

You have two options:

#### Option A: Automatic Deployment (Recommended)

1. **Commit and push the changes:**
   ```bash
   cd /Users/victorsoplat/Documents/2025/zuply08_Buldford/zupply8
   git add app/api/hubspot/route.ts
   git commit -m "fix: Enhanced HubSpot API logging for debugging 500 error"
   git push
   ```

2. **Vercel will automatically deploy** - Check the Vercel dashboard for deployment progress

#### Option B: Manual Deployment via CLI

```bash
cd /Users/victorsoplat/Documents/2025/zuply08_Buldford/zupply8
vercel --prod
```

### Step 4: View Production Logs

After deployment, test the form and view the logs:

1. **Via Vercel Dashboard:**
   - Go to your project in Vercel
   - Click on "Deployments" tab
   - Click on the latest deployment
   - Click on "Functions" tab
   - Click on `/api/hubspot` function
   - View the logs in real-time

2. **Via Vercel CLI:**
   ```bash
   vercel logs https://zuply8.com --follow
   ```

### Step 5: Test the Form

1. **Open your production site:** https://zuply8.com
2. **Fill out the contact form**
3. **Submit the form**
4. **Check the logs immediately**

#### What to Look For in Logs:

The new logging will show you exactly where it's failing:

```
[req_xxxxx] Starting HubSpot API request
[req_xxxxx] Environment check passed - HUBSPOT_API_TOKEN is present
[req_xxxxx] Request body parsed successfully
[req_xxxxx] Validation passed for email: user@example.com
[req_xxxxx] Sending request to HubSpot API...
[req_xxxxx] HubSpot API responded with status: 200
[req_xxxxx] Contact created successfully in HubSpot
```

**If it fails**, you'll see detailed error messages like:

- `CRITICAL: HUBSPOT_API_TOKEN is not configured` → Environment variable missing
- `Authentication error (401)` → Token is invalid or expired
- `Authentication error (403)` → Token lacks required permissions
- `HubSpot API error response: {...}` → Detailed error from HubSpot

## Common Issues & Solutions

### Issue 1: Missing Environment Variable
**Symptoms**: Log shows "HUBSPOT_API_TOKEN is not configured"
**Solution**: Add the environment variable in Vercel (Step 1)

### Issue 2: Invalid/Expired Token
**Symptoms**: Log shows "Authentication error (401)"
**Solution**: Generate a new token in HubSpot and update Vercel (Step 2)

### Issue 3: Insufficient Permissions
**Symptoms**: Log shows "Authentication error (403)"
**Solution**: Update token permissions in HubSpot (Step 2)

### Issue 4: Network/API Issues
**Symptoms**: Log shows timeout or connection errors
**Solution**: Check HubSpot API status at https://status.hubspot.com/

## Testing Locally

To test locally before deploying:

1. **Ensure `.env.local` has the token:**
   ```bash
   echo "HUBSPOT_API_TOKEN=your_token_here" > .env.local
   ```

2. **Run the development server:**
   ```bash
   pnpm dev
   ```

3. **Test the form** at http://localhost:3000

4. **Check terminal logs** - you'll see the detailed logging

## Quick Verification Checklist

- [ ] `HUBSPOT_API_TOKEN` exists in Vercel environment variables
- [ ] Token is enabled for Production environment
- [ ] Token has `crm.objects.contacts.write` permission
- [ ] Code changes have been deployed to production
- [ ] Form submission tested in production
- [ ] Logs viewed and show detailed error information

## Need Help?

If you're still seeing errors after following these steps:

1. Share the **request ID** from the error message
2. Share the **log output** from Vercel
3. Confirm the **exact error message** from the logs

The enhanced logging will make it much easier to identify the root cause!


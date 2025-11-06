# Cookie Consent & Google Analytics Setup

## Overview

This project includes a GDPR and German TTDSG-compliant cookie consent system integrated with Google Analytics 4.

## Features

✅ **GDPR/TTDSG Compliant**: Meets German data protection law requirements
✅ **Active Consent**: Users must explicitly accept cookies (no pre-checked boxes)
✅ **Granular Control**: Users can accept/reject specific cookie categories
✅ **Multilingual**: Fully translated in English, Spanish, and German
✅ **IP Anonymization**: Google Analytics anonymizes IP addresses
✅ **Persistent Consent**: User preferences saved in localStorage
✅ **Revocable**: Users can change preferences anytime via Cookie Settings button

## Environment Variables

### Required for Google Analytics

Create a `.env.local` file in the root of the `zupply8` directory with:

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### How to Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create or select a **GA4 Property** (not Universal Analytics)
3. Navigate to **Admin** > **Data Streams**
4. Select your **Web Data Stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
6. Add it to your `.env.local` file

## Cookie Categories

The system manages four cookie categories:

1. **Necessary Cookies** (Always Active)
   - Essential for website functionality
   - Cannot be disabled

2. **Analytics Cookies** (Optional)
   - Google Analytics 4
   - Only loads after user consent

3. **Marketing Cookies** (Optional)
   - Prepared for future use
   - Currently not in use

4. **Preference Cookies** (Optional)
   - Language settings
   - User preferences

## How It Works

### First Visit
1. Cookie consent banner appears at the bottom of the screen
2. User sees three options:
   - **Accept All**: Enables all cookies
   - **Reject All**: Only necessary cookies enabled
   - **Customize Settings**: Granular control over cookie categories
3. No tracking occurs until user makes a choice

### Return Visits
- System checks localStorage for saved preferences
- Applies preferences automatically
- No banner shown if consent previously given

### Changing Preferences
- Users can click the "Cookie Settings" button in the footer
- Opens preferences modal
- Changes are saved immediately

## Technical Architecture

### Components

```
app/
├── lib/
│   ├── context/
│   │   └── cookie-consent-context.tsx    # React Context & State Management
│   └── analytics/
│       └── google-analytics.tsx           # GA4 Integration
├── ui/
│   ├── cookie-consent-banner.tsx         # Initial Consent Banner
│   ├── cookie-preferences-modal.tsx      # Detailed Preferences Modal
│   └── cookie-settings-button.tsx        # Settings Button
```

### Data Storage

Consent preferences are stored in `localStorage`:

```typescript
{
  timestamp: number,
  version: "1.0",
  preferences: {
    necessary: true,
    analytics: boolean,
    marketing: boolean,
    preferences: boolean
  }
}
```

### Translations

Translation keys are available in:
- `public/locale/en/translation.json`
- `public/locale/es/translation.json`
- `public/locale/de/translation.json`

All under the `cookies` namespace.

## Legal Compliance

### GDPR (General Data Protection Regulation)
- **Article 7**: Conditions for consent
- Active, informed, specific consent required
- Easy to withdraw consent

### German TTDSG (Telekommunikation-Telemedien-Datenschutz-Gesetz)
- **§ 25**: Terminal equipment and storage
- Explicit consent required before storing/accessing cookies
- Equal prominence for accept/reject options

### ECJ Planet49 Ruling
- Pre-checked boxes not allowed
- Scrolling or browsing does not constitute consent
- Must be an affirmative action

## Google Analytics Configuration

The implementation includes:
- **IP Anonymization**: `anonymize_ip: true`
- **Consent Mode**: Only loads after user consent
- **Cookie Flags**: `SameSite=None;Secure`
- **Strategy**: `afterInteractive` (optimal performance)

## Testing

### Test Scenarios

1. ✅ First visit shows consent banner
2. ✅ "Accept All" enables GA and saves preferences
3. ✅ "Reject All" disables GA and saves preferences
4. ✅ "Customize" allows granular control
5. ✅ Preferences persist across page navigation
6. ✅ Cookie Settings button opens preferences modal
7. ✅ GA only fires after analytics consent
8. ✅ Works in all languages (EN, ES, DE)
9. ✅ Accessible via keyboard navigation
10. ✅ Screen reader compatible

### Testing in Development

```bash
cd zupply8
pnpm dev
```

1. Open browser in incognito/private mode
2. Navigate to `http://localhost:3000`
3. Cookie banner should appear
4. Test all three options (Accept All, Reject All, Customize)
5. Check browser console for GA tracking events
6. Verify localStorage contains consent data

## Troubleshooting

### Google Analytics Not Loading

1. Check `.env.local` file exists with correct `NEXT_PUBLIC_GA_MEASUREMENT_ID`
2. Ensure you've accepted "Analytics Cookies" in preferences
3. Check browser console for errors
4. Verify Measurement ID format: `G-XXXXXXXXXX`

### Banner Not Showing

1. Clear localStorage: `localStorage.removeItem('cookie-consent')`
2. Hard refresh the page (Cmd+Shift+R or Ctrl+Shift+R)
3. Check browser console for errors

### Translations Missing

1. Verify translation keys exist in all three language files
2. Check i18next is properly initialized
3. Ensure language is correctly detected

## Maintenance

### Updating Consent Version

If you need to re-prompt users for consent (e.g., after policy changes):

1. Update `CONSENT_VERSION` in `cookie-consent-context.tsx`
2. Users will see the banner again on next visit
3. Previous preferences are not carried over

### Adding New Cookie Categories

1. Update `CookiePreferences` type in `cookie-consent-context.tsx`
2. Add toggle in `cookie-preferences-modal.tsx`
3. Add translations in all language files
4. Update documentation

## Support

For issues or questions about the cookie consent system, refer to:
- Specification: `specs/specs/2025-11-05_cookie-consent-google-analytics.md`
- German TTDSG: https://www.gesetze-im-internet.de/ttdsg/
- GDPR: https://gdpr-info.eu/


'use client';

/**
 * Analytics component — integrates Vercel Analytics.
 * 
 * SETUP:
 * - Vercel Analytics: works automatically on Vercel deployments.
 *   No API key needed. Just deploy to Vercel.
 * 
 * GOOGLE ANALYTICS 4 (Optional):
 * - Replace GA_MEASUREMENT_ID below with your actual GA4 Measurement ID.
 * - Uncomment the Script tags to activate.
 * 
 * PRIVACY NOTE:
 * - Consider adding a cookie consent banner before activating GA4 
 *   (required for GDPR compliance).
 */

// Vercel Analytics (automatically enabled on Vercel)
export { Analytics as VercelAnalytics } from '@vercel/analytics/react';

// Google Analytics 4 placeholder
// import Script from 'next/script';
// export function GoogleAnalytics({ GA_MEASUREMENT_ID = 'G-XXXXXXXXXX' }) {
//   return (
//     <>
//       <Script
//         strategy="afterInteractive"
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', '${GA_MEASUREMENT_ID}');
//         `}
//       </Script>
//     </>
//   );
// }

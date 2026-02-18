import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          }
        ]
      }
    ];
  }
};

export default withSentryConfig(nextConfig, {
  org: "lennys-cleaning",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  widenClientFileUpload: true,
});

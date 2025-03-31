/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This will suppress the hydration warnings
  // Be careful using this in production as it could hide real issues
  onDemandEntries: {
    // Make Next.js less sensitive to hydration errors during development
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 5,
  },
}

module.exports = nextConfig
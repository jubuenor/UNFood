/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_PASS_KEY: process.env.GOOGLE_PASS_KEY,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'unfood.s3.us-east-1.amazonaws.com',
        port: ''
      }
    ]
  },
}

module.exports = nextConfig

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack: {
    watchOptions: {
      poll: 300,
    },
  },
}

module.exports = nextConfig

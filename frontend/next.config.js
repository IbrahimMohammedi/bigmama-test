/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
module.exports = {
  webpack: (config, { isServer }) => {
    // Remove the Python loader configuration
    return config;
  },
};

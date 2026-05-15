/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [...(config.externals || []), 'puppeteer-core'];
    return config;
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Allows portable static deployments and local dev
  },
};

export default nextConfig;

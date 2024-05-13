/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/graphql/:path*",
        destination: "http://backend:4000/:path*", // Proxy to Backend
      },
    ];
  },
};

module.exports = nextConfig;


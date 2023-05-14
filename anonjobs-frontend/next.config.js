/** @type {import('next').NextConfig} */
const headers = require("./headers");
// const { SubresourceIntegrityPlugin } = require("webpack-subresource-integrity");
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: ["res.cloudinary.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers,
      },
    ];
  },
};

module.exports = nextConfig;

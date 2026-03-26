/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Add any external image domains you use here
    // e.g. if you keep your photo on Unsplash during dev
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
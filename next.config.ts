import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.30.52.42"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wpriverthemes.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "corkcicle.com",
        pathname: "/cdn/shop/**",
      },
    ],
  },
};

export default nextConfig;

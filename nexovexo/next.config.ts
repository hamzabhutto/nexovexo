import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow phones/other devices on the local network to load dev resources
  // (/_next/*). Without this, Next.js blocks cross-origin dev requests, so the
  // client JS never hydrates on a phone hitting the site via its LAN IP.
  allowedDevOrigins: ["192.168.8.117", "192.168.*.*", "*.local"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

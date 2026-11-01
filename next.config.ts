import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    qualities: [75, 80, 82, 86, 90],
  },
  poweredByHeader: false,
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.11", "192.168.1.*"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;


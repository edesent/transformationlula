import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // The parent CRM folder has its own lockfile; pin the root so Turbopack
  // does not pick the wrong one.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;

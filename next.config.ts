import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Ship the stylesheet inside the HTML instead of as a render-blocking
    // request; PageSpeed measured that request at ~240ms on slow 4G.
    inlineCss: true,
  },
  images: {
    qualities: [75, 90, 95, 96, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Optimized images may be cached for 31 days (Next defaults to 60s,
    // which PageSpeed flags). Swapping a photo needs a new filename.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.muamatch.com",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;

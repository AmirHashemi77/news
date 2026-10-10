import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.mehrnews.com",
      },
      {
        protocol: "https",
        hostname: "newsmedia.tasnimnews.ir",
      },
      {
        protocol: "https",
        hostname: "newsmedia.tasnimmedia.com",
      },
      {
        protocol: "https",
        hostname: "media.hamshahrionline.ir",
      },
      {
        protocol: "https",
        hostname: "news-cdn.varzesh3.com",
      },
      {
        protocol: "https",
        hostname: "www.roshdmag.ir",
      },
      {
        protocol: "https",
        hostname: "cdn1.iranpress.com",
      },
      {
        protocol: "https",
        hostname: "static2.sharghdaily.com",
      },
      {
        protocol: "https",
        hostname: "media.arabicradio.net",
      },
      {
        protocol: "https",
        hostname: "irandoostan.com",
      },
    ],
  },
};

export default nextConfig;

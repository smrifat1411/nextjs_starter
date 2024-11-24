import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "productionprop.s3.amazonaws.com",
      "placehold.co",
      "picsum.photos",
      "via.placeholder.com",
      "example.com",
      "lh3.googleusercontent.com",
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;

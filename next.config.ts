import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export", // This means that Next.js will generate a static site
  distDir: "out", // This is the directory where the static files will be generated
  images: {
    unoptimized: true, // Disable image optimization for static export
  },
  basePath: "", // Set the base path for the application
  trailingSlash: true, // Add a trailing slash to the end of URLs
  assetPrefix: "./", // Enable React's Strict Mode for development
};

export default nextConfig;

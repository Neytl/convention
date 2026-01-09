/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV == "production";

const nextConfig = {
  // basePath: isProd ? "/convention" : "",
  basePath: "",
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

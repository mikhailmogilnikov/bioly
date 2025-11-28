import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    swcPlugins: [["@lingui/swc-plugin", {}]],
    typedEnv: true,
  },
  typedRoutes: true,
  turbopack: {
    rules: {
      "*.po": {
        loaders: ["@lingui/loader"],
        as: "*.js",
      },
    },
  },
  images: {
    remotePatterns: [
      // TODO: remove wildcard
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

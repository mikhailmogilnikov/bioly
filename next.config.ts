import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;

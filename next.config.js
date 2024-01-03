// next.config.js
const nextConfig = {
  images: {
    domains: ["bachen-eco.onrender.com"],
  },
  future: {
    webpack5: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }

    return config;
  },
};

module.exports = nextConfig;

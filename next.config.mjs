/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    instrumentationHook: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
<<<<<<< HEAD
      };
=======
        '@mapbox/node-pre-gyp': false
      }
>>>>>>> 9ea1a5a3396d116a741c4c2a7174ed16f2aeed9c
    }
    return config;
  },
  images: {
    domains: ['utfs.io'],
  },
  async headers() {
    return [
      {
        source: `/api/:path*`,
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

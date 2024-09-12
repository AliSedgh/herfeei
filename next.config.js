const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  skipWaiting: true,
  reloadOnOnline: true,
  cacheStartUrl: true,
  // cacheOnFrontendNav: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_BASE_URL}/:path*`,
  //     },
  //     {
  //       source: "/services/categories/:slug",
  //       destination: "/services/categories/somewhere", // Keep the destination same as source
  //     },
  //   ];
  // },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "minio", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname: "s3.ir-thr-at1.arvanstorage.com", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname: "s3.ir-thr-at1.arvanstorage.com/", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname: "trustseal.enamad.ir/", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname:
          "trustseal.enamad.ir/?id=479217&Code=jzsiFZ45Ygx0PxZsqLVO9n2B7A0eyX2t", // if your website has no www, drop it
      },
      {
        protocol: "https",
        hostname:
          "trustseal.enamad.ir/logo.aspx?id=479217&Code=jzsiFZ45Ygx0PxZsqLVO9n2B7A0eyX2t", // if your website has no www, drop it
      },
    ],
    dangerouslyAllowSVG: true,
  },
  output: "standalone",
};

module.exports = withPWA(nextConfig);

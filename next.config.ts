/** @type {import {'next'}.NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "8080",
        pathname: "/images/**"
      }
    ]
  }
};

module.exports = nextConfig

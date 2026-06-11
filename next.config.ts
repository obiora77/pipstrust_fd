/** @type {import {'next'}.NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.195.24.232"],
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

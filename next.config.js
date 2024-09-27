/** @type {import('next').NextConfig} */
const nextConfig = {


  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
        pathname: '/upload/**',
      },
    ],
  },
};

module.exports = nextConfig;

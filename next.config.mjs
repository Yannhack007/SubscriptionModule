import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': path.join(__dirname, "src"),
          '@public': path.join(__dirname, 'public')
        }
      }
    }
  },
  env:{
    SERVER_URL:"https://9c4c-143-105-152-31.ngrok-free.app/api"
  }
};

export default nextConfig;

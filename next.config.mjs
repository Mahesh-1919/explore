/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    CLOUDNARY_SECRET: process.env.CLOUDNARY_SECRET,
    CLOUDNARY_API_KEY: process.env.CLOUDNARY_API_KEY,
    CLOUD_NAME: process.env.CLOUD_NAME,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
};

export default nextConfig;

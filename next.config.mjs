/** @type {import('next').NextConfig} */
// The "images.domains" configuration is deprecated. Please use "images.remotePatterns" configuration instead.
const nextConfig = {
  images: {
    domains: ["recipefy-seven.vercel.app", "res.cloudinary.com"],
  },
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript type checking during builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

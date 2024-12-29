
/** @type {import('next').NextConfig} */

  import path from 'path';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        //https://linked-posts.routemisr.com/uploads/default-profile.png
        protocol: "https",
        hostname: "linked-posts.routemisr.com",
        pathname: "/uploads/**",
      },
    ],
  },
  eslint:{
    dirs: ['pages', 'utils'],// Only run ESLint on the 'pages' and 'utils' directories during production builds (next build)
  },
  reactStrictMode: false,
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
};


export default nextConfig;
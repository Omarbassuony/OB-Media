
/** @type {import('next').NextConfig} */

  import path from 'path';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        //https://linked-posts.routemisr.com/uploads/default-profile.png
        protocol: "https",
        hostname: "route-posts.routemisr.com",
        pathname: "/uploads/**",
      },
      {
        // Cloudflare R2 CDN used by the API for profile photos and post images
        protocol: "https",
        hostname: "pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev",
        pathname: "/**",
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
/** @type {import('next').NextConfig} */
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
    }
  };
  
  export default nextConfig;
  
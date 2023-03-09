/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["image.tmdb.org", "rb.gy", "scontent.fsgn2-7.fna.fbcdn.net"],
  },
};

module.exports = nextConfig;

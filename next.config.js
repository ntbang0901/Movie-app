const intercept = require("intercept-stdout");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      "image.tmdb.org",
      "rb.gy",
      "scontent.fsgn2-7.fna.fbcdn.net,lh3.googleusercontent.com",
    ],
  },
};

// safely ignore recoil warning messages in dev (triggered by HMR)

function interceptStdout(text) {
  if (text.includes("Duplicate atom key")) {
    return "";
  }
  return text;
}

if (process.env.NODE_ENV === "development") {
  intercept(interceptStdout);
}

module.exports = nextConfig;

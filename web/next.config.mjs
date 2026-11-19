// TechTalk (English for IT) is a separate Next.js app deployed on its own Vercel project with
// basePath "/techtalk". maiqai.com proxies /techtalk/* to it, so users only ever see maiqai.com.
// Set TECHTALK_ORIGIN in Vercel to the TechTalk deployment URL (no trailing slash).
const TECHTALK_ORIGIN = process.env.TECHTALK_ORIGIN || "https://english-tech-psi.vercel.app";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/techtalk", destination: `${TECHTALK_ORIGIN}/techtalk` },
      { source: "/techtalk/:path*", destination: `${TECHTALK_ORIGIN}/techtalk/:path*` },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;

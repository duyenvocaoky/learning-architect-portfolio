/** @type {import('next').NextConfig} */

// BASE_PATH is set only when building for GitHub Pages, where the site lives at
// /learning-architect-portfolio. On Hostinger (own domain) it stays empty.
const basePath = process.env.BASE_PATH || "";

const nextConfig = {
  output: "export", // plain HTML/CSS/JS in out/ — runs on any host
  trailingSlash: true, // /vi/ → vi/index.html, works on every static host
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;

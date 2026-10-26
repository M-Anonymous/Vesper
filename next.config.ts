import type { NextConfig } from "next";

/**
 * GitHub Pages project sites are served from /<repo>.
 * A user site named <owner>.github.io stays at the root.
 * Local dev and an explicit BASE_PATH always win.
 */
function pagesBasePath(): string {
  if (process.env.BASE_PATH !== undefined) {
    return process.env.BASE_PATH.replace(/\/$/, "");
  }

  if (process.env.GITHUB_ACTIONS !== "true") return "";

  const repository = process.env.GITHUB_REPOSITORY ?? "";
  const [owner, repo] = repository.split("/");
  if (!owner || !repo) return "";
  if (repo.toLowerCase() === `${owner}.github.io`.toLowerCase()) return "";
  return `/${repo}`;
}

const basePath = pagesBasePath();

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(basePath ? { basePath } : {}),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

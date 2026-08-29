// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// GitHub Pages build (.github/workflows/deploy.yml) sets BASE_PATH to the repo
// subpath, e.g. "/btcpricelive/". It turns the build into a prerendered SPA
// shell under .output/public — no server required. Unset anywhere else, so the
// Lovable/Cloudflare build keeps its current SSR behaviour.
const basePath = process.env["BASE_PATH"];

export default defineConfig({
  ...(basePath ? { vite: { base: basePath } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    ...(basePath ? { spa: { enabled: true }, prerender: { enabled: true } } : {}),
  },
});

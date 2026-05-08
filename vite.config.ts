import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? "/directionality-indicator-webgl/" : "/",
  assetsInclude: ["**/*.glsl"],
  server: { port: 5173, open: true },
  build: { target: "es2022", sourcemap: true },
});

import { redact } from "@tanstack/redact/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [redact()],
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@tanstack/redact",
  },
  appType: "spa",
});

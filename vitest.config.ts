import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    isolate: false,
    exclude: ["**/node_modules/**", ".nx/**", ".zed/**", ".github/**"],
  },
});

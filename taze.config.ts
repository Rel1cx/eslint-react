import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    // skip 1.10.15 because of a known issue
    // turbo: "1.10.14",
  },
  write: true,
});

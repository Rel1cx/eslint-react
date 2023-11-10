import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    // Synchronize the version of this package with the patch
    "eslint-doc-generator": "1.5.4",
  },
  write: true,
});

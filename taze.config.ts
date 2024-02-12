import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    "@typescript-eslint/eslint-plugin": ">=7.0.0",
    "@typescript-eslint/parser": ">=7.0.0",
    "@typescript-eslint/scope-manager": ">=7.0.0",
    "@typescript-eslint/type-utils": ">=7.0.0",
    "@typescript-eslint/types": ">=7.0.0",
    "@typescript-eslint/utils": ">=7.0.0",
  },
  write: true,
});

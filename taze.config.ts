import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    "@typescript-eslint/eslint-plugin": ">=6.19.1",
    "@typescript-eslint/parser": ">=6.19.1",
    "@typescript-eslint/scope-manager": ">=6.19.1",
    "@typescript-eslint/type-utils": ">=6.19.1",
    "@typescript-eslint/types": ">=6.19.1",
    "@typescript-eslint/utils": ">=6.19.1",
  },
  write: true,
});

import { defineConfig } from "taze";

export default defineConfig({
  force: false,
  install: false,
  packageMode: {
    "@typescript-eslint/eslint-plugin": "6.13.2",
    "@typescript-eslint/parser": "6.13.2",
    "@typescript-eslint/scope-manager": "6.13.2",
    "@typescript-eslint/type-utils": "6.13.2",
    "@typescript-eslint/types": "6.13.2",
    "@typescript-eslint/utils": "6.13.2",
  },
  write: true,
});

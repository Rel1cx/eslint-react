import eslintReact from "@eslint-react/eslint-plugin";
import { defineConfig } from "oxlint";

const { rules, settings } = eslintReact.configs["recommended-typescript"];

// Oxlint does not support type-aware lint rules yet, so this example uses the
// `recommended-typescript` preset, which only enables rules that work without type information.
export default defineConfig({
  jsPlugins: ["@eslint-react/eslint-plugin"],
  rules,
  settings,
});

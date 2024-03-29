module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@eslint-react/recommended-legacy",
  ],
  plugins: ["@typescript-eslint", "react-hooks"],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "2021",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  // Configurations files
  overrides: [
    {
      files: ["*.config.ts", ".eslintrc.cjs"],
      env: { browser: false, node: true, es2021: true },
      parserOptions: {
        project: "./tsconfig.node.json",
      },
    },
  ],
};

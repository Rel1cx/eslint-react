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
    project: "./tsconfig.json",
    sourceType: "module",
  },
  // Configurations files
  overrides: [
    {
      files: ["*.config.ts", ".eslintrc.js"],
      env: { browser: false, node: true, es2021: true },
      parserOptions: {
        // This is important if you want to lint your config files under project root as well
        project: "./tsconfig.node.json",
      },
    },
  ],
};

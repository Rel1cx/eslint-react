module.exports = {
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@eslint-react/eslint-plugin"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["src/**/*.{ts, tsx}"],
      extends: [
        "plugin:@eslint-react/recommended-legacy",
      ],
    },
  ],
};

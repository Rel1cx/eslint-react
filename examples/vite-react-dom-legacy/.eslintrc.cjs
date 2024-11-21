module.exports = {
  env: {
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@eslint-react/eslint-plugin"],
  extends: ["eslint:recommended"],
  overrides: [
    {
      files: ["src/**/*.{js, jsx}"],
      extends: [
        "plugin:@eslint-react/debug-legacy",
      ],
    },
  ],
};

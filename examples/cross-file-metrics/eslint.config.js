import plugin from "./plugin/index.js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.js"],
    plugins: {
      "cross-file-metrics": plugin,
    },
    rules: {
      "cross-file-metrics/collect-complexity": "error",
    },
  },
];

import collectComplexity from "./rules/collect-complexity.js";

/** @type {import('eslint').ESLint.Plugin} */
const plugin = {
  meta: {
    name: "cross-file-metrics",
    version: "0.0.0",
  },
  rules: {
    "collect-complexity": collectComplexity,
  },
};

export default plugin;

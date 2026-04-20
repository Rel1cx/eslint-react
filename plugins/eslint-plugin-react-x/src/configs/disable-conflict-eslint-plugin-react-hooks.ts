import type { Linter } from "eslint";

// This rulelist should be kept in sync with `apps/website/content/docs/migrating-from-eslint-plugin-react-hooks.mdx`
// Rules provided by `eslint-plugin-react-hooks` that exist in this plugin.
const conflictingRules = [
  "react-hooks/exhaustive-deps",
  "react-hooks/rules-of-hooks",
  "react-hooks/component-hook-factories",
  "react-hooks/error-boundaries",
  "react-hooks/globals",
  "react-hooks/immutability",
  "react-hooks/purity",
  "react-hooks/refs",
  "react-hooks/set-state-in-effect",
  "react-hooks/set-state-in-render",
  "react-hooks/unsupported-syntax",
  "react-hooks/use-memo",
] as const;

export const name = "react-x/disable-conflict-eslint-plugin-react-hooks";

export const rules: Linter.RulesRecord = Object.fromEntries(
  conflictingRules.map((key) => [key, "off"] as const),
);

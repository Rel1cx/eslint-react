import type { RuleConfig } from "@eslint-react/shared";

// This rulelist should be kept in sync with `apps/website/content/docs/migrating-from-eslint-plugin-react-hooks.mdx`
// Rules provided by `eslint-plugin-react-hooks` that exist in this plugin.
const conflictingRules = [
  "react-hooks/exhaustive-deps",
  "react-hooks/rules-of-hooks",
  "react-hooks/component-hook-factories",
  "react-hooks/error-boundaries",
  "react-hooks/immutability",
  "react-hooks/purity",
  "react-hooks/refs",
  "react-hooks/set-state-in-effect",
  "react-hooks/set-state-in-render",
  "react-hooks/static-components",
  "react-hooks/unsupported-syntax",
  "react-hooks/use-memo",
] as const;

export const name = "react-x/disable-conflict-eslint-plugin-react-hooks";

export const rules: Record<string, RuleConfig> = Object.fromEntries(
  conflictingRules.map((key) => [key, "off"] as const),
);

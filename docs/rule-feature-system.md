# Rule Feature System

Every rule in ESLint React declares a `RULE_FEATURES` constant. This is not merely documentation—it is a **typed metadata system** that drives preset generation, documentation, and rule categorization.

## Table of Contents

- [The `RuleFeature` Type](#the-rulefeature-type)
- [Feature Definitions](#feature-definitions)
- [Declaring Features](#declaring-features)
- [How Features Drive Presets](#how-features-drive-presets)
  - [`disable-type-checked.ts`](#disable-type-checkedts)
  - [`disable-experimental.ts`](#disable-experimentalts)
- [Feature Selection Guidelines](#feature-selection-guidelines)
  - [Does the rule need TypeScript type information?](#does-the-rule-need-typescript-type-information)
  - [Is the rule ready for stable use?](#is-the-rule-ready-for-stable-use)
  - [Does the rule provide auto-fixes?](#does-the-rule-provide-auto-fixes)
  - [Does the rule accept options?](#does-the-rule-accept-options)
- [Multi-Feature Rules](#multi-feature-rules)
- [Feature Metadata Consumption](#feature-metadata-consumption)
- [Graduating an Experimental Rule](#graduating-an-experimental-rule)
- [Summary](#summary)

## The `RuleFeature` Type

```ts
export type RuleFeature =
  | "CFG" // Configurable
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC" // TypeScript Type Checking
  | "EXP"; // Experimental
```

Located in `@eslint-react/eslint/src/types.ts`.

## Feature Definitions

| Feature | Meaning                                                                          | Preset Impact                                                |
| ------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `CFG`   | The rule accepts user-configurable options (schema is non-empty).                | Used by documentation generators to flag configurable rules. |
| `FIX`   | The rule provides an automatic fix via `context.report({ fix })` or suggestions. | Documented as fixable; influences IDE integration.           |
| `MOD`   | The rule is intended as a codemod (rare; not currently used in `react-x`).       | Reserved for future one-time migration tooling.              |
| `TSC`   | The rule requires TypeScript type information (`parserServices` + type checker). | Automatically disabled by `disable-type-checked` preset.     |
| `EXP`   | The rule is experimental and may change behavior or be removed.                  | Automatically disabled by `disable-experimental` preset.     |
| `DBG`   | The rule is for debugging (primarily in `eslint-plugin-react-debug`).            | Excluded from production presets.                            |

## Declaring Features

Features are declared as a const array with `satisfies`:

```ts
export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];
```

A rule with no special features uses an empty array:

```ts
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
```

## How Features Drive Presets

### `disable-type-checked.ts`

All `TSC` rules are explicitly turned off:

```ts
export const rules: Linter.RulesRecord = {
  "react-x/no-implicit-children": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-implicit-ref": "off",
  "react-x/no-leaked-conditional-rendering": "off",
  "react-x/no-unused-props": "off",
};
```

### `disable-experimental.ts`

All `EXP` rules are explicitly turned off:

```ts
export const rules: Linter.RulesRecord = {
  "react-x/globals": "off",
  "react-x/immutability": "off",
  "react-x/no-duplicate-key": "off",
  "react-x/no-implicit-children": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-implicit-ref": "off",
  "react-x/no-misused-capture-owner-stack": "off",
  "react-x/no-unused-props": "off",
  "react-x/refs": "off",
  "react-x/set-state-in-render": "off",
};
```

> **Important**: The preset files are currently maintained manually. The `RULE_FEATURES` metadata serves as the **source of truth** for what _should_ be in these presets. The `verify-configs.ts` script checks for consistency.

## Feature Selection Guidelines

When creating a new rule, ask the following questions:

### Does the rule need TypeScript type information?

- **Yes** if it calls `ESLintUtils.getParserServices(context, false)` or uses `checker.getTypeAtLocation`.
- **Yes** if it uses `getConstrainedTypeAtLocation` from `@typescript-eslint/type-utils`.
- **No** if it operates purely on AST structure.

**Mark as `TSC`**.

### Is the rule ready for stable use?

- **No** if the detection logic is known to have edge-case false positives.
- **No** if the rule's behavior is expected to change based on community feedback.
- **No** if it targets a React feature that is itself experimental (e.g., React Compiler directives).

**Mark as `EXP`**.

Experimental rules should:

- Be excluded from `recommended` unless specifically noted.
- Have a prominent warning in their `.mdx` documentation.
- Be targeted by `disable-experimental` preset.

### Does the rule provide auto-fixes?

- **Yes** if `context.report({ fix(fixer) { ... } })` is implemented.
- **Yes** if `context.report({ suggest: [...] })` is implemented.

**Mark as `FIX`**.

### Does the rule accept options?

- **Yes** if `meta.schema` has properties.
- **Yes** if `defaultOptions` is non-empty.

**Mark as `CFG`**.

## Multi-Feature Rules

A rule can have multiple features:

```ts
// use-state: configurable, but not fixable or experimental
export const RULE_FEATURES = ["CFG"] as const satisfies RuleFeature[];

// exhaustive-deps: ported from upstream, supports fix/suggest
export const RULE_FEATURES = ["CFG", "FIX"] as const satisfies RuleFeature[];

// no-unused-props: requires types, still experimental
export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];

// static-components: experimental detection, not yet fully stable
export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];
```

## Feature Metadata Consumption

While presets are currently manually authored, the `RULE_FEATURES` array is consumed by:

1. **Documentation generators**: To render badges (🧪 Experimental, 🔧 Fixable, etc.) on the website.
2. **Verification scripts**: `verify-configs.ts` cross-checks that `disable-*` presets match the feature metadata.
3. **IDE plugins**: Future tooling can read feature flags to warn users before enabling experimental rules.

## Graduating an Experimental Rule

To move a rule from `EXP` to stable:

1. Remove `"EXP"` from `RULE_FEATURES`.
2. Remove the rule from `disable-experimental.ts`.
3. Add the rule to the appropriate base preset (`recommended.ts` or `strict.ts`).
4. Update the rule's `.mdx` documentation to remove experimental warnings.
5. Run `pnpm run verify:configs` to ensure consistency.
6. Update `CHANGELOG.md`.

## Summary

- `RULE_FEATURES` is **mandatory** for every rule.
- Features are a **contract** between the rule implementation and the preset/configuration system.
- When in doubt, mark a new rule as `EXP`. It is easier to graduate a rule than to retract a stable one.

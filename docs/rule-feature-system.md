# Rule Feature System

Every rule declares a `RULE_FEATURES` constant. This typed metadata drives preset generation, documentation badges, and rule categorization.

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

```ts
export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];
```

A rule with no special features uses an empty array:

```ts
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
```

## How Features Drive Presets

`TSC` rules are disabled in `disable-type-checked.ts`:

```ts
export const rules: Linter.RulesRecord = {
  "react-x/no-implicit-children": "off",
  "react-x/no-implicit-key": "off",
  "react-x/no-implicit-ref": "off",
  "react-x/no-leaked-conditional-rendering": "off",
  "react-x/no-unused-props": "off",
};
```

`EXP` rules are disabled in `disable-experimental.ts`:

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
  "react-x/no-unused-state": "off",
  "react-x/refs": "off",
  "react-x/set-state-in-render": "off",
};
```

Preset files are maintained manually, but `RULE_FEATURES` is the source of truth. The `scripts/20-check-configs.ts` script (run via `pnpm run check:configs`) verifies consistency.

## Feature Selection Guidelines

| Question                              | Mark when true                                                                                        | Feature |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------- |
| Does the rule need TypeScript types?  | Uses `ESLintUtils.getParserServices`, `checker.getTypeAtLocation`, or `getConstrainedTypeAtLocation`. | `TSC`   |
| Is the rule not ready for stable use? | Has known false positives, expected behavior changes, or targets an experimental React feature.       | `EXP`   |
| Does the rule provide auto-fixes?     | Implements `context.report({ fix })` or `context.report({ suggest })`.                                | `FIX`   |
| Does the rule accept options?         | `meta.schema` has properties or `defaultOptions` is non-empty.                                        | `CFG`   |

Experimental rules should be excluded from `recommended` unless noted, carry a warning in their `.mdx` docs, and be targeted by `disable-experimental`.

## Multi-Feature Rules

```ts
// use-state: configurable only
export const RULE_FEATURES = ["CFG"] as const satisfies RuleFeature[];

// exhaustive-deps: configurable and fixable
export const RULE_FEATURES = ["CFG", "FIX"] as const satisfies RuleFeature[];

// no-unused-props: requires types, still experimental
export const RULE_FEATURES = ["TSC", "EXP"] as const satisfies RuleFeature[];

// static-components: experimental detection
export const RULE_FEATURES = ["EXP"] as const satisfies RuleFeature[];
```

## Feature Metadata Consumption

- **Documentation generators** render badges (🧪 Experimental, 🔧 Fixable, etc.).
- **Verification scripts** (`check-configs.ts`) cross-check `disable-*` presets.
- **IDE plugins** can warn users before enabling experimental rules.

## Graduating an Experimental Rule

1. Remove `"EXP"` from `RULE_FEATURES`.
2. Remove the rule from `disable-experimental.ts`.
3. Add the rule to `recommended.ts` or `strict.ts`.
4. Remove experimental warnings from the rule's `.mdx` docs.
5. Run `pnpm run check:configs`.
6. Update `CHANGELOG.md`.

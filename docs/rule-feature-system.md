# Rule Feature System

Every rule declares a `RULE_FEATURES` constant. This typed metadata drives documentation badges and rule categorization in the rules index.

## Feature Flags

Defined in `@eslint-react/eslint/src/types.ts`:

```ts
export type RuleFeature =
  | "CFG" // Configurable
  | "DBG" // Debugging
  | "FIX" // Fixable
  | "MOD" // Codemod
  | "TSC" // TypeScript Type Checking
  | "EXP"; // Experimental
```

| Feature | When to use                                           | Preset impact                       |
| ------- | ----------------------------------------------------- | ----------------------------------- |
| `CFG`   | `meta.schema` or `defaultOptions` is non-empty.       | Flagged as configurable in docs.    |
| `FIX`   | Uses `context.report({ fix })` or `suggest`.          | Flagged as fixable in docs / IDE.   |
| `MOD`   | Rule is a one-time codemod.                           | Reserved for migration tooling.     |
| `TSC`   | Uses parser services / type checker.                  | Disabled by `disable-type-checked`. |
| `EXP`   | Rule has known issues or targets unstable React APIs. | Disabled by `disable-experimental`. |
| `DBG`   | Rule is for debugging only.                           | Excluded from production presets.   |

## Declaration

```ts
export const RULE_FEATURES = ["CFG", "FIX"] as const satisfies RuleFeature[];
```

Rules with no special features use an empty array:

```ts
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
```

## Examples

```ts
const RULE_FEATURES = ["CFG"]; // use-state: configurable only
const RULE_FEATURES = ["CFG", "FIX"]; // exhaustive-deps: configurable and fixable
const RULE_FEATURES = ["TSC", "EXP"]; // no-unused-props: requires types, still experimental
const RULE_FEATURES = ["EXP"]; // static-components: experimental detection
```

## How Features Drive Presets

Feature metadata is the source of truth for badges and categorization, but the preset files themselves are maintained manually. The `scripts/20-check-rules.ts` script (run via `node --run check:rules`) verifies config consistency—registered rules are accounted for, config keys are valid, and preset hierarchies hold. It also checks that the feature badges in each rule's `.mdx` docs and the rules index match its `RULE_FEATURES`. What it does not check is the alignment between `RULE_FEATURES` and the `disable-type-checked` / `disable-experimental` presets; keeping those aligned is currently a manual step.

Rules marked `TSC` are disabled in `disable-type-checked.ts`:

```ts
export const rules: Linter.RulesRecord = {
  "@eslint-react/no-implicit-children": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-implicit-ref": "off",
  "@eslint-react/no-leaked-conditional-rendering": "off",
  "@eslint-react/no-unused-props": "off",
};
```

Rules marked `EXP` are disabled in `disable-experimental.ts`:

```ts
export const rules: Linter.RulesRecord = {
  "@eslint-react/globals": "off",
  "@eslint-react/immutability": "off",
  "@eslint-react/no-duplicate-key": "off",
  "@eslint-react/no-implicit-children": "off",
  "@eslint-react/no-implicit-key": "off",
  "@eslint-react/no-implicit-ref": "off",
  "@eslint-react/no-misused-capture-owner-stack": "off",
  "@eslint-react/no-unused-props": "off",
  "@eslint-react/no-unused-state": "off",
  "@eslint-react/refs": "off",
  "@eslint-react/set-state-in-render": "off",
  "@eslint-react/static-components": "off",

  "@eslint-react/rsc-function-definition": "off",

  "@eslint-react/web-api-no-leaked-fetch": "off",
};
```

## Graduating an Experimental Rule

1. Remove `"EXP"` from `RULE_FEATURES`.
2. Remove the rule from `disable-experimental.ts`.
3. Add it to `recommended.ts` or `strict.ts`.
4. Remove experimental warnings from its `.mdx` docs.
5. Run `node --run check:rules`.
6. Update `CHANGELOG.md`.

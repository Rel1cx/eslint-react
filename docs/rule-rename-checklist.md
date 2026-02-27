# Rule Rename / Move Checklist

Step-by-step checklists for renaming or moving a rule in `eslint-plugin-react-x` and `@eslint-react/eslint-plugin`.

Used as reference when:

- `no-missing-use-memo-return` was renamed to `use-memo`
- `naming-convention/use-state` was moved to `react-x/use-state`

---

## Part A — Rename a Rule (same plugin, new name)

### A1. Source Files

- [ ] Rename `src/rules/<old-name>/<old-name>.ts` → `src/rules/<new-name>/<new-name>.ts`
- [ ] Rename `src/rules/<old-name>/<old-name>.spec.ts` → `src/rules/<new-name>/<new-name>.spec.ts`
- [ ] Rename `src/rules/<old-name>/<old-name>.mdx` → `src/rules/<new-name>/<new-name>.mdx`

### A2. Rule Implementation (`<new-name>.ts`)

- [ ] Update `RULE_NAME` constant
  ```ts
  export const RULE_NAME = "<new-name>";
  ```

### A3. Test File (`<new-name>.spec.ts`)

- [ ] Update the import path
  ```ts
  import rule, { RULE_NAME } from "./<new-name>/<new-name>";
  ```

### A4. Documentation (`<new-name>.mdx`)

- [ ] Update front-matter `title` field
- [ ] Update the `@eslint-react/<new-name>` full name code block
- [ ] Update the `react-x/<new-name>` full name code block
- [ ] Update **Implementation** section links (rule source + test source)

### A5. Plugin Registration (`src/plugin.ts` in `eslint-plugin-react-x`)

- [ ] Rename the `import` statement (variable name + module path)
  ```ts
  // before
  import oldName from "./rules/<old-name>/<old-name>";
  // after
  import newName from "./rules/<new-name>/<new-name>";
  ```
- [ ] Rename the key in the `rules` map
  ```ts
  // before
  "<old-name>": oldName,
  // after
  "<new-name>": newName,
  ```

### A6. Preset Configs (`eslint-plugin-react-x`)

Update the rule key in every preset that includes the rule:

- [ ] `src/configs/recommended.ts` — `"react-x/<new-name>"`
- [ ] `src/configs/recommended-typescript.ts` — if present
- [ ] `src/configs/recommended-type-checked.ts` — if present
- [ ] `src/configs/strict.ts` — if present
- [ ] `src/configs/strict-typescript.ts` — if present
- [ ] `src/configs/strict-type-checked.ts` — if present
- [ ] `src/configs/disable-experimental.ts` — if present

### A7. Preset Configs (`@eslint-react/eslint-plugin`)

Update the rule key (prefixed `@eslint-react/`) in every config that includes the rule:

- [ ] `src/configs/x.ts`
- [ ] `src/configs/all.ts`
- [ ] Any other config that explicitly lists the rule

### A8. CHANGELOG

- [ ] Update the preset-changes table row: `react-x/<old-name>` → `react-x/<new-name>`
- [ ] Update the new-rules bullet entry name
- [ ] Update the upgrade checklist entry

### A9. Verify

- [ ] TypeScript compiles without errors
  ```sh
  pnpm tsc --noEmit
  ```
- [ ] All tests pass
  ```sh
  pnpm vitest run src/rules/<new-name>/<new-name>.spec.ts
  ```
- [ ] No leftover references to the old name
  ```sh
  grep -r "<old-name>" packages/
  ```

---

## Part B — Move a Rule (different source plugin → `eslint-plugin-react-x`)

### B1. Dependencies

- [ ] Check if the source plugin uses any dependencies not yet listed in `eslint-plugin-react-x/package.json`
- [ ] Add any missing dependencies and run `pnpm install --filter eslint-plugin-react-x`

### B2. New Source Files (in `eslint-plugin-react-x`)

- [ ] Create `src/rules/<rule-name>/<rule-name>.ts`
  - Copy implementation from the source plugin
  - Update `import { createRule } from "../utils"` to point to the react-x utils
  - Add a fast-path skip guard if applicable:
    ```ts
    if (!context.sourceCode.text.includes("<hookName>")) return {};
    ```
- [ ] Create `src/rules/<rule-name>/<rule-name>.spec.ts`
  - Copy tests from the source plugin
  - Update the import to `from "./<rule-name>/<rule-name>"`
  - Adjust test helpers if needed (e.g. `allFunctions` vs `allValid`)
- [ ] Create `src/rules/<rule-name>/<rule-name>.mdx`
  - Follow the `use-memo.mdx` style (see template below)

### B3. Plugin Registration (`eslint-plugin-react-x/src/plugin.ts`)

- [ ] Add `import <camelName> from "./rules/<rule-name>/<rule-name>";`
- [ ] Add `"<rule-name>": <camelName>` to the `rules` map

### B4. Preset Configs (`eslint-plugin-react-x`)

Add the rule to every applicable preset:

- [ ] `src/configs/recommended.ts` — `"react-x/<rule-name>": "<severity>"`
- [ ] `src/configs/strict.ts` — if stricter coverage is desired
- [ ] Other presets as appropriate

### B5. Preset Configs (`@eslint-react/eslint-plugin`)

- [ ] `src/configs/x.ts` — `"@eslint-react/<rule-name>": "<severity>"`
- [ ] `src/configs/all.ts` — `"@eslint-react/<rule-name>": "<severity>"`
- [ ] `src/configs/recommended.ts` — replace the old namespaced key if it was listed explicitly

### B6. Source Plugin Cleanup (`eslint-plugin-react-<source>`)

- [ ] Remove the `import` from `src/plugin.ts`
- [ ] Remove the `rules` map entry from `src/plugin.ts`
- [ ] Remove the rule key from `src/configs/recommended.ts` (and any other configs)
- [ ] Keep or delete the original `.ts` / `.spec.ts` / `.mdx` source files as appropriate

### B7. CHANGELOG

- [ ] Add a preset-changes table row marking the rule as moved:
      `react-<source>/<rule-name>` → `react-x/<rule-name>`
- [ ] Add a new-rules bullet entry for `react-x/<rule-name>`
- [ ] Add an upgrade checklist entry for the new rule

### B8. Verify

- [ ] TypeScript compiles in all affected packages
  ```sh
  pnpm tsc --noEmit   # run in eslint-plugin-react-x
  pnpm tsc --noEmit   # run in eslint-plugin-react-<source>
  pnpm tsc --noEmit   # run in eslint-plugin
  ```
- [ ] All tests pass
  ```sh
  pnpm vitest run src/rules/<rule-name>/<rule-name>.spec.ts
  ```
- [ ] No stale references to the old namespaced rule name
  ```sh
  grep -r "react-<source>/<rule-name>" packages/
  ```

---

## MDX Documentation Template

Use this structure for new rules moved or added to `eslint-plugin-react-x`.
Mirrors the style established by `use-memo.mdx`.

```mdx
---
title: <rule-name>
---

**Full Name in [`@eslint-react/eslint-plugin`](https://npmx.dev/package/@eslint-react/eslint-plugin/v/latest)**

\`\`\`plain copy
@eslint-react/<rule-name>
\`\`\`

**Full Name in [`eslint-plugin-react-x`](https://npmx.dev/package/eslint-plugin-react-x/v/latest)**

\`\`\`plain copy
react-x/<rule-name>
\`\`\`

**Features**

`⚙️`   ← use `🧪` for experimental rules

**Presets**

`x`
`recommended`
`recommended-typescript`
`recommended-type-checked`
`strict`
`strict-typescript`
`strict-type-checked`

## Description

One-paragraph summary of what the rule enforces and why.

## Options

\`\`\`ts
type Options = { ... };
\`\`\`

Document each option with its name, effect, and default value.

## Examples

### Failing

\`\`\`tsx
// ❌ explanation
\`\`\`

### Passing

\`\`\`tsx
// ✅ explanation
\`\`\`

## Implementation

- [Rule Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.ts)
- [Test Source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.spec.ts)

## Further Reading

- [React Docs: relevant link]()

---

## See Also

- [`related-rule`](./related-rule)\
  One-line description.
```

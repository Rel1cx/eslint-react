# Rule Rename / Move Checklist

Checklist for renaming or moving rules in `eslint-plugin-react-x` and `@eslint-react/eslint-plugin`.

## Part A — Rename a Rule (same plugin, new name)

### A1. Source Files

- [ ] Rename `src/rules/<old-name>/<old-name>.ts` → `src/rules/<new-name>/<new-name>.ts`
- [ ] Rename `src/rules/<old-name>/<old-name>.spec.ts` → `src/rules/<new-name>/<new-name>.spec.ts`
- [ ] Rename `src/rules/<old-name>/<old-name>.mdx` → `src/rules/<new-name>/<new-name>.mdx`
- [ ] Rename `src/rules/<old-name>/CHANGELOG.md` → `src/rules/<new-name>/CHANGELOG.md`

### A2. Rule Implementation

- [ ] Update `RULE_NAME` to `"<new-name>"`.

### A3. Test File

- [ ] Update the import path: `import rule, { RULE_NAME } from "./<new-name>/<new-name>";`

### A4. Documentation

- [ ] Update front-matter `title`.
- [ ] Update the `@eslint-react/<new-name>` and `react-x/<new-name>` full name code blocks.
- [ ] Update **Implementation** section links.

### A5. Plugin Registration (`src/plugin.ts`)

- [ ] Rename the import statement and module path.
- [ ] Rename the key in the `rules` map.

### A6. Preset Configs (`eslint-plugin-react-x`)

- [ ] Update the rule key in every preset that includes it:
  - `recommended.ts`
  - `recommended-typescript.ts`
  - `recommended-type-checked.ts`
  - `strict.ts`
  - `strict-typescript.ts`
  - `strict-type-checked.ts`
  - `disable-experimental.ts`

### A7. Preset Configs (`@eslint-react/eslint-plugin`)

- [ ] Update the `@eslint-react/<new-name>` key in every config that includes it:
  - `x.ts`
  - `all.ts`
  - any other explicit listing

### A8. CHANGELOG

- [ ] Update the preset-changes table row: `react-x/<old-name>` → `react-x/<new-name>`.
- [ ] Update the new-rules bullet entry name.
- [ ] Update the upgrade checklist entry.

### A9. Verify

- [ ] `nub exec tsc --noEmit`
- [ ] `nub exec vitest run src/rules/<new-name>/<new-name>.spec.ts`
- [ ] `grep -r --exclude-dir=node_modules --exclude-dir=dist "<old-name>" plugins/ packages/` — no leftover references

---

## Part B — Move a Rule (different source plugin → `eslint-plugin-react-x`)

### B1. Dependencies

- [ ] Check if the source plugin uses dependencies not yet listed in `eslint-plugin-react-x/package.json`.
- [ ] Add any missing dependencies and run `nub install --filter eslint-plugin-react-x`.

### B2. New Source Files (in `eslint-plugin-react-x`)

- [ ] Create `src/rules/<rule-name>/<rule-name>.ts`:
  - Copy implementation from the source plugin.
  - Update `import { createRule } from "../utils"` to point to the react-x utils.
  - Add a fast-path skip guard if applicable:
    ```ts
    if (!context.sourceCode.text.includes("<hookName>")) return {};
    ```
- [ ] Create `src/rules/<rule-name>/<rule-name>.spec.ts`:
  - Copy tests from the source plugin.
  - Update the import: `import rule, { RULE_NAME } from "./<rule-name>/<rule-name>";`.
- [ ] Create `src/rules/<rule-name>/<rule-name>.mdx` following the template below.
- [ ] Create `src/rules/<rule-name>/CHANGELOG.md` (copy from the source plugin or start fresh).

### B3. Plugin Registration (`eslint-plugin-react-x/src/plugin.ts`)

- [ ] Add `import <camelName> from "./rules/<rule-name>/<rule-name>";`
- [ ] Add `"<rule-name>": <camelName>` to the `rules` map.

### B4. Preset Configs (`eslint-plugin-react-x`)

- [ ] Add to `recommended.ts` and/or `strict.ts` with the appropriate severity.

### B5. Preset Configs (`@eslint-react/eslint-plugin`)

- [ ] Add `"@eslint-react/<rule-name>": "<severity>"` to `x.ts`, `all.ts`, and `recommended.ts` if replacing an old namespaced key.

### B6. Source Plugin Cleanup

- [ ] Remove the import and `rules` map entry from the source plugin's `src/plugin.ts`.
- [ ] Remove the rule key from the source plugin's configs.
- [ ] Keep or delete the original `.ts` / `.spec.ts` / `.mdx` / `CHANGELOG.md` files as appropriate.

### B7. CHANGELOG

- [ ] Add a preset-changes row: `react-<source>/<rule-name>` → `react-x/<rule-name>`.
- [ ] Add a new-rules bullet entry for `react-x/<rule-name>`.
- [ ] Add an upgrade checklist entry for the new rule.

### B8. Verify

- [ ] `nub exec tsc --noEmit` in all affected packages.
- [ ] `nub exec vitest run src/rules/<rule-name>/<rule-name>.spec.ts`
- [ ] `grep -r --exclude-dir=node_modules --exclude-dir=dist "react-<source>/<rule-name>" plugins/ packages/` — no stale references

---

## MDX Documentation Template

````mdx
---
title: <rule-name>
---

**Full Name in [`@eslint-react/eslint-plugin`](https://npmx.dev/package/@eslint-react/eslint-plugin/v/latest)**

```plain copy
@eslint-react/<rule-name>
```

**Full Name in [`eslint-plugin-react-x`](https://npmx.dev/package/eslint-plugin-react-x/v/latest)**

```plain copy
react-x/<rule-name>
```

**Features**

`⚙️` ← use `🧪` for experimental rules

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

```ts
type Options = { ... };
```

Document each option with its name, effect, and default value.

## Examples

### Failing

```tsx
// 🔴 explanation
```

### Passing

```tsx
// 🟢 explanation
```

## Implementation

- [Rule Source](https://github.com/Rel1cx/eslint-react/tree/main/plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.ts)
- [Test Source](https://github.com/Rel1cx/eslint-react/tree/main/plugins/eslint-plugin-react-x/src/rules/<rule-name>/<rule-name>.spec.ts)

## Further Reading

- [React Docs: relevant link]()

---

## See Also

- [`related-rule`](./related-rule)\
  One-line description.
````

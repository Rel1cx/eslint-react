# Enriching Rule MDX Examples from react.dev TypeScript Snippets

This document describes the repeatable workflow for scanning `./plugins` rule MDX documents, finding relevant TypeScript snippets from the local `react.dev` clone (`/Volumes/Rolling/react.dev/src/content/typescript-snippets`), and supplementing the rule docs with additional high-quality examples.

---

## Overview

The react.dev documentation contains ~3,000+ small `.tsx` snippet files that demonstrate idiomatic React patterns. Many of these patterns naturally illustrate the **recommended (valid)** side of an ESLint rule, making them ideal for enriching rule MDX documents that currently have sparse or only basic examples.

**Goal:** For each rule, add 1–2 additional `` ```tsx `` code blocks showing realistic, recommended patterns drawn from react.dev snippets, while following the existing MDX tone and formatting conventions.

**Principles:**

- Only **add** examples; do not remove or alter existing ones unless they contain errors.
- Prioritize rules with ≤ 4 existing `` ```tsx `` blocks.
- Snippets from react.dev are typically **good/recommended** patterns, so they fit best as `// Recommended:` or `// OK:` examples.
- Match snippets to rules by **topic keywords** (rule name, description, related React APIs).

---

## Pre-requisites

### Directory Layout

```
./plugins/                          # ESLint plugin packages
  eslint-plugin-react-x/src/rules/  # ~60 rule folders, each with .mdx
  eslint-plugin-react-dom/...       # ~20 rule folders
  eslint-plugin-react-jsx/...       # ~10 rule folders
  eslint-plugin-react-web-api/...   # ~5 rule folders
  eslint-plugin-react-rsc/...       # ~1 rule folder
  eslint-plugin-react-naming-convention/... # ~3 rule folders
  eslint-plugin-react-debug/...     # ~5 rule folders

/Volumes/Rolling/react.dev/src/content/typescript-snippets/  # ~3,121 .tsx files
```

### Snippet Filename Conventions

React.dev snippets follow predictable naming:

```
reference-react-<api>-snippet-<n>.tsx               # API reference pages
reference-react-dom-<topic>-snippet-<n>.tsx         # DOM API reference pages
learn-<topic>-snippet-<n>.tsx                       # Tutorial/learn pages
blog-<date>-<slug>-snippet-<n>.tsx                  # Blog posts
```

Examples:

- `reference-react-usestate-snippet-10.tsx`
- `reference-react-useeffect-snippet-32.tsx`
- `learn-rendering-lists-snippet-16.tsx`
- `reference-react-children-snippet-26.tsx`

**Key insight:** The filename itself contains the topic keyword, making filename-based matching the fastest first filter.

### MDX Example Conventions

Rule MDX documents use fenced `` ```tsx `` blocks with comment prefixes:

```tsx
// Problem:    describes the invalid/bad pattern
// Recommended: describes the valid/good pattern
// OK:         describes an allowed exception
```

Subsections under `## Examples` use `###` headings. Each subsection usually contains:

- A brief explanatory paragraph
- One or more `` ```tsx `` blocks

---

## Step-by-Step Workflow

### Step 1 — Audit All MDX Documents

Enumerate every `.mdx` rule document and record:

- `rule_name` (stem of the `.mdx` filename)
- `plugin` (e.g. `eslint-plugin-react-x`)
- `description` (from front-matter `description:`)
- `tsx_count` (number of `` ```tsx `` blocks)

Sort by `tsx_count` ascending. Rules with ≤ 4 blocks are the **priority candidates**.

Quick shell command:

````bash
find ./plugins -name "*.mdx" | while read mdx; do
  rule_name=$(basename "$mdx" .mdx)
  plugin=$(echo "$mdx" | sed 's|.*/plugins/\([^/]*\)/.*|\1|')
  tsx_count=$(grep -c '```tsx' "$mdx" 2>/dev/null || echo 0)
  echo "$tsx_count | $rule_name | $plugin"
done | sort -n
````

### Step 2 — Build Keyword → Snippet Mapping

From the rule name and description, derive search keywords and map them to snippet filename prefixes.

**Common mappings:**

| Rule Topic                                | Snippet Filename Keywords                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `useState`, `use-state`                   | `reference-react-usestate`, `learn-state-a-components-memory`                                           |
| `useEffect`, `exhaustive-deps`            | `reference-react-useeffect`, `learn-removing-effect-dependencies`                                       |
| `useMemo`                                 | `reference-react-usememo`                                                                               |
| `useCallback`                             | `reference-react-usecallback`                                                                           |
| `useRef`, `refs`, `createRef`             | `reference-react-useref`, `learn-manipulating-the-dom-with-refs`                                        |
| `forwardRef`                              | `reference-react-forwardref`                                                                            |
| `useContext`, `context`                   | `reference-react-usecontext`, `reference-react-createcontext`, `learn-passing-data-deeply-with-context` |
| `Children.*`                              | `reference-react-children`                                                                              |
| `Fragment`, `useless-fragment`            | `reference-react-fragment`                                                                              |
| `key`, `array-index-key`, `duplicate-key` | `learn-rendering-lists`                                                                                 |
| `class-component`, `Component`            | `reference-react-component`                                                                             |
| `dangerouslySetInnerHTML`                 | `reference-react-dom-components-common`                                                                 |
| `button`, `form`                          | `reference-react-dom-components-form`, `reference-react-dom-components-common`                          |
| `flushSync`                               | `reference-react-dom-flushsync`                                                                         |
| `createRoot`, `render`                    | `reference-react-dom-client-createroot`                                                                 |
| `hydrateRoot`, `hydrate`                  | `reference-react-dom-client-hydrateroot`                                                                |
| `immutability`, `state mutation`          | `learn-updating-objects-in-state`, `learn-updating-arrays-in-state`                                     |
| `purity`                                  | `reference-rules-components-and-hooks-must-be-pure`, `learn-keeping-components-pure`                    |
| `rules-of-hooks`, `custom-hooks`          | `reference-eslint-plugin-react-hooks-lints-rules-of-hooks`, `learn-reusing-logic-with-custom-hooks`     |
| `event-listener`, `events`                | `learn-responding-to-events`, `reference-react-useeffectevent`                                          |
| `setInterval`, `setTimeout`, `cleanup`    | `reference-react-useeffect`, `learn-lifecycle-of-reactive-effects`, `learn-synchronizing-with-effects`  |
| `RSC`, `server-components`                | `reference-rsc-server-components`, `learn-rsc-sandbox-test`                                             |

If a rule does not map cleanly to any snippet topic, skip it rather than forcing an irrelevant match.

### Step 3 — Search and Match Snippets

Use **filename keyword matching** first (fastest). Only read promising matches.

```bash
# Example: find snippets for Children-related rules
ls /Volumes/Rolling/react.dev/src/content/typescript-snippets \
  | grep "reference-react-children"

# Example: find snippets for list rendering / keys
ls /Volumes/Rolling/react.dev/src/content/typescript-snippets \
  | grep "learn-rendering-lists"
```

Read the first 3–5 matches per rule to evaluate quality. Look for:

- **Complete component examples** (not just API signatures like `useEffect(setup, dependencies?)`)
- **Self-contained code** (minimize references to external files like `./data.js`)
- **Clear illustration** of the rule's concern

**Discard:**

- Single-line API signatures
- Pure JSON/config snippets
- Snippets that rely heavily on undefined external imports

### Step 4 — Curate Snippets for the Rule

Determine how the snippet fits the rule's narrative:

1. **Does it show the recommended alternative?** → Use as `// Recommended:`
2. **Does it show an allowed exception?** → Use as `// OK:`
3. **Does it show the problematic pattern?** (rare, since react.dev snippets are usually correct) → Only use as `// Problem:` if the rule doc currently lacks a realistic problem example

Adapt the snippet if necessary:

- Inline small external dependencies (e.g. replace `import { people } from './data.js'` with an inline array)
- Add TypeScript interfaces/types to match the existing doc's style
- Rename variables to match the rule's terminology

### Step 5 — Insert into MDX

Choose the insertion point:

- Add a new `###` subsection under `## Examples`
- Place it **after** existing examples but before `## Resources`

Follow the existing document's style:

- Use `###` for the subsection title
- Write 1–2 sentences explaining the scenario
- Use `` ```tsx `` fences
- Prefix the first line with `// Recommended:` or `// OK:`

**Example insertion template:**

````markdown
### <Descriptive subsection title>

<Brief explanation of the pattern and why it addresses the rule.>

```tsx
// Recommended: <one-line description>
<adapted snippet code>
```
````

````
**Formatting checks:**
- Ensure code inside ` ```tsx ` is valid TypeScript/TSX
- Use camelCase for variables, PascalCase for components
- Prefer explicit TypeScript types if the existing doc uses them
- Keep indentation consistent with the surrounding file

### Step 6 — Validate

Run the project's built-in checks:

```bash
# Format check
pnpm run format:check

# MDX lint
pnpm run lint:mdx

# Docs verification
pnpm run verify:docs
````

Fix any issues before finishing. The `verify:docs` script checks that rule descriptions in the index match the rule source; unrelated mismatches may be pre-existing.

---

## Tips and Pitfalls

### Tip: Focus on "Recommended" Examples

React.dev snippets are overwhelmingly **correct/idiomatic** code. They are most valuable when used to show the _recommended_ way to do something, not the problematic way. If a rule doc already has a good `// Problem:` example but a weak `// Recommended:` one, that's your highest-value insertion point.

### Tip: Batch by Plugin or Topic

Instead of jumping between unrelated rules, process rules in batches:

- **Children rules:** `no-children-count`, `no-children-map`, `no-children-for-each`, `no-children-only`, `no-children-to-array` → all map to `reference-react-children`
- **DOM API rules:** `no-render`, `no-hydrate`, `no-find-dom-node`, `no-flush-sync` → map to `reference-react-dom-client-*`
- **Web API rules:** `no-leaked-interval`, `no-leaked-timeout`, `no-leaked-event-listener`, `no-leaked-fetch`, `no-leaked-resize-observer` → map to `reference-react-useeffect` and `learn-synchronizing-with-effects`

### Pitfall: Don't Over-edit

If a rule already has 10+ `` ```tsx `` blocks (e.g. `exhaustive-deps`, `rules-of-hooks`, `use-state`), the marginal value of another example is low. Focus on rules with ≤ 6 blocks.

### Pitfall: Avoid External File References

Many react.dev snippets import from `./data.js` or `./utils.js`. When adapting these for an MDX doc, either:

- Inline the data directly
- Replace the import with a `declare function ...` or inline mock
- Choose a different snippet that is more self-contained

### Pitfall: Respect the `// Problem:` / `// Recommended:` / `// OK:` Convention

Never invent new comment prefixes. The existing docs use only these three. If a snippet shows neither a problem nor a clear recommendation, it's likely not a good fit.

### Pitfall: Don't Duplicate Existing Examples

Before inserting, re-read the existing examples. If the doc already shows a `useEffect` cleanup with `clearInterval`, adding another nearly identical example adds noise. Look for a _different_ angle (e.g. using a state updater to avoid stale dependencies).

---

## Complete Example: Enriching `no-children-map`

### Before

The MDX had 2 `` ```tsx `` blocks: one `// Recommended:` (array prop + `.map()`) and one `// Problem:` (`Children.map`).

### Snippet Discovery

```bash
ls /Volumes/Rolling/react.dev/src/content/typescript-snippets \
  | grep "reference-react-children"
# → reference-react-children-snippet-25.tsx
# → reference-react-children-snippet-26.tsx
```

Reading `snippet-26.tsx`:

```tsx
export function RowList({ rows }) {
  return (
    <div className="RowList">
      {rows.map(row => (
        <div className="Row" key={row.id}>
          {row.content}
        </div>
      ))}
    </div>
  );
}
```

This shows a structured-data prop pattern, which is a more advanced and realistic alternative to `Children.map` than the existing basic array example.

### After

Added a new `### Passing structured data as props` subsection with:

- Explanation sentence
- A `// Recommended:` block adapted from the snippet, with TypeScript interfaces added
- A usage example (`App` component)

Result: the doc grew from 2 to 4 `` ```tsx `` blocks, with the new example showing a real-world pattern from react.dev.

---

## Quick Reference: High-Value Snippet Sources

| Snippet Prefix                           | Count | Best For Rules                                                  |
| ---------------------------------------- | ----- | --------------------------------------------------------------- |
| `reference-react-useeffect`              | ~60   | `exhaustive-deps`, `set-state-in-effect`, web-api cleanup rules |
| `reference-react-usestate`               | ~40   | `use-state`, `set-state-in-render`                              |
| `reference-react-children`               | ~33   | All `no-children-*` rules                                       |
| `learn-rendering-lists`                  | ~43   | `no-array-index-key`, `no-duplicate-key`, `no-key-after-spread` |
| `reference-react-component`              | ~45   | `no-class-component`, legacy lifecycle rules                    |
| `reference-react-forwardref`             | ~23   | `no-forward-ref`, `no-implicit-ref`                             |
| `reference-react-usecallback`            | ~32   | `exhaustive-deps`                                               |
| `reference-react-usememo`                | ~55   | `use-memo`, `exhaustive-deps`                                   |
| `reference-react-useref`                 | ~22   | `no-create-ref`, `refs`, `no-find-dom-node`                     |
| `reference-react-dom-client-createroot`  | ~24   | `no-render`                                                     |
| `reference-react-dom-client-hydrateroot` | ~20   | `no-hydrate`                                                    |
| `reference-react-dom-flushsync`          | ~5    | `no-flush-sync`                                                 |
| `reference-react-createcontext`          | ~12   | `no-context-provider`, `no-missing-context-display-name`        |
| `reference-react-usecontext`             | ~28   | `no-use-context`                                                |
| `learn-passing-data-deeply-with-context` | ~45   | Context-related rules                                           |
| `learn-updating-objects-in-state`        | ~44   | `immutability`, `no-direct-mutation-state`                      |
| `learn-updating-arrays-in-state`         | ~40   | `immutability`, `no-direct-mutation-state`                      |
| `learn-synchronizing-with-effects`       | ~58   | Web API cleanup rules, `exhaustive-deps`                        |
| `learn-lifecycle-of-reactive-effects`    | ~54   | Web API cleanup rules                                           |
| `reference-react-dom-components-form`    | ~14   | `no-missing-button-type`                                        |
| `reference-react-dom-components-common`  | ~33   | `no-dangerously-set-innerhtml`, iframe/button rules             |

---

## Checklist Before Finishing

- [ ] All edits are limited to `.mdx` files under `./plugins/*/src/rules/`
- [ ] No existing examples were removed or altered
- [ ] New examples follow the `// Recommended:` / `// OK:` / `// Problem:` convention
- [ ] Code inside `` ```tsx `` blocks is syntactically valid
- [ ] `pnpm run format:check` passes
- [ ] `pnpm run lint:mdx` reports no errors
- [ ] `pnpm run verify:docs` errors (if any) are pre-existing and unrelated to modified files
- [ ] Git diff reviewed to confirm only intended files changed

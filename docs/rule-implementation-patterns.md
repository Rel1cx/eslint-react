# Rule Implementation Patterns

This document summarizes the implementation patterns used in `plugins/eslint-plugin-react-x` and `plugins/eslint-plugin-react-web-api`.

---

## 1. Directory Structure

Each rule lives in its own folder:

```
src/rules/<rule-name>/
├── <rule-name>.ts       # Main rule implementation
├── <rule-name>.spec.ts  # Tests
└── lib.ts               # Optional helpers for complex rules
```

- `react-x` has ~53 rules.
- `react-web-api` has 5 rules.

---

## 2. `createRule` Utility

Both plugins export a thin wrapper around `ESLintUtils.RuleCreator`:

```ts
// src/utils/create-rule.ts
import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(
  (name) => `https://eslint-react.xyz/docs/rules/${name}`,
);
```

`react-web-api` prefixes the URL with `web-api-`.

---

## 3. Rule File Template

A standard rule file exports three things and calls `createRule`:

```ts
export const RULE_NAME = "no-xxx";
export const RULE_FEATURES = [] as const satisfies RuleFeature[];
export type MessageID = "default" | "otherMessage";

export default createRule<[], MessageID>({
  meta: {
    type: "problem", // or "suggestion"
    docs: { description: "..." },
    messages: { default: "...", otherMessage: "..." },
    schema: [], // or JSON Schema for options
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  return merge({
    // AST visitors
  });
}
```

### Conventions

- Always export `RULE_NAME`, `RULE_FEATURES`, and `MessageID`.
- Use `merge()` to combine visitor objects. This is required when merging with collectors from `@eslint-react/core`.
- Prefer exporting a named `create` function over an inline arrow function.

---

## 4. Core Dependencies

Rules rely heavily on internal monorepo packages:

| Package                | Purpose                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `@eslint-react/ast`    | AST traversal, checks, extraction (`Check`, `Extract`, `Traverse`)              |
| `@eslint-react/core`   | React semantics: hook detection, component collection, `Children` API detection |
| `@eslint-react/jsx`    | JSX helpers: attribute reading, element type resolution                         |
| `@eslint-react/var`    | Variable resolution, assignment tracking                                        |
| `@eslint-react/shared` | Shared settings (`getSettingsFromContext`)                                      |
| `@eslint-react/eslint` | `RuleContext`, `RuleFeature`, `merge`                                           |

---

## 5. `react-web-api` Pattern: Two-Phase Collection

All `react-web-api` rules follow the same **collect-and-match** pattern:

1. **Identify phase** — Use `ComponentPhaseKind` (`"setup"` / `"cleanup"`) to know whether a function is a `useEffect` callback or its cleanup.
2. **Track function stack** — Use `:function` / `:function:exit` visitors to maintain a stack of enclosing functions.
3. **Collect calls** — In `CallExpression`, detect `addEventListener` / `removeEventListener`, `setTimeout` / `clearTimeout`, etc., and push entries into arrays.
4. **Validate on exit** — In `Program:exit`, iterate over collected entries and verify that every "add" has a matching "remove".
   Report unmatched entries with `context.report()`.

### Example structure

```ts
export function create(context: RuleContext<MessageID, []>) {
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const aEntries: AddEntry[] = [];
  const rEntries: RemoveEntry[] = [];

  return merge({
    [":function"](node: TSESTreeFunction) {
      fEntries.push({ kind: getPhaseKindOfFunction(node) ?? "other", node });
    },
    [":function:exit"]() {
      fEntries.pop();
    },
    CallExpression(node) {
      // Detect target calls and push to aEntries / rEntries
    },
    "Program:exit"() {
      // Match aEntries against rEntries and report mismatches
    },
  });
}
```

---

## 6. `react-x` Patterns

`react-x` rules are more varied:

### 6.1 Simple Check Rules

Detect a specific AST pattern and report immediately.

**Example:** `no-children-to-array`

- Uses `core.isChildrenToArray(context, node)` inside `MemberExpression`.
- Calls `context.report()` directly.

### 6.2 State-Tracking Rules

Maintain local flags across visitors.

**Example:** `no-missing-key`

- Tracks `inChildrenToArray` with a boolean.
- Resets it in `"CallExpression:exit"`.

### 6.3 Component-Collector Rules

Use `core.getFunctionComponentCollector(context)` to gather all React components.
Process them in bulk at `Program:exit`.

**Example:** `no-unstable-context-value`

```ts
const { api, visitor } = core.getFunctionComponentCollector(context);
return merge(visitor, {
  JSXOpeningElement(node) {/* collect unstable values */},
  "Program:exit"(program) {
    for (const { node: component } of api.getAllComponents(program)) {
      // Report per-component
    }
  },
});
```

### 6.4 CFG Rules

Use ESLint code-path analysis.

**Examples:** `exhaustive-deps`, `rules-of-hooks`

- Maintain `codePathSegmentStack` and `codePathReactHooksMapStack`.
- Hook calls are mapped to segments and validated when the code path ends.
- These files are ported from `eslint-plugin-react-hooks` and marked with `// @ts-nocheck`.

---

## 7. Testing Patterns

Tests use `@typescript-eslint/rule-tester` bound to **vitest**:

```ts
import { ruleTester } from "#/test";
import tsx from "dedent";
import rule, { RULE_NAME } from "./no-xxx";

ruleTester.run(RULE_NAME, rule, {
  invalid: [
    {
      code: tsx`
        function Example() {
          return <div />;
        }
      `,
      errors: [{ messageId: "default" }],
    },
  ],
  valid: [
    {
      code: tsx`
        function Example() {
          return <span />;
        }
      `,
    },
  ],
});
```

- Use the `tsx` template tag from `dedent` for multiline JSX code.
- Use `ruleTester` for basic tests and `ruleTesterWithTypes` for rules requiring type information.

---

## 8. Path Aliases

Both plugins share the same `tsconfig.json` aliases:

| Alias | Target                   |
| ----- | ------------------------ |
| `@/*` | `./src/*`                |
| `#/*` | `../../*` (project root) |

Use `@/` for internal plugin imports and `#/` for shared test utilities.

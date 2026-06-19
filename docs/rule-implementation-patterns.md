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

- `react-x` has 53 rules.
- `react-web-api` has 6 rules (all `no-leaked-*`).

---

## 2. `createRule` Utility

Both plugins export a thin wrapper around `ESLintUtils.RuleCreator`:

```ts
// src/utils/create-rule.ts
import { ESLintUtils } from "@typescript-eslint/utils";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/${ruleName}`;
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
```

`react-web-api` prefixes the rule name with `web-api-` in its `getDocsUrl` (e.g. `.../docs/rules/web-api-${ruleName}`).

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

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    // AST visitors
  };
}
```

### Conventions

- Always export `RULE_NAME`, `RULE_FEATURES`, and `MessageID`.
- A standalone rule returns a plain visitor object (`return { ... }`). Use `merge()` only to combine multiple visitor objects — most commonly a collector's `visitor` from `@eslint-react/core` with the rule's own visitors.
- Annotate `create` with the `RuleListener` return type.
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

All `react-web-api` rules follow the same **collect-and-match** pattern: a `:function` / `:function:exit` visitor pair keeps a stack of enclosing functions, each tagged with its lifecycle phase (`ComponentPhaseKind`: `"setup"` / `"cleanup"`), so that as traversal visits `CallExpression` nodes it can record "acquire" and "release" operations (e.g. `addEventListener` / `removeEventListener`, `setTimeout` / `clearTimeout`) into separate arrays annotated with that context; then at `Program:exit` it pairs each acquire against a compatible release and `context.report()`s the ones left unmatched — a resource acquired during setup but never released during cleanup.

### Example structure

```ts
export function create(context: RuleContext<MessageID, []>): RuleListener {
  const fEntries: { kind: FunctionKind; node: TSESTreeFunction }[] = [];
  const aEntries: AddEntry[] = [];
  const rEntries: RemoveEntry[] = [];

  return {
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
  };
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

- Tracks how deeply nested it is inside `Children.toArray()` calls with a `childrenToArrayDepth` counter (those calls assign keys automatically, so checks are skipped while the depth is greater than `0`).
- Increments the counter in `CallExpression` and decrements it in `"CallExpression:exit"`.

### 6.3 Component-Collector Rules

Use `core.getFunctionComponentCollector(context)` to gather all React components, then process them in bulk at `Program:exit`.

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
| `@`   | `./src`                  |
| `@/*` | `./src/*`                |
| `#`   | `../..` (project root)   |
| `#/*` | `../../*` (project root) |

Use `@/` for internal plugin imports and `#/` for shared test utilities (e.g. `import { ruleTester } from "#/test"`).

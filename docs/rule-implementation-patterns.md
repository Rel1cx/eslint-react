# Rule Implementation Patterns

Patterns used in `plugins/eslint-plugin-react-x` and `plugins/eslint-plugin-react-web-api`.

## Directory Structure

Each rule lives in its own folder:

```
src/rules/<rule-name>/
├── <rule-name>.ts       # Main rule implementation
├── <rule-name>.spec.ts  # Tests
└── lib.ts               # Optional helpers for complex rules
```

`react-x` has 53 rules. `react-web-api` has 6 rules (all `no-leaked-*`).

## `createRule` Utility

Both plugins wrap `ESLintUtils.RuleCreator`:

```ts
// src/utils/create-rule.ts
import { ESLintUtils } from "@typescript-eslint/utils";

const getDocsUrl = (ruleName: string) => `https://eslint-react.xyz/docs/rules/${ruleName}`;

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
```

`react-web-api` prefixes the rule name with `web-api-` in its URL.

## Rule File Template

A standard rule exports three things and calls `createRule`:

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

Conventions:

- Always export `RULE_NAME`, `RULE_FEATURES`, and `MessageID`.
- A standalone rule returns a plain visitor object. Use `merge()` only to combine multiple visitors — most commonly a collector's `visitor` from `@eslint-react/core` with the rule's own visitors.
- Annotate `create` with the `RuleListener` return type.
- Prefer exporting a named `create` function over an inline arrow function.

## Core Dependencies

| Package                | Purpose                                                                         |
| ---------------------- | ------------------------------------------------------------------------------- |
| `@eslint-react/ast`    | AST traversal, checks, extraction (`Check`, `Extract`, `Traverse`)              |
| `@eslint-react/core`   | React semantics: hook detection, component collection, `Children` API detection |
| `@eslint-react/jsx`    | JSX helpers: attribute reading, element type resolution                         |
| `@eslint-react/var`    | Variable resolution, assignment tracking                                        |
| `@eslint-react/shared` | Shared settings (`getSettingsFromContext`)                                      |
| `@eslint-react/eslint` | `RuleContext`, `RuleFeature`, `merge`                                           |

## `react-web-api` Pattern: Two-Phase Collection

All `react-web-api` rules use a **collect-and-match** pattern: a `:function` / `:function:exit` pair tracks the current function's lifecycle phase (`setup` / `cleanup`), `CallExpression` records acquire/release operations (e.g. `addEventListener` / `removeEventListener`), and `Program:exit` pairs them and reports unmatched acquires.

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

## `react-x` Patterns

| Pattern                   | Description                                                                      | Example                             |
| ------------------------- | -------------------------------------------------------------------------------- | ----------------------------------- |
| Simple check rules        | Detect an AST pattern and report immediately.                                    | `no-children-to-array`              |
| State-tracking rules      | Maintain local flags across visitors.                                            | `no-missing-key`                    |
| Component-collector rules | Use `core.getFunctionComponentCollector(context)` and process at `Program:exit`. | `no-unstable-context-value`         |
| CFG rules                 | Use ESLint code-path analysis.                                                   | `exhaustive-deps`, `rules-of-hooks` |

Component-collector example:

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

## Testing Patterns

Tests use `@typescript-eslint/rule-tester` bound to vitest:

```ts
import { ruleTester } from "#/testing/helpers";
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

Use `ruleTester` for basic tests and `ruleTesterWithTypes` for rules requiring type information.

## Path Aliases

Both plugins use `@/` for intra-package imports and `#/` for workspace-root test utilities. See [`path-aliases.md`](./path-aliases.md) for details.

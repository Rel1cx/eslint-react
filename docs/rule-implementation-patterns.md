# Rule Implementation Patterns

## Directory Structure

Each rule lives in its own folder:

```
src/rules/<rule-name>/
├── <rule-name>.ts       # Main rule implementation
├── <rule-name>.spec.ts  # Tests
├── <rule-name>.mdx      # Rule documentation
├── CHANGELOG.md         # Per-rule changelog
└── lib.ts               # Optional helpers for complex rules
```

Rules that correlate facts across the whole file (`globals`, `immutability`, `refs`) add a layered multi-file layout (`collect.ts` / `origins.ts` / `effects.ts` / `helpers.ts`) alongside the main `<rule-name>.ts`. See [`rule-implementation-patterns-fact-based.md`](./rule-implementation-patterns-fact-based.md). Rules ported from `eslint-plugin-react-hooks` may additionally carry `<rule-name>.spec.md` and `<rule-name>.spec.diff.md` files (and, for `exhaustive-deps` / `rules-of-hooks`, a `README.md` and `LICENSE`).

## `createRule` Utility

Every plugin that ships rules (all except the meta `eslint-plugin`) wraps `ESLintUtils.RuleCreator`:

```ts
// src/utils/create-rule.ts
import * as ESLintUtils from "@typescript-eslint/utils/eslint-utils";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/${ruleName}`;
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
```

All plugins except `react-x` prefix the rule name in the docs URL: `debug-`, `dom-`, `jsx-`, `naming-convention-`, `rsc-`, and `web-api-`.

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
| `@eslint-react/kit`    | Utilities for building custom React rules                                       |
| `@eslint-react/eslint` | `RuleContext`, `RuleFeature`, `merge`                                           |

## `react-x` Patterns

| Pattern                   | Description                                                                      | Example                     |
| ------------------------- | -------------------------------------------------------------------------------- | --------------------------- |
| Simple check rules        | Detect an AST pattern and report immediately.                                    | `no-children-to-array`      |
| State-tracking rules      | Maintain local flags across visitors.                                            | `no-missing-key`            |
| Component-collector rules | Use `core.getFunctionComponentCollector(context)` and process at `Program:exit`. | `no-unstable-context-value` |
| CFG rules                 | Use ESLint code-path analysis (`onCodePathStart` / segment events).              | `rules-of-hooks`            |

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

Use `ruleTester` for basic tests and `ruleTesterWithTypes` for rules requiring type information. For tests pinned to a specific JSX runtime, use `createRuleTesterForJsxEmit(ts.JsxEmit.ReactJSX)` instead of hand-rolling a `new RuleTester({...})`.

All of the above helpers live in the internal `@local/testkit` package (`.pkgs/testkit`) and are re-exported through `#/testing/helpers`, which is what plugin rule tests import (the scaffold script generates this import for new rules).

Package-level unit tests (`packages/*/src/*.test.ts`) import harnesses directly from `@local/testkit` instead of defining their own:

```ts
import { getFirstNodeOfType, parseCode, runCollector, runInRule } from "@local/testkit";

// Pure AST checks — parse a code string and pick nodes:
const node = getFirstNodeOfType<TSESTree.CallExpression>(code, AST.CallExpression);

// Context-dependent checks — run inside a real rule context:
const names = runInRule(code, (context, program) => {/* ... */});

// Collector checks — spread the collector's visitor, harvest via its api:
const hooks = runCollector(code, (context) => getHookCollector(context as never), (api, program) => api.getAllHooks(program));
```

## Path Aliases

All rule plugins use `@/` for intra-package imports and `#/` for workspace-root test utilities. See [`repo-path-aliases.md`](./repo-path-aliases.md) for details.

# @eslint-react/kit

ESLint React's toolkit for building custom React lint rules — inline, right inside your `eslint.config.ts`.

## Index

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [`defineConfig` (default export)](#defineconfig-default-export)
  - [`merge`](#merge)
  - [`Kit` — the toolkit object](#kit--the-toolkit-object)
    - [`kit.collect`](#kitcollect) — Semantic collectors
    - [`kit.is`](#kitis) — Predicates
    - [`kit.hint`](#kithint) — Detection hint bit-flags
    - [`kit.flag`](#kitflag) — Component characteristic flags
    <!--- [`kit.builtinHookNames`](#kitbuiltinhooknames) — Hook name list-->
- [Examples](#examples)
  - [Simple: Ban `Date.now`](#simple-ban-datenow)
  - [Component: Max component per file](#component-max-componoent-per-file)
  - [Hooks: Warn on custom hooks doesn't call other hooks](#hooks-warn-on-custom-hooks-doesnt-call-other-hooks)
  - [Multiple Collectors: No component/hook factories](#multiple-collectors-no-componenthook-factories)
- [More Examples](#more-examples)

## Installation

```sh
npm install --save-dev @eslint-react/kit
```

## Quick Start

```ts
// eslint.config.ts
import { defineConfig as defineReactConfig, merge } from "@eslint-react/kit";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{ts,tsx}"],
  extends: [
    defineReactConfig(
      {
        name: "function-component-definition",
        make: (ctx, kit) => {
          const { query, visitor } = kit.collect.components(ctx);

          return merge(
            visitor,
            {
              "Program:exit"(program) {
                for (const { node } of query.all(program)) {
                  if (node.type === "ArrowFunctionExpression") continue;
                  ctx.report({
                    node,
                    message: "Function components must be defined with arrow functions.",
                  });
                }
              },
            },
          );
        },
      },
    ),
  ],
});
```

## API Reference

### `defineConfig` (default export)

```ts
import { defineConfig as defineReactConfig } from "@eslint-react/kit";

defineReactConfig(...rules: RuleDefinition[]): Linter.Config
```

Creates an ESLint flat-config object from one or more custom rule definitions. Rules are registered under the `@eslint-react/kit` plugin namespace and enabled at `"error"` severity by default.

**`RuleDefinition`:**

| Field  | Type                         | Description                                                                      |
| ------ | ---------------------------- | -------------------------------------------------------------------------------- |
| `name` | `string`                     | Unique rule name. Used as `@eslint-react/kit/<name>` in config.                  |
| `make` | `(ctx, kit) => RuleListener` | Rule factory. Receives the ESLint rule context and the structured `Kit` toolkit. |

### `merge`

```ts
import { merge } from "@eslint-react/kit";

merge(...listeners: RuleListener[]): RuleListener
```

Merges multiple `RuleListener` (visitor) objects into a single listener. When two or more listeners define the same visitor key, the handlers are chained and execute in order.

This is essential for combining a collector's `visitor` with your own inspection logic.

### Kit — the toolkit object

The second argument to `make` is a structured `Kit` object:

```
kit
├── collect            -> Semantic collectors (components, hooks)
├── is                 -> All predicates (component, hook, React API, import source)
├── hint               -> Detection hint bit-flags
├── flag               -> Component characteristic bit-flags
└── builtinHookNames   -> Readonly list of React built-in hook names
```

---

#### `kit.collect`

Collector factories create a `{ query, visitor }` pair. The `visitor` must be merged into your rule listener via `merge()`. After traversal completes, `query.all(program)` yields all detected semantic nodes.

| Method                      | Returns                                               | Description                                                                             |
| --------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `components(ctx, options?)` | `CollectorWithContext<FunctionComponentSemanticNode>` | Detects function components. Options: `{ hint?: bigint, collectDisplayName?: boolean }` |
| `hooks(ctx)`                | `CollectorWithContext<HookSemanticNode>`              | Detects custom hook definitions.                                                        |

**`CollectorWithContext`** extends `Collector` with contextual queries:

| Query                | Description                               |
| -------------------- | ----------------------------------------- |
| `query.all(program)` | All collected semantic nodes in the file. |

---

#### `kit.is`

All predicates live under `kit.is` — organized into four sub-sections.

##### Component

| Predicate                   | Signature                 | Description                                                             |
| --------------------------- | ------------------------- | ----------------------------------------------------------------------- |
| `componentDefinition`       | `(node, hint) -> boolean` | Whether a function node is a component definition. (ctx pre-bound)      |
| `componentName`             | `(name) -> boolean`       | Strict PascalCase component name check.                                 |
| `componentNameLoose`        | `(name) -> boolean`       | Loose component name check.                                             |
| `componentWrapperCall`      | `(node) -> boolean`       | Whether a node is a `memo(…)` or `forwardRef(…)` call. (ctx pre-bound)  |
| `componentWrapperCallLoose` | `(node) -> boolean`       | Like above, but also matches `useCallback(…)`. (ctx pre-bound)          |
| `componentWrapperCallback`  | `(node) -> boolean`       | Whether a function is the callback passed to a wrapper. (ctx pre-bound) |

##### Hook

General hook predicates:

| Predicate                  | Signature                             | Description                                                  |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| `hook`                     | `(node) -> boolean`                   | Whether a function node is a hook (by name).                 |
| `hookCall`                 | `(node) -> boolean`                   | Whether a node is a hook call.                               |
| `hookName`                 | `(name) -> boolean`                   | Whether a string matches the `use[A-Z]` convention.          |
| `useEffectLikeCall`        | `(node, additionalHooks?) -> boolean` | Whether a node is a `useEffect`/`useLayoutEffect`-like call. |
| `useStateLikeCall`         | `(node, additionalHooks?) -> boolean` | Whether a node is a `useState`-like call.                    |
| `useEffectSetupCallback`   | `(node) -> boolean`                   | Whether a node is a useEffect setup function.                |
| `useEffectCleanupCallback` | `(node) -> boolean`                   | Whether a node is a useEffect cleanup function.              |

##### React API

Factory functions (ctx pre-bound):

| Predicate      | Signature                        | Description                                                              |
| -------------- | -------------------------------- | ------------------------------------------------------------------------ |
| `reactAPI`     | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API identifier. (ctx pre-bound) |
| `reactAPICall` | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API call. (ctx pre-bound)       |

Pre-built identifier predicates (ctx pre-bound):

`captureOwnerStack`, `childrenCount`, `childrenForEach`, `childrenMap`, `childrenOnly`, `childrenToArray`, `cloneElement`, `createContext`, `createElement`, `forwardRef`, `memo`, `lazy`

Pre-built call predicates (ctx pre-bound):

`captureOwnerStackCall`, `childrenCountCall`, `childrenForEachCall`, `childrenMapCall`, `childrenOnlyCall`, `childrenToArrayCall`, `cloneElementCall`, `createContextCall`, `createElementCall`, `forwardRefCall`, `memoCall`, `lazyCall`

All React API predicates and factories have `ctx` pre-bound — no need to pass the rule context manually:

```ts
// Direct check
kit.is.memo(node);
kit.is.memoCall(node);

// Useful in filter/find
nodes.filter(kit.is.memoCall);

// Factory for any API name
const isCreateRefCall = kit.is.reactAPICall("createRef");
isCreateRefCall(node);
```

##### Import source

| Predicate                    | Signature                                 | Description                                          |
| ---------------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `initializedFromReact`       | `(name, scope, importSource?) -> boolean` | Whether a variable comes from a React import.        |
| `initializedFromReactNative` | `(name, scope, importSource?) -> boolean` | Whether a variable comes from a React Native import. |

---

#### `kit.hint`

Bit-flags that control what the component collector considers a "component". Combine with bitwise OR (`|`) and remove with bitwise AND-NOT (`& ~`).

```ts
// The default hint used when none is specified
kit.hint.defaultComponent;

// All available flags
kit.hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;
kit.hint.component.DoNotIncludeFunctionDefinedAsClassMethod;
kit.hint.component.DoNotIncludeFunctionDefinedAsArrayMapCallback;
kit.hint.component.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
// … and more (inherits all JsxDetectionHint flags)
```

**Customization example:**

```ts
// Also treat object methods as components (remove the exclusion flag)
const hint = kit.hint.defaultComponent
  & ~kit.hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;

const { query, visitor } = kit.collect.components(ctx, { hint });
```

---

#### `kit.flag`

Bit-flags indicating component characteristics. Check with bitwise AND (`&`).

```ts
kit.flag.component.None; // 0n — no flags
kit.flag.component.Memo; // wrapped in React.memo
kit.flag.component.ForwardRef; // wrapped in React.forwardRef
```

**Usage:**

```ts
for (const component of query.all(program)) {
  if (component.flag & kit.flag.component.Memo) {
    // This component is memoized
  }
}
```

## Examples

### Simple: Ban `Date.now`

```ts
defineReactConfig({
  name: "no-date-now",
  make: (ctx) => ({
    CallExpression(node) {
      if (ctx.sourceCode.getText(node.callee) === "Date.now") {
        ctx.report({ node, message: "Don't use 'Date.now'." });
      }
    },
  }),
});
```

### Component: Max componoent per file

```ts
defineReactConfig({
  name: "max-component-per-file",
  make: (ctx, kit) => {
    const MAX = 1;
    const { query, visitor } = kit.collect.components(ctx);

    return merge(visitor, {
      "Program:exit"(program) {
        const comps = [...query.all(program)];
        if (comps.length <= MAX) return;
        for (const { node, name } of comps.slice(MAX)) {
          ctx.report({
            node,
            message: `There are ${comps.length} component definitions in this file. Maximum allowed is ${MAX}.`,
          });
        }
      },
    });
  },
});
```

### Hooks: Warn on custom hooks doesn't call other hooks

This is a simplified kit reimplementation of the built-in
[`react-x/no-unnecessary-use-prefix`](https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix) rule.

```ts
defineReactConfig({
  name: "no-unnecessary-use-prefix",
  make: (ctx, kit) => {
    const { query, visitor } = kit.collect.hooks(ctx);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node, hookCalls } of query.all(program)) {
          if (hookCalls.length === 0) {
            ctx.report({
              node,
              message: "A custom hook should use at least one hook, otherwise it's just a regular function.",
            });
          }
        }
      },
    });
  },
});
```

### Multiple Collectors: No component/hook factories

Disallow defining components or hooks inside other functions (factory pattern).
This is a simplified kit reimplementation of the built-in
[`react-x/component-hook-factories`](https://eslint-react.xyz/docs/rules/component-hook-factories) rule.

```ts
defineReactConfig({
  name: "component-hook-factories",
  make: (ctx, kit) => {
    const fc = kit.collect.components(ctx);
    const hk = kit.collect.hooks(ctx);

    return merge(
      fc.visitor,
      hk.visitor,
      {
        "Program:exit"(program) {
          const comps = fc.query.all(program);
          const hooks = hk.query.all(program);
          for (const { name, node, kind } of [...comps, ...hooks]) {
            if (name == null) continue;
            if (kit.find.parent(node, kit.is.function) == null) continue;
            ctx.report({
              node,
              message: `Don't define ${kind} "${name}" inside a function. Move it to the module level.`,
            });
          }
        },
      },
    );
  },
});
```

## More Examples

Please check the [Rule Recipes](https://eslint-react.xyz/docs/custom-rules#rule-recipes) in the documentation site.

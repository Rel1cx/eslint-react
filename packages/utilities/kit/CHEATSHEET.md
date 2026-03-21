# @eslint-react/kit — CHEATSHEET

> Toolkit for building custom React lint rules inside `eslint.config.ts`.

---

## Exports

| Export         | Description                                                        |
| -------------- | ------------------------------------------------------------------ |
| `defineConfig` | **(default)** Creates ESLint flat-config from rule definitions     |
| `merge`        | Merges multiple `RuleListener` objects, chaining same-key handlers |

---

## Scaffold

```ts
// eslint.config.ts
import defineReactConfig, { merge } from "@eslint-react/kit";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{ts,tsx}"],
  extends: [
    defineReactConfig(
      { name: "rule-name", make: (ctx, kit) => ({/* visitors */}) },
      // ...more rules
    ),
  ],
});
```

Rules register as `@eslint-react/kit/<name>` at `"error"` severity.

---

## `make(ctx, kit)` → `RuleListener`

- **`ctx`** — ESLint `RuleContext` (`ctx.report()`, `ctx.sourceCode`, etc.)
- **`kit`** — structured toolkit (see below)

---

## Kit Object Map

```
kit
├── collect                 # Semantic collectors
│   ├── components(ctx, options?)  → { query, visitor }
│   └── hooks(ctx)                 → { query, visitor }
├── is                      # Predicates (ctx pre-bound where noted)
│   ├── component*          # Component detection
│   ├── hook* / use*Call    # Hook detection & built-in hook calls
│   ├── reactAPI / reactAPICall    # React API factories
│   ├── <api> / <api>Call   # Pre-built React API predicates
│   └── initializedFrom*   # Import source checks
├── hint                    # Detection hint bit-flags
│   ├── component           # ComponentDetectionHint enum
│   └── defaultComponent    # Default bigint bitmask
└── flag                    # Component characteristic bit-flags
    └── component           # ComponentFlag enum
```

---

## Collectors — `kit.collect`

| Method                      | Yields                            | Options                                           |
| --------------------------- | --------------------------------- | ------------------------------------------------- |
| `components(ctx, options?)` | `FunctionComponentSemanticNode[]` | `{ hint?: bigint, collectDisplayName?: boolean }` |
| `hooks(ctx)`                | `HookSemanticNode[]`              | —                                                 |

**Pattern** — always `merge()` the collector's visitor:

```ts
const { query, visitor } = kit.collect.components(ctx);
return merge(visitor, {
  "Program:exit"(program) {
    for (const comp of query.all(program)) { /* ... */ }
  },
});
```

### `FunctionComponentSemanticNode`

| Field                                            | Type                            | Description                                  |
| ------------------------------------------------ | ------------------------------- | -------------------------------------------- |
| `node`                                           | `TSESTreeFunction`              | The function AST node                        |
| `id`                                             | `FunctionID`                    | Identifier / identifier sequence             |
| `name`                                           | `string \| null`                | Resolved component name                      |
| `kind`                                           | `"component"`                   | Literal                                      |
| `flag`                                           | `bigint`                        | `ComponentFlag` bits                         |
| `hint`                                           | `bigint`                        | Detection hint used                          |
| `key`                                            | `string`                        | Unique key                                   |
| `rets`                                           | `ReturnStatement["argument"][]` | Return expressions                           |
| `hookCalls`                                      | `CallExpression[]`              | Hook calls inside the component              |
| `displayName`                                    | `Expression \| null`            | Display name (if `collectDisplayName: true`) |
| `directives`                                     | `TSESTreeDirective[]`           | `"use client"`, `"use strict"`, etc.         |
| `initPath`                                       | `FunctionInitPath \| null`      | Initialization wrapper chain                 |
| `isExportDefault` / `isExportDefaultDeclaration` | `boolean`                       | Export status                                |

### `HookSemanticNode`

| Field        | Type               | Description           |
| ------------ | ------------------ | --------------------- |
| `node`       | `TSESTreeFunction` | The function AST node |
| `id`         | `FunctionID`       | Identifier            |
| `name`       | `string`           | Hook name             |
| `kind`       | `"hook"`           | Literal               |
| `hookCalls`  | `CallExpression[]` | Other hooks called    |
| `directives` | `StringLiteral[]`  | Directives            |
| `key`        | `string`           | Unique key            |
| `flag`       | `bigint`           | Flags                 |
| `hint`       | `bigint`           | Hint                  |

---

## Predicates — `kit.is`

### Component

| Predicate                   | Signature             | ctx-bound | Notes                                |
| --------------------------- | --------------------- | --------- | ------------------------------------ |
| `componentDefinition`       | `(node, hint) → bool` | ✓         | Is function a component definition?  |
| `componentName`             | `(name) → bool`       |           | Strict PascalCase                    |
| `componentNameLoose`        | `(name) → bool`       |           | Loose PascalCase                     |
| `componentWrapperCall`      | `(node) → bool`       | ✓         | `memo(…)` / `forwardRef(…)`          |
| `componentWrapperCallLoose` | `(node) → bool`       | ✓         | Above + `useCallback(…)`             |
| `componentWrapperCallback`  | `(node) → bool`       | ✓         | Is fn the callback inside a wrapper? |

### Hook

| Predicate                  | Signature                         | Notes                                |
| -------------------------- | --------------------------------- | ------------------------------------ |
| `hook`                     | `(node) → bool`                   | Function node is a hook (by name)    |
| `hookCall`                 | `(node) → bool`                   | Node is a hook call                  |
| `hookName`                 | `(name) → bool`                   | Matches `use[A-Z]…`                  |
| `useEffectLikeCall`        | `(node, additionalHooks?) → bool` | `useEffect` / `useLayoutEffect`-like |
| `useStateLikeCall`         | `(node, additionalHooks?) → bool` | `useState`-like                      |
| `useEffectSetupCallback`   | `(node) → bool`                   | Is useEffect setup fn?               |
| `useEffectCleanupCallback` | `(node) → bool`                   | Is useEffect cleanup fn?             |

### Built-in Hook Call Predicates

All `(node) → bool`:

`useCall` · `useActionStateCall` · `useCallbackCall` · `useContextCall` · `useDebugValueCall` · `useDeferredValueCall` · `useEffectCall` · `useFormStatusCall` · `useIdCall` · `useImperativeHandleCall` · `useInsertionEffectCall` · `useLayoutEffectCall` · `useMemoCall` · `useOptimisticCall` · `useReducerCall` · `useRefCall` · `useStateCall` · `useSyncExternalStoreCall` · `useTransitionCall`

### React API — Factories (ctx pre-bound)

| Factory        | Returns                     | Usage                                    |
| -------------- | --------------------------- | ---------------------------------------- |
| `reactAPI`     | `(node) → bool`             | `kit.is.reactAPI("createRef")(node)`     |
| `reactAPICall` | `(node) → node is CallExpr` | `kit.is.reactAPICall("createRef")(node)` |

### React API — Pre-built Predicates (ctx pre-bound)

**Identifier** (`(node) → bool`):
`captureOwnerStack` · `childrenCount` · `childrenForEach` · `childrenMap` · `childrenOnly` · `childrenToArray` · `cloneElement` · `createContext` · `createElement` · `createRef` · `forwardRef` · `memo` · `lazy`

**Call** (`(node) → node is CallExpression`):
`captureOwnerStackCall` · `childrenCountCall` · `childrenForEachCall` · `childrenMapCall` · `childrenOnlyCall` · `childrenToArrayCall` · `cloneElementCall` · `createContextCall` · `createElementCall` · `createRefCall` · `forwardRefCall` · `memoCall` · `lazyCall`

```ts
kit.is.memo(node); // identifier check
kit.is.memoCall(node); // call check
nodes.filter(kit.is.memoCall); // composable
const isRef = kit.is.reactAPICall("createRef"); // factory
```

### Import Source

| Predicate                    | Signature                             |
| ---------------------------- | ------------------------------------- |
| `initializedFromReact`       | `(name, scope, importSource?) → bool` |
| `initializedFromReactNative` | `(name, scope, importSource?) → bool` |

---

## Hints — `kit.hint`

Bit-flags controlling what the component collector treats as a "component". Combine with `|`, remove with `& ~`.

```ts
kit.hint.defaultComponent; // The default bitmask
kit.hint.component; // The ComponentDetectionHint enum object
```

### All Hint Flags

**JSX value exclusions** (inherited from `JsxDetectionHint`):

| Flag                                                | Bit    |
| --------------------------------------------------- | ------ |
| `DoNotIncludeJsxWithNullValue`                      | `0`    |
| `DoNotIncludeJsxWithNumberValue`                    | `1` ✓  |
| `DoNotIncludeJsxWithBigIntValue`                    | `2` ✓  |
| `DoNotIncludeJsxWithStringValue`                    | `3` ✓  |
| `DoNotIncludeJsxWithBooleanValue`                   | `4` ✓  |
| `DoNotIncludeJsxWithUndefinedValue`                 | `5` ✓  |
| `DoNotIncludeJsxWithEmptyArrayValue`                | `6`    |
| `DoNotIncludeJsxWithCreateElementValue`             | `7`    |
| `RequireAllArrayElementsToBeJsx`                    | `8` ✓  |
| `RequireBothSidesOfLogicalExpressionToBeJsx`        | `9` ✓  |
| `RequireBothBranchesOfConditionalExpressionToBeJsx` | `10` ✓ |

**Function context exclusions**:

| Flag                                                           | Bit    |
| -------------------------------------------------------------- | ------ |
| `DoNotIncludeFunctionDefinedAsClassMethod`                     | `11`   |
| `DoNotIncludeFunctionDefinedAsClassProperty`                   | `12`   |
| `DoNotIncludeFunctionDefinedAsObjectMethod`                    | `13`   |
| `DoNotIncludeFunctionDefinedAsArrayExpressionElement`          | `14` ✓ |
| `DoNotIncludeFunctionDefinedAsArrayPatternElement`             | `15` ✓ |
| `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`            | `16` ✓ |
| `DoNotIncludeFunctionDefinedAsArrayMapCallback`                | `17` ✓ |
| `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback` | `18` ✓ |

> ✓ = included in `defaultComponent`

```ts
// Example: also treat object methods as components
const hint = kit.hint.defaultComponent
  & ~kit.hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;
const { query, visitor } = kit.collect.components(ctx, { hint });
```

---

## Flags — `kit.flag`

Bit-flags on `FunctionComponentSemanticNode.flag`. Check with `&`.

```ts
kit.flag.component.None; // 0n
kit.flag.component.PureComponent; // 1n << 0n
kit.flag.component.CreateElement; // 1n << 1n
kit.flag.component.Memo; // 1n << 2n
kit.flag.component.ForwardRef; // 1n << 3n
```

```ts
if (comp.flag & kit.flag.component.Memo) { /* memoized */ }
```

---

## `merge(...listeners)` → `RuleListener`

Merges N visitor objects. Same-key handlers chain in order.

```ts
return merge(
  fc.visitor,
  hk.visitor,
  { "Program:exit"(prog) {/* your logic */} },
);
```

---

## Recipes

### Ban `forwardRef`

```ts
defineReactConfig({
  name: "no-forward-ref",
  make: (ctx, kit) => ({
    CallExpression(node) {
      if (kit.is.forwardRefCall(node)) {
        ctx.report({ node, message: "Don't use forwardRef — ref is a regular prop since React 19." });
      }
    },
  }),
});
```

### Max 1 component per file

```ts
defineReactConfig({
  name: "max-component-per-file",
  make: (ctx, kit) => {
    const { query, visitor } = kit.collect.components(ctx);
    return merge(visitor, {
      "Program:exit"(program) {
        const all = [...query.all(program)];
        for (const { node } of all.slice(1)) {
          ctx.report({ node, message: `Max 1 component per file (found ${all.length}).` });
        }
      },
    });
  },
});
```

### Warn on hooks that don't call other hooks

```ts
defineReactConfig({
  name: "no-unnecessary-use-prefix",
  make: (ctx, kit) => {
    const { query, visitor } = kit.collect.hooks(ctx);
    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node, hookCalls } of query.all(program)) {
          if (hookCalls.length === 0) {
            ctx.report({ node, message: "Custom hook calls no hooks — use a plain function." });
          }
        }
      },
    });
  },
});
```

### Multiple collectors (no component/hook factories)

```ts
defineReactConfig({
  name: "component-hook-factories",
  make: (ctx, kit) => {
    const fc = kit.collect.components(ctx);
    const hk = kit.collect.hooks(ctx);
    return merge(fc.visitor, hk.visitor, {
      "Program:exit"(program) {
        for (const { name, node, kind } of [...fc.query.all(program), ...hk.query.all(program)]) {
          if (name == null) continue;
          let p = node.parent;
          while (p && p.type !== "Program") {
            if (["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"].includes(p.type)) {
              ctx.report({ node, message: `Don't define ${kind} "${name}" inside a function.` });
              break;
            }
            p = p.parent;
          }
        }
      },
    });
  },
});
```

### Enforce arrow-function components

```ts
defineReactConfig({
  name: "arrow-component",
  make: (ctx, kit) => {
    const { query, visitor } = kit.collect.components(ctx);
    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node } of query.all(program)) {
          if (node.type !== "ArrowFunctionExpression") {
            ctx.report({ node, message: "Components must be arrow functions." });
          }
        }
      },
    });
  },
});
```

### Custom React API check via factory

```ts
const isCreateRefCall = kit.is.reactAPICall("createRef");
// ...
CallExpression(node) {
  if (isCreateRefCall(node)) {
    ctx.report({ node, message: "Use useRef instead of createRef." });
  }
}
```

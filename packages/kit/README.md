# @eslint-react/kit

## API Reference

### `eslintReactKit` (default export)

```ts
import eslintReactKit from "@eslint-react/kit";

eslintReactKit(): Builder
```

Creates a `Builder` instance for registering custom rules via the chainable `.use()` API.

### `RuleFunction`

```ts
import type { RuleFunction } from "@eslint-react/kit";

type RuleFunction = (context: RuleContext, toolkit: RuleToolkit) => RuleListener;
```

A function that receives the ESLint rule context and the structured `RuleToolkit` toolkit, and returns a `RuleListener` (AST visitor object).

Rules are defined as **named functions** that return a `RuleFunction`. The function name is automatically converted to kebab-case and used as the rule name under the `@eslint-react/kit` plugin namespace.

```ts
// Function name `noForwardRef` → rule name `no-forward-ref`
// Registered as `@eslint-react/kit/no-forward-ref`
function noForwardRef(): RuleFunction {
  return (context, { is }) => ({ ... });
}

// Functions that accept options work the same way
function forbidElements({ forbidden }: ForbidElementsOptions): RuleFunction {
  return (context) => ({ ... });
}
```

### `Builder`

```ts
interface Builder {
  use<F extends (...args: any[]) => RuleFunction>(factory: F, ...args: Parameters<F>): Builder;
  getConfig(): Linter.Config;
  getPlugin(): ESLint.Plugin;
}
```

A chainable builder for registering custom rules.

| Method      | Description                                                                                                                |
| ----------- | -------------------------------------------------------------------------------------------------------------------------- |
| `use`       | Registers a rule factory. The rule name is `kebabCase(factory.name)`. Options type is inferred from the factory signature. |
| `getConfig` | Returns a `Linter.Config` with all registered rules enabled at `"error"` severity.                                         |
| `getPlugin` | Returns an `ESLint.Plugin` containing the registered rules and plugin metadata.                                            |

#### `getConfig`

Returns a flat `Linter.Config` object with all registered rules set to `"error"`. This is a convenience wrapper that calls `getPlugin()` internally and adds the plugin plus rule entries to the config.

```ts
eslintReactKit()
  .use(noForwardRef) // no-arg factory
  .use(version, "19") // factory with inferred options
  .getConfig();
```

#### `getPlugin`

Returns an `ESLint.Plugin` object containing the registered rules and plugin metadata (`name` and `version`). Use this when you need finer-grained control over how the plugin is integrated into your ESLint configuration.

**eslint.config.ts**

```ts
const kit = eslintReactKit()
  .use(noForwardRef)
  .use(version, "19");

// Retrieve the raw plugin object
const plugin = kit.getPlugin();

// Use it in a custom flat config with your own namespace and severity
export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: plugin,
    },
    rules: {
      "react/version": "error",
      "react/no-forward-ref": "error",
    },
  },
];
```

### `merge`

```ts
import { merge } from "@eslint-react/kit";

merge(...listeners: RuleListener[]): RuleListener
```

Merges multiple `RuleListener` (visitor) objects into a single listener. When two or more listeners define the same visitor key, the handlers are chained and execute in order.

This is essential for combining a collector's `visitor` with your own inspection logic.

## `RuleToolkit` — the toolkit object

The second argument passed to the `RuleFunction` function is a structured `RuleToolkit` object:

```
kit
├── collect            -> Semantic collectors (components, hooks)
├── is                 -> All predicates (component, hook, React API, import source)
├── ast                -> AST utilities (unwrap type expressions)
├── hint               -> Detection hint bit-flags
├── flag               -> Component characteristic bit-flags
├── settings           -> Normalized ESLint React settings
```

---

### `collect`

Collector factories create a `{ query, visitor }` pair. The `visitor` must be merged into your rule listener via `merge()`. After traversal completes, `query.all(program)` yields all detected semantic nodes.

| Method                          | Returns                                               | Description                                                                             |
| ------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `components(context, options?)` | `CollectorWithContext<FunctionComponentSemanticNode>` | Detects function components. Options: `{ hint?: bigint, collectDisplayName?: boolean }` |
| `hooks(context)`                | `CollectorWithContext<HookSemanticNode>`              | Detects custom hook definitions.                                                        |

**`CollectorWithContext`** extends `Collector` with contextual queries:

| Query                | Description                               |
| -------------------- | ----------------------------------------- |
| `query.all(program)` | All collected semantic nodes in the file. |

---

### `is`

All predicates live under `kit.is` — organized into four sub-sections.

#### Component

| Predicate                  | Signature                 | Description                                                                 |
| -------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `componentDecl`            | `(node, hint) -> boolean` | Whether a function node is a component. (context pre-bound)                 |
| `componentName`            | `(name) -> boolean`       | Strict PascalCase component name check.                                     |
| `componentNameLoose`       | `(name) -> boolean`       | Loose component name check.                                                 |
| `componentWrapperCall`     | `(node) -> boolean`       | Whether a node is a `memo(…)` or `forwardRef(…)` call. (context pre-bound)  |
| `componentWrapperCallback` | `(node) -> boolean`       | Whether a function is the callback passed to a wrapper. (context pre-bound) |

#### Hook

General hook predicates:

| Predicate                  | Signature                             | Description                                                  |
| -------------------------- | ------------------------------------- | ------------------------------------------------------------ |
| `hookDecl`                 | `(node) -> boolean`                   | Whether a function node is a hook (by name).                 |
| `hookCall`                 | `(node) -> boolean`                   | Whether a node is a hook call.                               |
| `hookName`                 | `(name) -> boolean`                   | Whether a string matches the `use[A-Z]` convention.          |
| `useEffectLikeCall`        | `(node, additionalHooks?) -> boolean` | Whether a node is a `useEffect`/`useLayoutEffect`-like call. |
| `useStateLikeCall`         | `(node, additionalHooks?) -> boolean` | Whether a node is a `useState`-like call.                    |
| `useEffectSetupCallback`   | `(node) -> boolean`                   | Whether a node is a useEffect setup function.                |
| `useEffectCleanupCallback` | `(node) -> boolean`                   | Whether a node is a useEffect cleanup function.              |

#### React API

Factory functions (context pre-bound):

| Predicate | Signature                        | Description                                                                  |
| --------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `API`     | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API identifier. (context pre-bound) |
| `APICall` | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API call. (context pre-bound)       |

All React API predicates and factories have `context` pre-bound — no need to pass the rule context manually:

```ts
// Direct check
is.memoCall(node);

// Useful in filter/find
nodes.filter(is.memoCall);

// Factory for any API name
const isCreateRefCall = is.APICall("createRef");

// Returns true when the node is a call to `createRef`
isCreateRefCall(node);
```

#### Import source

| Predicate            | Signature                                 | Description                                          |
| -------------------- | ----------------------------------------- | ---------------------------------------------------- |
| `APIFromReact`       | `(name, scope, importSource?) -> boolean` | Whether a variable comes from a React import.        |
| `APIFromReactNative` | `(name, scope, importSource?) -> boolean` | Whether a variable comes from a React Native import. |

---

### `ast`

Low-level AST utilities for handling TypeScript-specific syntax.

| Method       | Signature                      | Description                                                                                                                                                                                                                                  |
| ------------ | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `findParent` | `(node, test) -> Node \| null` | Walks up the AST from the given node and returns the first ancestor that satisfies the predicate, stopping at `Program`. Returns `null` if no match is found.                                                                                |
| `unwrap`     | `(node) -> Node`               | Recursively strips TypeScript type-expression wrappers (`TSAsExpression`, `TSSatisfiesExpression`, `TSNonNullExpression`, `TSTypeAssertion`, `TSInstantiationExpression`) and `ChainExpression` from a node, returning the underlying value. |

---

### `hint`

Bit-flags that control what the component collector considers a "component". Combine with bitwise OR (`|`) and remove with bitwise AND-NOT (`& ~`).

```ts
// The default hint used when none is specified
hint.component.Default;

// All available flags
hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;
hint.component.DoNotIncludeFunctionDefinedAsClassMethod;
hint.component.DoNotIncludeFunctionDefinedAsArrayMapCallback;
hint.component.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback;
// … and more (inherits all JsxDetectionHint flags)
```

**Customization example:**

```ts
const { query, visitor } = collect.components(context, {
  // Also treat object methods as components (remove the exclusion flag)
  hint: hint.component.Default & ~hint.component.DoNotIncludeFunctionDefinedAsObjectMethod,
});
```

---

### `flag`

Bit-flags indicating component characteristics. Check with bitwise AND (`&`).

```ts
flag.component.None; // 0n — no flags
flag.component.Memo; // wrapped in React.memo
flag.component.ForwardRef; // wrapped in React.forwardRef
```

**Usage:**

```ts
for (const component of query.all(program)) {
  if (component.flag & flag.component.Memo) {
    // This component is memoized
  }
}
```

---

### `settings`

Exposes the normalized `react-x` settings from the ESLint shared configuration (`context.settings["react-x"]`). This lets your custom rules read and react to the same project-level settings used by the built-in rules.

| Property                | Type                                                    | Default     | Description                                               |
| ----------------------- | ------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| `version`               | `string`                                                | auto-detect | Resolved React version (e.g. `"19.2.7"`).                 |
| `importSource`          | `string`                                                | `"react"`   | The module React is imported from (e.g. `"@pika/react"`). |
| `compilationMode`       | `"infer" \| "annotation" \| "syntax" \| "all" \| "off"` | `"off"`     | The React Compiler compilation mode the project uses.     |
| `polymorphicPropName`   | `string \| null`                                        | `"as"`      | Prop name used for polymorphic components.                |
| `additionalStateHooks`  | `RegExpLike`                                            | —           | Pattern matching custom hooks treated as state hooks.     |
| `additionalEffectHooks` | `RegExpLike`                                            | —           | Pattern matching custom hooks treated as effect hooks.    |

`RegExpLike` is an object with a `test(s: string) => boolean` method (same interface as `RegExp`).

**Usage:**

```ts
import type { RuleFunction } from "@eslint-react/kit";

function version(major = "19"): RuleFunction {
  return (context, { settings }) => ({
    Program(program) {
      if (!settings.version.startsWith(`${major}.`)) {
        context.report({
          node: program,
          message: `This project requires React ${major}, but detected version ${settings.version}.`,
        });
      }
    },
  });
}
```

---

For full documentation, see [https://beta.eslint-react.xyz/docs/packages/kit](https://beta.eslint-react.xyz/docs/packages/kit).

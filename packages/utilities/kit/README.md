# @eslint-react/kit

ESLint React's toolkit for building custom React rules with JavasSript functions right inside your `eslint.config.ts`.

## Index

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [`eslintReactKit` (default export)](#eslintreactkit-default-export)
  - [`RuleDefinition`](#ruledefinition)
  - [`Builder`](#builder)
    - [`getConfig`](#getconfig)
    - [`getPlugin`](#getplugin)
  - [`merge`](#merge)
  - [`Kit` — the toolkit object](#kit--the-toolkit-object)
    - [`kit.collect`](#kitcollect) — Semantic collectors
    - [`kit.is`](#kitis) — Predicates
    - [`kit.hint`](#kithint) — Detection hint bit-flags
    - [`kit.flag`](#kitflag) — Component characteristic flags
    - [`kit.settings`](#kitsettings) — Normalized ESLint React settings
- [Examples](#examples)
  - [Simple: Ban `forwardRef`](#simple-ban-forwardref)
  - [Component: Destructure component props](#component-destructure-component-props)
  - [Hooks: Warn on custom hooks that don't call other hooks](#hooks-warn-on-custom-hooks-that-dont-call-other-hooks)
  - [Multiple Collectors: No component/hook factories](#multiple-collectors-no-componenthook-factories)
  - [Advanced Config: Using `getPlugin` for custom plugin namespace](#advanced-config-using-getplugin-for-custom-plugin-namespace)
- [More Examples](#more-examples)

## Installation

```sh
npm install --save-dev @eslint-react/kit@beta
```

## Quick Start

```ts
import eslintReact from "@eslint-react/eslint-plugin";
import eslintReactKit, { merge } from "@eslint-react/kit";
import type { RuleDefinition } from "@eslint-react/kit";
import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/** Enforce function declarations for function components. */
function functionComponentDefinition(): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);
    return merge(
      visitor,
      {
        "Program:exit"(program) {
          for (const { node } of query.all(program)) {
            if (node.type === "FunctionDeclaration") continue;
            context.report({
              node,
              message: "Function components must be defined with function declarations.",
            });
          }
        },
      },
    );
  };
}

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintReactKit()
        .use(functionComponentDefinition)
        .getConfig(),
    ],
  },
);
```

The rule name is derived automatically from the function name (`functionComponentDefinition` → `function-component-definition`), and registered as `@eslint-react/kit/function-component-definition` at `"error"` severity.

## API Reference

### `eslintReactKit` (default export)

```ts
import eslintReactKit from "@eslint-react/kit";

eslintReactKit(): Builder
```

Creates a `Builder` instance for registering custom rules via the chainable `.use()` API.

### `RuleDefinition`

```ts
import type { RuleDefinition } from "@eslint-react/kit";

type RuleDefinition = (ctx: RuleContext, kit: RuleToolkit) => RuleListener;
```

A rule definition is a function that receives the ESLint rule context and the structured `Kit` toolkit, and returns a `RuleListener` (AST visitor object).

Rules are defined as **named functions** that return a `RuleDefinition`. The function name is automatically converted to kebab-case and used as the rule name under the `@eslint-react/kit` plugin namespace.

```ts
// Function name `noForwardRef` → rule name `no-forward-ref`
// Registered as `@eslint-react/kit/no-forward-ref`
function noForwardRef(): RuleDefinition {
  return (context, { is }) => ({ ... });
}

// Functions that accept options work the same way
function forbidElements({ forbidden }: ForbidElementsOptions): RuleDefinition {
  return (context) => ({ ... });
}
```

### `Builder`

```ts
interface Builder {
  use<F extends (...args: any[]) => RuleDefinition>(factory: F, ...args: Parameters<F>): Builder;
  getConfig(options?: { files?: string[] }): Linter.Config;
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

Returns an `ESLint.Plugin` object containing the registered rules and plugin metadata (`name` and `version`). Use this when you need finer-grained control over how the plugin is integrated into your ESLint configuration — for example, when you want to choose the plugin namespace, set per-rule severities, or compose the plugin with other configs manually.

```ts
const kit = eslintReactKit()
  .use(noForwardRef);
  .use(version, "19")

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

### Kit — the toolkit object

The second argument passed to the `RuleDefinition` function is a structured `Kit` object:

```
kit
├── collect            -> Semantic collectors (components, hooks)
├── is                 -> All predicates (component, hook, React API, import source)
├── hint               -> Detection hint bit-flags
├── flag               -> Component characteristic bit-flags
├── settings           -> Normalized ESLint React settings
```

---

#### `kit.collect`

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

#### `kit.is`

All predicates live under `kit.is` — organized into four sub-sections.

##### Component

| Predicate                   | Signature                 | Description                                                                 |
| --------------------------- | ------------------------- | --------------------------------------------------------------------------- |
| `componentDefinition`       | `(node, hint) -> boolean` | Whether a function node is a component definition. (context pre-bound)      |
| `componentName`             | `(name) -> boolean`       | Strict PascalCase component name check.                                     |
| `componentNameLoose`        | `(name) -> boolean`       | Loose component name check.                                                 |
| `componentWrapperCall`      | `(node) -> boolean`       | Whether a node is a `memo(…)` or `forwardRef(…)` call. (context pre-bound)  |
| `componentWrapperCallLoose` | `(node) -> boolean`       | Like above, but also matches `useCallback(…)`. (context pre-bound)          |
| `componentWrapperCallback`  | `(node) -> boolean`       | Whether a function is the callback passed to a wrapper. (context pre-bound) |

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

Factory functions (context pre-bound):

| Predicate      | Signature                        | Description                                                                  |
| -------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `reactAPI`     | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API identifier. (context pre-bound) |
| `reactAPICall` | `(apiName) -> (node) -> boolean` | Factory: creates a predicate for a React API call. (context pre-bound)       |

Pre-built identifier predicates (context pre-bound):

- `captureOwnerStack`
- `childrenCount`
- `childrenForEach`
- `childrenMap`
- `childrenOnly`
- `childrenToArray`
- `cloneElement`
- `createContext`
- `createElement`
- `forwardRef`
- `memo`
- `lazy`

Pre-built call predicates (context pre-bound):

- `captureOwnerStackCall`
- `childrenCountCall`
- `childrenForEachCall`
- `childrenMapCall`
- `childrenOnlyCall`
- `childrenToArrayCall`
- `cloneElementCall`
- `createContextCall`
- `createElementCall`
- `forwardRefCall`
- `memoCall`
- `lazyCall`

All React API predicates and factories have `context` pre-bound — no need to pass the rule context manually:

```ts
// Direct check
is.memo(node);
is.memoCall(node);

// Useful in filter/find
nodes.filter(is.memoCall);

// Factory for any API name
const isCreateRefCall = is.reactAPICall("createRef");
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

#### `kit.flag`

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

#### `kit.settings`

Exposes the normalized `react-x` settings from the ESLint shared configuration (`context.settings["react-x"]`). This lets your custom rules read and react to the same project-level settings used by the built-in rules.

| Property                | Type                                                    | Default     | Description                                               |
| ----------------------- | ------------------------------------------------------- | ----------- | --------------------------------------------------------- |
| `version`               | `string`                                                | auto-detect | Resolved React version (e.g. `"19.2.4"`).                 |
| `importSource`          | `string`                                                | `"react"`   | The module React is imported from (e.g. `"@pika/react"`). |
| `compilationMode`       | `"infer" \| "annotation" \| "syntax" \| "all" \| "off"` | `"off"`     | The React Compiler compilation mode the project uses.     |
| `polymorphicPropName`   | `string \| null`                                        | `"as"`      | Prop name used for polymorphic components.                |
| `additionalStateHooks`  | `RegExpLike`                                            | —           | Pattern matching custom hooks treated as state hooks.     |
| `additionalEffectHooks` | `RegExpLike`                                            | —           | Pattern matching custom hooks treated as effect hooks.    |

`RegExpLike` is an object with a `test(s: string) => boolean` method (same interface as `RegExp`).

**Usage:**

```ts
import type { RuleDefinition } from "@eslint-react/kit";

function version(major = "19"): RuleDefinition {
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

## Examples

### Simple: Ban `forwardRef`

This is a simplified kit reimplementation of the built-in [`react-x/no-forwardRef`](https://beta.eslint-react.xyz/docs/rules/no-forward-ref) rule.

```ts
import type { RuleDefinition } from "@eslint-react/kit";

function noForwardRef(): RuleDefinition {
  return (context, { is }) => ({
    CallExpression(node) {
      if (is.forwardRefCall(node)) {
        context.report({ node, message: "forwardRef is deprecated in React 19. Pass ref as a prop instead." });
      }
    },
  });
}

// Usage
eslintReactKit()
  .use(noForwardRef)
  .getConfig();
```

### Component: Destructure component props

This is a simplified kit reimplementation of the built-in [`react-x/prefer-destructuring-assignment`](https://beta.eslint-react.xyz/docs/rules/prefer-destructuring-assignment) rule.

```ts
import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

function destructureComponentProps(): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.components(context);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node } of query.all(program)) {
          const [props] = node.params;
          if (props == null) continue;
          if (props.type !== "Identifier") continue;
          const propName = props.name;
          const propVariable = context.sourceCode.getScope(node).variables.find((v) => v.name === propName);
          const propReferences = propVariable?.references ?? [];
          for (const ref of propReferences) {
            const { parent } = ref.identifier;
            if (parent.type !== "MemberExpression") continue;
            context.report({
              message: "Use destructuring assignment for component props.",
              node: parent,
            });
          }
        }
      },
    });
  };
}

// Usage
eslintReactKit()
  .use(destructureComponentProps)
  .getConfig();
```

### Hooks: Warn on custom hooks that don't call other hooks

This is a simplified kit reimplementation of the built-in [`react-x/no-unnecessary-use-prefix`](https://beta.eslint-react.xyz/docs/rules/no-unnecessary-use-prefix) rule.

```ts
import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";

function noUnnecessaryUsePrefix(): RuleDefinition {
  return (context, { collect }) => {
    const { query, visitor } = collect.hooks(context);

    return merge(visitor, {
      "Program:exit"(program) {
        for (const { node, hookCalls } of query.all(program)) {
          if (hookCalls.length === 0) {
            context.report({
              node,
              message: "A custom hook should use at least one hook, otherwise it's just a regular function.",
            });
          }
        }
      },
    });
  };
}

// Usage
eslintReactKit()
  .use(noUnnecessaryUsePrefix)
  .getConfig();
```

### Multiple Collectors: No component/hook factories

Disallow defining components or hooks inside other functions (factory pattern).
This is a simplified kit reimplementation of the built-in [`react-x/component-hook-factories`](https://beta.eslint-react.xyz/docs/rules/component-hook-factories) rule.

```ts
import type { RuleDefinition } from "@eslint-react/kit";
import { merge } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/utils";

function findParent({ parent }: TSESTree.Node, test: (n: TSESTree.Node) => boolean): TSESTree.Node | null {
  if (parent == null) return null;
  if (test(parent)) return parent;
  if (parent.type === "Program") return null;
  return findParent(parent, test);
}

function isFunction({ type }: TSESTree.Node) {
  return type === "FunctionDeclaration" || type === "FunctionExpression" || type === "ArrowFunctionExpression";
}

function componentHookFactories(): RuleDefinition {
  return (context, { collect }) => {
    const fc = collect.components(context);
    const hk = collect.hooks(context);
    return merge(
      fc.visitor,
      hk.visitor,
      {
        "Program:exit"(program) {
          const comps = fc.query.all(program);
          const hooks = hk.query.all(program);
          for (const { name, node, kind } of [...comps, ...hooks]) {
            if (name == null) continue;
            if (findParent(node, isFunction) == null) continue;
            context.report({
              node,
              message: `Don't define ${kind} "${name}" inside a function. Move it to the module level.`,
            });
          }
        },
      },
    );
  };
}

// Usage
eslintReactKit()
  .use(componentHookFactories)
  .getConfig();
```

### Advanced Config: Using `getPlugin` for custom plugin namespace

Use `getPlugin()` when you want full control over the plugin namespace and rule severities instead of the all-in-one `getConfig()`.

```ts
import eslintReactKit from "@eslint-react/kit";
import type { RuleDefinition } from "@eslint-react/kit";

function version(major = "19"): RuleDefinition {
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

function noForwardRef(): RuleDefinition {
  return (context, { is }) => ({
    CallExpression(node) {
      if (is.forwardRefCall(node)) {
        context.report({ node, message: "forwardRef is deprecated in React 19." });
      }
    },
  });
}

const kit = eslintReactKit()
  .use(noForwardRef);
  .use(version, "19")

// Instead of kit.getConfig(), use kit.getPlugin() for full control:
const plugin = kit.getPlugin();

export default [
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      // Choose your own namespace
      react: plugin,
    },
    rules: {
      // Set individual severities
      "react/no-forward-ref": "error",
      "react/version": "error",
    },
  },
];
```

<!--## More Examples

Please check the [Rule Recipes](https://beta.eslint-react.xyz/docs/configuration/configure-custom-rules#rule-recipes) in the documentation site.-->

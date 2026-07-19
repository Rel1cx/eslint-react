# @eslint-react/kit

ESLint React's utility module for building custom React rules with JavaScript functions.

> [!WARNING]
> This module is currently in **beta**. APIs may change in future releases.

## Installation

```sh
npm install --save-dev @eslint-react/kit
```

## Quick Start

```ts title="eslint.config.ts"
import eslintReactKit, { merge } from "@eslint-react/kit";
import type { RuleFunction } from "@eslint-react/kit";
import { defineConfig } from "eslint/config";

/** Enforce function declarations for function components. */
function functionComponentDefinition(): RuleFunction {
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

export default defineConfig({
  files: ["**/*.{ts,tsx}"],
  extends: [
    eslintReactKit()
      .use(functionComponentDefinition)
      .getConfig(),
  ],
});
```

Rules are defined as **named functions** returning a `RuleFunction`. The function name is converted to kebab-case and registered under the `@eslint-react/kit` namespace (`functionComponentDefinition` → `@eslint-react/kit/function-component-definition`, enabled at `"error"` severity). Anonymous factories get a random hex name, which makes them impractical to disable via config or disable comments — useful for checks that must never be bypassed.

## API Overview

### `eslintReactKit()` (default export)

Creates a chainable `Builder` for registering custom rules:

| Method      | Description                                                                                                            |
| ----------- | ---------------------------------------------------------------------------------------------------------------------- |
| `use`       | Registers a rule factory. The rule name is `kebabCase(factory.name)`; options are inferred from the factory signature. |
| `getConfig` | Returns a flat `Linter.Config` with the plugin and all registered rules enabled at `"error"`.                          |
| `getPlugin` | Returns the raw `ESLint.Plugin` for full control over namespace and severities.                                        |

### `RuleFunction`

```ts
type RuleFunction = (context: RuleContext, toolkit: RuleToolkit) => RuleListener;
```

### `RuleToolkit`

The second argument passed to every rule function:

- `collect` — Semantic collectors (`components(context, options?)`, `hooks(context)`). Each returns a `{ query, visitor }` pair; merge the `visitor` into your listener and call `query.all(program)` after traversal (e.g. in `Program:exit`) to get the detected semantic nodes.
- `is` — All predicates, with rule context pre-bound: component checks (`componentDecl`, `componentName`, `componentWrapperCall`, …), hook checks (`hookCall`, `hookDecl`, `useEffectLikeCall`, …), and React API checks (`memoCall`, `createElementCall`, every built-in hook call, plus the `API(name)` / `APICall(name)` factories for arbitrary APIs).
- `ast` — Low-level AST utilities: `findParent(node, test)` walks up ancestors; `unwrap(node)` strips TS type-expression wrappers (`as`, `satisfies`, `!`, …) and `ChainExpression`.
- `hint` — Bit-flags controlling what the component collector treats as a component (`hint.component.Default`, …).
- `flag` — Bit-flags describing component characteristics (`flag.component.Memo`, `flag.component.ForwardRef`, …).
- `settings` — The normalized `react-x` shared settings (`version`, `importSource`, `additionalEffectHooks`, …), so custom rules react to the same project settings as the built-in rules.

### `merge`

```ts
merge(...listeners: RuleListener[]): RuleListener
```

Merges multiple visitor objects into one; handlers for the same visitor key are chained in order. Essential for combining collector `visitor`s with your own logic.

## Documentation

For full documentation, see [https://beta.eslint-react.xyz/docs/packages/kit](https://beta.eslint-react.xyz/docs/packages/kit).

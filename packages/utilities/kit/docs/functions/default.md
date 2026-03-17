[@eslint-react/kit](../README.md) / default

# Function: default()

```ts
function default(...rules: RuleDefinition[]): Config;
```

Creates an ESLint flat-config object from one or more custom rule definitions.

The returned config registers all rules under the `@eslint-react/kit` plugin
namespace and enables every rule at `"error"` severity by default.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`rules` | `RuleDefinition`[] | One or more RuleDef objects. |

## Returns

`Config`

An ESLint `Linter.Config` ready to be spread into / placed in `extends`.

## Example

```ts
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import eslintReactKit, { merge } from "@eslint-react/kit";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      eslintReactKit(
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
  },
);
```

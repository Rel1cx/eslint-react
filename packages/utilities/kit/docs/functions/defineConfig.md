[@eslint-react/kit](../README.md) / defineConfig

# Function: defineConfig()

```ts
function defineConfig(...rules: RuleDefinition[]): Config;
```

Creates an ESLint flat-config object from one or more custom rule definitions.

The returned config registers all rules under the `@eslint-react/kit` plugin
namespace and enables every rule at `"error"` severity by default.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| ...`rules` | `RuleDefinition`[] | One or more RuleDefinition objects. |

## Returns

`Config`

An ESLint `Linter.Config` ready to be spread into / placed in `extends`.

## Example

```ts
import { defineConfig as defineReactConfig, merge } from "@eslint-react/kit";
import { defineConfig } from "eslint/config";

export default defineConfig({
  files: ["**/*.{ts,tsx}"],
  extends: [
    defineReactConfig(
      {
        name: "no-large-components",
        make: (ctx, kit) => {
          const { query, visitor } = kit.collect.components(ctx);

          return merge(visitor, {
            "Program:exit"(program) {
              for (const component of query.all(program)) {
                const lines = component.node.loc.end.line - component.node.loc.start.line;
                if (lines > 100) {
                  ctx.report({
                    node: component.node,
                    message: `Component "${component.name}" is ${lines} lines long. Keep components under 100 lines.`,
                  });
                }
              }
            },
          });
        },
      },
    ),
  ],
});
```

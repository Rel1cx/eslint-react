# eslint-plugin-react-kit

ESLint React's ESLint plugin for building custom rules.

## Index

- [Index](#index)
- [Installation](#installation)
- [Write custom rules inline](#write-custom-rules-inline)
- [Or import custom rules from modules](#or-import-custom-rules-from-modules)
- [Define multiple custom plugins with different prefixes](#define-multiple-custom-plugins-with-different-prefixes)
- [Example: Enforce function components to be defined with arrow functions with component detection hint customization and auto-fix with suggestions](#example-enforce-function-components-to-be-defined-with-arrow-functions-with-component-detection-hint-customization-and-auto-fix-with-suggestions)
- [More Examples](#more-examples)

## Installation

```sh
# npm
npm install --save-dev eslint-plugin-react-kit
```

## Write custom rules inline

```ts
// eslint.config.ts
import js from "@eslint/js";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-kit";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      local: definePlugin([
        {
          name: "no-date-now",
          make: (ctx) => {
            return {
              CallExpression(node) {
                if (ctx.sourceCode.getText(node.callee) === "Date.now") {
                  ctx.report({
                    node,
                    message: "Don't use 'Date.now'.",
                  });
                }
              },
            };
          },
        },
      ]),
    },
    rules: {
      "local/no-date-now": "error",
    },
  },
);
```

## Or import custom rules from modules

```ts
// no-date-now.ts

import type { Rule } from "eslint";
import type { CustomRuleDefinition } from "eslint-plugin-react-kit";

export function noDateNow(options?: { enableAutoFix?: boolean; enableSuggest?: boolean }): CustomRuleDefinition {
  const { enableAutoFix = false, enableSuggest = false } = options ?? {};
  return (ctx) => {
    return {
      CallExpression(node) {
        if (ctx.sourceCode.getText(node.callee) !== "Date.now") return;
        function fix(fixer: Rule.RuleFixer) {
          return fixer.replaceText(node, "Temporal.Now");
        }
        ctx.report({
          node,
          message: "Avoid using 'Date.now'; Use 'Temporal.Now' instead.",
          ...enableAutoFix ? { fix } : {},
          ...enableSuggest ? { suggest: [{ fix, desc: "Replace with 'Temporal.Now'." }] } : {},
        });
      },
    };
  };
}
```

```ts
// eslint.config.ts

import { definePlugin } from "eslint-plugin-react-kit";
import { defineConfig } from "eslint/config";

import { noDateNow } from "./no-date-now.ts";

export default defineConfig(
  {
    files: ["**/*.ts"],
    plugins: {
      local: definePlugin([
        {
          name: "no-date-now",
          make: noDateNow({
            enableAutoFix: true,
            enableSuggest: true,
          }),
        },
      ]),
    },
  },
);
```

## Define multiple custom plugins with different prefixes

```ts
// eslint.config.ts
import js from "@eslint/js";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-kit";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      "local-a": definePlugin([
        {
          name: "rule-1",
          make: (ctx) => {
            // ...
          },
        },
      ]),
      "local-b": definePlugin([
        {
          name: "rule-2",
          make: (ctx) => {
            // ...
          },
        },
      ]),
    },
    rules: {
      "local-a/rule-1": "error",
      "local-b/rule-2": "error",
    },
  },
);
```

## Example: Enforce function components to be defined with arrow functions with component detection hint customization and auto-fix with suggestions

```ts
// eslint.config.ts

import js from "@eslint/js";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-kit";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
    ],
    plugins: {
      local: definePlugin([
        {
          name: "function-component-definition",
          // The make function is called with the rule context and a toolkit that provides utilities to analyze React-specific code patterns.
          make: (ctx, kit) => {
            // The toolkit provides a default hint for component detection,
            // but you can customize it by using bitwise operations to include or exclude certain patterns.
            // Here we also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = kit.DEFAULT_COMPONENT_DETECTION_HINT
              & ~kit.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Collect all function components detected in the file with the customized hint.
            const { api, visitor } = kit.getComponentCollector(ctx, { hint });

            // Merge two or more visitors into a single visitor by using defineRuleListener.
            return defineRuleListener(
              visitor,
              {
                "Program:exit"(program) {
                  for (const { node } of api.getAllComponents(program)) {
                    if (node.type === "ArrowFunctionExpression") continue;
                    ctx.report({
                      node,
                      message: "Function components must be defined with arrow functions.",
                      suggest: [
                        {
                          desc: "Convert to arrow function.",
                          fix(fixer) {
                            const src = ctx.sourceCode;
                            if (node.generator) return null;
                            const prefix = node.async ? "async " : "";
                            const typeParams = node.typeParameters ? src.getText(node.typeParameters) : "";
                            const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                            const returnType = node.returnType ? src.getText(node.returnType) : "";
                            const body = src.getText(node.body);

                            // function Foo(params) { ... } → const Foo = (params) => { ... };
                            if (node.type === "FunctionDeclaration" && node.id) {
                              // dprint-ignore
                              return fixer.replaceText(node, `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`);
                            }

                            // { Foo(params) { ... } } → { Foo: (params) => { ... } }
                            if (node.type === "FunctionExpression" && node.parent.type === "Property") {
                              // dprint-ignore
                              return fixer.replaceText(node.parent, `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`);
                            }

                            return null;
                          },
                        },
                      ],
                    });
                  }
                },
              },
            );
          },
        },
      ]),
    },
    rules: {
      "local/function-component-definition": "error",
    },
  },
);
```

### ❌ Invalid

```tsx
// Function declaration
function MyComponent() {
  return <div>Hello</div>;
}
```

```tsx
// Function expression
const MyComponent = function() {
  return <div>Hello</div>;
};
```

```tsx
// Components defined as object methods are also considered function components
// because we removed the default hint that excludes them.
const MDXComponents = {
  Callout({ children }: { children: React.ReactNode }) {
    // ^^^ Function components must be defined with arrow functions.
    return <div>{children}</div>;
  },
};
```

### ✅ Valid

```tsx
// Arrow function expression
const MyComponent = () => {
  return <div>Hello</div>;
};
```

```tsx
// Arrow function with implicit return
const MyComponent = () => <div>Hello</div>;
```

```tsx
// Object method defined as an arrow function is also valid.
const MDXComponents = {
  Callout: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
};
```

## More Examples

Please check the [Rule Recipes](https://eslint-react.xyz/docs/custom-rules#rule-recipes) in the documentation site.

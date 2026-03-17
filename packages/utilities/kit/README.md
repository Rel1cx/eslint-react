# @eslint-react/kit

ESLint React's ESLint plugin for building custom rules.

## Index

- [Index](#index)
- [Installation](#installation)
- [Write custom rules inline](#write-custom-rules-inline)
- [Example: Enforce function components to be defined with arrow functions with component detection hint customization and auto-fix with suggestions](#example-enforce-function-components-to-be-defined-with-arrow-functions-with-component-detection-hint-customization-and-auto-fix-with-suggestions)
- [More Examples](#more-examples)

## Installation

```sh
# npm
npm install --save-dev @eslint-react/kit
```

## Write custom rules inline

```ts
// eslint.config.ts
import eslintReactKit from "@eslint-react/kit";
import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReactKit(
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
      ),
    ],
  },
);
```

## Example: Enforce function components to be defined with arrow functions with component detection hint customization and auto-fix with suggestions

```ts
// eslint.config.ts
import eslintReactKit, { merge } from "@eslint-react/kit";
import eslintJs from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReactKit(
        {
          name: "function-component-definition",
          meta: {
            fixable: "code",
            hasSuggestions: true,
          },
          // Use `kit` parameter to access detection hints
          make: (ctx, kit) => {
            // Customize component detection:
            // Also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = kit.hint.defaultComponent
              & ~kit.hint.component.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Create a collector with the customized hint.
            const { query, visitor } = kit.collect.components(ctx, { hint });

            // Merge the collector's visitor with inspection logic.
            return merge(
              visitor,
              {
                "Program:exit"(program) {
                  for (const { node } of query.all(program)) {
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
      ),
    ],
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

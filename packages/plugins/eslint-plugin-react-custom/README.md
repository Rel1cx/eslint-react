# eslint-plugin-react-custom

This plugin provides a powerful API to define your own rules with customizable component detection logic, so you can enforce your team's best practices and coding standards in a way that fits your codebase perfectly.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-custom
```

## Setup

```ts
import js from "@eslint/js";
import { definePlugin, defineRuleListener } from "eslint-plugin-react-custom";
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
      "react-custom": definePlugin([
        {
          name: "function-component-definition",
          make: (context, toolkit) => {
            // Customize component detection with ComponentDetectionHint.
            // Here we also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedAsObjectMethod from the default hint.
            const hint = toolkit.DEFAULT_COMPONENT_DETECTION_HINT
              & ~toolkit.ComponentDetectionHint.DoNotIncludeFunctionDefinedAsObjectMethod;

            // Collect all function components detected in the file with the customized hint.
            const { ctx, visitor } = toolkit.useComponentCollector(context, { hint });

            // Merge two or more visitors into a single visitor by using defineRuleListener.
            return defineRuleListener(visitor, {
              "Program:exit"(program) {
                for (const { node } of ctx.getAllComponents(program)) {
                  if (node.type === "ArrowFunctionExpression") continue;
                  context.report({
                    node,
                    message: "Function components must be defined with arrow functions.",
                    fix(fixer) {
                      const src = context.sourceCode;
                      if (node.generator) return null;
                      const prefix = node.async ? "async " : "";
                      const typeParams = node.typeParameters ? src.getText(node.typeParameters) : "";
                      const params = `(${node.params.map((p) => src.getText(p)).join(", ")})`;
                      const returnType = node.returnType ? src.getText(node.returnType) : "";
                      const body = src.getText(node.body);

                      // function Foo(params) { ... } -> const Foo = (params) => { ... };
                      if (node.type === "FunctionDeclaration" && node.id) {
                        return fixer.replaceText(
                          node,
                          `const ${node.id.name} = ${prefix}${typeParams}${params}${returnType} => ${body};`,
                        );
                      }

                      // { Foo(params) { ... } } -> { Foo: (params) => { ... } }
                      if (node.type === "FunctionExpression" && node.parent.type === "Property") {
                        return fixer.replaceText(
                          node.parent,
                          `${src.getText(node.parent.key)}: ${prefix}${typeParams}${params}${returnType} => ${body}`,
                        );
                      }

                      return null;
                    },
                  });
                }
              },
            });
          },
        },
      ]),
    },
    rules: {
      "react-custom/function-component-definition": "error",
    },
  },
);
```

### Examples of **incorrect** code:

```tsx
import React from "react";

function MyComponent() {
  //     ^^^ Function components must be defined with arrow functions.
  return <div />;
}

// Components defined as object methods are also considered function components because we removed the default hint that excludes them.
const MDXComponents = {
  Callout({ children }: { children: React.ReactNode }) {
    // ^^^ Function components must be defined with arrow functions.
    return <div>{children}</div>;
  },
};
```

### Examples of **correct** code:

```tsx
const MyComponent = () => <div />;

const MDXComponents = {
  Callout: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
};
```

## Rules

There are no rules in this plugin. Use the `definePlugin` function to create your own rules for whatever patterns you want to enforce in your codebase.

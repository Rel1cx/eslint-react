# eslint-plugin-react-kit

This plugin provides a powerful API to define your own rules with customizable component detection logic, so you can enforce your team's best practices and coding standards in a way that fits your codebase perfectly.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-kit
```

## Setup

The following example shows how to set up a simple `jsx-boolean-value` rule that enforces shorthand syntax for boolean JSX attributes (ex: `<input disabled />` instead of `<input disabled={true} />`).

```ts
import js from "@eslint/js";
import { definePlugin } from "eslint-plugin-react-kit";
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
      "react-kit": definePlugin([
        {
          name: "jsx-boolean-value",
          make: (ctx) => ({
            JSXAttribute(node) {
              const { value } = node;
              // Skip if the attribute has no value (ex: `<input disabled />`)
              if (value == null) return;
              // Skip if the value is not a JSX expression container (ex: `<input disabled="true" />`)
              if (value.type !== "JSXExpressionContainer") return;
              // Skip if the value is not a literal `true` (ex: `<input disabled={false} />` or `<input disabled={someVar} />`)
              if (value.expression.type !== "Literal" || value.expression.value !== true) return;
              // Report if the value is a literal `true`, and provide a fixer to remove the `={true}` part.
              ctx.report({
                node,
                message: `Omit the \`={true}\` for boolean attribute '${ctx.sourceCode.getText(node.name)}'.`,
                fix: (fixer) => fixer.removeRange([node.name.range[1], value.range[1]]),
              });
            },
          }),
        },
      ]),
    },
    rules: {
      // Use the rule defined in the plugin.
      "react-kit/jsx-boolean-value": "warn",
    },
  },
);
```

### Incorrect

```tsx
<input disabled={true} />
//     ^^^^^^^^^^^^^^^ Omit the `={true}` for boolean attribute 'disabled'.

<Dialog open={true} />
//     ^^^^^^^^^^^^ Omit the `={true}` for boolean attribute 'open'.
```

### Correct

```tsx
<input disabled />

<Dialog open />
```

## Example

Another example that enforces the use of fragment component (ex: `<Fragment>...</Fragment>` instead of `<>...</>`).

```ts
import js from "@eslint/js";
import { definePlugin } from "eslint-plugin-react-kit";
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
      "react-kit": definePlugin([
        {
          name: "jsx-fragment-syntax",
          make: (ctx, kit) => {
            const { jsxFragmentFactory } = {
              ...kit.getJsxConfigFromContext(ctx),
              ...kit.getJsxConfigFromAnnotation(ctx),
            };
            return {
              JSXFragment(node) {
                const opening = `<${jsxFragmentFactory}>`;
                const closing = `</${jsxFragmentFactory}>`;
                ctx.report({
                  node,
                  message:
                    `Use fragment component instead of fragment syntax (ex: '${opening}...${closing}' instead of '<>...</>').`,
                  fix(fixer) {
                    return [
                      fixer.replaceText(node.openingFragment, opening),
                      fixer.replaceText(node.closingFragment, closing),
                    ];
                  },
                });
              },
            };
          },
        },
      ]),
    },
    rules: {
      // Use the rule defined in the plugin.
      "react-kit/jsx-fragment-syntax": "warn",
    },
  },
);
```

### Incorrect

```tsx
function MyComponent() {
  return (
    <>
      <button />
      <button />
    </>
  );
}
```

### Correct

```tsx
import { Fragment } from "react";

function MyComponent() {
  return (
    <Fragment>
      //^^^^^ Use fragment shorthand syntax instead of 'Fragment' component.
      <button />
      <button />
    </Fragment>
  );
}
```

## Advanced Example

A more advanced example that uses the toolkit's `getComponentCollector` and `ComponentDetectionHint` to enforce that all function components are defined with arrow functions.

```ts
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
      "react-kit": definePlugin([
        {
          name: "function-component-definition",
          make: (ctx, kit) => {
            // Customize component detection with ComponentDetectionHint.
            // Here we also treat functions defined on object methods as components,
            // by removing DoNotIncludeFunctionDefinedOnObjectMethod from the default hint.
            const hint = kit.DEFAULT_COMPONENT_DETECTION_HINT
              & ~kit.ComponentDetectionHint.DoNotIncludeFunctionDefinedOnObjectMethod;

            // Collect all function components detected in the file with the customized hint.
            const { api, visitor } = kit.getComponentCollector(context, { hint });

            // Merge two or more visitors into a single visitor by using defineRuleListener.
            return defineRuleListener(visitor, {
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
                          // TODO: Implement a fixer that converts the function component to an arrow function.
                        },
                      },
                    ],
                  });
                }
              },
            });
          },
        },
      ]),
    },
    rules: {
      // Use the rule defined in the plugin.
      "react-kit/function-component-definition": "error",
    },
  },
);
```

### Incorrect

```tsx
import React from "react";

function MyComponent() {
  //     ^^^ Function components must be defined with arrow functions.
  return <div />;
}

// Components defined as object methods are also considered function components
// because we removed the default hint that excludes them.
const MDXComponents = {
  Callout({ children }: { children: React.ReactNode }) {
    // ^^^ Function components must be defined with arrow functions.
    return <div>{children}</div>;
  },
};
```

### Correct

```tsx
import React from "react";

const MyComponent = () => <div />;

const MDXComponents = {
  Callout: ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
  },
};
```

## Rules

There are no built-in rules in this plugin. Use the `definePlugin` function to create your own rules for whatever patterns you want to enforce in your codebase.

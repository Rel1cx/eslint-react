---
title: custom-rules-of-props
description: Custom rules for validating JSX props — duplicate props, mixing controlled/uncontrolled props, and explicit spread props.
---

## Overview

This recipe contains three custom rules for validating JSX props:

1. **`noDuplicateProps`** — Reports when the same prop appears more than once on a JSX element.
2. **`noExplicitSpreadProps`** — Reports when an object literal is spread onto a JSX element instead of writing each property as a separate prop. Includes auto-fix.
3. **`noMixingControlledAndUncontrolledProps`** — Reports when both a controlled prop and its uncontrolled counterpart appear on the same element.

## Rule Definitions

Copy the following into your project (e.g. `eslint.config.rules.ts`):

### noDuplicateProps

Reports when the same prop appears more than once on a JSX element. Only the last occurrence takes effect — earlier values are silently discarded. This is almost always a mistake, typically from copy-paste errors or merge conflict leftovers.

Spread attributes are intentionally ignored because overriding a spread prop with an explicit prop is a common and valid pattern.

```ts title="eslint.config.rules.ts"
import type { RuleDefinition } from "@eslint-react/kit";

/** Disallow duplicate props on JSX elements. */
export function noDuplicateProps(): RuleDefinition {
  return (context) => {
    function getPropName(
      attribute: { name: { type: string; namespace?: { name: string }; name: string | { name: string } } },
    ): string {
      if (attribute.name.type === "JSXNamespacedName") {
        const ns = attribute.name.namespace as { name: string };
        const local = attribute.name.name as { name: string };
        return `${ns.name}:${local.name}`;
      }
      return attribute.name.name as string;
    }

    return {
      JSXOpeningElement(node) {
        const seen = new Map<string, boolean>();

        for (const attribute of node.attributes) {
          if (attribute.type === "JSXSpreadAttribute") continue;

          const propName = getPropName(attribute);

          if (seen.has(propName)) {
            context.report({
              node: attribute,
              message: `Prop \`${propName}\` is specified more than once. Only the last one will take effect.`,
            });
          }

          seen.set(propName, true);
        }
      },
    };
  };
}
```

### noExplicitSpreadProps

Reports when an object literal is spread directly onto a JSX element. The spread is unnecessary — each property of the object can be written as a separate JSX attribute instead. This improves readability and makes it easier to see which props an element receives at a glance.

Only plain object literals are flagged. Conditional expressions, variables, and other non-literal spreads are left untouched because they serve a legitimate purpose (e.g. conditionally applying a group of props).

```ts title="eslint.config.rules.ts"
import type { RuleDefinition } from "@eslint-react/kit";

/** Disallow spreading object literals in JSX — write each property as a separate prop. */
export function noExplicitSpreadProps(): RuleDefinition {
  return (context) => ({
    JSXSpreadAttribute(node) {
      if (node.argument.type === "ObjectExpression") {
        context.report({
          node,
          message: "Don't spread an object literal in JSX. Write each property as a separate prop instead.",
        });
      }
    },
  });
}
```

### noMixingControlledAndUncontrolledProps

Reports when both a controlled prop and its uncontrolled counterpart appear on the same JSX element. Mixing both modes is a mistake — React will silently ignore the `default*` prop and may emit a console warning, leading to confusing bugs.

Only well-known React prop pairs are checked:

| Controlled | Uncontrolled     |
| ---------- | ---------------- |
| `value`    | `defaultValue`   |
| `checked`  | `defaultChecked` |

```ts title="eslint.config.rules.ts"
import type { RuleDefinition } from "@eslint-react/kit";

const CONTROLLED_PAIRS: [controlled: string, uncontrolled: string][] = [
  ["value", "defaultValue"],
  ["checked", "defaultChecked"],
];

/** Disallow using controlled and uncontrolled props on the same element. */
export function noMixingControlledAndUncontrolledProps(): RuleDefinition {
  return (context) => ({
    JSXOpeningElement(node) {
      const props = new Set<string>();

      for (const attr of node.attributes) {
        if (attr.type === "JSXSpreadAttribute") continue;
        if (attr.name.type === "JSXNamespacedName") continue;
        props.add(attr.name.name);
      }

      for (const [controlled, uncontrolled] of CONTROLLED_PAIRS) {
        if (!props.has(controlled) || !props.has(uncontrolled)) continue;

        const attrNode = node.attributes.find(
          (a) =>
            a.type === "JSXAttribute"
            && a.name.type !== "JSXNamespacedName"
            && a.name.name === uncontrolled,
        )!;

        context.report({
          node: attrNode,
          message:
            `'${controlled}' and '${uncontrolled}' should not be used together. Use either controlled or uncontrolled mode, not both.`,
        });
      }
    },
  });
}
```

## Usage

```ts title="eslint.config.ts"
import eslintReactKit from "@eslint-react/kit";
import { noDuplicateProps, noExplicitSpreadProps, noMixingControlledAndUncontrolledProps } from "./eslint.config.rules";

export default [
  // ... other configs
  {
    ...eslintReactKit()
      .use(noDuplicateProps)
      .use(noExplicitSpreadProps)
      .use(noMixingControlledAndUncontrolledProps)
      .getConfig(),
    files: ["src/**/*.tsx"],
  },
];
```

## Examples

### noDuplicateProps

#### Invalid

```tsx
<div id="a" id="b" />;
```

```tsx
<div on:click={handleA} on:click={handleB} />;
```

#### Valid

```tsx
<div id="a" className="b" />;
```

```tsx
<div id="a" {...props} />;
```

### noExplicitSpreadProps

#### Invalid

```tsx
<MyComponent {...{ foo, bar, baz }} />;
```

```tsx
<input {...{ disabled: true, readOnly: true }} />;
```

#### Valid

```tsx
<div {...props} />;
```

```tsx
<Comp {...(cond ? { a: "b" } : {})} />;
```

### noMixingControlledAndUncontrolledProps

#### Invalid

```tsx
<input value={name} defaultValue="World" />;
```

```tsx
<input type="checkbox" checked={isChecked} defaultChecked />;
```

#### Valid

```tsx
<input value={name} onChange={handleChange} />;
```

```tsx
<input defaultValue="World" />;
```

## Further Reading

- [React Docs: Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component)
- [React Docs: Controlled and uncontrolled components](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components)

---

## See Also

- [`custom-rules-of-state`](./custom-rules-of-state)\
  Custom rules for validating state usage — prefer updater function form in useState setters.

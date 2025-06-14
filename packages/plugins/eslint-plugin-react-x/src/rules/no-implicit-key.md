---
title: no-implicit-key
---

<Callout type="warning">This rule is experimental and may change in the future or be removed. It is not recommended to use it in production code at this time.</Callout>

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-implicit-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-implicit-key
```

**Features**

`🧪`

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).

This makes it hard to see if the key was passed correctly to the element or where it came from.

And it's also be proposed to be deprecated is this RFC: [Deprecate spreading key from objects](https://github.com/reactjs/rfcs/pull/107#issue-413235149).

## Examples

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: string; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map(({ id, name, ...rest }) => {
        const props = { key: id, ...rest };
        return <li {...props}>{name}</li>;
        //         ^^^^^^^^^^
        //         - Do not use implicit 'key' props.
      })}
    </ul>
  );
}
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: string; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map(({ id, name, ...rest }) => {
        return <li key={id} {...rest}>{name}</li>;
      })}
    </ul>
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-implicit-key.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-implicit-key.spec.ts)

---

## See Also

- [`jsx-key-before-spread`](./jsx-key-before-spread)\
  Enforces that the `key` attribute is placed before the spread attribute in JSX elements.
- [`no-missing-key`](./no-missing-key)\
  Prevents missing `key` on items in list rendering.
- [`no-duplicate-key`](./no-duplicate-key)\
  Prevents duplicate `key` on elements in the same array or a list of `children`.
- [`no-array-index-key`](./no-array-index-key)\
  Warns when an array `index` is used as a `key` prop.

# no-implicit-key

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-implicit-key
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-implicit-key
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).

This makes it hard to see if the key was passed correctly to the element or where it came from.

And it's also be proposed to be deprecated is this RFC: [Deprecate spreading key from objects](https://github.com/reactjs/rfcs/pull/107#issue-413235149)

## Examples

This rule aims to prevent spreading key from objects.

### Failing

```tsx
import React from "react";

interface MyComponentProps {
  items: { id: string; name: string }[];
}

function MyComponent({ items }: MyComponentProps) {
  return (
    <ul>
      {items.map((item) => {
        const props = { key: item.id };

        return <li {...props}>{item.name}</li>;
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
      {items.map((item) => <li key={item.id}>{item.name}</li>)}
    </ul>
  );
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-implicit-key.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-implicit-key.spec.ts)

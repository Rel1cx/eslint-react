---
title: no-forward-ref
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-forward-ref
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-forward-ref
```

**Features**

`🔄`

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Replaces usages of `forwardRef` with passing `ref` as a prop.

In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead.

`forwardRef` will deprecated in a future release. Learn more [here](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop).

## Examples

### Before

```tsx
import React, { forwardRef } from "react";

const MyInput = forwardRef(
  function MyInput(props, ref) {
    return <input ref={ref} {...props} />;
  },
);
```

```tsx
import React from "react";

interface MyInputProps {
  value: string;
  onChange: (value: string) => void;
}

const MyInput = React.forwardRef<MyInputProps, HTMLInputElement>(
  function MyInput({ value, onChange }, ref) {
    return (
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  },
);
```

### After

```tsx
import React from "react";

function MyInput({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}
```

```tsx
import React from "react";

interface MyInputProps {
  value: string;
  onChange: (value: string) => void;
}

function MyInput({
  ref,
  value,
  onChange,
}: MyInputProps & { ref?: React.RefObject<HTMLInputElement> | null }) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-forward-ref.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-forward-ref.spec.ts)

## Further Reading

- [React: APIs forwardRef](https://react.dev/reference/react/forwardRef)
- [React: ref as a prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop)

---

## See Also

- [`no-useless-forward-ref`](./no-useless-forward-ref)\
  Enforces that `forwardRef` is only used when a `ref` parameter is declared.
- [`no-context-provider`](./no-context-provider)\
  Replaces usages of `<Context.Provider>` with `<Context>`.
- [`no-use-context`](./no-use-context)\
  Replaces usages of `useContext` with `use`.

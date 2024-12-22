# no-forward-ref

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-forward-ref
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-forward-ref
```

**Features**

`🔍` `🔄`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-forward-ref.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-forward-ref.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-forward-ref.md)

## What it does

Disallows using `React.forwardRef`.

## Why is this bad?

In React 19, `forwardRef` is no longer necessary. Pass `ref` as a prop instead.

`forwardRef` will deprecated in a future release. Learn more [here](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop).

## Examples

### Failing

```tsx
import { forwardRef } from "react";

const MyInput = forwardRef(function MyInput(props, ref) {
  // ...
});
```

### Passing

```tsx
function MyInput({ ref, ...props }) {
  // ...
}
```

## Further Reading

- [React: APIs forwardRef](https://react.dev/reference/react/forwardRef)
- [React: ref as a prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop)

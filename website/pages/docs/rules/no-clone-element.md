# no-clone-element

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-clone-element
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-clone-element
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-clone-element.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-clone-element.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-clone-element.md)

## What it does

Disallows the use of `cloneElement`.

Using cloneElement is uncommon and can lead to fragile code. This also makes it harder to trace the data flow. Try the [alternatives](https://react.dev/reference/react/cloneElement#alternatives) instead.

## Examples

### Failing

```tsx
import { cloneElement } from "react";

const clonedElement = cloneElement(
  <Row title="Cabbage">Hello</Row>,
  { isHighlighted: true },
  "Goodbye",
);

console.log(clonedElement); // <Row title="Cabbage" isHighlighted={true}>Goodbye</Row>
```

## Further Reading

- [React: Legacy React APIs cloneElement](https://react.dev/reference/react/cloneElement)

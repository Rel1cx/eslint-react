# function-component

**Full Name in `eslint-plugin-react-debug`**

```plain copy
react-debug/function-component
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/debug/function-component
```

**Features**

`🐞`

**Presets**

- `debug`

## What it does

Reports all function components. Useful for debugging. This rule should only be used for debugging purposes. Otherwise, leave it off.

## Examples

```tsx
import React from "react";

function MyComponent() {
  return <button />;
}
```

```tsx
import React from "react";

const MyComponent = () => <button />;
```

```tsx
import React from "react";

const MyComponent = React.memo(() => <button />);
```

```tsx
import React from "react";

const MyComponent = React.forwardRef(() => <button />);
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/function-component.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/function-component.spec.ts)

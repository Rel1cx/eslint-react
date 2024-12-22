# no-unused-state

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-unused-state
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-unused-state
```

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-state.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-state.spec.ts)

## What it does

Warns unused class component state.

## Examples

### Failing

```tsx
import React from "react";

class Example extends React.Component {
  // Unused
  state = {
    foo: 1,
  };

  render() {
    return null;
  }
}
```

### Passing

```tsx
import React from "react";

class Example extends React.Component {
  state = {
    foo: 1,
  };

  render() {
    return this.state.foo;
  }
}
```

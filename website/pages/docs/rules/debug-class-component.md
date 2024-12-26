# class-component

**Full Name in `eslint-plugin-react-debug`**

```plain copy
react-debug/class-component
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/debug/class-component
```

**Labels**

`Debug` `Class Components`

**Features**

`🐞`

**Presets**

- `debug`

## What it does

Reports all class components. Useful for debugging. This rule should only be used for debugging purposes. Otherwise, leave it off.

## Examples

```tsx
import React from "react";

class MyComponent extends React.Component {
  render() {
    return <button />;
  }
}
```

```tsx
import React from "react";

class MyComponent extends React.PureComponent {
  render() {
    return <button />;
  }
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/class-component.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-debug/src/rules/class-component.spec.ts)

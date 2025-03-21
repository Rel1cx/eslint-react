---
title: no-redundant-should-component-update
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-redundant-should-component-update
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-redundant-should-component-update
```

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow `shouldComponentUpdate` when extending `React.PureComponent`.

While having `shouldComponentUpdate` will still work, it becomes pointless to extend `React.PureComponent`.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.PureComponent {
  // 'Example' does not need 'shouldComponentUpdate' when extending 'React.PureComponent'.
  shouldComponentUpdate() {
    // do check
    return true;
  }

  render() {
    return <div>Radical!</div>;
  }
}
```

### Passing

```tsx
import React from "react";

class MyComponent extends React.Component {
  shouldComponentUpdate() {
    // do check
    return true;
  }

  render() {
    return <div>Radical!</div>;
  }
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-redundant-should-component-update.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-redundant-should-component-update.spec.ts)

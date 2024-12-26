# no-prop-types

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-prop-types
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-prop-types
```

**Labels**

`Deprecated React APIs` `PropTypes`

**Features**

`🔍`

**Presets**

- `core`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## What it does

Disallows using `propTypes` property in favor of TypeScript or another type-checking solution.

`PropTypes` were deprecated in [April 2017 (v15.5.0)](https://legacy.reactjs.org/blog/2017/04/07/react-v15.5.0.html#new-deprecation-warnings).

The `propType` checks will be removed from the React package, and using them will be silently ignored. If you’re using `propTypes`, it is recommend to migrate to TypeScript or another type-checking solution.

## Examples

### Failing

```tsx
import React from "react";

class MyComponent extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  render() {
    return <div>{this.props.name}</div>;
  }
}
```

```tsx
import React from "react";

class MyComponent extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}

MyComponent.propTypes = {
  name: propTypes.string,
};
```

```tsx
import React from "react";

function MyComponentComponent(props) {
  return <div>{props.name}</div>;
}

MyComponent.propTypes = {
  name: propTypes.string,
};
```

### Passing

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

class MyComponent extends React.Component<MyComponentProps> {
  render() {
    return <div>{this.props.name}</div>;
  }
}
```

```tsx
import React from "react";

interface MyComponentProps {
  name: string;
}

function MyComponentComponent({ name }: MyComponentProps) {
  return <div>{name}</div>;
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-prop-types.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-prop-types.spec.ts)

## Further Reading

- [React Blog: React 19 RC Upgrade Guide - Removed: `propTypes` and `defaultProps` for functions](https://react.dev/blog/2024/04/25/react-19-upgrade-guide#removed-proptypes-and-defaultprops)

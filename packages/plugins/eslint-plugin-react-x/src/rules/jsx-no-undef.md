---
title: jsx-no-undef
---

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/jsx-no-undef
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/jsx-no-undef
```

## Description

This rule is used to prevent the use of undefined variables in JSX. It checks for any undefined variables in the JSX code and reports them as errors.

## Examples

### Failing

```jsx
const MyComponent = () => {
  return (
    <div>
      <Foo />
    </div>
  );
};
```

### Passing

```jsx
import Foo from "./Foo";

const MyComponent = () => {
  return (
    <div>
      <Foo />
    </div>
  );
};
```

```jsx
const Foo = () => <div>Foo</div>;

const MyComponent = () => {
  return (
    <div>
      <Foo />
    </div>
  );
};
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-undef.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-no-undef.spec.ts)

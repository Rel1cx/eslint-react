---
title: no-unused-props
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/no-unused-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/no-unused-props
```

## Description

Warns about unused component prop declarations.

## Examples

### Failing

```tsx
interface Props {
  abc: string; // used
  hello: string; // NOT used
}

function Component(props: Props) {
  const { abc } = props; // `hello` isn't accessed from `props`
  return null;
}
```

### Passing

```tsx
interface Props {
  abc: string; // used
  hello: string; // used
}

function Component(props: Props) {
  const { abc, hello } = props;
  return null;
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-props.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-unused-props.spec.ts)

---
title: avoid-shorthand-boolean
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/avoid-shorthand-boolean
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/avoid-shorthand-boolean
```

**Features**

`🔧`

## Description

Enforces explicit boolean values for boolean attributes.

## Examples

### Failing

```tsx
const Input = <input type="checkbox" checked />;
//                                   ^^^^^^^
//                                   - Expected `checked={true}` instead of `checked`
const button = <button disabled />;
//                     ^^^^^^^^
//                     - Expected `disabled={true}` instead of `disabled`
```

### Passing

```tsx
const Input = <input type="checkbox" checked={true} />;
const button = <button disabled={true} />;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/avoid-shorthand-boolean.spec.ts)

---

## See Also

- [`avoid-shorthand-fragment`](./avoid-shorthand-fragment)\
  Enforces the use of explicit `<Fragment>` or `<React.Fragment>` components instead of the shorthand `<>` or `</>` syntax.
- [`prefer-shorthand-boolean`](./prefer-shorthand-boolean)\
  Enforces the use of shorthand syntax for boolean attributes.
- [`prefer-shorthand-fragment`](./prefer-shorthand-fragment)\
  Enforces the use of shorthand syntax for fragments.

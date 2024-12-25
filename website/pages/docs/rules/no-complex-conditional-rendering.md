# no-complex-conditional-rendering

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-complex-conditional-rendering
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-complex-conditional-rendering
```

**Features**

`🔍`

## What it does

Warns when conditional rendering is too complex.

## Examples

### Failing

```tsx
function MyComponent({ condition1, condition2, condition3, condition4 }) {
  return <div>{condition1 || condition2 ? <div>X</div> : condition3 || condition4 ? <div>Y</div> : null}</div>;
}
```

### Passing

```tsx
function MyComponent({ condition1, condition2, condition3, condition4 }) {
  const shouldDisplayX = condition1 || condition2;
  const shouldDisplayY = condition3 || condition4;
  return (
    <div>
      {shouldDisplayX && <div>X</div>}
      {shouldDisplayY && <div>Y</div>}
    </div>
  );
}
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-complex-conditional-rendering.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-complex-conditional-rendering.spec.ts)

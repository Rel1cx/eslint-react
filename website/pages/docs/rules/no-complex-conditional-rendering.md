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

**Implementation**:

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-complex-conditional-rendering.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-complex-conditional-rendering.spec.ts)
- [Docs source](https://github.com/Rel1cx/eslint-react/tree/main/website/pages/docs/rules/no-complex-conditional-rendering.md)

## What it does

Warns when conditional rendering is too complex.

## Examples

### Failing

```tsx
function Example({ condition1, condition2, condition3, condition4 }) {
  return <div>{condition1 || condition2 ? <div>X</div> : condition3 || condition4 ? <div>Y</div> : null}</div>;
}
```

### Passing

```tsx
function Example({ condition1, condition2, condition3, condition4 }) {
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

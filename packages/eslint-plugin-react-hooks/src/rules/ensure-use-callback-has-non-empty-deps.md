# react-hooks/ensure-use-callback-has-non-empty-deps

## Rule category

Correctness.

## What it does

Warns when `useCallback` is called with empty dependencies array.

## Why is this bad?

React Hooks `useCallback` has empty dependencies array like what's in the examples, are unnecessary. The hook can be removed and it's value can be created in the component body or hoisted to the outer scope of the component.

## Examples

### ❌ Incorrect

```tsx
const Comp = () => {
  const onClick = useCallback(() => {
    console.log("clicked");
  }, []);

  return <Button onClick={onClick} />;
};
```

### ✅ Correct

```tsx
const onClick = () => {
  console.log("clicked");
};

const Comp = () => {
  return <Button onClick={onClick} />;
};
```

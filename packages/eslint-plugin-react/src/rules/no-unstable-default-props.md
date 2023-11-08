# react/no-unstable-default-props

<!-- end auto-generated rule header -->

## Rule category

Perf.

## What it does

Prevents usage of referential-type values as default props in object destructuring.

## Why is this bad?

When using object destructuring syntax you can set the default value for a given property if it does not exist. If you set the default value to one of the values that is compared by identity, it will mean that each time the destructure is evaluated the JS engine will create a new, distinct value in the destructured variable.

This harms performance as it means that React will have to re-evaluate hooks and re-render memoized components more often than necessary.

To fix the violations, the easiest way is to use a referencing variable in module scope instead of using the literal values, e.g:

```tsx
const emptyArray = [];

function Component({ items = emptyArray }) {
  return <div>{items}</div>;
}
```

## Examples

### ❌ Incorrect

```tsx
function Component({ items = [] }) {
  return <div>{items}</div>;
}
```

```tsx
function Component({ items = {} }) {
  return <div>{items}</div>;
}
```

```tsx
function Component({ items = () => {} }) {
  return <div>{items}</div>;
}
```

### ✅ Correct

```tsx
const emptyArray = [];

function Component({ items = emptyArray }) {
  return <div>{items}</div>;
}
```

```tsx
const emptyObject = {};
function Component({ items = emptyObject }) {
  return <div>{items}</div>;
}
```

```tsx
const noopFunc = () => {};
function Component({ items = noopFunc }) {
  return <div>{items}</div>;
}
```

```tsx
// primitives are all compared by value, so are safe to be inlined
function Component({ num = 3, str = "foo", bool = true }) {
  return <div>{items}</div>;
}
```

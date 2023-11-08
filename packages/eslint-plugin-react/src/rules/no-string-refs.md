# react/no-string-refs

<!-- end auto-generated rule header -->

## Rule category

Restriction.

## What it does

Disallows using deprecated `string refs`.

## Why is this bad?

String refs are deprecated in React. Use callback refs instead.

## Examples

### ❌ Incorrect

```tsx
function Component() {
  return <div ref="example" />;
}
```

### ✅ Correct

```tsx
function Component() {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref} />;
}
```

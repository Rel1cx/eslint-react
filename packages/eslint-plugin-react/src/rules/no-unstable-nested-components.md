# react/no-unstable-nested-components

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Prevents nesting component definitions inside other components.

## Why is this bad?

Nesting component definitions inside other components is a common mistake that can be extremely slow and cause issues and bugs. Instead, define every component at the top level.

## Examples

### ❌ Incorrect

```tsx
export default function Gallery() {
  // 🔴 Never define a component inside another component!
  function Profile() {
    // ...
  }
  // ...
}
```

### ✅ Correct

```tsx
export default function Gallery() {
  // ...
}

// 🟢 Declare components at the top level
function Profile() {
  // ...
}
```

When a child component needs some data from a parent, [pass it by props](https://react.dev/learn/passing-props-to-a-component) instead of nesting definitions.

## Further Reading

- [react.dev: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)

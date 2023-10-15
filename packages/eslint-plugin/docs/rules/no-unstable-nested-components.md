# no-unstable-nested-components

💼 This rule is enabled in the 👍 `recommended` config.

<!-- end auto-generated rule header -->

## Rule details

This rule aims to prevent nesting component definitions inside other components. It is a common mistake that can cause performance issues and bugs. Instead, define every component at the top level.

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

## Further reading

- [react.dev: Nesting and organizing components](https://react.dev/learn/your-first-component#nesting-and-organizing-components)

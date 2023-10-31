# react/no-string-style-props

<!-- end auto-generated rule header -->

Disallow using string as style props value

## Rule Details

### ❌ Incorrect

```tsx
function Component() {
  return <div style="color: red;" />;
}
```

### ✅ Correct

```tsx
function Component() {
  return <div style={{ color: "red" }} />;
}
```

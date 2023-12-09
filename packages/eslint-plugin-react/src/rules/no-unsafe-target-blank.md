# react/no-unsafe-target-blank

## Rule category

Security.

## What it does

Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.

## Examples

### ❌ Incorrect

```tsx
<a href="https://example.com" target="_blank">Example</a>;
```

### ✅ Correct

```tsx
<a href="https://example.com" target="_blank" rel="noreferrer noopener">Example</a>;
```

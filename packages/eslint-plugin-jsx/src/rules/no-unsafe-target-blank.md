# jsx/no-unsafe-target-blank

<!-- end auto-generated rule header -->

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

# react/no-missing-button-type

<!-- end auto-generated rule header -->

## Rule category

Suspicious.

## What it does

Enforces explicit `button` type `attribute` for `<button>` elements.

## Why is this bad?

The `button` element's `type` attribute must be specified explicitly. The default value is `type="submit"` which can easily lead to unexpected behavior, especially when used in a form.

## Examples

### ❌ Incorrect

```tsx
<button>Click me</button>;
```

### ✅ Correct

```tsx
<button type="button">Click me</button>;
```

## When Not To Use It

If you use only "submit" buttons, you can disable this rule

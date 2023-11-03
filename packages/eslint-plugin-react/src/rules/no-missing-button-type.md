# react/no-missing-button-type

<!-- end auto-generated rule header -->

Enforce explicit `button` type attribute for `<button>` elements

## Rule Details

The `button` element's `type` attribute must be specified explicitly. The default value is `type="submit"` which can lead to unexpected behavior, especially when used in a form.

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

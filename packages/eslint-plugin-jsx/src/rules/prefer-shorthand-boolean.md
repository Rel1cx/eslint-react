# jsx/prefer-shorthand-boolean

⚠️🚫 This rule _warns_ in the following configs: `all-legacy`, 🎨 `jsx`, `jsx-legacy`, 👍 `recommended`, `recommended-legacy`, `recommended-type-checked-legacy`. This rule is _disabled_ in the `off-legacy` config.

<!-- end auto-generated rule header -->

## Rule Details

This rule enforces the use of shorthand syntax for boolean attributes.

### ❌ Incorrect

```tsx
<Component hidden={true} disabled={false} />;
```

### ✅ Correct

```tsx
<Component hidden disabled />;
```

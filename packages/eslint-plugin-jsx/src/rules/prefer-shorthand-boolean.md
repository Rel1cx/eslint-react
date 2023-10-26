# jsx/prefer-shorthand-boolean

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

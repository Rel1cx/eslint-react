# jsx/prefer-shorthand-fragment

<!-- end auto-generated rule header -->

Enforce the usage of `<></>` over `<React.Fragment></React.Fragment>`.

## Rule Details

### ❌ Incorrect

```tsx
<React.Fragment>
  <div />
</React.Fragment>;
```

```tsx
<React.Fragment>
  <div />
  <div />
</React.Fragment>;
```

### ✅ Correct

```tsx
<>
  <div />
</>;
```

```tsx
<>
  <div />
  <div />
</>;
```

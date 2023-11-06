# jsx/prefer-shorthand-fragment

<!-- end auto-generated rule header -->

## Rule category

Stylistic.

## What it does

Enforces the usage of `<></>` over `<React.Fragment></React.Fragment>`.

## Why is this good?

`<></>` is shorter and more readable. And it does not require importing `React` or the `Fragment` component.

## Examples

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

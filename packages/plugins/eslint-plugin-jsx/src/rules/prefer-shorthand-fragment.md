# jsx/prefer-shorthand-fragment

## Rule category

Stylistic.

## What it does

Enforces the usage of `<></>` over `<React.Fragment></React.Fragment>`.

## Why is this good?

`<></>` is shorter and more readable. And it does not require importing `React` or the `Fragment` component.

## Examples

### Failing

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

### Passing

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

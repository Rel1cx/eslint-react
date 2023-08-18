# jsx-boolean-value

Enforce boolean attributes notation in JSX.

## Rule Details

This rule checks all boolean attributes in JSX elements and verifies that they are not set to `true` or `false`.

Examples of **incorrect** code for this rule:

```tsx
<div hidden={true} disabled={false} />
```

Examples of **correct** code for this rule:

```tsx
<div hidden disabled />
```

## Options

### `never`

Boolean attributes must not have a value specified.

Examples of **incorrect** code for this rule with the `"never"` option:

```tsx
<div hidden={true} disabled={false} />
```

Examples of **correct** code for this rule with the `"never"` option:

```tsx
<div hidden disabled />
```

### `always`

Boolean attributes must have a value specified.

Examples of **incorrect** code for this rule with the `"always"` option:

```tsx
<div hidden disabled />
```

Examples of **correct** code for this rule with the `"always"` option:

```tsx
<div hidden={true} disabled={false} />
```

## When Not To Use It

If you don't want to enforce a consistent style for boolean attributes in JSX, you can disable this rule.

## Further Reading

- [React JSX specification](https://facebook.github.io/jsx)

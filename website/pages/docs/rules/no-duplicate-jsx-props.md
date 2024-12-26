# no-duplicate-jsx-props

**Full Name in `eslint-plugin-react-x`**

```plain copy
react-x/no-duplicate-jsx-props
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/no-duplicate-jsx-props
```

**Labels**

`JSX` `Component Props`

**Features**

`🔍`

**Presets**

- `core`
- `recommended`

## What it does

This rule prevents the use of duplicate props in JSX elements.

## Examples

### Failing

```tsx
<Hello name="John" name="Doe" />;
```

### Passing

```tsx
<Hello name="John" />;
```

## Implementation

- [Rule source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-jsx-props.ts)
- [Test source](https://github.com/rEl1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/no-duplicate-jsx-props.spec.ts)

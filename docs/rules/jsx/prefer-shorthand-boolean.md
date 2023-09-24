# react-ts/jsx/prefer-shorthand-boolean

## Rule Details

This rule enforces the use of shorthand syntax for boolean attributes.

Examples of **incorrect** code for this rule:

```tsx
<Component hidden={true} disabled={false} />;
```

Examples of **correct** code for this rule:

```tsx
<Component hidden disabled />;
```

## Rule Options

- `rule`: `"never"` or `"always"`
- `excepts`: an array of strings

### Default Option

```json
"react-ts/prefer-shorthand-jsx-boolean": ["error", {
    "rule": "never",
    "excepts": []
}]
```

### `never`

Boolean attributes must not have a value specified.

Examples of **incorrect** code for this rule with the `"never"` option:

```tsx
<Component hidden={true} disabled={false} />;
```

Examples of **correct** code for this rule with the `"never"` option:

```tsx
<Component hidden disabled />;
```

### `always`

Boolean attributes must have a value specified.

Examples of **incorrect** code for this rule with the `"always"` option:

```tsx
<Component hidden disabled />;
```

Examples of **correct** code for this rule with the `"always"` option:

```tsx
<Component hidden={true} disabled={false} />;
```

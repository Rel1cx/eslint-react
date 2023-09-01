# prefer-shorthand-jsx-boolean

⚠️ This rule _warns_ in the following configs: 🌐 `all`, ✅ `recommended`, `recommended-type-checked`.

<!-- end auto-generated rule header -->

## Rule Details

This rule enforces the use of shorthand syntax for boolean attributes.

Examples of **incorrect** code for this rule:

```tsx
<ExampleComponent hidden={true} disabled={false} />
```

Examples of **correct** code for this rule:

```tsx
<ExampleComponent hidden disabled />
```

## Rule Options

-   rule - `"never"` or `"always"` (default: `"never"`)
-   excepts - an array of strings (default: `[]`)

### Type Signature

```ts
type Options = { rule?: "never" | "always"; excepts?: string[] };
```

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
<ExampleComponent hidden={true} disabled={false} />
```

Examples of **correct** code for this rule with the `"never"` option:

```tsx
<ExampleComponent hidden disabled />
```

### `always`

Boolean attributes must have a value specified.

Examples of **incorrect** code for this rule with the `"always"` option:

```tsx
<ExampleComponent hidden disabled />
```

Examples of **correct** code for this rule with the `"always"` option:

```tsx
<ExampleComponent hidden={true} disabled={false} />
```

## When Not To Use It

If you don't want to enforce a consistent style for boolean attributes in JSX, you can disable this rule.

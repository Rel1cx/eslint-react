# jsx-boolean-value

💼 This rule is enabled in the following [configs](/configs/): 🌐 `all`, ✅ `recommended`, `recommended-type-checked`.

<!-- end auto-generated rule header -->

Enforce boolean attributes notation in JSX.

## Rule Details

This rule checks all boolean attributes in JSX elements and verifies that they are not set to `true` or `false`.

Examples of **incorrect** code for this rule:

```tsx
<ExampleComponent hidden={true} disabled={false} />
```

Examples of **correct** code for this rule:

```tsx
<ExampleComponent hidden disabled />
```

## Rule Options

### Type Signature

```ts
type Options = [("never" | "always")?, { always?: string[]; never?: string[] }?];
```

### Default Option

```json
"react-ts/jsx-boolean-value": ["error", "never"]
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

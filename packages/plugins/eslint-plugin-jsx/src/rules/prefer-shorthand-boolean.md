# jsx/prefer-shorthand-boolean

## Rule category

Style.

## What it does

Enforces the use of shorthand syntax for boolean attributes.

## Examples

This rule enforces the use of shorthand syntax for boolean attributes.

### Failing

```tsx
<Component hidden={true} disabled={false} />;
```

### Passing

```tsx
<Component hidden disabled />;
```

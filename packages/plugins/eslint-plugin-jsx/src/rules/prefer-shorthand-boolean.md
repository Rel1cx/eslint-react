# jsx/prefer-shorthand-boolean

## Rule category

Style.

## What it does

Enforces the use of shorthand syntax for boolean attributes.

## Why is this good?

The shorthand syntax is shorter and easier to read. And it adds consistency and less visual noise to the code.

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

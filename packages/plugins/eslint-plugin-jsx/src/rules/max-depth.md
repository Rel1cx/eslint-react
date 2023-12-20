# jsx/max-depth

## Rule category

Style.

## What it does

Enforces a maximum depth that JSX elements can be nested.

## Examples

### Failing

```tsx
// max-depth: 3
<App>
  <Foo>
    <Bar>
      <Baz />
    </Bar>
  </Foo>
</App>;
```

### Passing

```tsx
// max-depth: 3
<App>
  <Foo>
    <Bar />
  </Foo>
</App>;
```

## Rule Options

- `max`: The maximum depth that JSX elements can be nested. Defaults to `12`.

```json
{
  "@eslint-react/jsx/max-depth": ["warn", { "max": 12 }]
}
```

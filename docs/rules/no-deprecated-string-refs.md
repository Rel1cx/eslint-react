# no-string-refs

Disallow using deprecated string refs

## Rule Details

This rule disallows using deprecated string refs.

Examples of **incorrect** code for this rule:

```tsx
function ExampleComponent() {
    return <div ref="example" />;
}
```

Examples of **correct** code for this rule:

```tsx
function ExampleComponent() {
    const ref = useRef<HTMLDivElement>(null);

    return <div ref={ref} />;
}
```

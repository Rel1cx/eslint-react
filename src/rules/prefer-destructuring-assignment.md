# react-ts/prefer-destructuring-assignment

Prefer destructuring assignment over property assignment.

## Rule Details

This rule aims to enforce the use of destructuring assignment over property assignment.

Examples of **incorrect** code for this rule:

```tsx
function Component(props) {
    const items = props.items;

    return <div>{items}</div>;
}
```

```tsx
function Component(props) {
    return <div>{props.items}</div>;
}
```

```tsx
function Component(props) {
    const { items } = props;

    return <div>{items}</div>;
}
```

Examples of **correct** code for this rule:

```tsx
function Component(props) {
    const { items } = props;

    return <div>{items}</div>;
}
```

```tsx
function Component({ items }) {
    return <div>{items}</div>;
}
```

```tsx
function Component({ items }: { items: string[] }) {
    return <div>{items}</div>;
}
```

```tsx
function Component({ items, ...rest }) {
    return <div {...rest}>{items}</div>;
}
```

## Rule Options

This rule has no options.

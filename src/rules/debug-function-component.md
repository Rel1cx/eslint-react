# debug-function-component

Warns when a function component is found. Useful for debugging.

## Rule Details

Examples of **correct** case for this rule:

```tsx
function foo() {
  return 'bar';
}
```

```tsx
// render props are not components
function renderItem (name: string) {
    return <div>{name}</div>
};
```

Examples of **incorrect** case for this rule:

```tsx
function ExampleComponent() {
  return <div />;
}
```

```tsx
function ExampleComponent () {
   return <div />
};
```

```tsx
function ExampleComponent () {
  return React.createElement('div');
};
```

## When To Use It

It should only be used for debugging purposes. Otherwise, leave it off.

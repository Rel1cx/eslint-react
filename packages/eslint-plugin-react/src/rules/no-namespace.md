# react/no-namespace

## Rule category

Correctness.

## What it does

Enforces the absence of a `namespace` in React elements.

## Why is this bad?

Namespaces, such as with `svg:circle` are not supported in React.

## Examples

### Fail

```jsx
<ns:TestComponent />;
<Ns:TestComponent />;
```

### Pass

```jsx
<TestComponent />;
<testComponent />;
```

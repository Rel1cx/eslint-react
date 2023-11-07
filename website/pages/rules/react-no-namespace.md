# react/no-namespace

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Enforces the absence of a namespace in React elements.

## Why is this bad?

Namespaces, such as with `svg:circle` are not supported in React.

## Examples

### ❌ Incorrect

```jsx
<ns:TestComponent />;
<Ns:TestComponent />;
```

### ✅ Correct

```jsx
<TestComponent />;
<testComponent />;
```

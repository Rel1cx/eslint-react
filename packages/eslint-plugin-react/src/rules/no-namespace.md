# @eslint-react/no-namespace

Enforces the absence of a namespace in React elements, such as with `svg:circle`, as they are not supported in React.

## Rule Details

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

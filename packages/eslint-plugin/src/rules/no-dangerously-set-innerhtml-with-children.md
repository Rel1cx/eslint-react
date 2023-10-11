# @eslint-react/no-dangerously-set-innerhtml-with-children

Disallow when a DOM element is using both children and `dangerouslySetInnerHTML`

## Rule Details

### ❌ Incorrect

```tsx
<div dangerouslySetInnerHTML={{ __html: "Hello World" }}>Hello World</div>;
```

### ✅ Correct

```tsx
<div dangerouslySetInnerHTML={{ __html: "Hello World" }} />;
```

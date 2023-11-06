# react/no-dangerously-set-innerhtml-with-children

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Disallows when a DOM element is using both children and `dangerouslySetInnerHTML`

## Why is this bad?

When using `dangerouslySetInnerHTML`, the content of the DOM element is set from the `__html` property. The content of the DOM element is completely replaced, so the children will not be rendered as expected.

## Examples

### ❌ Incorrect

```tsx
<div dangerouslySetInnerHTML={{ __html: "Hello World" }}>Hello World</div>;
```

### ✅ Correct

```tsx
<div dangerouslySetInnerHTML={{ __html: "Hello World" }} />;
```

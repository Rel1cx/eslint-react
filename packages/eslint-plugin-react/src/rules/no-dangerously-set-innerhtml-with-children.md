# react/no-dangerously-set-innerhtml-with-children

💼 This rule is enabled in the 👍 `recommended-legacy` config.

<!-- end auto-generated rule header -->

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

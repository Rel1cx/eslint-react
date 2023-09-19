# no-danger-with-children

💼 This rule is enabled in the following configs: 🌐 `all`, ✅ `recommended`, `recommended-type-checked`.

<!-- end auto-generated rule header -->

Disallow when a DOM element is using both children and `dangerouslySetInnerHTML`

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
<div dangerouslySetInnerHTML={{ __html: 'Hello World' }}>Hello World</div>;
```

Examples of **correct** code for this rule:

```tsx
<div dangerouslySetInnerHTML={{ __html: 'Hello World' }} />;
```

# react-ts/no-dangerously-set-innerhtml-with-children

Disallow when a DOM element is using both children and `dangerouslySetInnerHTML`

## Rule Details

Examples of **incorrect** code for this rule:

```tsx
<div dangerouslySetInnerHTML={{ __html: "Hello World" }}></div>;
```

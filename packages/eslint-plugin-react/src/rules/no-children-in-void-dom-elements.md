# react/no-children-in-void-dom-elements

<!-- end auto-generated rule header -->

## Rule category

Correctness.

## What it does

Prevents the use of `children` in void `DOM elements`.

## Why is this bad?

Self-closing HTML elements (e.g. `<img />`, `<br />`, `<hr />`) are collectively known as void DOM elements. React will give you a warning if you try to give these children:

> Invariant Violation: img is a void element tag and must neither have children nor use dangerouslySetInnerHTML.

## Examples

### ❌ Incorrect

```tsx
<br>Children</br>
<br children="Children" />
<br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('br', undefined, 'Children')
React.createElement('br', { children: 'Children' })
React.createElement('br', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

### ✅ Correct

```tsx
<div>Children</div>
<div children="Children" />
<div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('div', undefined, 'Children')
React.createElement('div', { children: 'Children' })
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

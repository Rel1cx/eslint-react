---
title: no-void-elements-with-children
---

**Full Name in `eslint-plugin-react-dom`**

```plain copy
react-dom/no-void-elements-with-children
```

**Full Name in `@eslint-react/eslint-plugin`**

```plain copy
@eslint-react/dom/no-void-elements-with-children
```

**Presets**

- `dom`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Disallow `children` in void DOM elements.

Self-closing HTML elements (e.g. `<img />`, `<br />`, `<hr />`) are collectively known as void DOM elements. React will give you a warning if you try to give these children:

> Invariant Violation: img is a void element tag and must neither have children nor use dangerouslySetInnerHTML.

## Examples

### Failing

```tsx
<br>Children</br>
<br children="Children" />
<br dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('br', undefined, 'Children')
React.createElement('br', { children: 'Children' })
React.createElement('br', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

### Passing

```tsx
<div>Children</div>
<div children="Children" />
<div dangerouslySetInnerHTML={{ __html: 'HTML' }} />
React.createElement('div', undefined, 'Children')
React.createElement('div', { children: 'Children' })
React.createElement('div', { dangerouslySetInnerHTML: { __html: 'HTML' } })
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-void-elements-with-children.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom/src/rules/no-void-elements-with-children.spec.ts)

---

## See Also

- [`no-dangerously-set-innerhtml`](./dom-no-dangerously-set-innerhtml)\
  Warns when using `dangerouslySetInnerHTML`.
- [`no-dangerously-set-innerhtml-with-children`](./dom-no-dangerously-set-innerhtml-with-children)\
  Disallows DOM elements using `children` and `dangerouslySetInnerHTML` at the same time.

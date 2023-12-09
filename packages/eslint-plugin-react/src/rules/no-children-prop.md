# react/no-children-prop

## Rule category

Suspicious.

## What it does

Disallows passing of children as props.

## Why is this bad?

Most of the time, `children` should be actual `children`, not passed in as a `prop`.

When using JSX, the `children` should be nested between the opening and closing tags. When not using JSX, the `children` should be passed as additional arguments to `React.createElement`.

## Examples

### ❌ Incorrect

```tsx
<div children='Children' />

<Component children={<AnotherComponent />} />
<Component children={['Child 1', 'Child 2']} />

React.createElement("div", { children: 'Children' })
```

### ✅ Correct

```tsx
<div>Children</div>

<Component>Children</Component>

<Component>
  <span>Child 1</span>
  <span>Child 2</span>
</Component>

React.createElement("div", {}, 'Children')
React.createElement("div", 'Child 1', 'Child 2')
```

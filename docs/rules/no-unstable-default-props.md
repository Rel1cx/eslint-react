# no-unstable-default-props

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔍 `recommended-type-checked`.

<!-- end auto-generated rule header -->

Disallow usage of referential-type variables as default param in function component.

Warns if in a function component, an object type value (such as array/object literal/function/etc) is used as default prop, to prevent potential unnecessary rerenders, and performance regressions.

## Rule Details

Certain values (like arrays, objects, functions, etc) are compared by identity instead of by value. This means that, for example, whilst two empty arrays conceptually represent the same value - JavaScript semantics dictate that they are distinct and unequal as they represent two distinct values.

When using object destructuring syntax you can set the default value for a given property if it does not exist. If you set the default value to one of the values that is compared by identity, it will mean that each time the destructure is evaluated the JS engine will create a new, distinct value in the destructured variable.

In the context of a React functional component's props argument this means for each render, the property has a new, distinct value. When this value is passed to a hook as a dependency or passed into a child component as a property React will see this as a new value - meaning that a hook will be re-evaluated, or a memoized component will rerender.

This obviously destroys any performance benefits you get from memoization. Additionally, in certain circumstances this can cause infinite rerender loops, which can often be hard to debug.

It's worth noting that primitive literal values (string, number, boolean, null, and undefined) can be considered to be compared "by value", or alternatively, as always having the same identity (every 3 is the same exact 3). Thus, it's safe for those to be inlined as a default value.

To fix the violations, the easiest way is to use a referencing variable in module scope instead of using the literal values, e.g:

```tsx
const emptyArray = [];

function Component({ items = emptyArray }) {
    return <div>{items}</div>;
}
```

### ❌ Incorrect

```tsx
function Component({ items = [] }) {
    return <div>{items}</div>;
}
```

```tsx
function Component({ items = {} }) {
    return <div>{items}</div>;
}
```

```tsx
function Component({ items = () => {} }) {
    return <div>{items}</div>;
}
```

### ✅ Correct

```tsx
const emptyArray = [];

function Component({ items = emptyArray }) {
    return <div>{items}</div>;
}
```

```tsx
const emptyObject = {};
function Component({ items = emptyObject }) {
    return <div>{items}</div>;
}
```

```tsx
const noopFunc = () => {};
function Component({ items = noopFunc }) {
    return <div>{items}</div>;
}
```

```tsx
// primitives are all compared by value, so are safe to be inlined
function Component({ num = 3, str = "foo", bool = true }) {
    return <div>{items}</div>;
}
```

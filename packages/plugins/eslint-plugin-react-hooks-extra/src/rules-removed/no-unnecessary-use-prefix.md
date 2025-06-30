---
title: no-unnecessary-use-prefix
---

**Full Name in `eslint-plugin-react-hooks-extra`**

```sh copy
react-hooks-extra/no-unnecessary-use-prefix
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/hooks-extra/no-unnecessary-use-prefix
```

**Features**

`🧪`

**Presets**

- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Enforces that a function with the `use` prefix should use at least one Hook inside of it.

If your function doesn’t call any Hooks, avoid the `use` prefix. Instead, write it as a regular function without the `use` prefix. For example, `useSorted` below doesn’t call Hooks, so call it `getSorted` instead:

```tsx
// 🔴 Avoid: A Hook that doesn't use Hooks
function useSorted(items) {
  return items.slice().sort();
}
```

```tsx
// ✅ Good: A regular function that doesn't use Hooks
function getSorted(items) {
  return items.slice().sort();
}
```

This ensures that your code can call this regular function anywhere, including conditions:

```tsx
function List({ items, shouldSort }) {
  let displayedItems = items;
  if (shouldSort) {
    // ✅ It's ok to call getSorted() conditionally because it's not a Hook
    displayedItems = getSorted(items);
  }
  // ...
}
```

You should give `use` prefix to a function (and thus make it a Hook) if it uses at least one Hook inside of it:

```tsx
// ✅ Good: A Hook that uses other Hooks
function useAuth() {
  return useContext(Auth);
}
```

Technically, this isn’t enforced by React. In principle, you could make a Hook that doesn’t call other Hooks. This is often confusing and limiting so it's best to avoid that pattern. However, there may be rare cases where it is helpful. For example, maybe your function doesn’t use any Hooks right now, but you plan to add some Hook calls to it in the future. Then it makes sense to name it with the `use` prefix:

```tsx
// ✅ Good: A Hook that will likely use some other Hooks later
function useAuth() {
  // TODO: Replace with this line when authentication is implemented:
  // return useContext(Auth);
  return TEST_USER;
}
```

Then components won’t be able to call it conditionally. This will become important when you actually add Hook calls inside. If you don’t plan to use Hooks inside it (now or later), don’t make it a Hook.

## Examples

### Failing

```tsx
function useSorted(items) {
  return items.slice().sort();
}
```

```tsx
// No 'TODO' and 'useContext()' comments inside function body
function useAuth() {
  return TEST_USER;
}
```

### Passing

```tsx
function getSorted(items) {
  return items.slice().sort();
}
```

```tsx
function useAuth() {
  return useContext(Auth);
}
```

```tsx
function useAuth() {
  // TODO: Replace with this line when authentication is implemented:
  // return useContext(Auth);
  return TEST_USER;
}
```

```tsx
export function useMDXComponents(components) {
  return {
    ...components,
  };
}
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-prefix.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-hooks-extra/src/rules/no-unnecessary-use-prefix.spec.ts)

## Further Reading

- [React Docs: Should all functions called during rendering start with the `use` prefix? (the deep dive)](https://react.dev/learn/reusing-logic-with-custom-hooks#should-all-functions-called-during-rendering-start-with-the-use-prefix)

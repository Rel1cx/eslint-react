---
title: jsx-key-before-spread
---

**Full Name in `eslint-plugin-react-x`**

```sh copy
react-x/jsx-key-before-spread
```

**Full Name in `@eslint-react/eslint-plugin`**

```sh copy
@eslint-react/jsx-key-before-spread
```

**Presets**

- `x`
- `recommended`
- `recommended-typescript`
- `recommended-type-checked`

## Description

Enforces that the `key` attribute is placed before the spread attribute in JSX elements.

When using the JSX automatic runtime, `key` is a special attribute in the JSX transform. See the [Babel repl](https://babeljs.io/repl#?browsers=last%202%20chrome%20versions&build=&builtIns=false&corejs=3.21&spec=false&loose=false&code_lz=DwEwlgbgBA1gpgTwLwCICMKoG8B0eAOATgPb4DOAvlAPQB8A3AFCiTZ45GmWyKoBMmOkxbR4yFAGZMAYwA2AQzJkAcvIC2cVIIbNw0OYpXrNKTGNRSaDIA&forceAllTransforms=false&modules=false&shippedProposals=false&evaluate=true&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.27.0&externalPlugins=&assumptions=%7B%7D) and [TypeScript playground](https://www.typescriptlang.org/play/?target=99&jsx=4#code/DwEwlgbgBA1gpgTwLwCICMKoG8B0eAOATgPb4DOAvlAPQB8A3ALABQok2eORplsiqAJkx0mrcNHjIUAZkwBjADYBDMmQBySgLZxUwhizbRFK9Vp0pMk1ABY99IA).

If the `key` prop is _before_ any spread props, it is passed as the `key` argument of the `_jsx` / `_jsxs` / `_jsxDev` function. But if the `key` prop is _after_ spread props, The compiler uses `createElement` instead and passes `key` as a regular prop.

## Examples

### Failing

```tsx
<div {...props} key="2" />;
```

### Passing

```tsx
<div key="1" {...props} />;
<div key="3" className="" />;
<div className="" key="3" />;
```

## Implementation

- [Rule source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-key-before-spread.ts)
- [Test source](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x/src/rules/jsx-key-before-spread.spec.ts)

---

## See Also

- [`no-implicit-key`](./no-implicit-key)\
  Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).

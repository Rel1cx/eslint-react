[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / DEFAULT\_ESLINT\_REACT\_SETTINGS

# Variable: DEFAULT\_ESLINT\_REACT\_SETTINGS

> `const` **DEFAULT\_ESLINT\_REACT\_SETTINGS**: `object`

The default ESLint settings for "react-x".

## Type declaration

### additionalComponents?

> `readonly` `optional` **additionalComponents**: `object`[]

An array of user-defined components

#### Description

This is used to inform the ESLint React plugins how to treat these components during checks.

#### Example

```ts
`[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
```

### additionalHooks

> `readonly` **additionalHooks**: `object`

#### additionalHooks.useEffect

> `readonly` **useEffect**: \[`"useIsomorphicLayoutEffect"`\]

#### additionalHooks.useLayoutEffect

> `readonly` **useLayoutEffect**: \[`"useIsomorphicLayoutEffect"`\]

### importSource

> `readonly` **importSource**: `"react"` = `"react"`

### jsxPragma

> `readonly` **jsxPragma**: `"createElement"` = `"createElement"`

### jsxPragmaFrag

> `readonly` **jsxPragmaFrag**: `"Fragment"` = `"Fragment"`

### polymorphicPropName

> `readonly` **polymorphicPropName**: `"as"` = `"as"`

### strict

> `readonly` **strict**: `false` = `false`

### strictImportCheck

> `readonly` **strictImportCheck**: `false` = `false`

### version

> `readonly` **version**: `"detect"` = `"detect"`

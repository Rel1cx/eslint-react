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

### ~~jsxPragma?~~

> `readonly` `optional` **jsxPragma**: `string`

The identifier that’s used for JSX Element creation.

#### Default

`"createElement"`

#### Deprecated

### ~~jsxPragmaFrag?~~

> `readonly` `optional` **jsxPragmaFrag**: `string`

The identifier that’s used for JSX fragment elements.

#### Description

This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").

#### Default

`"Fragment"`

#### Deprecated

### polymorphicPropName

> `readonly` **polymorphicPropName**: `"as"` = `"as"`

### skipImportCheck

> `readonly` **skipImportCheck**: `true` = `true`

### version

> `readonly` **version**: `"detect"` = `"detect"`

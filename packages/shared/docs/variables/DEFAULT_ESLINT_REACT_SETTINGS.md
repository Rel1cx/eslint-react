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

#### additionalHooks.useLayoutEffect

> `readonly` **useLayoutEffect**: \[`"useIsomorphicLayoutEffect"`\]

### importSource

> `readonly` **importSource**: `string`

The source where React is imported from.

#### Description

This allows to specify a custom import location for React when not using the official distribution.

#### Default

`"react"`

#### Example

```ts
`"@pika/react"`
```

### ~~jsxPragma~~

> `readonly` **jsxPragma**: `string`

The identifier that’s used for JSX Element creation.

#### Default

`"createElement"`

#### Deprecated

### ~~jsxPragmaFrag~~

> `readonly` **jsxPragmaFrag**: `string`

The identifier that’s used for JSX fragment elements.

#### Description

This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").

#### Default

`"Fragment"`

#### Deprecated

### polymorphicPropName

> `readonly` **polymorphicPropName**: `string`

The name of the prop that is used for polymorphic components.

#### Description

This is used to determine the type of the component.

#### Example

```ts
`"as"`
```

### version

> `readonly` **version**: `string`

React version to use, "detect" means auto detect React version from the project’s dependencies.
If `importSource` is specified, an equivalent version of React should be provided here.

#### Example

```ts
`"18.3.1"`
```

#### Default

`"detect"`

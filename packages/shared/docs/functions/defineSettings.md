[**@eslint-react/shared**](../README.md) • **Docs**

***

[@eslint-react/shared](../README.md) / defineSettings

# Function: defineSettings()

> **defineSettings**(`settings`): `object`

A helper function to define settings for "react-x" with type checking in JavaScript files.

## Parameters

• **settings**

The settings.

• **settings.additionalComponents?**: `object`[] = `...`

An array of user-defined components

**Description**

This is used to inform the ESLint React plugins how to treat these components during checks.

**Example**

```ts
`[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
```

• **settings.additionalHooks?** = `...`

A object of aliases for React built-in hooks.

**Description**

ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.

**Example**

```ts
`{ useLayoutEffect: ["useIsomorphicLayoutEffect"] }`
```

• **settings.additionalHooks.use?**: `string`[] = `...`

• **settings.additionalHooks.useActionState?**: `string`[] = `...`

• **settings.additionalHooks.useCallback?**: `string`[] = `...`

• **settings.additionalHooks.useContext?**: `string`[] = `...`

• **settings.additionalHooks.useDebugValue?**: `string`[] = `...`

• **settings.additionalHooks.useDeferredValue?**: `string`[] = `...`

• **settings.additionalHooks.useEffect?**: `string`[] = `...`

• **settings.additionalHooks.useId?**: `string`[] = `...`

• **settings.additionalHooks.useImperativeHandle?**: `string`[] = `...`

• **settings.additionalHooks.useInsertionEffect?**: `string`[] = `...`

• **settings.additionalHooks.useLayoutEffect?**: `string`[] = `...`

• **settings.additionalHooks.useMemo?**: `string`[] = `...`

• **settings.additionalHooks.useOptimistic?**: `string`[] = `...`

• **settings.additionalHooks.useReducer?**: `string`[] = `...`

• **settings.additionalHooks.useRef?**: `string`[] = `...`

• **settings.additionalHooks.useState?**: `string`[] = `...`

• **settings.additionalHooks.useSyncExternalStore?**: `string`[] = `...`

• **settings.additionalHooks.useTransition?**: `string`[] = `...`

• **settings.importSource?**: `string` = `...`

The source where React is imported from.

**Description**

This allows to specify a custom import location for React when not using the official distribution.

**Default**

`"react"`

**Example**

```ts
`"@pika/react"`
```

• **settings.jsxPragma?**: `string` = `...`

The identifier that’s used for JSX Element creation.

**Default**

`"createElement"`

• **settings.jsxPragmaFrag?**: `string` = `...`

The identifier that’s used for JSX fragment elements.

**Description**

This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").

**Default**

`"Fragment"`

• **settings.polymorphicPropName?**: `string` = `...`

The name of the prop that is used for polymorphic components.

**Description**

This is used to determine the type of the component.

**Example**

```ts
`"as"`
```

• **settings.version?**: `string` = `...`

React version to use, "detect" means auto detect React version from the project’s dependencies.
If `importSource` is specified, an equivalent version of React should be provided here.

**Example**

```ts
`"18.3.1"`
```

**Default**

`"detect"`

## Returns

`object`

The settings.

### additionalComponents?

> `optional` **additionalComponents**: `object`[]

An array of user-defined components

#### Description

This is used to inform the ESLint React plugins how to treat these components during checks.

#### Example

```ts
`[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
```

### additionalHooks?

> `optional` **additionalHooks**: `object`

A object of aliases for React built-in hooks.

#### Description

ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.

#### Example

```ts
`{ useLayoutEffect: ["useIsomorphicLayoutEffect"] }`
```

### additionalHooks.use?

> `optional` **use**: `string`[]

### additionalHooks.useActionState?

> `optional` **useActionState**: `string`[]

### additionalHooks.useCallback?

> `optional` **useCallback**: `string`[]

### additionalHooks.useContext?

> `optional` **useContext**: `string`[]

### additionalHooks.useDebugValue?

> `optional` **useDebugValue**: `string`[]

### additionalHooks.useDeferredValue?

> `optional` **useDeferredValue**: `string`[]

### additionalHooks.useEffect?

> `optional` **useEffect**: `string`[]

### additionalHooks.useId?

> `optional` **useId**: `string`[]

### additionalHooks.useImperativeHandle?

> `optional` **useImperativeHandle**: `string`[]

### additionalHooks.useInsertionEffect?

> `optional` **useInsertionEffect**: `string`[]

### additionalHooks.useLayoutEffect?

> `optional` **useLayoutEffect**: `string`[]

### additionalHooks.useMemo?

> `optional` **useMemo**: `string`[]

### additionalHooks.useOptimistic?

> `optional` **useOptimistic**: `string`[]

### additionalHooks.useReducer?

> `optional` **useReducer**: `string`[]

### additionalHooks.useRef?

> `optional` **useRef**: `string`[]

### additionalHooks.useState?

> `optional` **useState**: `string`[]

### additionalHooks.useSyncExternalStore?

> `optional` **useSyncExternalStore**: `string`[]

### additionalHooks.useTransition?

> `optional` **useTransition**: `string`[]

### importSource?

> `optional` **importSource**: `string`

The source where React is imported from.

#### Description

This allows to specify a custom import location for React when not using the official distribution.

#### Default

`"react"`

#### Example

```ts
`"@pika/react"`
```

### jsxPragma?

> `optional` **jsxPragma**: `string`

The identifier that’s used for JSX Element creation.

#### Default

`"createElement"`

### jsxPragmaFrag?

> `optional` **jsxPragmaFrag**: `string`

The identifier that’s used for JSX fragment elements.

#### Description

This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").

#### Default

`"Fragment"`

### polymorphicPropName?

> `optional` **polymorphicPropName**: `string`

The name of the prop that is used for polymorphic components.

#### Description

This is used to determine the type of the component.

#### Example

```ts
`"as"`
```

### version?

> `optional` **version**: `string`

React version to use, "detect" means auto detect React version from the project’s dependencies.
If `importSource` is specified, an equivalent version of React should be provided here.

#### Example

```ts
`"18.3.1"`
```

#### Default

`"detect"`

[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / normalizeSettings

# Function: normalizeSettings()

> **normalizeSettings**(`__namedParameters`): `object`

Normalizes ESLint React settings to a consistent internal format
Transforms component definitions and resolves version information

## Parameters

### \_\_namedParameters

#### additionalComponents?

`object`[] = `[]`

User-defined components configuration
Informs ESLint React how to treat these components during validation

**Example**

```ts
[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }] }]
```

#### additionalHooks?

\{ `use?`: `string`[]; `useActionState?`: `string`[]; `useCallback?`: `string`[]; `useContext?`: `string`[]; `useDebugValue?`: `string`[]; `useDeferredValue?`: `string`[]; `useEffect?`: `string`[]; `useFormStatus?`: `string`[]; `useId?`: `string`[]; `useImperativeHandle?`: `string`[]; `useInsertionEffect?`: `string`[]; `useLayoutEffect?`: `string`[]; `useMemo?`: `string`[]; `useOptimistic?`: `string`[]; `useReducer?`: `string`[]; `useRef?`: `string`[]; `useState?`: `string`[]; `useSyncExternalStore?`: `string`[]; `useTransition?`: `string`[]; \} = `{}`

Custom hooks that should be treated as equivalent to built-in React Hooks

**Example**

```ts
{ useEffect: ["useIsomorphicLayoutEffect"] }
```

#### additionalHooks.use?

`string`[] = `...`

#### additionalHooks.useActionState?

`string`[] = `...`

#### additionalHooks.useCallback?

`string`[] = `...`

#### additionalHooks.useContext?

`string`[] = `...`

#### additionalHooks.useDebugValue?

`string`[] = `...`

#### additionalHooks.useDeferredValue?

`string`[] = `...`

#### additionalHooks.useEffect?

`string`[] = `...`

#### additionalHooks.useFormStatus?

`string`[] = `...`

#### additionalHooks.useId?

`string`[] = `...`

#### additionalHooks.useImperativeHandle?

`string`[] = `...`

#### additionalHooks.useInsertionEffect?

`string`[] = `...`

#### additionalHooks.useLayoutEffect?

`string`[] = `...`

#### additionalHooks.useMemo?

`string`[] = `...`

#### additionalHooks.useOptimistic?

`string`[] = `...`

#### additionalHooks.useReducer?

`string`[] = `...`

#### additionalHooks.useRef?

`string`[] = `...`

#### additionalHooks.useState?

`string`[] = `...`

#### additionalHooks.useSyncExternalStore?

`string`[] = `...`

#### additionalHooks.useTransition?

`string`[] = `...`

#### importSource?

`string` = `"react"`

The source where React is imported from
Allows specifying a custom import location for React

**Default**

```ts
"react"
```

**Example**

```ts
"@pika/react"
```

#### polymorphicPropName?

`string` = `"as"`

The prop name used for polymorphic components
Used to determine the component's type

**Example**

```ts
"as"
```

#### version?

`string`

React version to use
"detect" means auto-detect React version from project dependencies

**Example**

```ts
"18.3.1"
```

**Default**

```ts
"detect"
```

## Returns

`object`

### additionalHooks

> **additionalHooks**: `object`

#### additionalHooks.use?

> `optional` **use**: `string`[]

#### additionalHooks.useActionState?

> `optional` **useActionState**: `string`[]

#### additionalHooks.useCallback?

> `optional` **useCallback**: `string`[]

#### additionalHooks.useContext?

> `optional` **useContext**: `string`[]

#### additionalHooks.useDebugValue?

> `optional` **useDebugValue**: `string`[]

#### additionalHooks.useDeferredValue?

> `optional` **useDeferredValue**: `string`[]

#### additionalHooks.useEffect?

> `optional` **useEffect**: `string`[]

#### additionalHooks.useFormStatus?

> `optional` **useFormStatus**: `string`[]

#### additionalHooks.useId?

> `optional` **useId**: `string`[]

#### additionalHooks.useImperativeHandle?

> `optional` **useImperativeHandle**: `string`[]

#### additionalHooks.useInsertionEffect?

> `optional` **useInsertionEffect**: `string`[]

#### additionalHooks.useLayoutEffect?

> `optional` **useLayoutEffect**: `string`[]

#### additionalHooks.useMemo?

> `optional` **useMemo**: `string`[]

#### additionalHooks.useOptimistic?

> `optional` **useOptimistic**: `string`[]

#### additionalHooks.useReducer?

> `optional` **useReducer**: `string`[]

#### additionalHooks.useRef?

> `optional` **useRef**: `string`[]

#### additionalHooks.useState?

> `optional` **useState**: `string`[]

#### additionalHooks.useSyncExternalStore?

> `optional` **useSyncExternalStore**: `string`[]

#### additionalHooks.useTransition?

> `optional` **useTransition**: `string`[]

### components

> `readonly` **components**: `object`[]

### importSource

> **importSource**: `string`

### polymorphicPropName

> **polymorphicPropName**: `string`

### skipImportCheck

> **skipImportCheck**: `boolean`

### strict

> **strict**: `boolean`

### version

> `readonly` **version**: `string`

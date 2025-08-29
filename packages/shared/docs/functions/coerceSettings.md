[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / coerceSettings

# Function: coerceSettings()

> **coerceSettings**(`settings`): `object`

Coerces unknown input to ESLintReactSettings type

## Parameters

### settings

`unknown`

The settings object to coerce

## Returns

### additionalComponents?

> `optional` **additionalComponents**: `object`[]

User-defined components configuration
Informs ESLint React how to treat these components during validation

#### Example

```ts
[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }] }]
```

### additionalHooks?

> `optional` **additionalHooks**: `object`

Custom hooks that should be treated as equivalent to built-in React Hooks

#### Example

```ts
{ useEffect: ["useIsomorphicLayoutEffect"] }
```

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

### importSource?

> `optional` **importSource**: `string`

The source where React is imported from
Allows specifying a custom import location for React

#### Default

```ts
"react"
```

#### Example

```ts
"@pika/react"
```

### polymorphicPropName?

> `optional` **polymorphicPropName**: `string`

The prop name used for polymorphic components
Used to determine the component's type

#### Example

```ts
"as"
```

### version?

> `optional` **version**: `string`

React version to use
"detect" means auto-detect React version from project dependencies

#### Example

```ts
"18.3.1"
```

#### Default

```ts
"detect"
```

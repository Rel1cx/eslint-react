[**@eslint-react/core**](../README.md)

***

[@eslint-react/core](../README.md) / isInitializedFromReact

# Function: isInitializedFromReact()

> **isInitializedFromReact**(`name`, `initialScope`, `settings`): `boolean`

Check if an identifier is initialized from React

## Parameters

### name

`string`

The top-level identifier's name

### initialScope

`Scope`

Initial scope to search for the identifier

### settings

ESLint React settings

#### additionalComponents

`object`[]

An array of user-defined components

**Description**

This is used to inform the ESLint React plugins how to treat these components during checks.

**Example**

```ts
`[{ name: "Link", as: "a", attributes: [{ name: "to", as: "href" }, { name: "rel", defaultValue: "noopener noreferrer" }] }]`
```

#### additionalHooks

\{ `use`: `string`[]; `useActionState`: `string`[]; `useCallback`: `string`[]; `useContext`: `string`[]; `useDebugValue`: `string`[]; `useDeferredValue`: `string`[]; `useEffect`: `string`[]; `useFormStatus`: `string`[]; `useId`: `string`[]; `useImperativeHandle`: `string`[]; `useInsertionEffect`: `string`[]; `useLayoutEffect`: `string`[]; `useMemo`: `string`[]; `useOptimistic`: `string`[]; `useReducer`: `string`[]; `useRef`: `string`[]; `useState`: `string`[]; `useSyncExternalStore`: `string`[]; `useTransition`: `string`[]; \}

A object of aliases for React built-in hooks.

**Description**

ESLint React will recognize these aliases as equivalent to the built-in hooks in all its rules.

**Example**

```ts
`{ useLayoutEffect: ["useIsomorphicLayoutEffect"] }`
```

#### additionalHooks.use

`string`[]

#### additionalHooks.useActionState

`string`[]

#### additionalHooks.useCallback

`string`[]

#### additionalHooks.useContext

`string`[]

#### additionalHooks.useDebugValue

`string`[]

#### additionalHooks.useDeferredValue

`string`[]

#### additionalHooks.useEffect

`string`[]

#### additionalHooks.useFormStatus

`string`[]

#### additionalHooks.useId

`string`[]

#### additionalHooks.useImperativeHandle

`string`[]

#### additionalHooks.useInsertionEffect

`string`[]

#### additionalHooks.useLayoutEffect

`string`[]

#### additionalHooks.useMemo

`string`[]

#### additionalHooks.useOptimistic

`string`[]

#### additionalHooks.useReducer

`string`[]

#### additionalHooks.useRef

`string`[]

#### additionalHooks.useState

`string`[]

#### additionalHooks.useSyncExternalStore

`string`[]

#### additionalHooks.useTransition

`string`[]

#### importSource

`string`

The source where React is imported from.

**Description**

This allows to specify a custom import location for React when not using the official distribution.

**Default**

`"react"`

**Example**

```ts
`"@pika/react"`
```

#### jsxPragma

`string`

The identifier that’s used for JSX Element creation.

**Default**

`"createElement"`

#### jsxPragmaFrag

`string`

The identifier that’s used for JSX fragment elements.

**Description**

This should not be a member expression (i.e. use "Fragment" instead of "React.Fragment").

**Default**

`"Fragment"`

#### polymorphicPropName

`string`

The name of the prop that is used for polymorphic components.

**Description**

This is used to determine the type of the component.

**Example**

```ts
`"as"`
```

#### version

`string`

React version to use, "detect" means auto detect React version from the project’s dependencies.
If `importSource` is specified, an equivalent version of React should be provided here.

**Example**

```ts
`"18.3.1"`
```

**Default**

`"detect"`

## Returns

`boolean`

Whether the identifier is initialized from React

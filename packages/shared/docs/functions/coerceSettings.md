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

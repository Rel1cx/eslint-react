[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / decodeSettings

# Function: decodeSettings()

> **decodeSettings**(`settings`): `object`

Decodes and validates ESLint React settings, using defaults if invalid

## Parameters

### settings

`unknown`

The settings object to decode

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

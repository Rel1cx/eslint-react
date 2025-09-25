[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / normalizeSettings

# Function: normalizeSettings()

> **normalizeSettings**(`__namedParameters`): `object`

Normalizes ESLint React settings to a consistent internal format
Transforms component definitions and resolves version information

## Parameters

### \_\_namedParameters

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

### importSource

> **importSource**: `string`

### polymorphicPropName

> **polymorphicPropName**: `string`

### version

> `readonly` **version**: `string`

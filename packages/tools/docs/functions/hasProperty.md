[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / hasProperty

# Function: hasProperty()

Checks whether a value is an `object` containing a specified property key.

## Param

The field to check within the object.

## Param

The value to examine.

## Since

2.0.0

## hasProperty(property)

> **hasProperty**\<`P`\>(`property`): (`self`) => `self is { [K in PropertyKey]: unknown }`

Checks whether a value is an `object` containing a specified property key.

### Type Parameters

• **P** *extends* `PropertyKey`

### Parameters

• **property**: `P`

### Returns

`Function`

#### Parameters

• **self**: `unknown`

#### Returns

`self is { [K in PropertyKey]: unknown }`

### Param

The field to check within the object.

### Param

The value to examine.

### Since

2.0.0

## hasProperty(self, property)

> **hasProperty**\<`P`\>(`self`, `property`): `self is { [K in PropertyKey]: unknown }`

Checks whether a value is an `object` containing a specified property key.

### Type Parameters

• **P** *extends* `PropertyKey`

### Parameters

• **self**: `unknown`

• **property**: `P`

### Returns

`self is { [K in PropertyKey]: unknown }`

### Param

The field to check within the object.

### Param

The value to examine.

### Since

2.0.0

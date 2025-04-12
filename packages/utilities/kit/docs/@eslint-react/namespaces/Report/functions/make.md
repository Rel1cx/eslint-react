[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [Report](../README.md) / make

# Function: make()

> **make**\<`TMessageID`\>(`context`): `object`

## Type Parameters

### TMessageID

`TMessageID` *extends* `string`

## Parameters

### context

[`RuleContext`](../../../../type-aliases/RuleContext.md)\<`TMessageID`\>

## Returns

`object`

### send()

> `readonly` **send**(`descriptor`): `void`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### Returns

`void`

### sendOrElse()

> `readonly` **sendOrElse**\<`TElse`\>(`descriptor`, `fallback`): `void` \| `TElse`

#### Type Parameters

##### TElse

`TElse`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

##### fallback

() => `TElse`

#### Returns

`void` \| `TElse`

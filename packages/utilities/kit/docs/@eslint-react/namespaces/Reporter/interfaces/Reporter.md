[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [Reporter](../README.md) / Reporter

# Interface: Reporter\<TMessageID\>

## Type Parameters

### TMessageID

`TMessageID` *extends* `string`

## Properties

### send()

> **send**: (`descriptor`) => `void`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### Returns

`void`

***

### sendOrElse()

> **sendOrElse**: \<`TElse`\>(`descriptor`, `cb`) => `undefined` \| `TElse`

#### Type Parameters

##### TElse

`TElse`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

##### cb

() => `TElse`

#### Returns

`undefined` \| `TElse`

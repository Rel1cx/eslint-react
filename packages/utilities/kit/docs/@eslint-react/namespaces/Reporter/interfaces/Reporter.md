[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [Reporter](../README.md) / Reporter

# Interface: Reporter

## Properties

### send()

> **send**: \<`TMessageID`\>(`descriptor`) => `void`

#### Type Parameters

##### TMessageID

`TMessageID` *extends* `string`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### Returns

`void`

***

### sendOrElse()

> **sendOrElse**: \<`TMessageID`, `TElse`\>(`descriptor`, `cb`) => `undefined` \| `TElse`

#### Type Parameters

##### TMessageID

`TMessageID` *extends* `string`

##### TElse

`TElse`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

##### cb

() => `TElse`

#### Returns

`undefined` \| `TElse`

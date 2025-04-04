[**@eslint-react/kit**](../README.md)

***

[@eslint-react/kit](../README.md) / createReport

# Function: createReport()

> **createReport**\<`MessageID`\>(`context`): (`descriptor`) => `void`

Creates a report function that can conditionally report a descriptor.

## Type Parameters

### MessageID

`MessageID` *extends* `string`

## Parameters

### context

[`RuleContext`](../type-aliases/RuleContext.md)

The context of the rule

## Returns

A function that takes a descriptor and reports it if it's not null or undefined

> (`descriptor`): `void`

### Parameters

#### descriptor

`undefined` | `null` | `ReportDescriptor`\<`MessageID`\>

### Returns

`void`

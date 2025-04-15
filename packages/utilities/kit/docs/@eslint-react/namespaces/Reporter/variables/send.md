[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [Reporter](../README.md) / send

# Variable: send()

> `const` **send**: \{\<`TMessageID`\>(`context`, `descriptor`): `void`; \<`TMessageID`\>(`context`): (`descriptor`) => `void`; \}

## Call Signature

> \<`TMessageID`\>(`context`, `descriptor`): `void`

### Type Parameters

#### TMessageID

`TMessageID` *extends* `string`

### Parameters

#### context

[`RuleContext`](../../../../type-aliases/RuleContext.md)

#### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

### Returns

`void`

## Call Signature

> \<`TMessageID`\>(`context`): (`descriptor`) => `void`

### Type Parameters

#### TMessageID

`TMessageID` *extends* `string`

### Parameters

#### context

[`RuleContext`](../../../../type-aliases/RuleContext.md)

### Returns

> (`descriptor`): `void`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### Returns

`void`

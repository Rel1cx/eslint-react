[**@eslint-react/kit**](../../../../README.md)

***

[@eslint-react/kit](../../../../README.md) / [Reporter](../README.md) / sendOrElse

# Variable: sendOrElse()

> `const` **sendOrElse**: \{\<`TMessageID`, `TElse`\>(`context`, `descriptor`, `cb`): `undefined` \| `TElse`; \<`TMessageID`, `TElse`\>(`context`): (`descriptor`) => (`cb`) => `undefined` \| `TElse`; \}

## Call Signature

> \<`TMessageID`, `TElse`\>(`context`, `descriptor`, `cb`): `undefined` \| `TElse`

### Type Parameters

#### TMessageID

`TMessageID` *extends* `string`

#### TElse

`TElse`

### Parameters

#### context

[`RuleContext`](../../../../type-aliases/RuleContext.md)

#### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### cb

() => `TElse`

### Returns

`undefined` \| `TElse`

## Call Signature

> \<`TMessageID`, `TElse`\>(`context`): (`descriptor`) => (`cb`) => `undefined` \| `TElse`

### Type Parameters

#### TMessageID

`TMessageID` *extends* `string`

#### TElse

`TElse`

### Parameters

#### context

[`RuleContext`](../../../../type-aliases/RuleContext.md)

### Returns

> (`descriptor`): (`cb`) => `undefined` \| `TElse`

#### Parameters

##### descriptor

`undefined` | `null` | `ReportDescriptor`\<`TMessageID`\>

#### Returns

> (`cb`): `undefined` \| `TElse`

##### Parameters

###### cb

() => `TElse`

##### Returns

`undefined` \| `TElse`

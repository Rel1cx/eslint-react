[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RuleFixer

# Interface: RuleFixer

## Methods

### insertTextAfter()

> **insertTextAfter**(`nodeOrToken`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### nodeOrToken

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextAfterRange()

> **insertTextAfterRange**(`range`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### range

readonly \[`number`, `number`\]

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextBefore()

> **insertTextBefore**(`nodeOrToken`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### nodeOrToken

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextBeforeRange()

> **insertTextBeforeRange**(`range`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### range

readonly \[`number`, `number`\]

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

***

### remove()

> **remove**(`nodeOrToken`): [`RuleFix`](RuleFix.md)

#### Parameters

##### nodeOrToken

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

#### Returns

[`RuleFix`](RuleFix.md)

***

### removeRange()

> **removeRange**(`range`): [`RuleFix`](RuleFix.md)

#### Parameters

##### range

readonly \[`number`, `number`\]

#### Returns

[`RuleFix`](RuleFix.md)

***

### replaceText()

> **replaceText**(`nodeOrToken`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### nodeOrToken

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

***

### replaceTextRange()

> **replaceTextRange**(`range`, `text`): [`RuleFix`](RuleFix.md)

#### Parameters

##### range

readonly \[`number`, `number`\]

##### text

`string`

#### Returns

[`RuleFix`](RuleFix.md)

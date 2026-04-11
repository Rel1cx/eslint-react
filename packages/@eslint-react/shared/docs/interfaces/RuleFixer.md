[@eslint-react/shared](../README.md) / RuleFixer

# Interface: RuleFixer

## Methods

### insertTextAfter()

```ts
insertTextAfter(nodeOrToken: Node | Token, text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nodeOrToken` | `Node` \| `Token` |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextAfterRange()

```ts
insertTextAfterRange(range: readonly [number, number], text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `range` | readonly \[`number`, `number`\] |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextBefore()

```ts
insertTextBefore(nodeOrToken: Node | Token, text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nodeOrToken` | `Node` \| `Token` |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### insertTextBeforeRange()

```ts
insertTextBeforeRange(range: readonly [number, number], text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `range` | readonly \[`number`, `number`\] |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### remove()

```ts
remove(nodeOrToken: Node | Token): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nodeOrToken` | `Node` \| `Token` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### removeRange()

```ts
removeRange(range: readonly [number, number]): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `range` | readonly \[`number`, `number`\] |

#### Returns

[`RuleFix`](RuleFix.md)

***

### replaceText()

```ts
replaceText(nodeOrToken: Node | Token, text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `nodeOrToken` | `Node` \| `Token` |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

***

### replaceTextRange()

```ts
replaceTextRange(range: readonly [number, number], text: string): RuleFix;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `range` | readonly \[`number`, `number`\] |
| `text` | `string` |

#### Returns

[`RuleFix`](RuleFix.md)

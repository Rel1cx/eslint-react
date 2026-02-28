[@eslint-react/core](../../../../README.md) / [isReactAPI](../README.md) / ReturnType

# Type Alias: ReturnType()

```ts
type ReturnType = {
  (context: RuleContext, node: Node | null): node is Identifier | MemberExpression;
  (context: RuleContext): (node: Node | null) => node is Identifier | MemberExpression;
};
```

## Call Signature

```ts
(context: RuleContext, node: Node | null): node is Identifier | MemberExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |
| `node` | `Node` \| `null` |

### Returns

node is Identifier \| MemberExpression

## Call Signature

```ts
(context: RuleContext): (node: Node | null) => node is Identifier | MemberExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |

### Returns

```ts
(node: Node | null): node is Identifier | MemberExpression;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` \| `null` |

#### Returns

node is Identifier \| MemberExpression

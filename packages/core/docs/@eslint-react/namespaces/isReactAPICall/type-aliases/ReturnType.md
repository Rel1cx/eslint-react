[@eslint-react/core](../../../../README.md) / [isReactAPICall](../README.md) / ReturnType

# Type Alias: ReturnType()

```ts
type ReturnType = {
  (context: RuleContext, node: Node | null): node is CallExpression;
  (context: RuleContext): (node: Node | null) => node is CallExpression;
};
```

## Call Signature

```ts
(context: RuleContext, node: Node | null): node is CallExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |
| `node` | `Node` \| `null` |

### Returns

`node is CallExpression`

## Call Signature

```ts
(context: RuleContext): (node: Node | null) => node is CallExpression;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| `context` | `RuleContext` |

### Returns

```ts
(node: Node | null): node is CallExpression;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `node` | `Node` \| `null` |

#### Returns

`node is CallExpression`

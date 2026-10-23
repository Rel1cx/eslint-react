[@eslint-react/eslint](../README.md) / getText

# Function: getText()

## Call Signature

```ts
function getText(context: RuleContext, node: Node | Token): string;
```

Gets the source text of the given node or token.
Can be used as `(context, node)` to get the text directly,
or as `(context)` to get a `(node) => string` function (ex: for use in array callbacks).

### Parameters

| Parameter | Type                                            | Description                           |
| --------- | ----------------------------------------------- | ------------------------------------- |
| `context` | [`RuleContext`](../type-aliases/RuleContext.md) | The ESLint rule context.              |
| `node`    | `Node` \| `Token`                               | The node or token to get the text of. |

### Returns

`string`

The source text of the node, or a function that returns it.

## Call Signature

```ts
function getText(context: RuleContext): (node: Node | Token) => string;
```

Gets the source text of the given node or token.
Can be used as `(context, node)` to get the text directly,
or as `(context)` to get a `(node) => string` function (ex: for use in array callbacks).

### Parameters

| Parameter | Type                                            | Description              |
| --------- | ----------------------------------------------- | ------------------------ |
| `context` | [`RuleContext`](../type-aliases/RuleContext.md) | The ESLint rule context. |

### Returns

The source text of the node, or a function that returns it.

(`node`: `Node` \| `Token`) => `string`

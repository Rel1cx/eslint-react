[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isConditional

# Variable: isConditional

```ts
const isConditional: (
  node: Node | null | undefined,
) => node is
  | ConditionalExpression
  | DoWhileStatement
  | ForInStatement
  | ForOfStatement
  | ForStatement
  | IfStatement
  | LogicalExpression
  | SwitchStatement
  | WhileStatement;
```

Check if a node is a conditional expression or control flow statement

## Parameters

| Parameter | Type                            | Description       |
| --------- | ------------------------------- | ----------------- |
| `node`    | `Node` \| `null` \| `undefined` | The node to check |

## Returns

node is ConditionalExpression \| DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| IfStatement \| LogicalExpression \| SwitchStatement \| WhileStatement

True if the node is conditional

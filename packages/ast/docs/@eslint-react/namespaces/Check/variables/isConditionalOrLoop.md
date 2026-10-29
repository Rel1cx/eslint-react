[@eslint-react/ast](../../../../README.md) / [Check](../README.md) / isConditionalOrLoop

# Variable: isConditionalOrLoop

```ts
const isConditionalOrLoop: (node: Node | null | undefined) => node is
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

Check if a node is a conditional or logical expression, a conditional statement, or a loop statement.

## Parameters

| Parameter | Type                            |
| --------- | ------------------------------- |
| `node`    | `Node` \| `null` \| `undefined` |

## Returns

node is ConditionalExpression \| DoWhileStatement \| ForInStatement \| ForOfStatement \| ForStatement \| IfStatement \| LogicalExpression \| SwitchStatement \| WhileStatement

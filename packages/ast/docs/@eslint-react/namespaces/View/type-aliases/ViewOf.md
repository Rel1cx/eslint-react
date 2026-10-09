[@eslint-react/ast](../../../../README.md) / [View](../README.md) / ViewOf

# Type Alias: ViewOf\<N _extends_ `TSESTree.Node`\>

```ts
type ViewOf<N extends TSESTree.Node> = N extends TSESTree.AssignmentExpression ? AssignmentExpressionView : N extends TSESTree.AwaitExpression ? AwaitExpressionView : N extends TSESTree.BinaryExpression ? BinaryExpressionView : N extends TSESTree.CallExpression ? CallExpressionView : N extends TSESTree.ConditionalExpression ? ConditionalExpressionView : N extends TSESTree.ExpressionStatement ? ExpressionStatementView : N extends TSESTree.JSXExpressionContainer ? JSXExpressionContainerView : N extends TSESTree.LogicalExpression ? LogicalExpressionView : N extends TSESTree.MemberExpression ? MemberExpressionView : N extends TSESTree.NewExpression ? NewExpressionView : ... extends ... ? ... : ...;
```

The most specific view type for a node type `N`, consumed as `View.ViewOf`.

Distributive over `N`: when `N` is a union (including `TSESTree.Node`
itself), the result is a union of the per-constituent views, each carrying
its literal `type`, so a `view.type` check narrows both the view and its
`.node`. Node types without a dedicated view map to the base `Class`.

## Type Parameters

| Type Parameter                |
| ----------------------------- |
| `N` _extends_ `TSESTree.Node` |

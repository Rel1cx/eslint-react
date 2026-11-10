[@eslint-react/var](../README.md) / EnclosingAssignmentTarget

# Type Alias: EnclosingAssignmentTarget

```ts
type EnclosingAssignmentTarget = TSESTree.DefaultExportDeclarations | TSESTree.PropertyName | null;
```

The possible assignment targets returned by [resolveEnclosingAssignmentTarget](../functions/resolveEnclosingAssignmentTarget.md):

- `const <id> = ...`: the declared binding — an `Identifier`, or the whole
  `ObjectPattern`/`ArrayPattern` for a destructuring declaration.
- `<target> = ...`: the assignment's left side (an `Identifier`, a
  `MemberExpression`, or a destructuring pattern).
- `class { <key> = ... }`: the property key.
- `export default <declaration>`: the exported declaration.

The union is wider than the cases above suggest: `DefaultExportDeclarations`
includes `Expression` (`export default <expr>`), and `PropertyName` includes
computed keys, which are arbitrary expressions as well. Listing the narrower
node types explicitly would be redundant, so they are documented here instead.

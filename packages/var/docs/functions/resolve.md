[@eslint-react/var](../README.md) / resolve

# Function: resolve()

```ts
function resolve(
   context: RuleContext, 
   node: Identifier, 
   options?: Partial<{
  at: number;
  localOnly: boolean;
}>): Node | null;
```

Resolves an identifier to the AST node that represents its value,
suitable for use in ESLint rule analysis.

The resolution follows these rules per definition type:

| Definition type          | `def.node`                                   | Returns                            |
|--------------------------|----------------------------------------------|------------------------------------|
| `Variable`               | `VariableDeclarator`                         | `def.node.init` (or `null`)        |
| `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                         |
| `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                         |
| `Parameter`              | containing function node                     | `def.node` (if a real function)    |
| `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                         |
| `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`) |
| `ImportBinding`          | import specifier                             | `null`                             |
| `CatchClause`            | `CatchClause`                                | `null`                             |
| `TSModuleName`           | `TSModuleDeclaration`                        | `null`                             |
| `Type`                   | type alias node                              | `null`                             |
| `ImplicitGlobalVariable` | any node                                     | `null`                             |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `context` | `RuleContext` | The ESLint rule context used for scope lookup. |
| `node` | `Identifier` | The identifier to resolve. |
| `options?` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<\{ `at`: `number`; `localOnly`: `boolean`; \}\> | Optional settings: - `at`: Index of the definition to resolve (default: `0` for the first definition). - `localOnly`: If `true`, only consider variables declared in the same scope as the identifier will miss variables declared in an outer scope). When `false` (default), traverse the scope chain upward via `findVariable` so that references to outer-scope bindings are resolved correctly. |

## Returns

`Node` \| `null`

The resolved node, or `null` if the identifier cannot be resolved to a value node.

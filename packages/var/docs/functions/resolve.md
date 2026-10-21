[@eslint-react/var](../README.md) / resolve

# Function: resolve()

```ts
function resolve(
  context: RuleContext,
  node: Identifier,
  options?: Partial<{
    at: number;
    localOnly: boolean;
  }>,
): Node | null;
```

Resolve an identifier to the AST node that represents its value,
suitable for use in ESLint rule analysis.

The resolution follows these rules per definition type:

| Definition type          | `def.node`                                   | Returns                                                                                          |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `CatchClause`            | `CatchClause`                                | `null`                                                                                           |
| `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                                                                                       |
| `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                                                                                       |
| `ImplicitGlobalVariable` | any node                                     | `null`                                                                                           |
| `ImportBinding`          | import specifier                             | `null`                                                                                           |
| `Parameter`              | containing function node                     | `null` (the value is supplied by the caller)                                                     |
| `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`)                                                               |
| `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                                                                                       |
| `TSModuleName`           | `TSModuleDeclaration`                        | `null`                                                                                           |
| `Type`                   | type alias node                              | `null`                                                                                           |
| `Variable`               | `VariableDeclarator`                         | `def.node.init` for a plain identifier binding; `null` for destructured bindings or missing init |

## Parameters

| Parameter  | Type                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `context`  | `RuleContext`                                                                                                                             | The ESLint rule context.                                                                                                                                                                                                                                                                                                                                                                                   |
| `node`     | `Identifier`                                                                                                                              | The identifier to resolve.                                                                                                                                                                                                                                                                                                                                                                                 |
| `options?` | [`Partial`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype)\<\{ `at`: `number`; `localOnly`: `boolean`; \}\> | Optional settings: - `at`: Index of the definition to resolve (default: `0` for the first definition). - `localOnly`: If `true`, only consider variables declared in the same scope as the identifier (this will miss variables declared in an outer scope). When `false` (default), traverse the scope chain upward via `findVariable` so that references to outer-scope bindings are resolved correctly. |

## Returns

`Node` \| `null`

The resolved node, or `null` if the identifier cannot be resolved to a value node.

For origin/pedigree tracking that maps destructured bindings to the declarator's
initializer, see [resolveOrigin](resolveOrigin.md).

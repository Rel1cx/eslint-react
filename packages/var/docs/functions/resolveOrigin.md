[@eslint-react/var](../README.md) / resolveOrigin

# Function: resolveOrigin()

```ts
function resolveOrigin(context: RuleContext, node: Identifier, options?: ResolveOptions): Node | null;
```

Resolve an identifier to the AST node its value **originates from**,
suitable for origin/pedigree tracking in ESLint rule analysis.

The resolution follows these rules per definition type:

| Definition type          | `def.node`                                   | Returns                                                          |
| ------------------------ | -------------------------------------------- | ---------------------------------------------------------------- |
| `CatchClause`            | `CatchClause`                                | `null`                                                           |
| `ClassName`              | `ClassDeclaration` / `ClassExpression`       | `def.node`                                                       |
| `FunctionName`           | `FunctionDeclaration` / `FunctionExpression` | `def.node`                                                       |
| `ImplicitGlobalVariable` | any node                                     | `null`                                                           |
| `ImportBinding`          | import specifier                             | `def.node` (the import specifier)                                |
| `Parameter`              | containing function node                     | `def.node` (if a real function)                                  |
| `TSEnumMember`           | `TSEnumMember`                               | `def.node.initializer` (or `null`)                               |
| `TSEnumName`             | `TSEnumDeclaration`                          | `def.node`                                                       |
| `TSModuleName`           | `TSModuleDeclaration`                        | `null`                                                           |
| `Type`                   | type alias node                              | `null`                                                           |
| `Variable`               | `VariableDeclarator`                         | `def.node.init` (or `null`), including for destructured bindings |

Unlike [resolve](resolve.md), a binding declared through a destructuring
pattern (e.g. `setState` in `const [state, setState] = useState()`) resolves to the
declarator's initializer (the `useState()` call), i.e. the source expression the
binding derives from rather than the binding's own value; and a parameter resolves
to the containing function node (the binding's declaration site) instead of `null`;
and an import binding resolves to its import specifier (whose parent
`ImportDeclaration` carries the module source) instead of `null`.

Use this for origin/pedigree tracking ("what produced this value?"); use
[resolve](resolve.md) when the precise value of the binding is needed. To follow a
chain of aliases to a fixed point, use [resolveOriginChain](resolveOriginChain.md).

## Parameters

| Parameter  | Type                                                | Description                                                                          |
| ---------- | --------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `context`  | `RuleContext`                                       | The ESLint rule context.                                                             |
| `node`     | `Identifier`                                        | The identifier to resolve.                                                           |
| `options?` | [`ResolveOptions`](../interfaces/ResolveOptions.md) | Optional resolution settings; see [ResolveOptions](../interfaces/ResolveOptions.md). |

## Returns

`Node` \| `null`

The resolved origin node, or `null` if the identifier cannot be resolved.

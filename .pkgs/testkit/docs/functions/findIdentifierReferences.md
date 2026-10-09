[@local/testkit](../README.md) / findIdentifierReferences

# Function: findIdentifierReferences()

```ts
function findIdentifierReferences(input: string | Node, name: string, options?: ParseCodeOptions): Identifier[];
```

Finds every Identifier named `name` that is a reference rather than a
declaration. Excluded declaration sites are: variable declarator ids,
function/class declaration ids, import specifier bindings, enum/member/
module/type-alias declaration ids, function parameters, and non-computed
property keys. Requires parent pointers (as attached by `parseCode`) when
`input` is a node.

## Parameters

| Parameter | Type                                                    | Description                                         |
| --------- | ------------------------------------------------------- | --------------------------------------------------- |
| `input`   | `string` \| `Node`                                      | Source code or an AST node to search.               |
| `name`    | `string`                                                | The identifier name to look for.                    |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) | Parser options, only used when `input` is a string. |

## Returns

`Identifier`[]

The referencing Identifier nodes in traversal order.

[@eslint-react/jsx](../README.md) / CreateElementCall

# Interface: CreateElementCall

A parsed `createElement` call.

All argument fields expose raw positional arguments, which may be
`SpreadElement` nodes. `propsObject` is the only derived field: it is the
second argument after unwrapping type/chain expressions, and is non-null only
when that argument is statically an object literal.

## Properties

| Property                                                    | Modifier   | Type                                | Description                                                          |
| ----------------------------------------------------------- | ---------- | ----------------------------------- | -------------------------------------------------------------------- |
| <a id="property-childrenarguments"></a> `childrenArguments` | `readonly` | readonly `CallExpressionArgument`[] | The raw arguments after the props argument.                          |
| <a id="property-node"></a> `node`                           | `readonly` | `CallExpression`                    | The call expression node.                                            |
| <a id="property-propsargument"></a> `propsArgument`         | `readonly` | `CallExpressionArgument` \| `null`  | The raw second positional argument (the props argument), if present. |
| <a id="property-propsobject"></a> `propsObject`             | `readonly` | `ObjectExpression` \| `null`        | The second argument unwrapped, when it is an object literal.         |
| <a id="property-typeargument"></a> `typeArgument`           | `readonly` | `CallExpressionArgument` \| `null`  | The raw first positional argument (the element type), if present.    |

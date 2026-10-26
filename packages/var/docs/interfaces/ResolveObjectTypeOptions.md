[@eslint-react/var](../README.md) / ResolveObjectTypeOptions

# Interface: ResolveObjectTypeOptions

Options for [resolveObjectType](../functions/resolveObjectType.md).

## Properties

| Property                             | Type                   | Description                                                                                                                                                                                                                                                 |
| ------------------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-at"></a> `at?`       | `number`               | Index of the definition to resolve (default: `-1`, the latest definition).                                                                                                                                                                                  |
| <a id="property-scope"></a> `scope?` | `"local"` \| `"chain"` | Scope traversal mode. - `"local"`: only follow bindings declared in the same scope as the identifier (default). - `"chain"`: also follow bindings declared in enclosing scopes. This maps internally to `localOnly` in [ResolveOptions](ResolveOptions.md). |

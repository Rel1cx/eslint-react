[@eslint-react/var](../README.md) / ImportLookupOptions

# Interface: ImportLookupOptions

Options for [createImportLookup](../functions/createImportLookup.md).

## Properties

| Property                                                     | Type                | Description                                                                                                                                                   |
| ------------------------------------------------------------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <a id="property-builtinnamespaces"></a> `builtinNamespaces?` | readonly `string`[] | Local names to pre-register as namespace bindings without an import statement, e.g. a `ReactDOM` global provided by the environment.                          |
| <a id="property-source"></a> `source`                        | `string`            | The base import source to track, e.g. `"react-dom"`. Subpath imports are grouped under their base, so `"react-dom/client"` matches a source of `"react-dom"`. |

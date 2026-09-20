[@eslint-react/var](../README.md) / ImportLookupOptions

# Interface: ImportLookupOptions

## Properties

| Property                                                     | Type                | Description                                                                                                |
| ------------------------------------------------------------ | ------------------- | ---------------------------------------------------------------------------------------------------------- |
| <a id="property-builtinnamespaces"></a> `builtinNamespaces?` | readonly `string`[] | Local names to pre-register as namespace bindings (e.g. a `ReactDOM` global that needs no import).         |
| <a id="property-source"></a> `source`                        | `string`            | The base import source to track, e.g. `"react-dom"` (`"react-dom/client"` is grouped under `"react-dom"`). |

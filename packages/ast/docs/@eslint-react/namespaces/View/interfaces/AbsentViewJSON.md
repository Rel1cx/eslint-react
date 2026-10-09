[@eslint-react/ast](../../../../README.md) / [View](../README.md) / AbsentViewJSON

# Interface: AbsentViewJSON

The structured representation of an absent view, consumed as `View.AbsentViewJSON`.
It carries only the view tag: there is no node, hence no type, range, or text.

## Properties

| Property                          | Modifier   | Type     | Description                                  |
| --------------------------------- | ---------- | -------- | -------------------------------------------- |
| <a id="property-_tag"></a> `_tag` | `readonly` | `string` | The view class name (always `"AbsentView"`). |

[@local/samples](../README.md) / JsxHandlerNamesOptions

# Type Alias: JsxHandlerNamesOptions

```ts
type JsxHandlerNamesOptions = {
  checkInlineFunction?: boolean;
  eventHandlerPrefix?: string;
  eventHandlerPropPrefix?: string;
};
```

Options for [jsxHandlerNames](../functions/jsxHandlerNames.md).

## Properties

| Property                                                               | Type      | Description                                             |
| ---------------------------------------------------------------------- | --------- | ------------------------------------------------------- |
| <a id="property-checkinlinefunction"></a> `checkInlineFunction?`       | `boolean` | Whether to check inline functions (default: false).     |
| <a id="property-eventhandlerprefix"></a> `eventHandlerPrefix?`         | `string`  | Prefix for event handler functions (default: "handle"). |
| <a id="property-eventhandlerpropprefix"></a> `eventHandlerPropPrefix?` | `string`  | Prefix for event handler props (default: "on").         |

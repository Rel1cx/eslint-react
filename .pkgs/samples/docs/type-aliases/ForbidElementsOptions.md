[@local/samples](../README.md) / ForbidElementsOptions

# Type Alias: ForbidElementsOptions

```ts
type ForbidElementsOptions = {
  forbidden: Map<string, string>;
};
```

Options for [forbidElements](../functions/forbidElements.md).

## Properties

| Property                                    | Type                                                                                                          | Description                                                                      |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| <a id="property-forbidden"></a> `forbidden` | [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<`string`, `string`\> | A map from element name to the error message reported when that element is used. |

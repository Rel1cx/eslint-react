[@eslint-react/core](../README.md) / JsxDetectionHint

# Variable: JsxDetectionHint

```ts
JsxDetectionHint: {
  DoNotIncludeJsxWithBigIntValue: bigint;
  DoNotIncludeJsxWithBooleanValue: bigint;
  DoNotIncludeJsxWithCreateElementValue: bigint;
  DoNotIncludeJsxWithEmptyArrayValue: bigint;
  DoNotIncludeJsxWithNullValue: bigint;
  DoNotIncludeJsxWithNumberValue: bigint;
  DoNotIncludeJsxWithStringValue: bigint;
  DoNotIncludeJsxWithUndefinedValue: bigint;
  None: 0n;
  RequireAllArrayElementsToBeJsx: bigint;
  RequireBothBranchesOfConditionalExpressionToBeJsx: bigint;
  RequireBothSidesOfLogicalExpressionToBeJsx: bigint;
}
```

Hints for JSX detection.

## Type Declaration

| Name                                                                                                                        | Type     | Default value | Description                                                             |
| --------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ----------------------------------------------------------------------- |
| <a id="property-donotincludejsxwithbigintvalue"></a> `DoNotIncludeJsxWithBigIntValue`                                       | `bigint` | -             | Do not treat bigint values as JSX-like.                                 |
| <a id="property-donotincludejsxwithbooleanvalue"></a> `DoNotIncludeJsxWithBooleanValue`                                     | `bigint` | -             | Do not treat boolean values as JSX-like.                                |
| <a id="property-donotincludejsxwithcreateelementvalue"></a> `DoNotIncludeJsxWithCreateElementValue`                         | `bigint` | -             | Do not treat `createElement` calls as JSX-like.                         |
| <a id="property-donotincludejsxwithemptyarrayvalue"></a> `DoNotIncludeJsxWithEmptyArrayValue`                               | `bigint` | -             | Do not treat empty array values as JSX-like.                            |
| <a id="property-donotincludejsxwithnullvalue"></a> `DoNotIncludeJsxWithNullValue`                                           | `bigint` | -             | Do not treat `null` values as JSX-like.                                 |
| <a id="property-donotincludejsxwithnumbervalue"></a> `DoNotIncludeJsxWithNumberValue`                                       | `bigint` | -             | Do not treat number values as JSX-like.                                 |
| <a id="property-donotincludejsxwithstringvalue"></a> `DoNotIncludeJsxWithStringValue`                                       | `bigint` | -             | Do not treat string values as JSX-like.                                 |
| <a id="property-donotincludejsxwithundefinedvalue"></a> `DoNotIncludeJsxWithUndefinedValue`                                 | `bigint` | -             | Do not treat undefined values as JSX-like.                              |
| <a id="property-none"></a> `None`                                                                                           | `0n`     | `0n`          | No hints set.                                                           |
| <a id="property-requireallarrayelementstobejsx"></a> `RequireAllArrayElementsToBeJsx`                                       | `bigint` | -             | Require all array elements to be JSX-like for the array to be JSX-like. |
| <a id="property-requirebothbranchesofconditionalexpressiontobejsx"></a> `RequireBothBranchesOfConditionalExpressionToBeJsx` | `bigint` | -             | Require both branches of a conditional expression to be JSX-like.       |
| <a id="property-requirebothsidesoflogicalexpressiontobejsx"></a> `RequireBothSidesOfLogicalExpressionToBeJsx`               | `bigint` | -             | Require both sides of a logical expression to be JSX-like.              |

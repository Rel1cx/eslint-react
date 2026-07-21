[@eslint-react/core](../README.md) / FunctionComponentDetectionHint

# Variable: FunctionComponentDetectionHint

```ts
FunctionComponentDetectionHint: {
  DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback: bigint;
  DoNotIncludeFunctionDefinedAsArrayExpressionElement: bigint;
  DoNotIncludeFunctionDefinedAsArrayFlatMapCallback: bigint;
  DoNotIncludeFunctionDefinedAsArrayMapCallback: bigint;
  DoNotIncludeFunctionDefinedAsArrayPatternElement: bigint;
  DoNotIncludeFunctionDefinedAsClassMethod: bigint;
  DoNotIncludeFunctionDefinedAsClassProperty: bigint;
  DoNotIncludeFunctionDefinedAsObjectMethod: bigint;
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

Hints for component collector.

## Type Declaration

| Name                                                                                                                                              | Type     | Default value | Description                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ------------------------------------------------------------------------------------------ |
| <a id="property-donotincludefunctiondefinedasarbitrarycallexpressioncallback"></a> `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback` | `bigint` | -             | Exclude functions defined as arbitrary call expression callbacks from component detection. |
| <a id="property-donotincludefunctiondefinedasarrayexpressionelement"></a> `DoNotIncludeFunctionDefinedAsArrayExpressionElement`                   | `bigint` | -             | Exclude functions defined as array expression elements from component detection.           |
| <a id="property-donotincludefunctiondefinedasarrayflatmapcallback"></a> `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`                       | `bigint` | -             | Exclude functions defined as array flatMap callbacks from component detection.             |
| <a id="property-donotincludefunctiondefinedasarraymapcallback"></a> `DoNotIncludeFunctionDefinedAsArrayMapCallback`                               | `bigint` | -             | Exclude functions defined as array map callbacks from component detection.                 |
| <a id="property-donotincludefunctiondefinedasarraypatternelement"></a> `DoNotIncludeFunctionDefinedAsArrayPatternElement`                         | `bigint` | -             | Exclude functions defined as array pattern elements from component detection.              |
| <a id="property-donotincludefunctiondefinedasclassmethod"></a> `DoNotIncludeFunctionDefinedAsClassMethod`                                         | `bigint` | -             | Exclude functions defined as class methods from component detection.                       |
| <a id="property-donotincludefunctiondefinedasclassproperty"></a> `DoNotIncludeFunctionDefinedAsClassProperty`                                     | `bigint` | -             | Exclude functions defined as class properties from component detection.                    |
| <a id="property-donotincludefunctiondefinedasobjectmethod"></a> `DoNotIncludeFunctionDefinedAsObjectMethod`                                       | `bigint` | -             | Exclude functions defined as object methods from component detection.                      |
| <a id="property-donotincludejsxwithbigintvalue"></a> `DoNotIncludeJsxWithBigIntValue`                                                             | `bigint` | -             | Do not treat bigint values as JSX-like.                                                    |
| <a id="property-donotincludejsxwithbooleanvalue"></a> `DoNotIncludeJsxWithBooleanValue`                                                           | `bigint` | -             | Do not treat boolean values as JSX-like.                                                   |
| <a id="property-donotincludejsxwithcreateelementvalue"></a> `DoNotIncludeJsxWithCreateElementValue`                                               | `bigint` | -             | Do not treat `createElement` calls as JSX-like.                                            |
| <a id="property-donotincludejsxwithemptyarrayvalue"></a> `DoNotIncludeJsxWithEmptyArrayValue`                                                     | `bigint` | -             | Do not treat empty array values as JSX-like.                                               |
| <a id="property-donotincludejsxwithnullvalue"></a> `DoNotIncludeJsxWithNullValue`                                                                 | `bigint` | -             | Do not treat `null` values as JSX-like.                                                    |
| <a id="property-donotincludejsxwithnumbervalue"></a> `DoNotIncludeJsxWithNumberValue`                                                             | `bigint` | -             | Do not treat number values as JSX-like.                                                    |
| <a id="property-donotincludejsxwithstringvalue"></a> `DoNotIncludeJsxWithStringValue`                                                             | `bigint` | -             | Do not treat string values as JSX-like.                                                    |
| <a id="property-donotincludejsxwithundefinedvalue"></a> `DoNotIncludeJsxWithUndefinedValue`                                                       | `bigint` | -             | Do not treat undefined values as JSX-like.                                                 |
| <a id="property-none"></a> `None`                                                                                                                 | `0n`     | `0n`          | No hints set.                                                                              |
| <a id="property-requireallarrayelementstobejsx"></a> `RequireAllArrayElementsToBeJsx`                                                             | `bigint` | -             | Require all array elements to be JSX-like for the array to be JSX-like.                    |
| <a id="property-requirebothbranchesofconditionalexpressiontobejsx"></a> `RequireBothBranchesOfConditionalExpressionToBeJsx`                       | `bigint` | -             | Require both branches of a conditional expression to be JSX-like.                          |
| <a id="property-requirebothsidesoflogicalexpressiontobejsx"></a> `RequireBothSidesOfLogicalExpressionToBeJsx`                                     | `bigint` | -             | Require both sides of a logical expression to be JSX-like.                                 |

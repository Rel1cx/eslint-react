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
  DoNotIncludeJSXWithBigIntValue: bigint;
  DoNotIncludeJSXWithBooleanValue: bigint;
  DoNotIncludeJSXWithCreateElementValue: bigint;
  DoNotIncludeJSXWithEmptyArrayValue: bigint;
  DoNotIncludeJSXWithNullValue: bigint;
  DoNotIncludeJSXWithNumberValue: bigint;
  DoNotIncludeJSXWithStringValue: bigint;
  DoNotIncludeJSXWithUndefinedValue: bigint;
  None: 0n;
  RequireAllArrayElementsToBeJSX: bigint;
  RequireBothBranchesOfConditionalExpressionToBeJSX: bigint;
  RequireBothSidesOfLogicalExpressionToBeJSX: bigint;
}
```

Hints for component collector.

## Type Declaration

| Name                                                                                                                                              | Type     | Default value | Description                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- | ---------------------------------------------------------------------------------------------------- |
| <a id="property-donotincludefunctiondefinedasarbitrarycallexpressioncallback"></a> `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback` | `bigint` | -             | Exclude anonymous functions defined as arbitrary call expression callbacks from component detection. |
| <a id="property-donotincludefunctiondefinedasarrayexpressionelement"></a> `DoNotIncludeFunctionDefinedAsArrayExpressionElement`                   | `bigint` | -             | Exclude functions defined as array expression elements from component detection.                     |
| <a id="property-donotincludefunctiondefinedasarrayflatmapcallback"></a> `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`                       | `bigint` | -             | Exclude functions defined as array flatMap callbacks (named or anonymous) from component detection.  |
| <a id="property-donotincludefunctiondefinedasarraymapcallback"></a> `DoNotIncludeFunctionDefinedAsArrayMapCallback`                               | `bigint` | -             | Exclude functions defined as array map callbacks (named or anonymous) from component detection.      |
| <a id="property-donotincludefunctiondefinedasarraypatternelement"></a> `DoNotIncludeFunctionDefinedAsArrayPatternElement`                         | `bigint` | -             | Exclude functions defined as array pattern elements from component detection.                        |
| <a id="property-donotincludefunctiondefinedasclassmethod"></a> `DoNotIncludeFunctionDefinedAsClassMethod`                                         | `bigint` | -             | Exclude functions defined as class methods from component detection.                                 |
| <a id="property-donotincludefunctiondefinedasclassproperty"></a> `DoNotIncludeFunctionDefinedAsClassProperty`                                     | `bigint` | -             | Exclude functions defined as class properties from component detection.                              |
| <a id="property-donotincludefunctiondefinedasobjectmethod"></a> `DoNotIncludeFunctionDefinedAsObjectMethod`                                       | `bigint` | -             | Exclude functions defined as object methods from component detection.                                |
| <a id="property-donotincludejsxwithbigintvalue"></a> `DoNotIncludeJSXWithBigIntValue`                                                             | `bigint` | -             | Do not treat bigint values as JSX-like.                                                              |
| <a id="property-donotincludejsxwithbooleanvalue"></a> `DoNotIncludeJSXWithBooleanValue`                                                           | `bigint` | -             | Do not treat boolean values as JSX-like.                                                             |
| <a id="property-donotincludejsxwithcreateelementvalue"></a> `DoNotIncludeJSXWithCreateElementValue`                                               | `bigint` | -             | Do not treat `createElement` calls as JSX-like.                                                      |
| <a id="property-donotincludejsxwithemptyarrayvalue"></a> `DoNotIncludeJSXWithEmptyArrayValue`                                                     | `bigint` | -             | Do not treat empty array values as JSX-like.                                                         |
| <a id="property-donotincludejsxwithnullvalue"></a> `DoNotIncludeJSXWithNullValue`                                                                 | `bigint` | -             | Do not treat `null` values as JSX-like.                                                              |
| <a id="property-donotincludejsxwithnumbervalue"></a> `DoNotIncludeJSXWithNumberValue`                                                             | `bigint` | -             | Do not treat number values as JSX-like.                                                              |
| <a id="property-donotincludejsxwithstringvalue"></a> `DoNotIncludeJSXWithStringValue`                                                             | `bigint` | -             | Do not treat string values as JSX-like.                                                              |
| <a id="property-donotincludejsxwithundefinedvalue"></a> `DoNotIncludeJSXWithUndefinedValue`                                                       | `bigint` | -             | Do not treat undefined values as JSX-like.                                                           |
| <a id="property-none"></a> `None`                                                                                                                 | `0n`     | `0n`          | No hints set.                                                                                        |
| <a id="property-requireallarrayelementstobejsx"></a> `RequireAllArrayElementsToBeJSX`                                                             | `bigint` | -             | Require all array elements to be JSX-like for the array to be JSX-like.                              |
| <a id="property-requirebothbranchesofconditionalexpressiontobejsx"></a> `RequireBothBranchesOfConditionalExpressionToBeJSX`                       | `bigint` | -             | Require both branches of a conditional expression to be JSX-like.                                    |
| <a id="property-requirebothsidesoflogicalexpressiontobejsx"></a> `RequireBothSidesOfLogicalExpressionToBeJSX`                                     | `bigint` | -             | Require both sides of a logical expression to be JSX-like.                                           |

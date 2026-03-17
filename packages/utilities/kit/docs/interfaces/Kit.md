[@eslint-react/kit](../README.md) / Kit

# Interface: Kit

A structured core passed as the second argument to a rule's `make`
function. Members are organized by domain rather than presented as a
flat namespace.

For the most common use-cases (collecting components or hooks) you can
import [components](#property-collect) or [hooks](#property-collect) directly — they are also
available here as `kit.collect.components` / `kit.collect.hooks`.

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-collect"></a> `collect` | `public` | \{ `components`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`Collector`](Collector.md)\<`FunctionComponentSemanticNode`\>; `hooks`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`Collector`](Collector.md)\<`HookSemanticNode`\>; \} | Collector factories for semantic analysis. |
| `collect.components` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`Collector`](Collector.md)\<`FunctionComponentSemanticNode`\> | Alias for the top-level [components](#property-collect) function. |
| `collect.hooks` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`Collector`](Collector.md)\<`HookSemanticNode`\> | Alias for the top-level [hooks](#property-collect) function. |
| <a id="property-flag"></a> `flag` | `public` | \{ `component`: \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \}; \} | Component flag bit-flags. |
| `flag.component` | `public` | \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \} | Flags indicating component characteristics (Memo, ForwardRef, etc.). |
| `flag.component.CreateElement` | `public` | `bigint` | Indicates the component creates elements using `createElement` instead of JSX |
| `flag.component.ForwardRef` | `public` | `bigint` | - |
| `flag.component.Memo` | `public` | `bigint` | - |
| `flag.component.None` | `public` | `bigint` | - |
| `flag.component.PureComponent` | `public` | `bigint` | - |
| <a id="property-hint"></a> `hint` | `public` | \{ `component`: \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \}; `defaultComponent`: `bigint`; \} | Component detection hint bit-flags. |
| `hint.component` | `public` | \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \} | All available hint flags — use bitwise operations to combine. |
| `hint.component.DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsArrayExpressionElement` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsArrayFlatMapCallback` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsArrayMapCallback` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsArrayPatternElement` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsClassMethod` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsClassProperty` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeFunctionDefinedAsObjectMethod` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithBigIntValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithBooleanValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithCreateElementValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithEmptyArrayValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithNullValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithNumberValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithStringValue` | `readonly` | `bigint` | - |
| `hint.component.DoNotIncludeJsxWithUndefinedValue` | `readonly` | `bigint` | - |
| `hint.component.None` | `readonly` | `0n` | - |
| `hint.component.RequireAllArrayElementsToBeJsx` | `readonly` | `bigint` | - |
| `hint.component.RequireBothBranchesOfConditionalExpressionToBeJsx` | `readonly` | `bigint` | - |
| `hint.component.RequireBothSidesOfLogicalExpressionToBeJsx` | `readonly` | `bigint` | - |
| `hint.defaultComponent` | `public` | `bigint` | The default hint used when none is specified. |
| <a id="property-is"></a> `is` | `public` | \{ `componentDefinition`: (`context`: `RuleContext`, `node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean`; `componentName`: (`name`: `string`) => `boolean`; `componentNameLoose`: (`name`: `string`) => `boolean`; `hook`: (`node`: `TSESTreeFunction` \| `null`) => `boolean`; `hookCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `hookName`: (`name`: `string`) => `boolean`; `initializedFromReact`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `initializedFromReactNative`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `reactAPI`: (`api`: `string`) => `ReturnType`; `reactAPICall`: (`api`: `string`) => `ReturnType`; \} | Predicate functions for identifying React-specific AST patterns. |
| `is.componentDefinition` | `public` | (`context`: `RuleContext`, `node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean` | Checks whether a function node qualifies as a component definition under the given hint. |
| `is.componentName` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the strict PascalCase component naming convention. |
| `is.componentNameLoose` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the loose component naming convention. |
| `is.hook` | `public` | (`node`: `TSESTreeFunction` \| `null`) => `boolean` | Checks whether a function node is a React hook (based on its name). |
| `is.hookCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | Checks whether a node is a React hook call. |
| `is.hookName` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the hook naming convention (`use` prefix). |
| `is.initializedFromReact` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | Checks whether a variable is initialized from a React import. |
| `is.initializedFromReactNative` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | Checks whether a variable is initialized from a React Native import. |
| `is.reactAPI` | `public` | (`api`: `string`) => `ReturnType` | Factory: creates a predicate that checks whether a node is a given React API (e.g. `"memo"`). |
| `is.reactAPICall` | `public` | (`api`: `string`) => `ReturnType` | Factory: creates a predicate that checks whether a node is a call to a given React API. |

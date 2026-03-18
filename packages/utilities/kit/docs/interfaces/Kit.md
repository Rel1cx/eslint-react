[@eslint-react/kit](../README.md) / Kit

# Interface: Kit

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-collect"></a> `collect` | `public` | \{ `components`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<`FunctionComponentSemanticNode`, `FunctionComponentSemanticNode`\>; `hooks`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<`HookSemanticNode`, \{ `key`: `string`; `node`: `Node`; \}\>; \} | - |
| `collect.components` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<`FunctionComponentSemanticNode`, `FunctionComponentSemanticNode`\> | - |
| `collect.hooks` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<`HookSemanticNode`, \{ `key`: `string`; `node`: `Node`; \}\> | - |
| <a id="property-find"></a> `find` | `public` | \{ `parent`: \{ \<`A`\> (`node`: `Node` \| `null`, `test`: (`n`: `Node`) => `n is A`): `A` \| `null`; (`node`: `Node` \| `null`, `test`: (`node`: `Node`) => `boolean`): `Node` \| `null`; \}; \} | - |
| `find.parent` | `public` | \{ \<`A`\> (`node`: `Node` \| `null`, `test`: (`n`: `Node`) => `n is A`): `A` \| `null`; (`node`: `Node` \| `null`, `test`: (`node`: `Node`) => `boolean`): `Node` \| `null`; \} | - |
| <a id="property-flag"></a> `flag` | `public` | \{ `component`: \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \}; \} | - |
| `flag.component` | `public` | \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \} | - |
| `flag.component.CreateElement` | `public` | `bigint` | Indicates the component creates elements using `createElement` instead of JSX |
| `flag.component.ForwardRef` | `public` | `bigint` | - |
| `flag.component.Memo` | `public` | `bigint` | - |
| `flag.component.None` | `public` | `bigint` | - |
| `flag.component.PureComponent` | `public` | `bigint` | - |
| <a id="property-hint"></a> `hint` | `public` | \{ `component`: \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \}; `defaultComponent`: `bigint`; \} | - |
| `hint.component` | `public` | \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \} | - |
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
| `hint.defaultComponent` | `public` | `bigint` | - |
| <a id="property-is"></a> `is` | `public` | \{ `captureOwnerStack`: (`node`: `Node` \| `null`) => `boolean`; `captureOwnerStackCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenCount`: (`node`: `Node` \| `null`) => `boolean`; `childrenCountCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenForEach`: (`node`: `Node` \| `null`) => `boolean`; `childrenForEachCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenMap`: (`node`: `Node` \| `null`) => `boolean`; `childrenMapCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenOnly`: (`node`: `Node` \| `null`) => `boolean`; `childrenOnlyCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenToArray`: (`node`: `Node` \| `null`) => `boolean`; `childrenToArrayCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `cloneElement`: (`node`: `Node` \| `null`) => `boolean`; `cloneElementCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `componentDefinition`: (`node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean`; `componentName`: (`name`: `string`) => `boolean`; `componentNameLoose`: (`name`: `string`) => `boolean`; `componentWrapperCall`: (`node`: `Node`) => `boolean`; `componentWrapperCallback`: (`node`: `Node`) => `boolean`; `componentWrapperCallLoose`: (`node`: `Node`) => `boolean`; `createContext`: (`node`: `Node` \| `null`) => `boolean`; `createContextCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `createElement`: (`node`: `Node` \| `null`) => `boolean`; `createElementCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `createRef`: (`node`: `Node` \| `null`) => `boolean`; `createRefCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `forwardRef`: (`node`: `Node` \| `null`) => `boolean`; `forwardRefCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `function`: (`node`: `Node` \| `null` \| `undefined`) => node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression; `hook`: (`node`: `TSESTreeFunction` \| `null`) => `boolean`; `hookCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `hookName`: (`name`: `string`) => `boolean`; `initializedFromReact`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `initializedFromReactNative`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `lazy`: (`node`: `Node` \| `null`) => `boolean`; `lazyCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `memo`: (`node`: `Node` \| `null`) => `boolean`; `memoCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `reactAPI`: (`api`: `string`) => (`node`: `Node` \| `null`) => `boolean`; `reactAPICall`: (`api`: `string`) => (`node`: `Node` \| `null`) => `node is CallExpression`; `useActionStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useCall`: (`node`: `Node` \| `null`) => `boolean`; `useCallbackCall`: (`node`: `Node` \| `null`) => `boolean`; `useContextCall`: (`node`: `Node` \| `null`) => `boolean`; `useDebugValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useDeferredValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCleanupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useEffectLikeCall`: (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression`; `useEffectSetupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useFormStatusCall`: (`node`: `Node` \| `null`) => `boolean`; `useIdCall`: (`node`: `Node` \| `null`) => `boolean`; `useImperativeHandleCall`: (`node`: `Node` \| `null`) => `boolean`; `useInsertionEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useLayoutEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useMemoCall`: (`node`: `Node` \| `null`) => `boolean`; `useOptimisticCall`: (`node`: `Node` \| `null`) => `boolean`; `useReducerCall`: (`node`: `Node` \| `null`) => `boolean`; `useRefCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateLikeCall`: (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression`; `useSyncExternalStoreCall`: (`node`: `Node` \| `null`) => `boolean`; `useTransitionCall`: (`node`: `Node` \| `null`) => `boolean`; \} | - |
| `is.captureOwnerStack` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.captureOwnerStackCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenCount` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenCountCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenForEach` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenForEachCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenMap` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenMapCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenOnly` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenOnlyCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenToArray` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenToArrayCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.cloneElement` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.cloneElementCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.componentDefinition` | `public` | (`node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean` | - |
| `is.componentName` | `public` | (`name`: `string`) => `boolean` | - |
| `is.componentNameLoose` | `public` | (`name`: `string`) => `boolean` | - |
| `is.componentWrapperCall` | `public` | (`node`: `Node`) => `boolean` | - |
| `is.componentWrapperCallback` | `public` | (`node`: `Node`) => `boolean` | - |
| `is.componentWrapperCallLoose` | `public` | (`node`: `Node`) => `boolean` | - |
| `is.createContext` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createContextCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.createElement` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createElementCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.createRef` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createRefCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.forwardRef` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.forwardRefCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.function` | `public` | (`node`: `Node` \| `null` \| `undefined`) => node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression | - |
| `is.hook` | `public` | (`node`: `TSESTreeFunction` \| `null`) => `boolean` | - |
| `is.hookCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.hookName` | `public` | (`name`: `string`) => `boolean` | - |
| `is.initializedFromReact` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | - |
| `is.initializedFromReactNative` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | - |
| `is.lazy` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.lazyCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.memo` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.memoCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.reactAPI` | `public` | (`api`: `string`) => (`node`: `Node` \| `null`) => `boolean` | - |
| `is.reactAPICall` | `public` | (`api`: `string`) => (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.useActionStateCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useCallbackCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useContextCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useDebugValueCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useDeferredValueCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectCleanupCallback` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectLikeCall` | `public` | (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression` | - |
| `is.useEffectSetupCallback` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useFormStatusCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useIdCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useImperativeHandleCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useInsertionEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useLayoutEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useMemoCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useOptimisticCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useReducerCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useRefCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useStateCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useStateLikeCall` | `public` | (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression` | - |
| `is.useSyncExternalStoreCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useTransitionCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | - |

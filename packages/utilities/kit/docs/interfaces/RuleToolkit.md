[@eslint-react/kit](../README.md) / RuleToolkit

# Interface: RuleToolkit

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-collect"></a> `collect` | \{ `components`: (`ctx`: [`RuleContext`](RuleContext.md)\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<`FunctionComponentSemanticNode`\>; `hooks`: (`ctx`: [`RuleContext`](RuleContext.md)\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<`HookSemanticNode`\>; \} | - |
| `collect.components` | (`ctx`: [`RuleContext`](RuleContext.md)\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<`FunctionComponentSemanticNode`\> | - |
| `collect.hooks` | (`ctx`: [`RuleContext`](RuleContext.md)\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<`HookSemanticNode`\> | - |
| <a id="property-flag"></a> `flag` | \{ `component`: \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \}; \} | - |
| `flag.component` | \{ `CreateElement`: `bigint`; `ForwardRef`: `bigint`; `Memo`: `bigint`; `None`: `bigint`; `PureComponent`: `bigint`; \} | - |
| `flag.component.CreateElement` | `bigint` | Indicates the component creates elements using `createElement` instead of JSX |
| `flag.component.ForwardRef` | `bigint` | - |
| `flag.component.Memo` | `bigint` | - |
| `flag.component.None` | `bigint` | - |
| `flag.component.PureComponent` | `bigint` | - |
| <a id="property-hint"></a> `hint` | \{ `component`: \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \} & \{ `Default`: `bigint`; \}; \} | - |
| `hint.component` | \{ `DoNotIncludeFunctionDefinedAsArbitraryCallExpressionCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayExpressionElement`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayFlatMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayMapCallback`: `bigint`; `DoNotIncludeFunctionDefinedAsArrayPatternElement`: `bigint`; `DoNotIncludeFunctionDefinedAsClassMethod`: `bigint`; `DoNotIncludeFunctionDefinedAsClassProperty`: `bigint`; `DoNotIncludeFunctionDefinedAsObjectMethod`: `bigint`; `DoNotIncludeJsxWithBigIntValue`: `bigint`; `DoNotIncludeJsxWithBooleanValue`: `bigint`; `DoNotIncludeJsxWithCreateElementValue`: `bigint`; `DoNotIncludeJsxWithEmptyArrayValue`: `bigint`; `DoNotIncludeJsxWithNullValue`: `bigint`; `DoNotIncludeJsxWithNumberValue`: `bigint`; `DoNotIncludeJsxWithStringValue`: `bigint`; `DoNotIncludeJsxWithUndefinedValue`: `bigint`; `None`: `0n`; `RequireAllArrayElementsToBeJsx`: `bigint`; `RequireBothBranchesOfConditionalExpressionToBeJsx`: `bigint`; `RequireBothSidesOfLogicalExpressionToBeJsx`: `bigint`; \} & \{ `Default`: `bigint`; \} | - |
| <a id="property-is"></a> `is` | \{ `captureOwnerStack`: (`node`: `Node` \| `null`) => `boolean`; `captureOwnerStackCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenCount`: (`node`: `Node` \| `null`) => `boolean`; `childrenCountCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenForEach`: (`node`: `Node` \| `null`) => `boolean`; `childrenForEachCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenMap`: (`node`: `Node` \| `null`) => `boolean`; `childrenMapCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenOnly`: (`node`: `Node` \| `null`) => `boolean`; `childrenOnlyCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `childrenToArray`: (`node`: `Node` \| `null`) => `boolean`; `childrenToArrayCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `cloneElement`: (`node`: `Node` \| `null`) => `boolean`; `cloneElementCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `componentDefinition`: (`node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean`; `componentName`: (`name`: `string`) => `boolean`; `componentNameLoose`: (`name`: `string`) => `boolean`; `componentWrapperCall`: (`node`: `Node`) => `boolean`; `componentWrapperCallback`: (`node`: `Node`) => `boolean`; `componentWrapperCallLoose`: (`node`: `Node`) => `boolean`; `createContext`: (`node`: `Node` \| `null`) => `boolean`; `createContextCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `createElement`: (`node`: `Node` \| `null`) => `boolean`; `createElementCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `createRef`: (`node`: `Node` \| `null`) => `boolean`; `createRefCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `forwardRef`: (`node`: `Node` \| `null`) => `boolean`; `forwardRefCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `hook`: (`node`: `TSESTreeFunction` \| `null`) => `boolean`; `hookCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `hookName`: (`name`: `string`) => `boolean`; `initializedFromReact`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `initializedFromReactNative`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `lazy`: (`node`: `Node` \| `null`) => `boolean`; `lazyCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `memo`: (`node`: `Node` \| `null`) => `boolean`; `memoCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `reactAPI`: (`api`: `string`) => (`node`: `Node` \| `null`) => `boolean`; `reactAPICall`: (`api`: `string`) => (`node`: `Node` \| `null`) => `node is CallExpression`; `useActionStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useCall`: (`node`: `Node` \| `null`) => `boolean`; `useCallbackCall`: (`node`: `Node` \| `null`) => `boolean`; `useContextCall`: (`node`: `Node` \| `null`) => `boolean`; `useDebugValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useDeferredValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCleanupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useEffectLikeCall`: (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression`; `useEffectSetupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useFormStatusCall`: (`node`: `Node` \| `null`) => `boolean`; `useIdCall`: (`node`: `Node` \| `null`) => `boolean`; `useImperativeHandleCall`: (`node`: `Node` \| `null`) => `boolean`; `useInsertionEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useLayoutEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useMemoCall`: (`node`: `Node` \| `null`) => `boolean`; `useOptimisticCall`: (`node`: `Node` \| `null`) => `boolean`; `useReducerCall`: (`node`: `Node` \| `null`) => `boolean`; `useRefCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateLikeCall`: (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression`; `useSyncExternalStoreCall`: (`node`: `Node` \| `null`) => `boolean`; `useTransitionCall`: (`node`: `Node` \| `null`) => `boolean`; \} | - |
| `is.captureOwnerStack` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.captureOwnerStackCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenCount` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenCountCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenForEach` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenForEachCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenMap` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenMapCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenOnly` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenOnlyCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.childrenToArray` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.childrenToArrayCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.cloneElement` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.cloneElementCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.componentDefinition` | (`node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean` | - |
| `is.componentName` | (`name`: `string`) => `boolean` | - |
| `is.componentNameLoose` | (`name`: `string`) => `boolean` | - |
| `is.componentWrapperCall` | (`node`: `Node`) => `boolean` | - |
| `is.componentWrapperCallback` | (`node`: `Node`) => `boolean` | - |
| `is.componentWrapperCallLoose` | (`node`: `Node`) => `boolean` | - |
| `is.createContext` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createContextCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.createElement` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createElementCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.createRef` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.createRefCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.forwardRef` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.forwardRefCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.hook` | (`node`: `TSESTreeFunction` \| `null`) => `boolean` | - |
| `is.hookCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.hookName` | (`name`: `string`) => `boolean` | - |
| `is.initializedFromReact` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | - |
| `is.initializedFromReactNative` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | - |
| `is.lazy` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.lazyCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.memo` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.memoCall` | (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.reactAPI` | (`api`: `string`) => (`node`: `Node` \| `null`) => `boolean` | - |
| `is.reactAPICall` | (`api`: `string`) => (`node`: `Node` \| `null`) => `node is CallExpression` | - |
| `is.useActionStateCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useCallbackCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useContextCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useDebugValueCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useDeferredValueCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectCleanupCallback` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useEffectLikeCall` | (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression` | - |
| `is.useEffectSetupCallback` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useFormStatusCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useIdCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useImperativeHandleCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useInsertionEffectCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useLayoutEffectCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useMemoCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useOptimisticCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useReducerCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useRefCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useStateCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useStateLikeCall` | (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression` | - |
| `is.useSyncExternalStoreCall` | (`node`: `Node` \| `null`) => `boolean` | - |
| `is.useTransitionCall` | (`node`: `Node` \| `null`) => `boolean` | - |

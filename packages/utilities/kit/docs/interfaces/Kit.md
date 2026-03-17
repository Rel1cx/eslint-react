[@eslint-react/kit](../README.md) / Kit

# Interface: Kit

## Properties

| Property | Modifier | Type | Description |
| ------ | ------ | ------ | ------ |
| <a id="property-collect"></a> `collect` | `public` | \{ `components`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<[`FunctionComponentSemanticNode`](FunctionComponentSemanticNode.md), [`FunctionComponentSemanticNode`](FunctionComponentSemanticNode.md)\>; `hooks`: (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<[`HookSemanticNode`](HookSemanticNode.md), \{ `key`: `string`; `node`: `Node`; \}\>; \} | Collector factories for semantic analysis. |
| `collect.components` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>, `options?`: \{ `collectDisplayName?`: `boolean`; `hint?`: `bigint`; \}) => [`CollectorWithContext`](CollectorWithContext.md)\<[`FunctionComponentSemanticNode`](FunctionComponentSemanticNode.md), [`FunctionComponentSemanticNode`](FunctionComponentSemanticNode.md)\> | Collects React function components. Returns a [CollectorWithContext](CollectorWithContext.md). |
| `collect.hooks` | `public` | (`ctx`: `RuleContext`\<`string`, `unknown`[]\>) => [`CollectorWithContext`](CollectorWithContext.md)\<[`HookSemanticNode`](HookSemanticNode.md), \{ `key`: `string`; `node`: `Node`; \}\> | Collects React hooks. Returns a [CollectorWithContext](CollectorWithContext.md). |
| <a id="property-find"></a> `find` | `public` | \{ `parent`: \{ \<`A`\> (`node`: `Node` \| `null`, `test`: (`n`: `Node`) => `n is A`): `A` \| `null`; (`node`: `Node` \| `null`, `test`: (`node`: `Node`) => `boolean`): `Node` \| `null`; \}; \} | - |
| `find.parent` | `public` | \{ \<`A`\> (`node`: `Node` \| `null`, `test`: (`n`: `Node`) => `n is A`): `A` \| `null`; (`node`: `Node` \| `null`, `test`: (`node`: `Node`) => `boolean`): `Node` \| `null`; \} | - |
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
| <a id="property-is"></a> `is` | `public` | \{ `captureOwnerStack`: `ReturnType`; `captureOwnerStackCall`: `ReturnType`; `childrenCount`: `ReturnType`; `childrenCountCall`: `ReturnType`; `childrenForEach`: `ReturnType`; `childrenForEachCall`: `ReturnType`; `childrenMap`: `ReturnType`; `childrenMapCall`: `ReturnType`; `childrenOnly`: `ReturnType`; `childrenOnlyCall`: `ReturnType`; `childrenToArray`: `ReturnType`; `childrenToArrayCall`: `ReturnType`; `cloneElement`: `ReturnType`; `cloneElementCall`: `ReturnType`; `componentDefinition`: (`context`: `RuleContext`, `node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean`; `componentName`: (`name`: `string`) => `boolean`; `componentNameLoose`: (`name`: `string`) => `boolean`; `componentWrapperCall`: (`context`: `RuleContext`, `node`: `Node`) => `boolean`; `componentWrapperCallback`: (`context`: `RuleContext`, `node`: `Node`) => `boolean`; `componentWrapperCallLoose`: (`context`: `RuleContext`, `node`: `Node`) => `boolean`; `createContext`: `ReturnType`; `createContextCall`: `ReturnType`; `createElement`: `ReturnType`; `createElementCall`: `ReturnType`; `forwardRef`: `ReturnType`; `forwardRefCall`: `ReturnType`; `function`: (`node`: `Node` \| `null` \| `undefined`) => node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression; `hook`: (`node`: `TSESTreeFunction` \| `null`) => `boolean`; `hookCall`: (`node`: `Node` \| `null`) => `node is CallExpression`; `hookName`: (`name`: `string`) => `boolean`; `initializedFromReact`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `initializedFromReactNative`: (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean`; `lazy`: `ReturnType`; `lazyCall`: `ReturnType`; `memo`: `ReturnType`; `memoCall`: `ReturnType`; `reactAPI`: (`api`: `string`) => `ReturnType`; `reactAPICall`: (`api`: `string`) => `ReturnType`; `useActionStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useCall`: (`node`: `Node` \| `null`) => `boolean`; `useCallbackCall`: (`node`: `Node` \| `null`) => `boolean`; `useContextCall`: (`node`: `Node` \| `null`) => `boolean`; `useDebugValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useDeferredValueCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useEffectCleanupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useEffectLikeCall`: (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression`; `useEffectSetupCallback`: (`node`: `Node` \| `null`) => `boolean`; `useFormStatusCall`: (`node`: `Node` \| `null`) => `boolean`; `useIdCall`: (`node`: `Node` \| `null`) => `boolean`; `useImperativeHandleCall`: (`node`: `Node` \| `null`) => `boolean`; `useInsertionEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useLayoutEffectCall`: (`node`: `Node` \| `null`) => `boolean`; `useMemoCall`: (`node`: `Node` \| `null`) => `boolean`; `useOptimisticCall`: (`node`: `Node` \| `null`) => `boolean`; `useReducerCall`: (`node`: `Node` \| `null`) => `boolean`; `useRefCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateCall`: (`node`: `Node` \| `null`) => `boolean`; `useStateLikeCall`: (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression`; `useSyncExternalStoreCall`: (`node`: `Node` \| `null`) => `boolean`; `useTransitionCall`: (`node`: `Node` \| `null`) => `boolean`; \} | - |
| `is.captureOwnerStack` | `public` | `ReturnType` | Checks for `captureOwnerStack` identifiers. |
| `is.captureOwnerStackCall` | `public` | `ReturnType` | Checks for `captureOwnerStack(...)` calls. |
| `is.childrenCount` | `public` | `ReturnType` | Checks for `Children.count` identifiers. |
| `is.childrenCountCall` | `public` | `ReturnType` | Checks for `Children.count(...)` calls. |
| `is.childrenForEach` | `public` | `ReturnType` | Checks for `Children.forEach` identifiers. |
| `is.childrenForEachCall` | `public` | `ReturnType` | Checks for `Children.forEach(...)` calls. |
| `is.childrenMap` | `public` | `ReturnType` | Checks for `Children.map` identifiers. |
| `is.childrenMapCall` | `public` | `ReturnType` | Checks for `Children.map(...)` calls. |
| `is.childrenOnly` | `public` | `ReturnType` | Checks for `Children.only` identifiers. |
| `is.childrenOnlyCall` | `public` | `ReturnType` | Checks for `Children.only(...)` calls. |
| `is.childrenToArray` | `public` | `ReturnType` | Checks for `Children.toArray` identifiers. |
| `is.childrenToArrayCall` | `public` | `ReturnType` | Checks for `Children.toArray(...)` calls. |
| `is.cloneElement` | `public` | `ReturnType` | Checks for `cloneElement` identifiers. |
| `is.cloneElementCall` | `public` | `ReturnType` | Checks for `cloneElement(...)` calls. |
| `is.componentDefinition` | `public` | (`context`: `RuleContext`, `node`: `TSESTreeFunction`, `hint`: `bigint`) => `boolean` | Checks whether a function node qualifies as a component definition under the given hint. |
| `is.componentName` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the strict PascalCase component naming convention. |
| `is.componentNameLoose` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the loose component naming convention. |
| `is.componentWrapperCall` | `public` | (`context`: `RuleContext`, `node`: `Node`) => `boolean` | Checks whether a node is a call to `React.memo` or `React.forwardRef`. |
| `is.componentWrapperCallback` | `public` | (`context`: `RuleContext`, `node`: `Node`) => `boolean` | Checks whether a function node is the callback passed to a component wrapper. |
| `is.componentWrapperCallLoose` | `public` | (`context`: `RuleContext`, `node`: `Node`) => `boolean` | Like `componentWrapperCall` but also matches `useCallback`. |
| `is.createContext` | `public` | `ReturnType` | Checks for `createContext` identifiers. |
| `is.createContextCall` | `public` | `ReturnType` | Checks for `createContext(...)` calls. |
| `is.createElement` | `public` | `ReturnType` | Checks for `createElement` identifiers. |
| `is.createElementCall` | `public` | `ReturnType` | Checks for `createElement(...)` calls. |
| `is.forwardRef` | `public` | `ReturnType` | Checks for `forwardRef` identifiers. |
| `is.forwardRefCall` | `public` | `ReturnType` | Checks for `forwardRef(...)` calls. |
| `is.function` | `public` | (`node`: `Node` \| `null` \| `undefined`) => node is ArrowFunctionExpression \| FunctionDeclarationWithName \| FunctionDeclarationWithOptionalName \| FunctionExpression | Checks whether a node is a function. |
| `is.hook` | `public` | (`node`: `TSESTreeFunction` \| `null`) => `boolean` | Checks whether a function node is a React hook (based on its name). |
| `is.hookCall` | `public` | (`node`: `Node` \| `null`) => `node is CallExpression` | Checks whether a node is a React hook call. |
| `is.hookName` | `public` | (`name`: `string`) => `boolean` | Checks whether a name matches the hook naming convention (`use` prefix). |
| `is.initializedFromReact` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | Checks whether a variable is initialized from a React import. |
| `is.initializedFromReactNative` | `public` | (`name`: `string`, `initialScope`: `Scope`, `importSource?`: `string`) => `boolean` | Checks whether a variable is initialized from a React Native import. |
| `is.lazy` | `public` | `ReturnType` | Checks for `lazy` identifiers. |
| `is.lazyCall` | `public` | `ReturnType` | Checks for `lazy(...)` calls. |
| `is.memo` | `public` | `ReturnType` | Checks for `memo` identifiers. |
| `is.memoCall` | `public` | `ReturnType` | Checks for `memo(...)` calls. |
| `is.reactAPI` | `public` | (`api`: `string`) => `ReturnType` | Factory: creates a predicate that checks whether a node is a given React API (e.g. `"memo"`). Supports both data-first and data-last calling conventions. |
| `is.reactAPICall` | `public` | (`api`: `string`) => `ReturnType` | Factory: creates a predicate that checks whether a node is a call to a given React API. Supports both data-first and data-last calling conventions. |
| `is.useActionStateCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useActionState(...)` calls. |
| `is.useCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `use(...)` calls. |
| `is.useCallbackCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useCallback(...)` calls. |
| `is.useContextCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useContext(...)` calls. |
| `is.useDebugValueCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useDebugValue(...)` calls. |
| `is.useDeferredValueCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useDeferredValue(...)` calls. |
| `is.useEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useEffect(...)` calls. |
| `is.useEffectCleanupCallback` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks whether a node is the cleanup callback of a useEffect-like hook. |
| `is.useEffectLikeCall` | `public` | (`node`: `Node` \| `null`, `additionalEffectHooks?`: `RegExpLike`) => `node is CallExpression` | Checks whether a node is a call to a useEffect-like hook. |
| `is.useEffectSetupCallback` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks whether a node is the setup callback of a useEffect-like hook. |
| `is.useFormStatusCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useFormStatus(...)` calls. |
| `is.useIdCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useId(...)` calls. |
| `is.useImperativeHandleCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useImperativeHandle(...)` calls. |
| `is.useInsertionEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useInsertionEffect(...)` calls. |
| `is.useLayoutEffectCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useLayoutEffect(...)` calls. |
| `is.useMemoCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useMemo(...)` calls. |
| `is.useOptimisticCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useOptimistic(...)` calls. |
| `is.useReducerCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useReducer(...)` calls. |
| `is.useRefCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useRef(...)` calls. |
| `is.useStateCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useState(...)` calls. |
| `is.useStateLikeCall` | `public` | (`node`: `Node` \| `null`, `additionalStateHooks?`: `RegExpLike`) => `node is CallExpression` | Checks whether a node is a call to a useState-like hook. |
| `is.useSyncExternalStoreCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useSyncExternalStore(...)` calls. |
| `is.useTransitionCall` | `public` | (`node`: `Node` \| `null`) => `boolean` | Checks for `useTransition(...)` calls. |

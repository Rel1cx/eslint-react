# @eslint-react/core

## Namespaces

| Namespace | Description |
| ------ | ------ |
| [~~getClassComponentCollector~~](@eslint-react/namespaces/getClassComponentCollector/README.md) | - |
| [getFunctionComponentCollector](@eslint-react/namespaces/getFunctionComponentCollector/README.md) | - |
| [getHookCollector](@eslint-react/namespaces/getHookCollector/README.md) | - |
| [isAPI](@eslint-react/namespaces/isAPI/README.md) | - |
| [isAPICall](@eslint-react/namespaces/isAPICall/README.md) | - |

## Interfaces

| Interface | Description |
| ------ | ------ |
| [~~ClassComponentSemanticNode~~](interfaces/ClassComponentSemanticNode.md) | - |
| [ClientFunctionSemanticNode](interfaces/ClientFunctionSemanticNode.md) | Represents a client function semantic node. |
| [FunctionComponentSemanticNode](interfaces/FunctionComponentSemanticNode.md) | Represents a React Function Component |
| [HookSemanticNode](interfaces/HookSemanticNode.md) | Represents a semantic hook node in the AST |
| [JsxConfig](interfaces/JsxConfig.md) | Resolved JSX configuration derived from compiler options and / or pragma annotations found in the source file. |
| [SemanticFunc](interfaces/SemanticFunc.md) | Represents a semantic function node in the AST This interface extends SemanticNode and provides additional properties for function analysis |
| [SemanticNode](interfaces/SemanticNode.md) | Represents a semantic node in the AST This is the base interface for all semantic nodes in the React semantic analysis |
| [ServerFunctionSemanticNode](interfaces/ServerFunctionSemanticNode.md) | Represents a server function semantic node. |

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [FunctionComponentDetectionHint](type-aliases/FunctionComponentDetectionHint.md) | Hints for component collector |
| [FunctionDisplayNameAssignment](type-aliases/FunctionDisplayNameAssignment.md) | - |
| [FunctionID](type-aliases/FunctionID.md) | Type representing the return type of `getFunctionId`. |
| [FunctionInitPath](type-aliases/FunctionInitPath.md) | Represents various AST paths for function declarations. Each tuple type represents a specific function definition pattern. |
| [FunctionKind](type-aliases/FunctionKind.md) | Represents the kind of a function. |
| [FunctionSemanticNode](type-aliases/FunctionSemanticNode.md) | Represents a function semantic node. |
| [JsxDetectionHint](type-aliases/JsxDetectionHint.md) | BitFlags for configuring JSX detection behavior. |
| [TypeVariant](type-aliases/TypeVariant.md) | - |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_COMPONENT\_DETECTION\_HINT](variables/DEFAULT_COMPONENT_DETECTION_HINT.md) | Default component detection hint |
| [DEFAULT\_JSX\_DETECTION\_HINT](variables/DEFAULT_JSX_DETECTION_HINT.md) | Default JSX detection configuration. |
| [FunctionComponentDetectionHint](variables/FunctionComponentDetectionHint.md) | Hints for component collector |
| [FunctionComponentFlag](variables/FunctionComponentFlag.md) | Component flag constants |
| [isCaptureOwnerStack](variables/isCaptureOwnerStack.md) | - |
| [isCaptureOwnerStackCall](variables/isCaptureOwnerStackCall.md) | - |
| [isChildrenCount](variables/isChildrenCount.md) | - |
| [isChildrenCountCall](variables/isChildrenCountCall.md) | - |
| [isChildrenForEach](variables/isChildrenForEach.md) | - |
| [isChildrenForEachCall](variables/isChildrenForEachCall.md) | - |
| [isChildrenMap](variables/isChildrenMap.md) | - |
| [isChildrenMapCall](variables/isChildrenMapCall.md) | - |
| [isChildrenOnly](variables/isChildrenOnly.md) | - |
| [isChildrenOnlyCall](variables/isChildrenOnlyCall.md) | - |
| [isChildrenToArray](variables/isChildrenToArray.md) | - |
| [isChildrenToArrayCall](variables/isChildrenToArrayCall.md) | - |
| [isCloneElement](variables/isCloneElement.md) | - |
| [isCloneElementCall](variables/isCloneElementCall.md) | - |
| [~~isComponentDidCatch~~](variables/isComponentDidCatch.md) | - |
| [~~isComponentDidMount~~](variables/isComponentDidMount.md) | - |
| [~~isComponentDidUpdate~~](variables/isComponentDidUpdate.md) | - |
| [~~isComponentWillMount~~](variables/isComponentWillMount.md) | - |
| [~~isComponentWillReceiveProps~~](variables/isComponentWillReceiveProps.md) | - |
| [~~isComponentWillUnmount~~](variables/isComponentWillUnmount.md) | - |
| [~~isComponentWillUpdate~~](variables/isComponentWillUpdate.md) | - |
| [isCreateContext](variables/isCreateContext.md) | - |
| [isCreateContextCall](variables/isCreateContextCall.md) | - |
| [isCreateElement](variables/isCreateElement.md) | - |
| [isCreateElementCall](variables/isCreateElementCall.md) | - |
| [isCreateRef](variables/isCreateRef.md) | - |
| [isCreateRefCall](variables/isCreateRefCall.md) | - |
| [isForwardRef](variables/isForwardRef.md) | - |
| [isForwardRefCall](variables/isForwardRefCall.md) | - |
| [~~isGetChildContext~~](variables/isGetChildContext.md) | - |
| [~~isGetDefaultProps~~](variables/isGetDefaultProps.md) | - |
| [~~isGetDerivedStateFromError~~](variables/isGetDerivedStateFromError.md) | - |
| [~~isGetDerivedStateFromProps~~](variables/isGetDerivedStateFromProps.md) | - |
| [~~isGetInitialState~~](variables/isGetInitialState.md) | - |
| [~~isGetSnapshotBeforeUpdate~~](variables/isGetSnapshotBeforeUpdate.md) | - |
| [isLazy](variables/isLazy.md) | - |
| [isLazyCall](variables/isLazyCall.md) | - |
| [isMemo](variables/isMemo.md) | - |
| [isMemoCall](variables/isMemoCall.md) | - |
| [~~isRender~~](variables/isRender.md) | - |
| [~~isShouldComponentUpdate~~](variables/isShouldComponentUpdate.md) | - |
| [~~isUnsafeComponentWillMount~~](variables/isUnsafeComponentWillMount.md) | - |
| [~~isUnsafeComponentWillReceiveProps~~](variables/isUnsafeComponentWillReceiveProps.md) | - |
| [~~isUnsafeComponentWillUpdate~~](variables/isUnsafeComponentWillUpdate.md) | - |
| [isUse](variables/isUse.md) | - |
| [isUseActionState](variables/isUseActionState.md) | - |
| [isUseActionStateCall](variables/isUseActionStateCall.md) | - |
| [isUseCall](variables/isUseCall.md) | - |
| [isUseCallback](variables/isUseCallback.md) | - |
| [isUseCallbackCall](variables/isUseCallbackCall.md) | - |
| [isUseContext](variables/isUseContext.md) | - |
| [isUseContextCall](variables/isUseContextCall.md) | - |
| [isUseDebugValue](variables/isUseDebugValue.md) | - |
| [isUseDebugValueCall](variables/isUseDebugValueCall.md) | - |
| [isUseDeferredValue](variables/isUseDeferredValue.md) | - |
| [isUseDeferredValueCall](variables/isUseDeferredValueCall.md) | - |
| [isUseEffect](variables/isUseEffect.md) | - |
| [isUseEffectCall](variables/isUseEffectCall.md) | - |
| [isUseFormStatus](variables/isUseFormStatus.md) | - |
| [isUseFormStatusCall](variables/isUseFormStatusCall.md) | - |
| [isUseId](variables/isUseId.md) | - |
| [isUseIdCall](variables/isUseIdCall.md) | - |
| [isUseImperativeHandle](variables/isUseImperativeHandle.md) | - |
| [isUseImperativeHandleCall](variables/isUseImperativeHandleCall.md) | - |
| [isUseInsertionEffect](variables/isUseInsertionEffect.md) | - |
| [isUseInsertionEffectCall](variables/isUseInsertionEffectCall.md) | - |
| [isUseLayoutEffect](variables/isUseLayoutEffect.md) | - |
| [isUseLayoutEffectCall](variables/isUseLayoutEffectCall.md) | - |
| [isUseMemo](variables/isUseMemo.md) | - |
| [isUseMemoCall](variables/isUseMemoCall.md) | - |
| [isUseOptimistic](variables/isUseOptimistic.md) | - |
| [isUseOptimisticCall](variables/isUseOptimisticCall.md) | - |
| [isUseReducer](variables/isUseReducer.md) | - |
| [isUseReducerCall](variables/isUseReducerCall.md) | - |
| [isUseRef](variables/isUseRef.md) | - |
| [isUseRefCall](variables/isUseRefCall.md) | - |
| [isUseState](variables/isUseState.md) | - |
| [isUseStateCall](variables/isUseStateCall.md) | - |
| [isUseSyncExternalStore](variables/isUseSyncExternalStore.md) | - |
| [isUseSyncExternalStoreCall](variables/isUseSyncExternalStoreCall.md) | - |
| [isUseTransition](variables/isUseTransition.md) | - |
| [isUseTransitionCall](variables/isUseTransitionCall.md) | - |
| [JsxDetectionHint](variables/JsxDetectionHint.md) | - |
| [REACT\_BUILTIN\_HOOK\_NAMES](variables/REACT_BUILTIN_HOOK_NAMES.md) | - |
| [SEL\_FUNCTION\_DISPLAY\_NAME\_ASSIGNMENT](variables/SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [~~getClassComponentCollector~~](functions/getClassComponentCollector.md) | - |
| [getClassId](functions/getClassId.md) | Get the class identifier of a class node |
| [getFullyQualifiedNameEx](functions/getFullyQualifiedNameEx.md) | An enhanced version of getFullyQualifiedName that handles cases that original function does not handle |
| [getFunctionComponentCollector](functions/getFunctionComponentCollector.md) | Get an api and visitor object for the rule to collect function components |
| [getFunctionDirectives](functions/getFunctionDirectives.md) | - |
| [getFunctionId](functions/getFunctionId.md) | Gets the static identifier of a function AST node. |
| [getFunctionInitPath](functions/getFunctionInitPath.md) | Identifies the initialization path of a function node in the AST. |
| [getHookCollector](functions/getHookCollector.md) | Get an api and visitor object for the rule to collect hooks |
| [getJsxConfig](functions/getJsxConfig.md) | Get the fully‑merged JSX configuration for the current file. |
| [getJsxConfigFromAnnotation](functions/getJsxConfigFromAnnotation.md) | Extract JSX configuration from `@jsx`, `@jsxFrag`, `@jsxRuntime` and `@jsxImportSource` pragma comments in the source file. |
| [getJsxConfigFromCompilerOptions](functions/getJsxConfigFromCompilerOptions.md) | Read JSX configuration from the TypeScript compiler options exposed by the parser services. |
| [isAPI](functions/isAPI.md) | Check if the node is a React API identifier or member expression |
| [isAPICall](functions/isAPICall.md) | Check if the node is a call expression to a specific React API |
| [isAPIFromReact](functions/isAPIFromReact.md) | Check if a variable is initialized from React import |
| [isAPIFromReactNative](functions/isAPIFromReactNative.md) | if a variable is initialized from React Native import |
| [~~isAssignmentToThisState~~](functions/isAssignmentToThisState.md) | - |
| [isBooleanLiteralType](functions/isBooleanLiteralType.md) | - |
| [~~isClassComponent~~](functions/isClassComponent.md) | - |
| [isClassComponentLoose](functions/isClassComponentLoose.md) | - |
| [isFunctionComponentDefinition](functions/isFunctionComponentDefinition.md) | Determine if a function node represents a valid React component definition |
| [isFunctionComponentName](functions/isFunctionComponentName.md) | Check if a string matches the strict component name pattern |
| [isFunctionComponentNameLoose](functions/isFunctionComponentNameLoose.md) | Check if a string matches the loose component name pattern |
| [isFunctionComponentWrapperCall](functions/isFunctionComponentWrapperCall.md) | Check if the node is a call expression for a component wrapper |
| [isFunctionComponentWrapperCallback](functions/isFunctionComponentWrapperCallback.md) | Check if the node is a callback function passed to a component wrapper |
| [isFunctionEmpty](functions/isFunctionEmpty.md) | Checks if a function is empty. |
| [isFunctionHasCallInInitPath](functions/isFunctionHasCallInInitPath.md) | Checks if a specific function call exists in the function initialization path. |
| [isFunctionHasDirective](functions/isFunctionHasDirective.md) | Checks if a directive with the given name exists in the function directives. |
| [isFunctionWithLooseComponentName](functions/isFunctionWithLooseComponentName.md) | Check if a function has a loose component name |
| [isHookCall](functions/isHookCall.md) | Check if the given node is a React Hook call by its name. |
| [isHookDefinition](functions/isHookDefinition.md) | Determine if a function node is a React Hook based on its name. |
| [isHookId](functions/isHookId.md) | Checks if the given node is a hook identifier |
| [isHookName](functions/isHookName.md) | Catch all identifiers that begin with "use" followed by an uppercase Latin character to exclude identifiers like "user". |
| [isJsxLike](functions/isJsxLike.md) | Determine whether a node represents JSX-like content based on heuristics. |
| [~~isPureComponent~~](functions/isPureComponent.md) | - |
| [isRenderMethodCallback](functions/isRenderMethodCallback.md) | - |
| [~~isRenderMethodLike~~](functions/isRenderMethodLike.md) | - |
| [~~isThisSetStateCall~~](functions/isThisSetStateCall.md) | - |
| [isUseEffectCleanupCallback](functions/isUseEffectCleanupCallback.md) | Determine if a node is the cleanup function returned by a useEffect-like hook's setup function |
| [isUseEffectLikeCall](functions/isUseEffectLikeCall.md) | Detect useEffect calls and variations (useLayoutEffect, etc.) using a regex pattern |
| [isUseEffectSetupCallback](functions/isUseEffectSetupCallback.md) | Determine if a node is the setup function passed to a useEffect-like hook |
| [isUseStateLikeCall](functions/isUseStateLikeCall.md) | Detect useState calls and variations using a regex pattern |

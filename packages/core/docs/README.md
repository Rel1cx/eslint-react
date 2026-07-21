# @eslint-react/core

## Namespaces

| Namespace                                                                                         | Description |
| ------------------------------------------------------------------------------------------------- | ----------- |
| [~~getClassComponentCollector~~](@eslint-react/namespaces/getClassComponentCollector/README.md)   | -           |
| [getFunctionComponentCollector](@eslint-react/namespaces/getFunctionComponentCollector/README.md) | -           |
| [getHookCollector](@eslint-react/namespaces/getHookCollector/README.md)                           | -           |
| [isAPI](@eslint-react/namespaces/isAPI/README.md)                                                 | -           |
| [isAPICall](@eslint-react/namespaces/isAPICall/README.md)                                         | -           |

## Interfaces

| Interface                                                                    | Description                                                                                                                                   |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [~~ClassComponentSemanticNode~~](interfaces/ClassComponentSemanticNode.md)   | -                                                                                                                                             |
| [ClientFunctionSemanticNode](interfaces/ClientFunctionSemanticNode.md)       | Represents a client function semantic node.                                                                                                   |
| [FunctionComponentSemanticNode](interfaces/FunctionComponentSemanticNode.md) | Represents a React Function Component.                                                                                                        |
| [HookSemanticNode](interfaces/HookSemanticNode.md)                           | Represents a semantic hook node in the AST.                                                                                                   |
| [JsxConfig](interfaces/JsxConfig.md)                                         | Resolved JSX configuration derived from compiler options and / or pragma annotations found in the source file.                                |
| [SemanticFunc](interfaces/SemanticFunc.md)                                   | Represents a semantic function node in the AST. This interface extends SemanticNode and provides additional properties for function analysis. |
| [SemanticNode](interfaces/SemanticNode.md)                                   | Represents a semantic node in the AST. This is the base interface for all semantic nodes in the React semantic analysis.                      |
| [ServerFunctionSemanticNode](interfaces/ServerFunctionSemanticNode.md)       | Represents a server function semantic node.                                                                                                   |

## Type Aliases

| Type Alias                                                                       | Description                                                                                                                |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [FunctionComponentDetectionHint](type-aliases/FunctionComponentDetectionHint.md) | The bit-flags for customizing function component detection.                                                                |
| [FunctionDisplayNameAssignment](type-aliases/FunctionDisplayNameAssignment.md)   | Represents a `displayName` assignment expression (ex: `Component.displayName = "MyComponent"`).                            |
| [FunctionID](type-aliases/FunctionID.md)                                         | The return type of [getFunctionId](functions/getFunctionId.md).                                                            |
| [FunctionInitPath](type-aliases/FunctionInitPath.md)                             | Represents various AST paths for function declarations. Each tuple type represents a specific function definition pattern. |
| [FunctionKind](type-aliases/FunctionKind.md)                                     | Represents the kind of a function.                                                                                         |
| [FunctionSemanticNode](type-aliases/FunctionSemanticNode.md)                     | Represents a function semantic node.                                                                                       |
| [HookCall](type-aliases/HookCall.md)                                             | Represents a hook call, which can be a call expression or a tagged template expression.                                    |
| [JsxDetectionHint](type-aliases/JsxDetectionHint.md)                             | BitFlags for configuring JSX detection behavior.                                                                           |
| [TypeVariant](type-aliases/TypeVariant.md)                                       | Represents the variant of a type for boolean expression analysis.                                                          |

## Variables

| Variable                                                                                      | Description                                                                              |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [DEFAULT\_COMPONENT\_DETECTION\_HINT](variables/DEFAULT_COMPONENT_DETECTION_HINT.md)          | Default component detection hint.                                                        |
| [DEFAULT\_JSX\_DETECTION\_HINT](variables/DEFAULT_JSX_DETECTION_HINT.md)                      | Default JSX detection hint.                                                              |
| [FunctionComponentDetectionHint](variables/FunctionComponentDetectionHint.md)                 | Hints for component collector.                                                           |
| [FunctionComponentFlag](variables/FunctionComponentFlag.md)                                   | Component flag constants.                                                                |
| [isCaptureOwnerStack](variables/isCaptureOwnerStack.md)                                       | Check if the node is a React `captureOwnerStack` API identifier or member expression.    |
| [isCaptureOwnerStackCall](variables/isCaptureOwnerStackCall.md)                               | Check if the node is a call expression to the React `captureOwnerStack` API.             |
| [isChildrenCount](variables/isChildrenCount.md)                                               | Check if the node is a React `Children.count` API identifier or member expression.       |
| [isChildrenCountCall](variables/isChildrenCountCall.md)                                       | Check if the node is a call expression to the React `Children.count` API.                |
| [isChildrenForEach](variables/isChildrenForEach.md)                                           | Check if the node is a React `Children.forEach` API identifier or member expression.     |
| [isChildrenForEachCall](variables/isChildrenForEachCall.md)                                   | Check if the node is a call expression to the React `Children.forEach` API.              |
| [isChildrenMap](variables/isChildrenMap.md)                                                   | Check if the node is a React `Children.map` API identifier or member expression.         |
| [isChildrenMapCall](variables/isChildrenMapCall.md)                                           | Check if the node is a call expression to the React `Children.map` API.                  |
| [isChildrenOnly](variables/isChildrenOnly.md)                                                 | Check if the node is a React `Children.only` API identifier or member expression.        |
| [isChildrenOnlyCall](variables/isChildrenOnlyCall.md)                                         | Check if the node is a call expression to the React `Children.only` API.                 |
| [isChildrenToArray](variables/isChildrenToArray.md)                                           | Check if the node is a React `Children.toArray` API identifier or member expression.     |
| [isChildrenToArrayCall](variables/isChildrenToArrayCall.md)                                   | Check if the node is a call expression to the React `Children.toArray` API.              |
| [isCloneElement](variables/isCloneElement.md)                                                 | Check if the node is a React `cloneElement` API identifier or member expression.         |
| [isCloneElementCall](variables/isCloneElementCall.md)                                         | Check if the node is a call expression to the React `cloneElement` API.                  |
| [~~isComponentDidCatch~~](variables/isComponentDidCatch.md)                                   | -                                                                                        |
| [~~isComponentDidMount~~](variables/isComponentDidMount.md)                                   | -                                                                                        |
| [~~isComponentDidUpdate~~](variables/isComponentDidUpdate.md)                                 | -                                                                                        |
| [~~isComponentWillMount~~](variables/isComponentWillMount.md)                                 | -                                                                                        |
| [~~isComponentWillReceiveProps~~](variables/isComponentWillReceiveProps.md)                   | -                                                                                        |
| [~~isComponentWillUnmount~~](variables/isComponentWillUnmount.md)                             | -                                                                                        |
| [~~isComponentWillUpdate~~](variables/isComponentWillUpdate.md)                               | -                                                                                        |
| [isCreateContext](variables/isCreateContext.md)                                               | Check if the node is a React `createContext` API identifier or member expression.        |
| [isCreateContextCall](variables/isCreateContextCall.md)                                       | Check if the node is a call expression to the React `createContext` API.                 |
| [isCreateElement](variables/isCreateElement.md)                                               | Check if the node is a React `createElement` API identifier or member expression.        |
| [isCreateElementCall](variables/isCreateElementCall.md)                                       | Check if the node is a call expression to the React `createElement` API.                 |
| [isCreateRef](variables/isCreateRef.md)                                                       | Check if the node is a React `createRef` API identifier or member expression.            |
| [isCreateRefCall](variables/isCreateRefCall.md)                                               | Check if the node is a call expression to the React `createRef` API.                     |
| [isForwardRef](variables/isForwardRef.md)                                                     | Check if the node is a React `forwardRef` API identifier or member expression.           |
| [isForwardRefCall](variables/isForwardRefCall.md)                                             | Check if the node is a call expression to the React `forwardRef` API.                    |
| [~~isGetChildContext~~](variables/isGetChildContext.md)                                       | -                                                                                        |
| [~~isGetDefaultProps~~](variables/isGetDefaultProps.md)                                       | -                                                                                        |
| [~~isGetDerivedStateFromError~~](variables/isGetDerivedStateFromError.md)                     | -                                                                                        |
| [~~isGetDerivedStateFromProps~~](variables/isGetDerivedStateFromProps.md)                     | -                                                                                        |
| [~~isGetInitialState~~](variables/isGetInitialState.md)                                       | -                                                                                        |
| [~~isGetSnapshotBeforeUpdate~~](variables/isGetSnapshotBeforeUpdate.md)                       | -                                                                                        |
| [isLazy](variables/isLazy.md)                                                                 | Check if the node is a React `lazy` API identifier or member expression.                 |
| [isLazyCall](variables/isLazyCall.md)                                                         | Check if the node is a call expression to the React `lazy` API.                          |
| [isMemo](variables/isMemo.md)                                                                 | Check if the node is a React `memo` API identifier or member expression.                 |
| [isMemoCall](variables/isMemoCall.md)                                                         | Check if the node is a call expression to the React `memo` API.                          |
| [~~isRender~~](variables/isRender.md)                                                         | -                                                                                        |
| [~~isShouldComponentUpdate~~](variables/isShouldComponentUpdate.md)                           | -                                                                                        |
| [~~isUnsafeComponentWillMount~~](variables/isUnsafeComponentWillMount.md)                     | -                                                                                        |
| [~~isUnsafeComponentWillReceiveProps~~](variables/isUnsafeComponentWillReceiveProps.md)       | -                                                                                        |
| [~~isUnsafeComponentWillUpdate~~](variables/isUnsafeComponentWillUpdate.md)                   | -                                                                                        |
| [isUse](variables/isUse.md)                                                                   | Check if the node is a React `use` API identifier or member expression.                  |
| [isUseActionState](variables/isUseActionState.md)                                             | Check if the node is a React `useActionState` API identifier or member expression.       |
| [isUseActionStateCall](variables/isUseActionStateCall.md)                                     | Check if the node is a call expression to the React `useActionState` API.                |
| [isUseCall](variables/isUseCall.md)                                                           | Check if the node is a call expression to the React `use` API.                           |
| [isUseCallback](variables/isUseCallback.md)                                                   | Check if the node is a React `useCallback` API identifier or member expression.          |
| [isUseCallbackCall](variables/isUseCallbackCall.md)                                           | Check if the node is a call expression to the React `useCallback` API.                   |
| [isUseContext](variables/isUseContext.md)                                                     | Check if the node is a React `useContext` API identifier or member expression.           |
| [isUseContextCall](variables/isUseContextCall.md)                                             | Check if the node is a call expression to the React `useContext` API.                    |
| [isUseDebugValue](variables/isUseDebugValue.md)                                               | Check if the node is a React `useDebugValue` API identifier or member expression.        |
| [isUseDebugValueCall](variables/isUseDebugValueCall.md)                                       | Check if the node is a call expression to the React `useDebugValue` API.                 |
| [isUseDeferredValue](variables/isUseDeferredValue.md)                                         | Check if the node is a React `useDeferredValue` API identifier or member expression.     |
| [isUseDeferredValueCall](variables/isUseDeferredValueCall.md)                                 | Check if the node is a call expression to the React `useDeferredValue` API.              |
| [isUseEffect](variables/isUseEffect.md)                                                       | Check if the node is a React `useEffect` API identifier or member expression.            |
| [isUseEffectCall](variables/isUseEffectCall.md)                                               | Check if the node is a call expression to the React `useEffect` API.                     |
| [isUseFormStatus](variables/isUseFormStatus.md)                                               | Check if the node is a React `useFormStatus` API identifier or member expression.        |
| [isUseFormStatusCall](variables/isUseFormStatusCall.md)                                       | Check if the node is a call expression to the React `useFormStatus` API.                 |
| [isUseId](variables/isUseId.md)                                                               | Check if the node is a React `useId` API identifier or member expression.                |
| [isUseIdCall](variables/isUseIdCall.md)                                                       | Check if the node is a call expression to the React `useId` API.                         |
| [isUseImperativeHandle](variables/isUseImperativeHandle.md)                                   | Check if the node is a React `useImperativeHandle` API identifier or member expression.  |
| [isUseImperativeHandleCall](variables/isUseImperativeHandleCall.md)                           | Check if the node is a call expression to the React `useImperativeHandle` API.           |
| [isUseInsertionEffect](variables/isUseInsertionEffect.md)                                     | Check if the node is a React `useInsertionEffect` API identifier or member expression.   |
| [isUseInsertionEffectCall](variables/isUseInsertionEffectCall.md)                             | Check if the node is a call expression to the React `useInsertionEffect` API.            |
| [isUseLayoutEffect](variables/isUseLayoutEffect.md)                                           | Check if the node is a React `useLayoutEffect` API identifier or member expression.      |
| [isUseLayoutEffectCall](variables/isUseLayoutEffectCall.md)                                   | Check if the node is a call expression to the React `useLayoutEffect` API.               |
| [isUseMemo](variables/isUseMemo.md)                                                           | Check if the node is a React `useMemo` API identifier or member expression.              |
| [isUseMemoCall](variables/isUseMemoCall.md)                                                   | Check if the node is a call expression to the React `useMemo` API.                       |
| [isUseOptimistic](variables/isUseOptimistic.md)                                               | Check if the node is a React `useOptimistic` API identifier or member expression.        |
| [isUseOptimisticCall](variables/isUseOptimisticCall.md)                                       | Check if the node is a call expression to the React `useOptimistic` API.                 |
| [isUseReducer](variables/isUseReducer.md)                                                     | Check if the node is a React `useReducer` API identifier or member expression.           |
| [isUseReducerCall](variables/isUseReducerCall.md)                                             | Check if the node is a call expression to the React `useReducer` API.                    |
| [isUseRef](variables/isUseRef.md)                                                             | Check if the node is a React `useRef` API identifier or member expression.               |
| [isUseRefCall](variables/isUseRefCall.md)                                                     | Check if the node is a call expression to the React `useRef` API.                        |
| [isUseState](variables/isUseState.md)                                                         | Check if the node is a React `useState` API identifier or member expression.             |
| [isUseStateCall](variables/isUseStateCall.md)                                                 | Check if the node is a call expression to the React `useState` API.                      |
| [isUseSyncExternalStore](variables/isUseSyncExternalStore.md)                                 | Check if the node is a React `useSyncExternalStore` API identifier or member expression. |
| [isUseSyncExternalStoreCall](variables/isUseSyncExternalStoreCall.md)                         | Check if the node is a call expression to the React `useSyncExternalStore` API.          |
| [isUseTransition](variables/isUseTransition.md)                                               | Check if the node is a React `useTransition` API identifier or member expression.        |
| [isUseTransitionCall](variables/isUseTransitionCall.md)                                       | Check if the node is a call expression to the React `useTransition` API.                 |
| [JsxDetectionHint](variables/JsxDetectionHint.md)                                             | Hints for JSX detection.                                                                 |
| [REACT\_BUILTIN\_HOOK\_NAMES](variables/REACT_BUILTIN_HOOK_NAMES.md)                          | The names of React's built-in hooks.                                                     |
| [SEL\_FUNCTION\_DISPLAY\_NAME\_ASSIGNMENT](variables/SEL_FUNCTION_DISPLAY_NAME_ASSIGNMENT.md) | The esquery selector matching `displayName` assignment expressions.                      |

## Functions

| Function                                                                              | Description                                                                                                                                              |
| ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [~~getClassComponentCollector~~](functions/getClassComponentCollector.md)             | Get an api and visitor object for the rule to collect class components.                                                                                  |
| [getClassId](functions/getClassId.md)                                                 | Get the class identifier of a class node.                                                                                                                |
| [getFullyQualifiedNameEx](functions/getFullyQualifiedNameEx.md)                       | Get the fully qualified name of a symbol, handling cases that `ts.TypeChecker.getFullyQualifiedName` does not handle (ex: `export as namespace preact`). |
| [getFunctionComponentCollector](functions/getFunctionComponentCollector.md)           | Get an api and visitor object for the rule to collect function components.                                                                               |
| [getFunctionDirectives](functions/getFunctionDirectives.md)                           | Get the directives of a function (ex: "use strict", "use client", "use server").                                                                         |
| [getFunctionId](functions/getFunctionId.md)                                           | Get the static identifier of a function AST node.                                                                                                        |
| [getFunctionInitPath](functions/getFunctionInitPath.md)                               | Get the initialization path of a function node in the AST.                                                                                               |
| [getHookCollector](functions/getHookCollector.md)                                     | Get an api and visitor object for the rule to collect hooks.                                                                                             |
| [getJsxConfig](functions/getJsxConfig.md)                                             | Get the fully‑merged JSX configuration for the current file.                                                                                             |
| [getJsxConfigFromAnnotation](functions/getJsxConfigFromAnnotation.md)                 | Extract JSX configuration from `@jsx`, `@jsxFrag`, `@jsxRuntime` and `@jsxImportSource` pragma comments in the source file.                              |
| [getJsxConfigFromCompilerOptions](functions/getJsxConfigFromCompilerOptions.md)       | Read JSX configuration from the TypeScript compiler options exposed by the parser services.                                                              |
| [isAPI](functions/isAPI.md)                                                           | Check if the node is a React API identifier or member expression.                                                                                        |
| [isAPICall](functions/isAPICall.md)                                                   | Check if the node is a call expression to a specific React API.                                                                                          |
| [~~isAssignmentToThisState~~](functions/isAssignmentToThisState.md)                   | Check if the assignment expression assigns to `this.state`.                                                                                              |
| [isBooleanLiteralType](functions/isBooleanLiteralType.md)                             | Check if the type is a boolean literal type.                                                                                                             |
| [isClassComponent](functions/isClassComponent.md)                                     | Check if the node is a class component (extends `Component` or `PureComponent`).                                                                         |
| [isFunctionComponentDefinition](functions/isFunctionComponentDefinition.md)           | Check if the function node is a valid React component definition.                                                                                        |
| [isFunctionComponentName](functions/isFunctionComponentName.md)                       | Check if a string matches the strict component name pattern.                                                                                             |
| [isFunctionComponentNameLoose](functions/isFunctionComponentNameLoose.md)             | Check if a string matches the loose component name pattern.                                                                                              |
| [isFunctionComponentWrapperCall](functions/isFunctionComponentWrapperCall.md)         | Check if the node is a call expression for a component wrapper.                                                                                          |
| [isFunctionComponentWrapperCallback](functions/isFunctionComponentWrapperCallback.md) | Check if the node is a callback function passed to a component wrapper.                                                                                  |
| [isFunctionEmpty](functions/isFunctionEmpty.md)                                       | Check if a function is empty.                                                                                                                            |
| [isFunctionHasCallInInitPath](functions/isFunctionHasCallInInitPath.md)               | Check if a specific function call exists in the function initialization path.                                                                            |
| [isFunctionHasDirective](functions/isFunctionHasDirective.md)                         | Check if a directive with the given name exists in the function directives.                                                                              |
| [isFunctionWithLooseComponentName](functions/isFunctionWithLooseComponentName.md)     | Check if a function has a loose component name.                                                                                                          |
| [isHookCall](functions/isHookCall.md)                                                 | Check if the node is a React Hook call by its name.                                                                                                      |
| [isHookDefinition](functions/isHookDefinition.md)                                     | Check if the function node is a hook definition based on its name.                                                                                       |
| [isHookId](functions/isHookId.md)                                                     | Checks if the given node is a hook identifier.                                                                                                           |
| [isHookName](functions/isHookName.md)                                                 | Check if the name is a hook name (starts with `use` followed by an uppercase letter or digit).                                                           |
| [isHookTag](functions/isHookTag.md)                                                   | Checks if the given expression is a hook tag (callee / tagged template tag).                                                                             |
| [isJsxLike](functions/isJsxLike.md)                                                   | Check if the node represents JSX-like content based on heuristics.                                                                                       |
| [~~isPureComponent~~](functions/isPureComponent.md)                                   | Check if the node is a pure component (extends `PureComponent`).                                                                                         |
| [isRenderMethodCallback](functions/isRenderMethodCallback.md)                         | Check if the function is a callback passed to a class component's render method.                                                                         |
| [~~isRenderMethodLike~~](functions/isRenderMethodLike.md)                             | Check if the node is a render-like method of a class component.                                                                                          |
| [~~isThisSetStateCall~~](functions/isThisSetStateCall.md)                             | Check if the call expression is a `this.setState(...)` call.                                                                                             |
| [isUseEffectCleanupCallback](functions/isUseEffectCleanupCallback.md)                 | Check if the node is the cleanup callback returned by a useEffect-like setup callback.                                                                   |
| [isUseEffectLikeCall](functions/isUseEffectLikeCall.md)                               | Check if the node is a useEffect-like call (ex: `useEffect`, `useLayoutEffect`, or a custom effect hook).                                                |
| [isUseEffectSetupCallback](functions/isUseEffectSetupCallback.md)                     | Check if the node is the setup callback passed to a useEffect-like call.                                                                                 |
| [isUseStateLikeCall](functions/isUseStateLikeCall.md)                                 | Check if the node is a useState-like call (ex: `useState` or a custom state hook).                                                                       |

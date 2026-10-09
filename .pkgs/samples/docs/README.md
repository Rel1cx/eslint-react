# @local/samples

## Type Aliases

| Type Alias                                                                 | Description                                                            |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| [BooleanPropNamingOptions](type-aliases/BooleanPropNamingOptions.md)       | -                                                                      |
| [ForbidComponentPropsOptions](type-aliases/ForbidComponentPropsOptions.md) | Options for [forbidComponentProps](functions/forbidComponentProps.md). |
| [ForbidDomPropsOptions](type-aliases/ForbidDomPropsOptions.md)             | Options for [forbidDomProps](functions/forbidDomProps.md).             |
| [ForbidElementsOptions](type-aliases/ForbidElementsOptions.md)             | Options for [forbidElements](functions/forbidElements.md).             |
| [JsxHandlerNamesOptions](type-aliases/JsxHandlerNamesOptions.md)           | Options for [jsxHandlerNames](functions/jsxHandlerNames.md).           |
| [JsxMaxDepthOptions](type-aliases/JsxMaxDepthOptions.md)                   | Options for [jsxMaxDepth](functions/jsxMaxDepth.md).                   |
| [JsxNoDuplicatePropsOptions](type-aliases/JsxNoDuplicatePropsOptions.md)   | Options for [jsxNoDuplicateProps](functions/jsxNoDuplicateProps.md).   |
| [JsxNoLiteralsOptions](type-aliases/JsxNoLiteralsOptions.md)               | Options for [jsxNoLiterals](functions/jsxNoLiterals.md).               |
| [JsxPascalCaseOptions](type-aliases/JsxPascalCaseOptions.md)               | Options for [jsxPascalCase](functions/jsxPascalCase.md).               |
| [JsxsFragmentsOptions](type-aliases/JsxsFragmentsOptions.md)               | Options for [jsxFragments](functions/jsxFragments.md).                 |
| [MaxComponentPerFileOptions](type-aliases/MaxComponentPerFileOptions.md)   | Options for [maxComponentPerFile](functions/maxComponentPerFile.md).   |

## Functions

| Function                                                                            | Description                                                                                                         |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [booleanPropNaming](functions/booleanPropNaming.md)                                 | Enforce boolean prop naming convention.                                                                             |
| [checkedRequiresOnchangeOrReadonly](functions/checkedRequiresOnchangeOrReadonly.md) | Require `onChange` or `readOnly` when using `checked` on `<input>`.                                                 |
| [errorBoundaries](functions/errorBoundaries.md)                                     | Validates usage of Error Boundaries instead of try/catch for errors in child components.                            |
| [forbidComponentProps](functions/forbidComponentProps.md)                           | Forbid certain props on React components (not DOM elements).                                                        |
| [forbidDomProps](functions/forbidDomProps.md)                                       | Forbid certain props on DOM elements (not React components).                                                        |
| [forbidElements](functions/forbidElements.md)                                       | Forbid specific JSX elements.                                                                                       |
| [functionComponentDefinition](functions/functionComponentDefinition.md)             | Enforce arrow function definitions for function components.                                                         |
| [jsxBooleanValue](functions/jsxBooleanValue.md)                                     | Enforce shorthand for boolean JSX attributes.                                                                       |
| [jsxFragments](functions/jsxFragments.md)                                           | Enforce shorthand or standard form for React fragments.                                                             |
| [jsxHandlerNames](functions/jsxHandlerNames.md)                                     | Enforce naming convention for JSX event handlers.                                                                   |
| [jsxMaxDepth](functions/jsxMaxDepth.md)                                             | Enforce JSX maximum depth.                                                                                          |
| [jsxNoBind](functions/jsxNoBind.md)                                                 | Prevent inline functions and `.bind()` in JSX props.                                                                |
| [jsxNoDuplicateProps](functions/jsxNoDuplicateProps.md)                             | Disallow duplicate properties in JSX.                                                                               |
| [jsxNoLiterals](functions/jsxNoLiterals.md)                                         | Disallow usage of string literals in JSX.                                                                           |
| [jsxPascalCase](functions/jsxPascalCase.md)                                         | Enforce PascalCase for user-defined JSX components.                                                                 |
| [jsxPropsNoSpreading](functions/jsxPropsNoSpreading.md)                             | Disallow JSX props spreading.                                                                                       |
| [jsxPropsNoSpreadMulti](functions/jsxPropsNoSpreadMulti.md)                         | Disallow JSX prop spreading the same identifier multiple times.                                                     |
| [maxComponentPerFile](functions/maxComponentPerFile.md)                             | Prevent defining more than one component per file.                                                                  |
| [noAdjacentInlineElements](functions/noAdjacentInlineElements.md)                   | Disallow adjacent inline elements not separated by whitespace.                                                      |
| [noCircularEffect](functions/noCircularEffect.md)                                   | Detect circular `set` function and dependency patterns across `useEffect`-like hooks in the same component or hook. |
| [noDirectAccessProps](functions/noDirectAccessProps.md)                             | Enforce destructuring assignment for component props.                                                               |
| [noMultiComp](functions/noMultiComp.md)                                             | Prevent defining more than one component per file.                                                                  |
| [noMultipleChildrenInTitle](functions/noMultipleChildrenInTitle.md)                 | Ensure <title> has a single string child.                                                                           |
| [noSetState](functions/noSetState.md)                                               | Forbid this.setState() calls.                                                                                       |
| [noStringRefs](functions/noStringRefs.md)                                           | Disallow deprecated string refs.                                                                                    |
| [noUnnecessaryUsePrefix](functions/noUnnecessaryUsePrefix.md)                       | Warn on custom hooks that don't call other hooks.                                                                   |
| [version](functions/version.md)                                                     | Require the project to use a specific React version.                                                                |

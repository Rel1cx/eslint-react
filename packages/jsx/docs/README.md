# @eslint-react/jsx

## Type Aliases

| Type Alias | Description |
| ------ | ------ |
| [ElementTest](type-aliases/ElementTest.md) | A test that determines whether a JSX element matches. |
| [JsxAttributeValue](type-aliases/JsxAttributeValue.md) | Discriminated union representing the resolved value of a JSX attribute. |
| [JsxDetectionHint](type-aliases/JsxDetectionHint.md) | BitFlags for configuring JSX detection behavior. |

## Variables

| Variable | Description |
| ------ | ------ |
| [DEFAULT\_JSX\_DETECTION\_HINT](variables/DEFAULT_JSX_DETECTION_HINT.md) | Default JSX detection configuration. |
| [JsxDetectionHint](variables/JsxDetectionHint.md) | - |

## Functions

| Function | Description |
| ------ | ------ |
| [findAttribute](functions/findAttribute.md) | Find a JSX attribute (or spread attribute containing the property) by name on a given element. |
| [findParentAttribute](functions/findParentAttribute.md) | Walk **up** the AST from `node` to find the nearest ancestor that is a `JSXAttribute` and (optionally) passes a predicate. |
| [getAttributeName](functions/getAttributeName.md) | Get the stringified name of a `JSXAttribute` node. |
| [getAttributeStaticValue](functions/getAttributeStaticValue.md) | Find an attribute by name on a JSX element and collapse its value to a plain JavaScript value in a single step. |
| [getAttributeValue](functions/getAttributeValue.md) | Find an attribute by name on a JSX element **and** resolve its value in a single call. |
| [getChildren](functions/getChildren.md) | Get the **meaningful** children of a JSX element or fragment. |
| [getElementFullType](functions/getElementFullType.md) | Get the string representation of a JSX element's type. |
| [getElementSelfType](functions/getElementSelfType.md) | Get the **self name** (last dot-separated segment) of a JSX element type. |
| [hasAnyAttribute](functions/hasAnyAttribute.md) | Check whether a JSX element carries **at least one** of the given attributes. |
| [hasAttribute](functions/hasAttribute.md) | Check whether a JSX element carries a given attribute (prop). |
| [hasChildren](functions/hasChildren.md) | Check whether a JSX element (or fragment) has **meaningful** children — that is, at least one child that is not purely whitespace text. |
| [hasEveryAttribute](functions/hasEveryAttribute.md) | Check whether a JSX element carries **all** of the given attributes (props). |
| [isElement](functions/isElement.md) | Check whether a node is a `JSXElement` (or `JSXFragment`) and optionally matches a given test. |
| [isFragmentElement](functions/isFragmentElement.md) | Check whether a node is a React **Fragment** element. |
| [isHostElement](functions/isHostElement.md) | Check whether a node is a **host** (intrinsic / DOM) element. |
| [isWhitespace](functions/isWhitespace.md) | Check whether a JSX child node is **whitespace padding** that React would trim away during rendering. |
| [isWhitespaceText](functions/isWhitespaceText.md) | Check whether a JSX child node is **any** whitespace‑only text. |
| [resolveAttributeValue](functions/resolveAttributeValue.md) | Resolve the value of a JSX attribute (or spread attribute) into a [JsxAttributeValue](type-aliases/JsxAttributeValue.md) descriptor that can be inspected further. |

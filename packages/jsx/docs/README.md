# @eslint-react/jsx

## Type Aliases

| Type Alias                                       | Description                                                             |
| ------------------------------------------------ | ----------------------------------------------------------------------- |
| [AttributeValue](type-aliases/AttributeValue.md) | Discriminated union representing the resolved value of a JSX attribute. |
| [ElementTest](type-aliases/ElementTest.md)       | A test that determines whether a JSX element matches.                   |

## Variables

| Variable                                | Description                                                |
| --------------------------------------- | ---------------------------------------------------------- |
| [isAttribute](variables/isAttribute.md) | Check if the node is a `JSXAttribute` with the given name. |

## Functions

| Function                                                        | Description                                                                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [collapseMultilineText](functions/collapseMultilineText.md)     | Collapse a multiline JSX text string following React's whitespace rules.                                                                                                                                                        |
| [findAttribute](functions/findAttribute.md)                     | Find a JSX attribute (or a spread attribute containing the property) by name.                                                                                                                                                   |
| [findParentAttribute](functions/findParentAttribute.md)         | Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor, optionally matching a predicate.                                                                                                                       |
| [findSpreadProperty](functions/findSpreadProperty.md)           | Find the `Property` node that provides a given key inside a spread argument.                                                                                                                                                    |
| [getAttributeName](functions/getAttributeName.md)               | Get the stringified name of a `JSXAttribute` node.                                                                                                                                                                              |
| [getAttributeStaticValue](functions/getAttributeStaticValue.md) | Find an attribute by name on a JSX element and collapse its value to a plain JavaScript value.                                                                                                                                  |
| [getAttributeValue](functions/getAttributeValue.md)             | Find an attribute by name on a JSX element and resolve its value in a single call.                                                                                                                                              |
| [getChildren](functions/getChildren.md)                         | Get the meaningful children of a JSX element or fragment.                                                                                                                                                                       |
| [getElementFullType](functions/getElementFullType.md)           | Get the string representation of a JSX element's type.                                                                                                                                                                          |
| [getElementSelfType](functions/getElementSelfType.md)           | Get the self name (last dot-separated segment) of a JSX element type.                                                                                                                                                           |
| [hasAnyAttribute](functions/hasAnyAttribute.md)                 | Check if the element has at least one of the given attributes.                                                                                                                                                                  |
| [hasAttribute](functions/hasAttribute.md)                       | Check if the element has an attribute with the given name.                                                                                                                                                                      |
| [hasChildren](functions/hasChildren.md)                         | Check if the element has at least one meaningful child, that is, a child that is not purely whitespace text or an empty string expression (`{""}`).                                                                             |
| [hasEveryAttribute](functions/hasEveryAttribute.md)             | Check if the element has all of the given attributes.                                                                                                                                                                           |
| [isElement](functions/isElement.md)                             | Check if the node is a `JSXElement` (or `JSXFragment`), optionally matching a given test.                                                                                                                                       |
| [isEmptyStringExpression](functions/isEmptyStringExpression.md) | Check if the node is an empty string expression (`{""}`).                                                                                                                                                                       |
| [isFragmentElement](functions/isFragmentElement.md)             | Check if the node is a React Fragment element.                                                                                                                                                                                  |
| [isHostElement](functions/isHostElement.md)                     | Check if the node is a host (intrinsic / DOM) element, that is, a `JSXElement` whose tag name starts with a lowercase letter (ex: `<div>` vs `<MyComponent>`).                                                                  |
| [isPaddingWhitespace](functions/isPaddingWhitespace.md)         | Check if the node is whitespace padding that React would trim away during rendering, that is, a `JSXText` node that cleans to nothing (see [collapseMultilineText](functions/collapseMultilineText.md)) and contains a newline. |
| [isWhitespaceText](functions/isWhitespaceText.md)               | Check if the node is whitespace-only text.                                                                                                                                                                                      |
| [resolveAttributeValue](functions/resolveAttributeValue.md)     | Resolve the value of a JSX attribute (or spread attribute) into an [AttributeValue](type-aliases/AttributeValue.md) descriptor.                                                                                                 |

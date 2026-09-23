# @eslint-react/jsx

## Interfaces

| Interface                                                  | Description                                                                                                                                |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [AttributeDescriptor](interfaces/AttributeDescriptor.md)   | A named attribute, its source, and its value, with context-bound static evaluation.                                                        |
| [AttributeStaticValue](interfaces/AttributeStaticValue.md) | A successfully evaluated attribute value, including a known `undefined`. Absence of this result represents an indeterminate value instead. |

## Type Aliases

| Type Alias                                             | Description                                                                              |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| [AttributeSource](type-aliases/AttributeSource.md)     | Where an authored attribute comes from, independent of its value's syntax.               |
| [AttributeValue](type-aliases/AttributeValue.md)       | The syntax of a single attribute value, independent of its source and static evaluation. |
| [ElementDescriptor](type-aliases/ElementDescriptor.md) | A structural description of an authored JSX element, fragment, or `createElement` call.  |
| [ElementTest](type-aliases/ElementTest.md)             | A test that determines whether a JSX element matches.                                    |

## Variables

| Variable                                | Description                                                |
| --------------------------------------- | ---------------------------------------------------------- |
| [isAttribute](variables/isAttribute.md) | Check if the node is a `JSXAttribute` with the given name. |

## Functions

| Function                                                        | Description                                                                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [collapseMultilineText](functions/collapseMultilineText.md)     | Collapse a multiline JSX text string following React's whitespace rules.                                                                                                                                                        |
| [evaluateAttributeValue](functions/evaluateAttributeValue.md)   | Attempt to statically evaluate a resolved attribute value.                                                                                                                                                                      |
| [findAttribute](functions/findAttribute.md)                     | Find a JSX attribute (or a spread attribute containing the property) by name.                                                                                                                                                   |
| [findParentAttribute](functions/findParentAttribute.md)         | Walk up the AST from `node` to find the nearest `JSXAttribute` ancestor, optionally matching a predicate.                                                                                                                       |
| [findSpreadProperty](functions/findSpreadProperty.md)           | Find the `Property` node that provides a given key inside a spread argument.                                                                                                                                                    |
| [getAttributeDescriptor](functions/getAttributeDescriptor.md)   | Find an authored JSX attribute by name and describe its source and value.                                                                                                                                                       |
| [getAttributeName](functions/getAttributeName.md)               | Get the stringified name of a `JSXAttribute` node.                                                                                                                                                                              |
| [getAttributeStaticValue](functions/getAttributeStaticValue.md) | Find an attribute by name and return its plain static value.                                                                                                                                                                    |
| [getAttributeValue](functions/getAttributeValue.md)             | Find an attribute by name on a JSX element and describe its value.                                                                                                                                                              |
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
| [resolveAttribute](functions/resolveAttribute.md)               | Describe a plain JSX attribute, retaining its name, source, and value syntax.                                                                                                                                                   |
| [resolveAttributeValue](functions/resolveAttributeValue.md)     | Resolve a plain JSX attribute into a syntax descriptor without evaluating it.                                                                                                                                                   |
| [resolveElement](functions/resolveElement.md)                   | Describe an element without constructing or evaluating a React element.                                                                                                                                                         |

# Rules Overview

<!-- begin auto-generated rules list -->

## jsx

| Name                                                                                                                    | Description                                                |
| :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| [jsx/no-array-index-key](../../../packages/eslint-plugin-jsx/src/rules/no-array-index-key.md)                           | disallow using Array index as key                          |
| [jsx/no-comment-textnodes](../../../packages/eslint-plugin-jsx/src/rules/no-comment-textnodes.md)                       | disallow comments from being inserted as text nodes        |
| [jsx/no-duplicate-key](../../../packages/eslint-plugin-jsx/src/rules/no-duplicate-key.md)                               | disallow duplicate keys in `key` prop when rendering list  |
| [jsx/no-leaked-conditional-rendering](../../../packages/eslint-plugin-jsx/src/rules/no-leaked-conditional-rendering.md) | disallow problematic leaked values from being rendered     |
| [jsx/no-missing-key](../../../packages/eslint-plugin-jsx/src/rules/no-missing-key.md)                                   | require `key` prop when rendering list                     |
| [jsx/no-spreading-key](../../../packages/eslint-plugin-jsx/src/rules/no-spreading-key.md)                               | disallow spreading key from objects.                       |
| [jsx/no-useless-fragment](../../../packages/eslint-plugin-jsx/src/rules/no-useless-fragment.md)                         | disallow unnecessary fragments                             |
| [jsx/prefer-shorthand-boolean](../../../packages/eslint-plugin-jsx/src/rules/prefer-shorthand-boolean.md)               | enforce boolean attributes notation in JSX                 |
| [jsx/prefer-shorthand-fragment](../../../packages/eslint-plugin-jsx/src/rules/prefer-shorthand-fragment.md)             | enforce using fragment syntax instead of `Pragma.Fragment` |

## react

| Name                                                                                                                                              | Description                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------ |
| [react/no-children-in-void-dom-elements](../../../packages/eslint-plugin-react/src/rules/no-children-in-void-dom-elements.md)                     | disallow passing children to void DOM elements                                  |
| [react/no-class-component](../../../packages/eslint-plugin-react/src/rules/no-class-component.md)                                                 | enforce that there are no class components                                      |
| [react/no-clone-element](../../../packages/eslint-plugin-react/src/rules/no-clone-element.md)                                                     | disallow `cloneElement`                                                         |
| [react/no-constructed-context-value](../../../packages/eslint-plugin-react/src/rules/no-constructed-context-value.md)                             | disallow passing constructed values to context providers                        |
| [react/no-create-ref](../../../packages/eslint-plugin-react/src/rules/no-create-ref.md)                                                           | disallow `createRef` in function components                                     |
| [react/no-dangerously-set-innerhtml](../../../packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml.md)                             | disallow when a DOM element is using both children and dangerouslySetInnerHTML' |
| [react/no-dangerously-set-innerhtml-with-children](../../../packages/eslint-plugin-react/src/rules/no-dangerously-set-innerhtml-with-children.md) | disallow when a DOM element is using both children and dangerouslySetInnerHTML' |
| [react/no-missing-button-type](../../../packages/eslint-plugin-react/src/rules/no-missing-button-type.md)                                         | enforce that button elements have an explicit type attribute                    |
| [react/no-missing-iframe-sandbox](../../../packages/eslint-plugin-react/src/rules/no-missing-iframe-sandbox.md)                                   | enforce that iframe elements explicitly specify a sandbox attribute             |
| [react/no-namespace](../../../packages/eslint-plugin-react/src/rules/no-namespace.md)                                                             | enforce that namespaces are not used in React elements                          |
| [react/no-script-url](../../../packages/eslint-plugin-react/src/rules/no-script-url.md)                                                           | disallow `javascript:` URLs as JSX event handler prop's value                   |
| [react/no-string-refs](../../../packages/eslint-plugin-react/src/rules/no-string-refs.md)                                                         | disallow using deprecated string refs                                           |
| [react/no-unsafe-iframe-sandbox](../../../packages/eslint-plugin-react/src/rules/no-unsafe-iframe-sandbox.md)                                     | disallow unsafe iframe sandbox attribute combinations                           |
| [react/no-unsafe-target-blank](../../../packages/eslint-plugin-react/src/rules/no-unsafe-target-blank.md)                                         | disallow `target="_blank"` without `rel="noreferrer noopener"`                  |
| [react/no-unstable-default-props](../../../packages/eslint-plugin-react/src/rules/no-unstable-default-props.md)                                   | disallow usage of unstable value as default param in function component         |
| [react/no-unstable-nested-components](../../../packages/eslint-plugin-react/src/rules/no-unstable-nested-components.md)                           | disallow usage of unstable nested components                                    |
| [react/prefer-destructuring-assignment](../../../packages/eslint-plugin-react/src/rules/prefer-destructuring-assignment.md)                       | enforce using destructuring assignment in component props and context           |

## hooks

| Name                                                                                                                                    | Description                            |
| :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| [hooks/ensure-custom-hooks-using-other-hooks](../../../packages/eslint-plugin-hooks/src/rules/ensure-custom-hooks-using-other-hooks.md) | enforce custom hooks using other hooks |

## naming-convention

| Name                                                                                                                      | Description                                                        |
| :------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------------------------------- |
| [naming-convention/component-name](../../../packages/eslint-plugin-naming-convention/src/rules/component-name.md)         | enforce component naming convention to PascalCase or CONSTANT_CASE |
| [naming-convention/filename](../../../packages/eslint-plugin-naming-convention/src/rules/filename.md)                     | enforce naming convention for JSX file names                       |
| [naming-convention/filename-extension](../../../packages/eslint-plugin-naming-convention/src/rules/filename-extension.md) | enforce naming convention for JSX file extensions                  |

## debug

| Name                                                                                              | Description                                               |
| :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------- |
| [debug/class-component](../../../packages/eslint-plugin-debug/src/rules/class-component.md)       | reports all class components, including anonymous ones    |
| [debug/function-component](../../../packages/eslint-plugin-debug/src/rules/function-component.md) | reports all function components, including anonymous ones |
| [debug/hooks](../../../packages/eslint-plugin-debug/src/rules/hooks.md)                           | reports all react hooks                                   |

<!-- end auto-generated rules list -->

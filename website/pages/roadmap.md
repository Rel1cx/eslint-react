# Roadmap

## Milestone 1.5 (Completed)

### `@eslint-react/eslint-plugin`

#### Core Rules

| Rule                                     | Description                                                                                            |
| :--------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `ensure-forward-ref-using-ref`           | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                        |
| `no-access-state-in-setstate`            | Prevents accessing `this.state` inside `setState` calls.                                               |
| `no-array-index-key`                     | Warns when an array `index` is used as a `key` prop.                                                   |
| `no-children-count`                      | Prevents usage of `Children.count`.                                                                    |
| `no-children-for-each`                   | Prevents usage of `Children.forEach`.                                                                  |
| `no-children-map`                        | Prevents usage of `Children.map`.                                                                      |
| `no-children-only`                       | Prevents usage of `Children.only`.                                                                     |
| `no-children-prop`                       | Prevents usage of `children` as a prop.                                                                |
| `no-children-to-array`                   | Prevents usage of `Children.toArray`.                                                                  |
| `no-class-component`                     | Prevents usage of class component.                                                                     |
| `no-clone-element`                       | Prevents usage of `cloneElement`.                                                                      |
| `no-comment-textnodes`                   | Prevents comments from being inserted as text nodes.                                                   |
| `no-complicated-conditional-rendering`   | Prevents complicated conditional rendering in JSX.                                                     |
| `no-component-will-mount`                | Prevents usage of `componentWillMount`.                                                                |
| `no-component-will-receive-props`        | Prevents usage of `componentWillReceiveProps`.                                                         |
| `no-component-will-update`               | Prevents usage of `componentWillUpdate`.                                                               |
| `no-create-ref`                          | Prevents usage of `createRef`.                                                                         |
| `no-direct-mutation-state`               | Prevents direct mutation of `this.state`.                                                              |
| `no-duplicate-key`                       | Prevents duplicate `key` props on elements in the same array or a list of `children`.                  |
| `no-implicit-key`                        | Prevents spreading `key` prop from objects.                                                            |
| `no-leaked-conditional-rendering`        | Prevents problematic leaked values from being rendered.                                                |
| `no-missing-component-display-name`      | Enforces that all components have a `displayName` which can be used in devtools.                       |
| `no-missing-key`                         | Prevents missing `key` prop on items in list rendering.                                                |
| `no-nested-components`                   | Prevents nesting component definitions inside other components.                                        |
| `no-redundant-should-component-update`   | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                        |
| `no-render-return-value`                 | Prevents usage of the return value of `ReactDOM.render`.                                               |
| `no-set-state-in-component-did-mount`    | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.      |
| `no-set-state-in-component-did-update`   | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.     |
| `no-set-state-in-component-will-update`  | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.    |
| `no-string-refs`                         | Disallows using deprecated string `refs`.                                                              |
| `no-unsafe-component-will-mount`         | Warns usage of `UNSAFE_componentWillMount` in class components.                                        |
| `no-unsafe-component-will-receive-props` | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                                 |
| `no-unsafe-component-will-update`        | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                       |
| `no-unstable-context-value`              | Prevents non-stable values (i.e. object identities) from being used as a value for `Context.Provider`. |
| `no-unstable-default-props`              | Prevents usage of referential-type values as default props in object destructuring.                    |
| `no-unused-class-component-members`      | Warns unused class component methods and properties.                                                   |
| `no-unused-state`                        | Warns unused class component state.                                                                    |
| `no-useless-fragment`                    | Prevents the use of useless `fragment` components or `<>` syntax.                                      |
| `prefer-destructuring-assignment`        | Enforces the use of destructuring assignment over property assignment.                                 |
| `prefer-shorthand-boolean`               | Enforces the use of shorthand syntax for boolean attributes.                                           |
| `prefer-shorthand-fragment`              | Enforces the use of shorthand syntax for fragments.                                                    |

#### DOM Rules

| Rule                                             | Description                                                                             |
| :----------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `dom/no-children-in-void-dom-elements`           | Prevents the use of `children` in void `DOM elements`.                                  |
| `dom/no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 |
| `dom/no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |
| `dom/no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                        |
| `dom/no-missing-button-type`                     | Enforces explicit `button` type `attribute` for `<button>` elements.                    |
| `dom/no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                            |
| `dom/no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                |
| `dom/no-script-url`                              | Prevents usage of `javascript:` URLs as the value of component props.                   |
| `dom/no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   |
| `dom/no-unsafe-target-blank`                     | Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.              |

#### Hooks Extra Rules

| Rule                                                 | Description                                                       |
| :--------------------------------------------------- | :---------------------------------------------------------------- |
| `hooks-extra/ensure-custom-hooks-using-other-hooks`  | Warns when custom Hooks that don't use other Hooks.               |
| `hooks-extra/ensure-use-callback-has-non-empty-deps` | Warns when `useCallback` is called with empty dependencies array. |
| `hooks-extra/ensure-use-memo-has-non-empty-deps`     | Warns when `useMemo` is called with empty dependencies array.     |
| `hooks-extra/prefer-use-state-lazy-initialization`   | Warns function calls made inside `useState` calls.                |

#### Naming Convention Rules

| Rule                                   | Description                                                                                |
| :------------------------------------- | :----------------------------------------------------------------------------------------- |
| `naming-convention/component-name`     | Enforces naming conventions for components.                                                |
| `naming-convention/filename`           | Enforces naming convention for JSX files.                                                  |
| `naming-convention/filename-extension` | Enforces consistent use of the JSX file extension.                                         |
| `naming-convention/use-state`          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. |

## Milestone 2.0

### Plugins (with ecological niche explanation)

- `eslint-plugin-react-core` (DOM Irrelevant, Render Target Agnostic, Formatting Independent)
- `eslint-plugin-react-dom` (DOM Specific rules for React DOM).
- `eslint-plugin-react-hooks` (The official one from React)
- `eslint-plugin-react-hooks-extra` (Extra rules for `eslint-plugin-react-hooks`)
- `eslint-plugin-react-naming-convention` (Optional, only naming convention rules, can be replaced with other plugins depending on the project)
- ... (Free to combine with other plugins from the community)

### Rules in `eslint-plugin-react-core`

| Rule                                     | Description                                                                                            |
| :--------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `ensure-forward-ref-using-ref`           | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                        |
| `no-access-state-in-setstate`            | Prevents accessing `this.state` inside `setState` calls.                                               |
| `no-array-index-key`                     | Warns when an array `index` is used as a `key` prop.                                                   |
| `no-children-count`                      | Prevents usage of `Children.count`.                                                                    |
| `no-children-for-each`                   | Prevents usage of `Children.forEach`.                                                                  |
| `no-children-map`                        | Prevents usage of `Children.map`.                                                                      |
| `no-children-only`                       | Prevents usage of `Children.only`.                                                                     |
| `no-children-prop`                       | Prevents usage of `children` as a prop.                                                                |
| `no-children-to-array`                   | Prevents usage of `Children.toArray`.                                                                  |
| `no-class-component`                     | Prevents usage of class component.                                                                     |
| `no-clone-element`                       | Prevents usage of `cloneElement`.                                                                      |
| `no-comment-textnodes`                   | Prevents comments from being inserted as text nodes.                                                   |
| `no-complicated-conditional-rendering`   | Prevents complicated conditional rendering in JSX.                                                     |
| `no-component-will-mount`                | Prevents usage of `componentWillMount`.                                                                |
| `no-component-will-receive-props`        | Prevents usage of `componentWillReceiveProps`.                                                         |
| `no-component-will-update`               | Prevents usage of `componentWillUpdate`.                                                               |
| `no-create-ref`                          | Prevents usage of `createRef`.                                                                         |
| `no-direct-mutation-state`               | Prevents direct mutation of `this.state`.                                                              |
| `no-duplicate-key`                       | Prevents duplicate `key` props on elements in the same array or a list of `children`.                  |
| `no-implicit-key`                        | Prevents spreading `key` prop from objects.                                                            |
| `no-leaked-conditional-rendering`        | Prevents problematic leaked values from being rendered.                                                |
| `no-missing-component-display-name`      | Enforces that all components have a `displayName` which can be used in devtools.                       |
| `no-missing-key`                         | Prevents missing `key` prop on items in list rendering.                                                |
| `no-nested-components`                   | Prevents nesting component definitions inside other components.                                        |
| `no-redundant-should-component-update`   | Prevents usage of `shouldComponentUpdate` when extending `React.PureComponent`.                        |
| `no-render-return-value`                 | Prevents usage of the return value of `ReactDOM.render`.                                               |
| `no-set-state-in-component-did-mount`    | Disallows calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.      |
| `no-set-state-in-component-did-update`   | Disallows calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.     |
| `no-set-state-in-component-will-update`  | Disallows calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.    |
| `no-string-refs`                         | Disallows using deprecated string `refs`.                                                              |
| `no-unsafe-component-will-mount`         | Warns usage of `UNSAFE_componentWillMount` in class components.                                        |
| `no-unsafe-component-will-receive-props` | Warns usage of `UNSAFE_componentWillReceiveProps` in class components.                                 |
| `no-unsafe-component-will-update`        | Warns usage of `UNSAFE_componentWillUpdate` in class components.                                       |
| `no-unstable-context-value`              | Prevents non-stable values (i.e. object identities) from being used as a value for `Context.Provider`. |
| `no-unstable-default-props`              | Prevents usage of referential-type values as default props in object destructuring.                    |
| `no-unused-class-component-members`      | Warns unused class component methods and properties.                                                   |
| `no-unused-state`                        | Warns unused class component state.                                                                    |
| `no-useless-fragment`                    | Prevents the use of useless `fragment` components or `<>` syntax.                                      |
| `prefer-destructuring-assignment`        | Enforces the use of destructuring assignment over property assignment.                                 |
| `prefer-shorthand-boolean`               | Enforces the use of shorthand syntax for boolean attributes.                                           |
| `prefer-shorthand-fragment`              | Enforces the use of shorthand syntax for fragments.                                                    |

### Rules in `eslint-plugin-react-dom`

| Rule                                         | Description                                                                             |
| :------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `no-children-in-void-dom-elements`           | Prevents the use of `children` in void `DOM elements`.                                  |
| `no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 |
| `no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |
| `no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                        |
| `no-missing-button-type`                     | Enforces explicit `button` type `attribute` for `<button>` elements.                    |
| `no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                            |
| `no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                |
| `no-script-url`                              | Prevents usage of `javascript:` URLs as the value of component props.                   |
| `no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   |
| `no-unsafe-target-blank`                     | Prevents the use of `target="_blank"` without `rel="noreferrer noopener"`.              |

### Rules in `eslint-plugin-react-hooks-extra`

| Rule                                     | Description                                                       |
| :--------------------------------------- | :---------------------------------------------------------------- |
| `ensure-custom-hooks-using-other-hooks`  | Warns when custom Hooks that don't use other Hooks.               |
| `ensure-use-callback-has-non-empty-deps` | Warns when `useCallback` is called with empty dependencies array. |
| `ensure-use-memo-has-non-empty-deps`     | Warns when `useMemo` is called with empty dependencies array.     |
| `prefer-use-state-lazy-initialization`   | Warns function calls made inside `useState` calls.                |

### Rules in `eslint-plugin-react-naming-convention`

| Rule                 | Description                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `component-name`     | Enforces naming conventions for components.                                                |
| `filename`           | Enforces naming convention for JSX files.                                                  |
| `filename-extension` | Enforces consistent use of the JSX file extension.                                         |
| `use-state`          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. |

## Milestone 2.5 (Draft)

### Plugins (with ecological niche explanation)

- `eslint-plugin-react-core` (DOM Irrelevant, Render Target Agnostic, Formatting Independent)
- `eslint-plugin-react-dom` (DOM Specific rules for React DOM).
- `eslint-plugin-react-dom-a11y` (Accessibility rules for React DOM).
- `eslint-plugin-react-web-api` (Web API rules for React).
- `eslint-plugin-react-hooks` (The official one from React)
- `eslint-plugin-react-hooks-extra` (Extra rules for `eslint-plugin-react-hooks`)
- `eslint-plugin-react-naming-convention` (Optional, only naming convention rules, can be replaced with other plugins depending on the project)
- ... (Free to combine with other plugins from the community)

### Rules in `eslint-plugin-react-dom-a11y` (port [open-wc's a11y rules](https://open-wc.org/docs/linting/eslint-plugin-lit-a11y/overview/#supported-rules))

| Rule                                 | Description                                                                                                                                                                                |
| :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alt-text`                           | Enforce that all elements that require alternative text have meaningful information to relay back to the end user.                                                                         |
| `anchor-has-content`                 | Enforce that anchors have content and that the content is accessible to screen readers.                                                                                                    |
| `anchor-is-valid`                    | Performs validity check on anchor hrefs. Warns when anchors are used as buttons.                                                                                                           |
| `aria-activedescendant-has-tabindex` | Enforce that an element with `aria-activedescendant` has a `tabindex`.                                                                                                                     |
| `aria-attr-valid-value`              | ARIA state and property values must be valid.                                                                                                                                              |
| `aria-attrs`                         | Elements cannot use an invalid ARIA attribute. This will fail if it finds an aria-* property that is not listed in [WAI-ARIA States and Properties spec](https://www.w3.org/TR/wai-aria/). |
| `aria-role`                          | Elements with ARIA roles must use a valid, non-abstract ARIA role. A reference to role definitions can be found at [WAI-ARIA](https://www.w3.org/TR/wai-aria/#role_definitions) site.      |
| `aria-unsupported-elements`          | Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes.                                                                                 |
| `autocomplete-valid`                 | Ensure the autocomplete attribute is correct and suitable for the form field it is used with.                                                                                              |
| `click-events-have-key-events`       | Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress.                                                                                           |
| `heading-has-content`                | Enforce that heading elements (h1, h2, etc.) have content and that the content is accessible to screen readers.                                                                            |
| `iframe-title`                       | `<iframe>` elements must have a unique title property to indicate its content to the user.                                                                                                 |
| `img-redundant-alt`                  | Enforce img alt attribute does not contain the words image, picture, or photo.                                                                                                             |
| `mouse-events-have-key-events`       | Enforce onMouseover/onMouseout are accompanied by onFocus/onBlur.                                                                                                                          |
| `no-access-key`                      | Enforce no accesskey attribute on element.                                                                                                                                                 |
| `no-autofocus`                       | Enforce that autofocus attribute is not used on elements.                                                                                                                                  |
| `no-distracting-elements`            | Enforces that no distracting `<marquee>` or `<blink>` elements are used.                                                                                                                   |
| `no-redundant-role`                  | Enforce explicit role property is not the same as implicit/default role property on element.                                                                                               |
| `role-has-required-aria-attrs`       | Enforce that elements with ARIA roles must have all required attributes for that role.                                                                                                     |
| `role-supports-aria-attr`            | Enforce that elements with a defined role contain only supported ARIA attributes for that role.                                                                                            |
| `scope`                              | Enforce scope attribute is only used on `<th>` elements.                                                                                                                                   |
| `tabindex-no-positive`               | Enforce tabIndex value is not greater than zero.                                                                                                                                           |
| `valid-lang`                         | Enforce the lang attribute on the html element. The lang attribute will only be populated with a value that's [BCP 47](https://www.ietf.org/rfc/bcp/bcp47.txt) compliant                   |

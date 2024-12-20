# Roadmap

## Milestone 2.0

### Plugins (with ecological niche explanation)

- `eslint-plugin-react-x` - Core rules (renderer-agnostic, compatible with x-platform).
- `eslint-plugin-react-dom` - DOM Specific rules for React DOM.
- `eslint-plugin-react-web-api` - Rules for interacting with Web APIs.
- `eslint-plugin-react-hooks` - The official one from React.
- `eslint-plugin-react-hooks-extra` - Extra rules for `eslint-plugin-react-hooks`.
- `eslint-plugin-react-naming-convention` - Optional naming convention rules (can be replaced with other plugins depending on the project).

### Rules in `eslint-plugin-react-x`

| Rule                                     | Description                                                                                          |
| :--------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `ensure-forward-ref-using-ref`           | Requires that components wrapped with `forwardRef` must have a `ref` parameter.                      |
| `no-access-state-in-setstate`            | Prevents accessing `this.state` inside `setState` calls.                                             |
| `no-array-index-key`                     | Prevents using array `index` as `key`.                                                               |
| `no-children-count`                      | Prevents using `Children.count`.                                                                     |
| `no-children-for-each`                   | Prevents using `Children.forEach`.                                                                   |
| `no-children-map`                        | Prevents using `Children.map`.                                                                       |
| `no-children-only`                       | Prevents using `Children.only`.                                                                      |
| `no-children-prop`                       | Prevents using `children` as a prop.                                                                 |
| `no-children-to-array`                   | Prevents using `Children.toArray`.                                                                   |
| `no-class-component`                     | Prevents using class component.                                                                      |
| `no-clone-element`                       | Prevents using `cloneElement`.                                                                       |
| `no-comment-textnodes`                   | Prevents comments from being inserted as text nodes.                                                 |
| `no-complex-conditional-rendering`       | Prevents complex conditional rendering in JSX.                                                       |
| `no-component-will-mount`                | Prevents using `componentWillMount`.                                                                 |
| `no-component-will-receive-props`        | Prevents using `componentWillReceiveProps`.                                                          |
| `no-component-will-update`               | Prevents using `componentWillUpdate`.                                                                |
| `no-create-ref`                          | Prevents using `createRef`.                                                                          |
| `no-default-props`                       | Prevents using `defaultProps` property in favor of ES6 default parameters.                           |
| `no-direct-mutation-state`               | Prevents direct mutation of `this.state`.                                                            |
| `no-duplicate-key`                       | Prevents duplicate `key` on elements in the same array or a list of `children`.                      |
| `no-forward-ref`                         | Prevents using `forwardRef`.                                                                         |
| `no-implicit-key`                        | Prevents `key` from not being explicitly specified (e.g. spreading `key` from objects).              |
| `no-leaked-conditional-rendering`        | Prevents problematic leaked values from being rendered.                                              |
| `no-missing-component-display-name`      | Enforces that all components have a `displayName` which can be used in devtools.                     |
| `no-missing-key`                         | Prevents missing `key` on items in list rendering.                                                   |
| `no-nested-components`                   | Prevents nesting component definitions inside other components.                                      |
| `no-prop-types`                          | Prevents using `propTypes` in favor of TypeScript or another type-checking solution.                 |
| `no-redundant-should-component-update`   | Prevents using `shouldComponentUpdate` when extending `React.PureComponent`.                         |
| `no-set-state-in-component-did-mount`    | Prevents calling `this.setState` in `componentDidMount` outside of functions, such as callbacks.     |
| `no-set-state-in-component-did-update`   | Prevents calling `this.setState` in `componentDidUpdate` outside of functions, such as callbacks.    |
| `no-set-state-in-component-will-update`  | Prevents calling `this.setState` in `componentWillUpdate` outside of functions, such as callbacks.   |
| `no-string-refs`                         | Prevents using deprecated string `refs`.                                                             |
| `no-unsafe-component-will-mount`         | Warns the usage of `UNSAFE_componentWillMount` in class components.                                  |
| `no-unsafe-component-will-receive-props` | Warns the usage of `UNSAFE_componentWillReceiveProps` in class components.                           |
| `no-unsafe-component-will-update`        | Warns the usage of `UNSAFE_componentWillUpdate` in class components.                                 |
| `no-unstable-context-value`              | Prevents non-stable values (i.e. object literals) from being used as a value for `Context.Provider`. |
| `no-unstable-default-props`              | Prevents using referential-type values as default props in object destructuring.                     |
| `no-unused-class-component-members`      | Warns unused class component methods and properties.                                                 |
| `no-unused-state`                        | Warns unused class component state.                                                                  |
| `no-useless-fragment`                    | Prevents using useless `fragment` components or `<>` syntax.                                         |
| `prefer-destructuring-assignment`        | Enforces using destructuring assignment over property assignment.                                    |
| `prefer-read-only-props`                 | Enforce read-only props in components.                                                               |
| `prefer-shorthand-boolean`               | Enforces using shorthand syntax for boolean attributes.                                              |
| `prefer-shorthand-fragment`              | Enforces using shorthand syntax for fragments.                                                       |

### Rules in `eslint-plugin-react-dom`

| Rule                                         | Description                                                                             |
| :------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `no-children-in-void-dom-elements`           | Prevents usage of `children` in void `DOM elements`.                                    |
| `no-dangerously-set-innerhtml`               | Prevents `DOM element` using `dangerouslySetInnerHTML`.                                 |
| `no-dangerously-set-innerhtml-with-children` | Prevents `DOM element` using `dangerouslySetInnerHTML` and `children` at the same time. |
| `no-find-dom-node`                           | Prevents usage of `findDOMNode`.                                                        |
| `no-missing-button-type`                     | Enforces explicit `type` attribute for `<button>` elements.                             |
| `no-missing-iframe-sandbox`                  | Enforces explicit `sandbox` attribute for `iframe` elements.                            |
| `no-namespace`                               | Enforces the absence of a `namespace` in React elements.                                |
| `no-render-return-value`                     | Prevents usage of the return value of `ReactDOM.render`.                                |
| `no-script-url`                              | Prevents usage of `javascript:` URLs as the value of certain attributes.                |
| `no-unsafe-iframe-sandbox`                   | Enforces `sandbox` attribute for `iframe` elements is not set to unsafe combinations.   |
| `no-unsafe-target-blank`                     | Prevents usage of `target="_blank"` without `rel="noreferrer noopener"`.                |

### Rules in `eslint-plugin-react-web-api`

| Rule                                    | Description                                   |
| :-------------------------------------- | :-------------------------------------------- |
| `no-leaked-timeout`                     | Prevents leaked `setTimeout`                  |
| `no-leaked-interval`                    | Prevents leaked `setInterval`                 |
| `no-leaked-idle-callback`               | Prevents leaked `requestIdleCallback`         |
| `no-leaked-animation-frame`             | Prevents leaked `requestAnimationFrame`       |
| `no-leaked-event-source`                | Prevents leaked `EventSource`                 |
| `no-leaked-event-listener`              | Prevents leaked `addEventListener`            |
| `no-leaked-resize-observer`             | Prevents leaked `ResizeObserver`              |
| `no-leaked-intersection-observer`       | Prevents leaked `IntersectionObserver`        |
| `no-leaked-mutation-observer`           | Prevents leaked `MutationObserver`            |
| `no-leaked-performance-observer`        | Prevents leaked `PerformanceObserver`         |
| `no-leaked-websocket`                   | Prevents leaked `WebSocket`                   |
| `no-leaked-broadcast-channel`           | Prevents leaked `BroadcastChannel`            |
| `no-leaked-geolocation`                 | Prevents leaked `Geolocation.watchPosition()` |
| `no-leaked-absolute-orientation-sensor` | Prevents leaked `AbsoluteOrientationSensor`   |
| `no-leaked-relative-accelerometer`      | Prevents leaked `Accelerometer`               |
| `no-leaked-ambient-light-sensor`        | Prevents leaked `AmbientLightSensor`          |
| `no-leaked-gravity-sensor`              | Prevents leaked `GravitySensor`               |
| `no-leaked-gyroscope`                   | Prevents leaked `Gyroscope`                   |
| `no-leaked-linear-acceleration-sensor`  | Prevents leaked `LinearAccelerationSensor`    |
| `no-leaked-magnetometer`                | Prevents leaked `Magnetometer`                |
| `no-leaked-orientation-sensor`          | Prevents leaked `OrientationSensor`           |

### Rules in `eslint-plugin-react-hooks-extra`

| Rule                                   | Description                                                           |
| :------------------------------------- | :-------------------------------------------------------------------- |
| `no-direct-set-state-in-use-effect`    | Disallow direct calls to `set` function of `useState` in `useEffect`. |
| `no-useless-custom-hooks`              | Warns when custom Hooks that don't use other Hooks.                   |
| `no-unnecessary-use-callback`          | Disallow unnecessary usage of `useCallback`.                          |
| `no-unnecessary-use-memo`              | Disallow unnecessary usage of `useMemo`.                              |
| `prefer-use-state-lazy-initialization` | Warns function calls made inside `useState` calls.                    |

### Rules in `eslint-plugin-react-naming-convention`

| Rule                 | Description                                                                                |
| :------------------- | :----------------------------------------------------------------------------------------- |
| `component-name`     | Enforces naming conventions for components.                                                |
| `filename`           | Enforces naming convention for JSX files.                                                  |
| `filename-extension` | Enforces consistent use of the JSX file extension.                                         |
| `use-state`          | Enforces destructuring and symmetric naming of `useState` hook value and setter variables. |

### Advanced Configuration features

- Additional components (`settings["react-x"].additionalComponents`) transitions from experimental to stable.

## Milestone 3.0 (Draft)

### Plugins (with ecological niche explanation)

- `eslint-plugin-react-x` - Core rules (renderer-agnostic, compatible with x-platform).
- `eslint-plugin-react-dom` - DOM Specific rules for React DOM.
- `eslint-plugin-react-web-api` - Rules for interacting with Web APIs.
- `eslint-plugin-react-hooks` - The official one from React.
- `eslint-plugin-react-hooks-extra` - Extra rules for `eslint-plugin-react-hooks`.
- `eslint-plugin-react-naming-convention` - Optional naming convention rules (can be replaced with other plugins depending on the project).
- ... (Free to combine with other plugins from the community).

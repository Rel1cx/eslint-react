# eslint-plugin-react-x

4-7x faster, composable ESLint rules for for libraries and frameworks that use React as a UI runtime.

## Install

```sh
# npm
npm install --save-dev eslint-plugin-react-x
```

## Setup

```js
// eslint.config.js

// @ts-check
import js from "@eslint/js";
import react from "eslint-plugin-react-x";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      react.configs.recommended,
    ],
    rules: {
      // Put rules you want to override here
      "react-x/no-class-component": "warn",
    },
  },
);
```

## Rules

### JSX

- [`jsx-dollar`](https://eslint-react.xyz/docs/rules/jsx-dollar) - Prevents unnecessary `$` symbols before JSX expressions (🔧 Fixable)
- [`jsx-key-before-spread`](https://eslint-react.xyz/docs/rules/jsx-key-before-spread) - Enforces `key` prop placement before spread props (🧪 Experimental)
- [`jsx-no-comment-textnodes`](https://eslint-react.xyz/docs/rules/jsx-no-comment-textnodes) - Prevents comment strings (e.g., beginning with `//` or `/*`) from being accidentally inserted into a JSX element's text nodes
- [`jsx-no-duplicate-props`](https://eslint-react.xyz/docs/rules/jsx-no-duplicate-props) - Disallows duplicate props in JSX elements
- [`jsx-no-iife`](https://eslint-react.xyz/docs/rules/jsx-no-iife) - Disallows immediately-invoked function expressions in JSX (🧪 Experimental)
- [`jsx-no-undef`](https://eslint-react.xyz/docs/rules/jsx-no-undef) - Prevents using variables in JSX that are not defined in the scope
- [`jsx-shorthand-boolean`](https://eslint-react.xyz/docs/rules/jsx-shorthand-boolean) - Enforces shorthand syntax for boolean props (🔧 Fixable, ⚙️ Configurable)
- [`jsx-shorthand-fragment`](https://eslint-react.xyz/docs/rules/jsx-shorthand-fragment) - Enforces shorthand syntax for fragment elements (🔧 Fixable, ⚙️ Configurable)
- [`jsx-uses-react`](https://eslint-react.xyz/docs/rules/jsx-uses-react) - Marks React variables as used when JSX is present
- [`jsx-uses-vars`](https://eslint-react.xyz/docs/rules/jsx-uses-vars) - Marks JSX element variables as used

### Key

- [`no-array-index-key`](https://eslint-react.xyz/docs/rules/no-array-index-key) - Disallows using an item's index in the array as its key
- [`no-create-ref`](https://eslint-react.xyz/docs/rules/no-create-ref) - Disallows `createRef` in function components
- [`no-duplicate-key`](https://eslint-react.xyz/docs/rules/no-duplicate-key) - Prevents duplicate `key` props on sibling elements when rendering lists
- [`no-implicit-key`](https://eslint-react.xyz/docs/rules/no-implicit-key) - Prevents `key` from not being explicitly specified (e.g., spreading `key` from objects) (🧪 Experimental)
- [`no-missing-key`](https://eslint-react.xyz/docs/rules/no-missing-key) - Disallows missing `key` on items in list rendering
- [`no-unnecessary-key`](https://eslint-react.xyz/docs/rules/no-unnecessary-key) - Disallows unnecessary `key` props on nested child elements when rendering lists (🧪 Experimental)

### Ref

- [`no-create-ref`](https://eslint-react.xyz/docs/rules/no-create-ref) - Disallows `createRef` in function components
- [`no-forward-ref`](https://eslint-react.xyz/docs/rules/no-forward-ref) - Replaces usage of `forwardRef` with passing `ref` as a prop (🔄 Codemod, `React` >=19.0.0)
- [`no-unnecessary-use-ref`](https://eslint-react.xyz/docs/rules/no-unnecessary-use-ref) - Disallows unnecessary usage of `useRef` (🧪 Experimental)
- [`no-useless-forward-ref`](https://eslint-react.xyz/docs/rules/no-useless-forward-ref) - Disallows useless `forwardRef` calls on components that don't use `ref`s

### Props

- [`no-children-prop`](https://eslint-react.xyz/docs/rules/no-children-prop) - Disallows passing `children` as a prop
- [`no-default-props`](https://eslint-react.xyz/docs/rules/no-default-props) - Disallows the `defaultProps` property in favor of ES6 default parameters
- [`no-prop-types`](https://eslint-react.xyz/docs/rules/no-prop-types) - Disallows `propTypes` in favor of TypeScript or another type-checking solution
- [`no-unstable-default-props`](https://eslint-react.xyz/docs/rules/no-unstable-default-props) - Prevents using referential-type values as default props in object destructuring (⚙️ Configurable)
- [`no-unused-props`](https://eslint-react.xyz/docs/rules/no-unused-props) - Warns about component props that are defined but never used (💭 Type Checking, 🧪 Experimental)
- [`prefer-destructuring-assignment`](https://eslint-react.xyz/docs/rules/prefer-destructuring-assignment) - Enforces destructuring assignment for component props and context
- [`prefer-read-only-props`](https://eslint-react.xyz/docs/rules/prefer-read-only-props) - Enforces read-only props in components (💭 Type Checking, 🧪 Experimental)

### Context

- [`no-context-provider`](https://eslint-react.xyz/docs/rules/no-context-provider) - Replaces usage of `<Context.Provider>` with `<Context>` (🔄 Codemod, `React` >=19.0.0)
- [`no-unstable-context-value`](https://eslint-react.xyz/docs/rules/no-unstable-context-value) - Prevents non-stable values (i.e., object literals) from being used as a value for `Context.Provider`
- [`no-use-context`](https://eslint-react.xyz/docs/rules/no-use-context) - Replaces usage of `useContext` with `use` (🔄 Codemod, `React` >=19.0.0)
- [`prefer-destructuring-assignment`](https://eslint-react.xyz/docs/rules/prefer-destructuring-assignment) - Enforces destructuring assignment for component props and context

### Structure

- [`no-nested-component-definitions`](https://eslint-react.xyz/docs/rules/no-nested-component-definitions) - Disallows nesting component definitions inside other components
- [`no-nested-lazy-component-declarations`](https://eslint-react.xyz/docs/rules/no-nested-lazy-component-declarations) - Disallows nesting lazy component declarations inside other components

### Rendering

- [`no-leaked-conditional-rendering`](https://eslint-react.xyz/docs/rules/no-leaked-conditional-rendering) - Prevents problematic leaked values from being rendered

### Optimization

- [`no-unnecessary-use-callback`](https://eslint-react.xyz/docs/rules/no-unnecessary-use-callback) - Disallows unnecessary usage of `useCallback` (🧪 Experimental)
- [`no-unnecessary-use-memo`](https://eslint-react.xyz/docs/rules/no-unnecessary-use-memo) - Disallows unnecessary usage of `useMemo` (🧪 Experimental)
- [`no-unstable-context-value`](https://eslint-react.xyz/docs/rules/no-unstable-context-value) - Prevents non-stable values (i.e., object literals) from being used as a value for `Context.Provider`
- [`no-unstable-default-props`](https://eslint-react.xyz/docs/rules/no-unstable-default-props) - Prevents using referential-type values as default props in object destructuring (⚙️ Configurable)
- [`prefer-use-state-lazy-initialization`](https://eslint-react.xyz/docs/rules/prefer-use-state-lazy-initialization) - Enforces wrapping function calls made inside `useState` in an `initializer function`

### Legacy Element APIs

- [`no-clone-element`](https://eslint-react.xyz/docs/rules/no-clone-element) - Disallows `cloneElement`

### Legacy Children APIs

- [`no-children-count`](https://eslint-react.xyz/docs/rules/no-children-count) - Disallows the use of `Children.count` from the `react` package
- [`no-children-for-each`](https://eslint-react.xyz/docs/rules/no-children-for-each) - Disallows the use of `Children.forEach` from the `react` package
- [`no-children-map`](https://eslint-react.xyz/docs/rules/no-children-map) - Disallows the use of `Children.map` from the `react` package
- [`no-children-only`](https://eslint-react.xyz/docs/rules/no-children-only) - Disallows the use of `Children.only` from the `react` package
- [`no-children-to-array`](https://eslint-react.xyz/docs/rules/no-children-to-array) - Disallows the use of `Children.toArray` from the `react` package

### Legacy Component APIs

- [`no-access-state-in-setstate`](https://eslint-react.xyz/docs/rules/no-access-state-in-setstate) - Disallows accessing `this.state` inside `setState` calls
- [`no-class-component`](https://eslint-react.xyz/docs/rules/no-class-component) - Disallows class components except for error boundaries
- [`no-component-will-mount`](https://eslint-react.xyz/docs/rules/no-component-will-mount) - Replaces usage of `componentWillMount` with `UNSAFE_componentWillMount` (🔄 Codemod, `React` >=16.3.0)
- [`no-component-will-receive-props`](https://eslint-react.xyz/docs/rules/no-component-will-receive-props) - Replaces usage of `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps` (🔄 Codemod)
- [`no-component-will-update`](https://eslint-react.xyz/docs/rules/no-component-will-update) - Replaces usage of `componentWillUpdate` with `UNSAFE_componentWillUpdate` (🔄 Codemod)
- [`no-direct-mutation-state`](https://eslint-react.xyz/docs/rules/no-direct-mutation-state) - Disallows direct mutation of `this.state`
- [`no-redundant-should-component-update`](https://eslint-react.xyz/docs/rules/no-redundant-should-component-update) - Disallows `shouldComponentUpdate` when extending `React.PureComponent`
- [`no-set-state-in-component-did-mount`](https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-mount) - Disallows calling `this.setState` in `componentDidMount` outside functions such as callbacks
- [`no-set-state-in-component-did-update`](https://eslint-react.xyz/docs/rules/no-set-state-in-component-did-update) - Disallows calling `this.setState` in `componentDidUpdate` outside functions such as callbacks
- [`no-set-state-in-component-will-update`](https://eslint-react.xyz/docs/rules/no-set-state-in-component-will-update) - Disallows calling `this.setState` in `componentWillUpdate` outside functions such as callbacks
- [`no-string-refs`](https://eslint-react.xyz/docs/rules/no-string-refs) - Replaces string refs with callback refs (🔄 Codemod, `React` >=16.3.0)
- [`no-unsafe-component-will-mount`](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-mount) - Warns about the use of `UNSAFE_componentWillMount` in class components
- [`no-unsafe-component-will-receive-props`](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-receive-props) - Warns about the use of `UNSAFE_componentWillReceiveProps` in class components
- [`no-unsafe-component-will-update`](https://eslint-react.xyz/docs/rules/no-unsafe-component-will-update) - Warns about the use of `UNSAFE_componentWillUpdate` in class components
- [`no-unused-class-component-members`](https://eslint-react.xyz/docs/rules/no-unused-class-component-members) - Warns about unused class component methods and properties
- [`no-unused-state`](https://eslint-react.xyz/docs/rules/no-unused-state) - Warns about unused class component state

### RSC

<Callout type="info">
  RSC rules target [React Server Components](https://react.dev/reference/rsc/server-components), [React Server Functions](https://react.dev/reference/rsc/server-functions) and RSC [Directives](https://react.dev/reference/rsc/directives).
</Callout>

- [`rsc-no-misused-use-server`](https://eslint-react.xyz/docs/rules/rsc-no-misused-use-server) - Disallows non-async [React Server Functions](https://react.dev/reference/rsc/server-functions) (🔧 Fixable, 🧪 Experimental)

### Miscellaneous

- [`no-missing-component-display-name`](https://eslint-react.xyz/docs/rules/no-missing-component-display-name) - Enforces that all components have a `displayName` that can be used in DevTools
- [`no-missing-context-display-name`](https://eslint-react.xyz/docs/rules/no-missing-context-display-name) - Enforces that all contexts have a `displayName` that can be used in DevTools (🔧 Fixable)
- [`no-misused-capture-owner-stack`](https://eslint-react.xyz/docs/rules/no-misused-capture-owner-stack) - Prevents incorrect usage of `captureOwnerStack` (🧪 Experimental)
- [`no-unnecessary-use-prefix`](https://eslint-react.xyz/docs/rules/no-unnecessary-use-prefix) - Enforces that a function with the `use` prefix uses at least one Hook inside it
- [`no-useless-fragment`](https://eslint-react.xyz/docs/rules/no-useless-fragment) - Disallows useless fragment elements (🔧 Fixable, ⚙️ Configurable)
- [`prefer-namespace-import`](https://eslint-react.xyz/docs/rules/prefer-namespace-import) - Enforces importing React via a namespace import

<https://eslint-react.xyz/docs/rules/overview#core-rules>

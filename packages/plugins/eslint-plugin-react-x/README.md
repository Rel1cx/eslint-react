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

## JSX Rules

> [!NOTE]
> The `jsx-*` rules check for issues exclusive to JSX syntax, which are absent from standard JavaScript (like handwritten `createElement()` calls).

**Key Rules:**

- `jsx-dollar` - Prevents unnecessary `$` symbols before `JSX` expressions
- `jsx-key-before-spread` - Enforces `key` prop placement before spread operators
- `jsx-no-comment-textnodes` - Prevents comments from rendering as text
- `jsx-no-duplicate-props` - Disallows duplicate `props` in elements
- `jsx-no-iife` - Disallows immediately-invoked function expressions in `JSX`
- `jsx-no-undef` - Disallows undefined variables in `JSX` elements
- `jsx-shorthand-boolean` - Enforces shorthand for boolean attributes (🔧 Fixable, ⚙️ Configurable)
- `jsx-shorthand-fragment` - Enforces `<>` over `<React.Fragment>` (🔧 Fixable, ⚙️ Configurable)
- `jsx-uses-react` - Marks `React` as used when `JSX` is present
- `jsx-uses-vars` - Marks `JSX` element variables as used

## Component Rules

> [!NOTE]
> Component rules enforce best practices and prevent common mistakes in `React` component definitions, covering both class and function components.

**Key Rule Groups:**

**Lifecycle & Deprecated APIs:**

- `no-component-will-mount` - Replaces `componentWillMount` with `UNSAFE_componentWillMount` (🔄 Codemod, `React` >=16.3.0)
- `no-component-will-receive-props` - Replaces `componentWillReceiveProps` with `UNSAFE_componentWillReceiveProps` (🔄 Codemod)
- `no-component-will-update` - Replaces `componentWillUpdate` with `UNSAFE_componentWillUpdate` (🔄 Codemod)
- `no-unsafe-component-will-mount` - Warns about `UNSAFE_componentWillMount` usage
- `no-unsafe-component-will-receive-props` - Warns about `UNSAFE_componentWillReceiveProps` usage
- `no-unsafe-component-will-update` - Warns about `UNSAFE_componentWillUpdate` usage

**React 19 Migrations:**

- `no-context-provider` - Replaces `<Context.Provider>` with `<Context>` (🔄 Codemod, `React` >=19.0.0)
- `no-forward-ref` - Replaces `forwardRef` with `ref` as prop (🔄 Codemod, `React` >=19.0.0)
- `no-use-context` - Replaces `useContext` with `use` (🔄 Codemod, `React` >=19.0.0)

**Component Structure:**

- `no-nested-component-definitions` - Prevents defining components inside other components
- `no-nested-lazy-component-declarations` - Prevents lazy component declarations inside components
- `no-class-component` - Disallows class components except error boundaries

**State Management:**

- `no-access-state-in-setstate` - Prevents `this.state` access inside `setState` calls
- `no-direct-mutation-state` - Prevents direct `this.state` mutation
- `no-set-state-in-component-did-mount` - Restricts `setState` in `componentDidMount`
- `no-set-state-in-component-did-update` - Restricts `setState` in `componentDidUpdate`
- `no-set-state-in-component-will-update` - Restricts `setState` in `componentWillUpdate`

**Props & Keys:**

- `no-missing-key` - Requires `key` prop in list renderings
- `no-duplicate-key` - Prevents duplicate `key` values
- `no-implicit-key` - Prevents implicit `key` spreading (🧪 Experimental)
- `no-unnecessary-key` - Prevents `key` on non-list elements (🧪 Experimental)
- `no-array-index-key` - Warns against using array indices as `keys`

**Children API:**

- `no-children-count` - Disallows `Children.count`
- `no-children-for-each` - Disallows `Children.forEach`
- `no-children-map` - Disallows `Children.map`
- `no-children-only` - Disallows `Children.only`
- `no-children-to-array` - Disallows `Children.toArray`
- `no-children-prop` - Disallows passing `children` as prop

**Performance & Optimization:**

- `no-unstable-context-value` - Prevents unstable values in `Context.Provider`
- `no-unstable-default-props` - Prevents referential values as default `props`
- `no-unnecessary-use-callback` - Warns about unnecessary `useCallback` usage (🧪 Experimental)
- `no-unnecessary-use-memo` - Warns about unnecessary `useMemo` usage (🧪 Experimental)
- `prefer-use-state-lazy-initialization` - Enforces lazy initialization in `useState`

## Rules

<https://eslint-react.xyz/docs/rules/overview#x-rules>

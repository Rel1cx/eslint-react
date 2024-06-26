# Frequently Asked Questions

## What is the purpose of `eslint-react`?

The purpose of `eslint-react` is to provide ESLint plugins for not just for React DOM but also other libraries and frameworks that use React as a runtime. Currently, it provides:

- `eslint-plugin-react-x` - Core rules (DOM Irrelevant, Render Target Agnostic, Formatting Independent).
- `eslint-plugin-react-dom` - DOM specific rules for React DOM.
- `eslint-plugin-react-debug` - Debugging rules.
- `eslint-plugin-react-hooks-extra` - Extra React Hooks rules.
- `eslint-plugin-react-naming-convention` - Naming convention rules.

## What are the differences between `eslint-plugin-react-x` and `eslint-plugin-react`?

The main difference is when using `eslint-plugin-react-x` you can customize the behavior of the rules depending on the what render target you are using. **While `eslint-plugin-react` will always assume you are using `React DOM`** even if you are working with a project that only uses React Three Fiber (You can learn more through encounters like [1] in [2]).

## Is `eslint-plugin-react-x` a replacement for `eslint-plugin-react`?

No, `eslint-plugin-react-x` is not meant to be a drop-in replacement for `eslint-plugin-react`. But you can still using it as a replacement if you want to. Keep in mind that certain rules may behave differently, and the rules provided by `eslint-react` are more adhere to [react.dev](https://react.dev/).

## What are the standards for `eslint-plugin-react-x`?

`eslint-plugin-react-x` recognizes only `reactjs/react.dev` and `microsoft/TypeScript` but not `jsx-eslint/eslint-plugin-react` as standards for the behavior of the React and JSX related rules it provides.

[1]: https://github.com/pmndrs/react-three-fiber/discussions/2487
[2]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1930936266

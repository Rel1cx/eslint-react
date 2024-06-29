# Frequently Asked Questions

## What is the purpose of `eslint-react`?

The purpose of `eslint-react` is to provide ESLint plugins for not just for React DOM but also other libraries and frameworks that use React as a runtime. Currently, it provides:

- `eslint-plugin-react-x` - Core rules (DOM Irrelevant, Render Target Agnostic, Formatting Independent).
- `eslint-plugin-react-dom` - DOM specific rules for React DOM.
- `eslint-plugin-react-debug` - Debugging rules.
- `eslint-plugin-react-hooks-extra` - Extra React Hooks rules.
- `eslint-plugin-react-naming-convention` - Naming convention rules.

## What are the differences between `eslint-plugin-react-x` and `eslint-plugin-react`?

The main difference is that `eslint-plugin-react-x` can be used with any render target library or framework, while `eslint-plugin-react` will always assume that you are using React DOM, even if you are working on a project that only uses React Three Fiber (you can learn more about this through encounters like 1 2 ).

## Is `eslint-plugin-react-x` a replacement for `eslint-plugin-react`?

No, `eslint-plugin-react-x` is not a drop-in replacement for `eslint-plugin-react`. But you can still use it as a replacement if you wish. Keep in mind that some rules may behave differently, and that the rules provided by `eslint-react` are more in line with [react.dev](https://react.dev/). This is because `eslint-plugin-react-x` will consider [react.dev](https://react.dev/) instead of `eslint-plugin-react` as the source of truth.

## Does the plugins provided by `eslint-react` support vanilla JavaScript?

They are TypeScript-first ESLint plugins. Which means that they are focused on TypeScript codebases.\
If your codebase is not written in TypeScript, you should worry about that first, before worrying about linting.

For this reason, vanilla JavaScript is not supported as of right now.

# Fequently Asked Questions

## What is the purpose of `eslint-react`?

The purpose of `eslint-react` is to provide a platform for creating ESLint rules for not just for ReactDOM but also other libraries and frameworks that use React as a runtime.

## What is the purpose of `@eslint-react/eslint-plugin`?

The purpose of `@eslint-react/eslint-plugin` is to have a single package to put all the rules provided by `eslint-react`.

## Is this a replacement for `eslint-plugin-react`?

No, `eslint-react` or `@eslint-react/eslint-plugin` is not meant to be a drop-in replacement for `eslint-plugin-react`. But you can still using it as a replacement if you want to.

## What are the differences between `@eslint-react/eslint-plugin` and `eslint-plugin-react` offering for the same rule

1. Rules from `@eslint-react/eslint-plugin` not bind to any specific render target (e.g. ReactDOM, React Three Fiber, React Native, etc.)\
   While rules from `@eslint-react/eslint-plugin` will always assume you are using ReactDOM, even if you are working with a project that only uses React Three Fiber.
2. Rules provided by `@eslint-react/eslint-plugin` are more adhere to [react.dev](https://react.dev).
3. Rules provided by `eslint-react` are more sensible, predictable and accurate than the rules provided by `eslint-plugin-react`.

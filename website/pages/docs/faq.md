# Fequently Asked Questions

## What is the purpose of `eslint-react`?

The purpose of `eslint-react` is to provide ESLint rules for not just for React DOM but also other libraries and frameworks that use React as a runtime.

## What are the differences between `@eslint-react/eslint-plugin` and `eslint-plugin-react`?

The main difference is when using `@eslint-react/eslint-plugin` you can customize the behavior of the rules depending on the what render target you are using. While `eslint-plugin-react` will always assume you are using React DOM even if you are working with a project that only uses React Three Fiber (You can learn more through encounters like [1] in [2]).

## Is `@eslint-react/eslint-plugin` a replacement for `eslint-plugin-react`?

No, `@eslint-react/eslint-plugin` is not meant to be a drop-in replacement for `eslint-plugin-react`. But you can still using it as a replacement if you want to. Keep in mind that certain rules may behave differently, and the rules provided by `eslint-react` are more adhere to [react.dev](https://react.dev/).

[1]: https://github.com/pmndrs/react-three-fiber/discussions/2487
[2]: https://github.com/jsx-eslint/eslint-plugin-react/issues/3423#issuecomment-1930936266

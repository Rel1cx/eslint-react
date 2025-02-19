[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / CustomComponentSchema

# Variable: CustomComponentSchema

> `const` **CustomComponentSchema**: [`ObjectSchema`](../-internal-/interfaces/ObjectSchema.md)\<\{ `as`: [`OptionalSchema`](../-internal-/interfaces/OptionalSchema.md)\<[`StringSchema`](../-internal-/interfaces/StringSchema.md)\<`undefined`\>, `undefined`\>; `attributes`: [`OptionalSchema`](../-internal-/interfaces/OptionalSchema.md)\<[`ArraySchema`](../-internal-/interfaces/ArraySchema.md)\<[`ObjectSchema`](../-internal-/interfaces/ObjectSchema.md)\<\{ `as`: [`OptionalSchema`](../-internal-/interfaces/OptionalSchema.md)\<[`StringSchema`](../-internal-/interfaces/StringSchema.md)\<`undefined`\>, `undefined`\>; `controlled`: [`OptionalSchema`](../-internal-/interfaces/OptionalSchema.md)\<[`BooleanSchema`](../-internal-/interfaces/BooleanSchema.md)\<`undefined`\>, `undefined`\>; `defaultValue`: [`OptionalSchema`](../-internal-/interfaces/OptionalSchema.md)\<[`StringSchema`](../-internal-/interfaces/StringSchema.md)\<`undefined`\>, `undefined`\>; `name`: [`StringSchema`](../-internal-/interfaces/StringSchema.md)\<`undefined`\>; \}, `undefined`\>, `undefined`\>, `undefined`\>; `name`: [`StringSchema`](../-internal-/interfaces/StringSchema.md)\<`undefined`\>; \}, `undefined`\>

## Description

This will provide some key information to the rule before checking for user-defined components.
For example:
Which prop is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.

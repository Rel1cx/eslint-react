[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / CustomComponentSchema

# Variable: CustomComponentSchema

> `const` **CustomComponentSchema**: `ZodMiniObject`\<\{ `as`: `ZodMiniOptional`\<`ZodMiniString`\<`string`\>\>; `attributes`: `ZodMiniOptional`\<`ZodMiniArray`\<`ZodMiniObject`\<\{ `as`: `ZodMiniOptional`\<`ZodMiniString`\<`string`\>\>; `defaultValue`: `ZodMiniOptional`\<`ZodMiniString`\<`string`\>\>; `name`: `ZodMiniString`\<`string`\>; \}, \{ \}, \{ \}\>\>\>; `name`: `ZodMiniString`\<`string`\>; \}, \{ \}, \{ \}\>

## Description

This will provide some key information to the rule before checking for user-defined components.
For example:
Which prop is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.

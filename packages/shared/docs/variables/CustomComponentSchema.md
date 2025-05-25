[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / CustomComponentSchema

# Variable: CustomComponentSchema

> `const` **CustomComponentSchema**: `ZodObject`\<\{ `as`: `ZodOptional`\<`ZodString`\>; `attributes`: `ZodOptional`\<`ZodArray`\<`ZodObject`\<\{ `as`: `ZodOptional`\<`ZodString`\>; `defaultValue`: `ZodOptional`\<`ZodString`\>; `name`: `ZodString`; \}, `$strip`\>\>\>; `name`: `ZodString`; \}, `$strip`\>

## Description

This will provide some key information to the rule before checking for user-defined components.
For example:
Which prop is used as the `href` prop for the user-defined `Link` component that represents the built-in `a` element.

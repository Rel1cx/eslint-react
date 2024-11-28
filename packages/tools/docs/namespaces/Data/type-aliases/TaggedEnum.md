[**@eslint-react/tools**](../../../README.md)

***

[@eslint-react/tools](../../../README.md) / [Data](../README.md) / TaggedEnum

# Type Alias: TaggedEnum\<A\>

> **TaggedEnum**\<`A`\>: keyof `A` *extends* infer Tag ? `Tag` *extends* keyof `A` ? `Types.Simplify`\<`object` & `{ readonly [K in keyof A[Tag]]: A[Tag][K] }`\> : `never` : `never`

Create a tagged enum data type, which is a union of `Data` structs.

```ts
import { Data } from "effect"

type HttpError = Data.TaggedEnum<{
  BadRequest: { readonly status: 400, readonly message: string }
  NotFound: { readonly status: 404, readonly message: string }
}>

// Equivalent to:
type HttpErrorPlain =
  | {
    readonly _tag: "BadRequest"
    readonly status: 400
    readonly message: string
  }
  | {
    readonly _tag: "NotFound"
    readonly status: 404
    readonly message: string
  }
```

## Type Parameters

• **A** *extends* `Record`\<`string`, `Record`\<`string`, `any`\>\> & `UntaggedChildren`\<`A`\>

## Since

2.0.0

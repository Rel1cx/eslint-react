[@eslint-react/shared](../README.md) / toRegExp

# Function: toRegExp()

```ts
function toRegExp(string: string | null | undefined): RegExpLike;
```

Convert a string to a `RegExpLike` object.

Normal strings (ex: `"foo"`) are converted to `/^foo$/`.
RegExp strings (ex: `"/^foo/i"`) are converted to `/^foo/i`.

## Parameters

| Parameter | Type                              | Description            |
| --------- | --------------------------------- | ---------------------- |
| `string`  | `string` \| `null` \| `undefined` | The string to convert. |

## Returns

[`RegExpLike`](../type-aliases/RegExpLike.md)

The converted `RegExpLike` object.

## See

https://github.com/sveltejs/eslint-plugin-svelte/blob/main/packages/eslint-plugin-svelte/src/utils/regexp.ts
